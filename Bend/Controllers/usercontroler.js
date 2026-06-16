let jwt= require('jsonwebtoken');
let userModel = require('../Models/usermoddel');
let bcrypt = require('bcrypt');
let nodemailer = require('nodemailer');

let userreg= async(req,res)=>{
    try{
        let exist= await userModel.findOne({email:req.body.email});
        if(exist){
            res.status(400).json({"message":"User already exist"})
        }
        else{
            let pwdhash= await bcrypt.hash(req.body.password,10);
            let user= new userModel({...req.body, password:pwdhash});
            await user.save();
            res.status(201).json({"message":"User registered successfully", "user": user})
        }
    }
    catch(err){
        res.status(500).json({"message":"Error occurred while registering user" , "error": err.message})
    }
}


let userlogin= async(req,res)=>{
    try{
        let user= await userModel.findOne({email:req.body.email});
        if(!user){
            res.status(404).json({"message":"User not found"})
        }
        else{
            let isMatch= await bcrypt.compare(req.body.password, user.password);
            if(!isMatch){
                res.status(400).json({"message":"Invalid password"})
            }
            else{
                let token= jwt.sign({email: user.email, role:"user", name:user.name}, process.env.SECRET_KEY, {expiresIn: '30d'});
                res.cookie("token", token, {httpOnly:true, maxAge:30*24*60*60*1000})

                res.status(200).json({"message":"User logged in successfully", "name": user.name, "email": user.email})
            }
        }
    }
    catch(err){
        res.status(500).json({"message":"Error occurred while logging in user" , "error": err.message})
    }
}


// User Profile Code :-

let getprofile = async(req,res)=>{
    try{

        let user = await userModel.findOne({
            email:req.params.email
        })

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        res.status(200).json(user)

    }
    catch(err){
        res.status(500).json({
            message:"Error fetching profile"
        })
    }
}


let updateprofile = async(req,res)=>{
    try{

        await userModel.findOneAndUpdate(
            {email:req.body.email},
            req.body
        )

        res.status(200).json({
            message:"Profile updated successfully"
        })

    }
    catch(err){

        res.status(500).json({
            message:"Error updating profile"
        })

    }
}


// User Image Upload Code :-

let updateProfileImage = async(req,res)=>{

    try{

        await userModel.findOneAndUpdate(

            {email:req.body.email},

            {
                profileImage:req.file.filename
            }

        );

        res.status(200).json({
            message:"Profile image updated"
        });

    }

    catch(err){

        res.status(500).json({
            message:"Error updating image"
        });

    }
}


// Sent OTP Code :-

let sendOtp = async(req,res)=>{

  try{

    let otp = Math.floor(
      100000 + Math.random()*900000
    ).toString()

    global.userOtp = otp

    console.log("OTP =", otp)

    // nodemailer code

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

let transporter = nodemailer.createTransport({

    service:"gmail",

    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

})

// verify OTP Code :-

let verifyOtp = async(req,res)=>{

  try{

    if(req.body.otp !== global.userOtp){

      return res.status(400).json({
        message:"Invalid OTP"
      })

    }

    let exist =
    await userModel.findOne({
      email:req.body.email
    })

    if(exist){

      return res.status(400).json({
        message:"User already exists"
      })

    }

    let pwdhash =
    await bcrypt.hash(
      req.body.password,
      10
    )

    let user =
    new userModel({

      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      address:req.body.address,
      pincode:req.body.pincode,
      city:req.body.city,
      state:req.body.state,
      password:pwdhash

    })

    await user.save()

    res.status(200).json({
      message:"Account Created Successfully"
    })

  }
  catch(err){

    res.status(500).json({
      message:"Error Creating Account"
    })

  }

}


// resent OTP Code :-

let sendResetOtp = async(req,res)=>{

    try{

        console.log("BODY =", req.body);

        let user = await userModel.findOne({
            email:req.body.email
        })

        if(!user){

            return res.status(404).json({
                message:"Email not registered"
            })
        }

        let otp = Math.floor(
            100000 + Math.random()*900000
        ).toString()

        console.log("OTP =", otp);

        await userModel.findOneAndUpdate(

            {email:req.body.email},

            {otp:otp}

        )

        await transporter.sendMail({

            from:process.env.EMAIL_USER,

            to:req.body.email,

            subject:"Password Reset OTP",

            text:`Your OTP is ${otp}`

        })

        res.status(200).json({
            message:"OTP Sent Successfully"
        })

    }

    catch(err){

        console.log("SEND OTP ERROR =", err);

        res.status(500).json({
            message:"Error Sending OTP",
            error:err.message
        })

    }

}


// Cjhange Password Code :-

let changePassword = async(req,res)=>{

    try{

        let user = await userModel.findOne({

            email:req.body.email

        })

        if(!user){

            return res.status(404).json({

                message:"User Not Found"

            })

        }

        if(user.otp !== req.body.otp){

            return res.status(400).json({

                message:"Invalid OTP"

            })

        }

        let pwdhash = await bcrypt.hash(

            req.body.password,

            10

        )

        await userModel.findOneAndUpdate(

            {email:req.body.email},

            {

                password:pwdhash,

                otp:""

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


let getAllUsers = async(req,res)=>{

    try{

        let users = await userModel.find().sort({createdAt:-1})

        res.status(200).json(users)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Users"})
    }
}


let deleteUser = async(req,res)=>{

    try{

        await userModel.findOneAndDelete({email:req.params.email})

        res.status(200).json({message:"User Deleted Successfully"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Deleting User"})
    }
}


module.exports={userreg, userlogin, getprofile, updateprofile, updateProfileImage, sendOtp, verifyOtp, sendResetOtp, changePassword, deleteUser, getAllUsers};