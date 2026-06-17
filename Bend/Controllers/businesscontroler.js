let bcrypt = require('bcrypt');
let jwt= require('jsonwebtoken');
let businessModel = require('../Models/businessmodel');
let Product = require("../Models/productmodel")
let Order = require("../Models/ordermodel")
let User = require("../Models/usermoddel")
let nodemailer = require('nodemailer');


let businessreg= async(req,res)=>{
    try{
        let exist= await businessModel.findOne({Bemail:req.body.Bemail});
        if(exist){
            res.status(400).json({"message":"Business already exist"})
        }
        else{
            let pwdhash= await bcrypt.hash(req.body.Bpassword,10);
            let business= new businessModel({...req.body, Bpassword:pwdhash});
            await business.save();
            res.status(201).json({"message":"Business registered successfully", "business": business})
        }   
    }
    catch(err){
        res.status(500).json({"message":"Error occurred while registering business" , "error": err.message})
    }
}

let businesslogin= async(req,res)=>{
    try{
        let business= await businessModel.findOne({Bemail:req.body.Bemail});
        if(!business){
            res.status(404).json({"message":"Business not found"})  
        }
        else{
            let isMatch= await bcrypt.compare(req.body.Bpassword, business.Bpassword);
            if(!isMatch){
                res.status(400).json({"message":"Invalid password"})
            }
            else{
                let token = jwt.sign({ email: business.Bemail, role: business.Brole, name: business.Bname}, process.env.SECRET_KEY, {expiresIn:'30d'});
                res.cookie("token", token, {httpOnly:true, secure: true, sameSite: "none", maxAge:30*24*60*60*1000})

                res.status(200).json({"message":"Business logged in successfully", token, "name": business.Bname, "email": business.Bemail, "role": business.Brole})
            }   
        }
    }
    catch(err)
    {
        res.status(500).json({"message":"Error occurred while logging in business" , "error": err.message})
    }
}

// Transportation of Business Email Code :-

let transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

})


// Send Business Email OTP Code :-

let sendBOtp = async(req,res)=>{

    try{

        let exist = await businessModel.findOne({

            Bemail:req.body.Bemail

        })

        if(exist){

            return res.status(400).json({

                message:"Business already exists"

            })

        }

        let otp = Math.floor(

            100000 + Math.random()*900000

        ).toString()

        console.log("NEW OTP GENERATED =", otp)

        await businessModel.findOneAndUpdate(
            { Bemail:req.body.Bemail },
            { Botp:otp },
            { upsert:true }
        )

        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:req.body.Bemail,

            subject:"Business OTP Verification",

            text:`Your OTP is ${otp}`

        })

        res.status(200).json({

            message:"OTP Sent Successfully"

        })

    }
    catch(err){

        console.log(err)

        res.status(500).json({

            message:"Error Sending OTP"

        })

    }

}


// varify Business OTP Code :-

let verifyBOtp = async(req,res)=>{

    
    try{

        let businessOtpData = await businessModel.findOne({
                
            Bemail:req.body.Bemail
                
        })
        
        console.log(
            "Stored OTP =",
            businessOtpData.Botp
        )
        
        console.log(
            "Entered OTP =",
            req.body.otp
        )
        
        if(
            businessOtpData.Botp !== req.body.otp
        ){
        
            return res.status(400).json({
            
                message:"Invalid OTP"
            
            })
        
        }
        console.log("BODY =", req.body)

        let exist = await businessModel.findOne({

            Bemail:req.body.Bemail,

            Bpassword:{ $exists:true, $ne:"" }  

        })

        if(exist){
        
            return res.status(400).json({
            
                message:"Business already exists"
            
            })
        
        }

        let pwdhash = await bcrypt.hash(

            req.body.Bpassword,
                
            10
                
        )
        
        await businessModel.findOneAndUpdate(
        
            { Bemail:req.body.Bemail },
        
            {
            
                Ownername:req.body.Ownername,
            
                Bname:req.body.Bname,
            
                Bphone:req.body.Bphone,
            
                Baddress:req.body.Baddress,
            
                Bpincode:req.body.Bpincode,
            
                Bcity:req.body.Bcity,
            
                Bstate:req.body.Bstate,
            
                Bpassword:pwdhash,
            
                Botp:""
            
            }
        
        )
        
        res.status(200).json({
        
            message:"Account Created Successfully"
        
        })

    }
    catch(err){

        console.log(err)

        res.status(500).json({

            message:"Error Creating Account"

        })

    }

}


// Resent Business OTP Code :-

let sendBusinessResetOtp = async(req,res)=>{

    try{

        let business =
        await businessModel.findOne({

            Bemail:req.body.Bemail

        })

        if(!business){

            return res.status(404).json({

                message:"Business Not Found"

            })

        }

        let otp = Math.floor(

            100000 + Math.random()*900000

        ).toString()

        await businessModel.findOneAndUpdate(

            {Bemail:req.body.Bemail},

            {Botp:otp}

        )

        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:req.body.Bemail,

            subject:"Reset Password OTP",

            text:`Your OTP is ${otp}`

        })

        res.status(200).json({

            message:"OTP Sent Successfully"

        })

    }
    catch(err){

        res.status(500).json({

            message:"Error Sending OTP"

        })

    }

}


// Change Business Password Code :-

let changeBusinessPassword = async(req,res)=>{

    try{

        let business =
        await businessModel.findOne({

            Bemail:req.body.Bemail

        })

        if(!business){

            return res.status(404).json({

                message:"Business Not Found"

            })

        }

        if(

            business.Botp !== req.body.Botp

        ){

            return res.status(400).json({

                message:"Invalid OTP"

            })

        }

        let pwdhash =
        await bcrypt.hash(

            req.body.Bpassword,

            10

        )

        await businessModel.findOneAndUpdate(

            {Bemail:req.body.Bemail},

            {

                Bpassword:pwdhash,

                Botp:""

            }

        )

        res.status(200).json({

            message:"Password Changed Successfully"

        })

    }
    catch(err){

        res.status(500).json({

            message:"Error Changing Password"

        })

    }

}


// Get Business Profile API:-

let getBusinessProfile = async(req,res)=>{

    try{

        let business =
        await businessModel.findOne({

            Bemail:req.params.Bemail

        })

        res.status(200).json(
            business
        )

    }
    catch(err){

        res.status(500).json({

            message:"Error Fetching Profile"

        })

    }

}

// Update Business Profile API:-

let updateBusinessProfile = async(req,res)=>{

    try{

        await businessModel.findOneAndUpdate(

            {

                Bemail:req.body.Bemail

            },

            req.body

        )

        res.status(200).json({

            message:"Profile Updated"

        })

    }
    catch(err){

        res.status(500).json({

            message:"Error Updating Profile"

        })

    }

}


// business image upload code :-

let updateBusinessImage = async(req,res)=>{

    try{

        await businessModel.findOneAndUpdate(

            { Bemail:req.body.Bemail },

            { Bimg:req.file.path }

        )

        res.status(200).json({
            message:"Business image updated successfully"
        })

    }
    catch(err){

        res.status(500).json({
            message:"Error updating image"
        })

    }

}


// Business details on top of shop Products page 

let getShopInfo = async(req,res)=>{

    try{
        let business = await businessModel.findOne({Bemail:req.params.businessEmail})

        if(!business){
            return res.status(404).json({message:"Shop Not Found"})
        }

        res.status(200).json(business)
    }
    catch(err){
        res.status(500).json({message:"Error Fetching Shop Info"})
    }
}

let getBusinessDashboard = async(req,res)=>{

    try{

        let email = req.params.email

        let totalProducts = await Product.countDocuments({ businessEmail:email })
        let totalOrders = await Order.countDocuments({ businessEmail:email })
        let pendingOrders = await Order.countDocuments({ businessEmail:email, status:"Pending" })
        let deliveredOrders = await Order.countDocuments({ businessEmail:email, status:"Delivered" })
        let orders = await Order.find({businessEmail:email})

        let revenue = 0
        orders.forEach((item)=>{ revenue += item.totalPrice })

        res.status(200).json({
            totalProducts,
            totalOrders,
            pendingOrders,
            deliveredOrders,
            revenue
        })

    }
    catch(err)
    {
        res.status(500).json({message:"Error Loading Dashboard"})
    }

}


let getAdminDashboard = async(req,res)=>{

    try{

        let totalUsers = await User.countDocuments()
        let totalBusinesses = await businessModel.countDocuments({Brole:"business"})
        let totalProducts = await Product.countDocuments()
        let totalOrders = await Order.countDocuments()

        res.status(200).json({
            totalUsers,
            totalBusinesses,
            totalProducts,
            totalOrders
        })

    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Dashboard"})
    }
}


let getAllBusinesses = async(req,res)=>{

    try{

        let businesses = await businessModel.find({Brole: "business"}).sort({BcreatedAt:-1})

        res.status(200).json(businesses)

    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Businesses"})
    }
}



let deleteBusiness = async(req,res)=>{

    try{

        await businessModel.findOneAndDelete({Bemail:req.params.Bemail})

        res.status(200).json({message:"Business Deleted Successfully"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Deleting Business"})
    }
}


let adminDashboard = async(req,res)=>{

    try{

        let totalUsers = await User.countDocuments()
        let totalBusinesses = await businessModel.countDocuments({Brole:"business"})
        let totalProducts = await Product.countDocuments()
        let totalOrders = await Order.countDocuments()
        let pendingOrders = await Order.countDocuments({status:"Pending"})
        let cancelledOrders = await Order.countDocuments({status:"Cancelled"})
        let orders = await Order.find()

        let totalRevenue = 0

        orders.forEach((item)=>{

            if(item.status !== "Cancelled")
            {
                totalRevenue += item.totalPrice
            }
        })

        res.status(200).json({

            totalUsers,
            totalBusinesses,
            totalProducts,
            totalOrders,
            pendingOrders,
            cancelledOrders,
            totalRevenue
        })
    }
    catch(err)
    {
        res.status(500).json({message:"Error Loading Dashboard"})
    }
}


module.exports={businessreg, businesslogin, sendBOtp, verifyBOtp, sendBusinessResetOtp, changeBusinessPassword, getBusinessProfile, updateBusinessProfile, updateBusinessImage, getShopInfo, getBusinessDashboard, getAdminDashboard, getAllBusinesses ,deleteBusiness, adminDashboard};