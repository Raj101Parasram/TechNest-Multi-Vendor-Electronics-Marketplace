let Order = require("../Models/ordermodel")
let Cart = require("../Models/cartmodel")
let Product = require("../Models/productmodel")

let placeOrder = async(req,res)=>{

    try{

        let cartItems = await Cart.find({userEmail:req.body.userEmail})

        for(let item of cartItems)
        {
            let product = await Product.findOne({productId:item.productId})

            if(product)
            {   

                if(product.stock < item.quantity)
                {
                    return res.status(400).json({message:`${product.productName} Out Of Stock`})
                }

                
                let finalPrice = product.price - (product.price *product.discount / 100)

                await Order.create({
                    orderId: Date.now().toString() + Math.random(),
                    userEmail: req.body.userEmail,

                    businessEmail: product.businessEmail,
                    productId: product.productId,
                    productName: product.productName,
                    productImage: product.productImage,
                    quantity: item.quantity,
                    price: finalPrice,
                    totalPrice: finalPrice * item.quantity
                })

                await Product.updateOne(
                    {
                        productId: product.productId
                    },
                    {
                        $inc:{ stock:-item.quantity }
                    }
                )
            }
        }

        await Cart.deleteMany({userEmail:req.body.userEmail})

        res.status(200).json({message:"Order Placed Successfully"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Placing Order"})
    }
}

let buyNow = async(req,res)=>{

    try{

        let product = await Product.findOne({ productId:req.body.productId })

        if(product.stock <= 0)
        {
            return res.status(400).json({message:"Out Of Stock"})
        }


        let finalPrice = product.price - (product.price *product.discount / 100)

        await Order.create({

            orderId: Date.now().toString(),

            userEmail: req.body.userEmail,
            businessEmail: product.businessEmail,
            productId: product.productId,
            productName: product.productName,
            productImage: product.productImage,
            quantity: 1,
            price: finalPrice,
            totalPrice: finalPrice

        })

        await Product.updateOne(
            {
                productId: product.productId
            },
            {
                $inc:{ stock:-1 }
            }
        )

        res.status(200).json({message:"Order Placed Successfully"})
    }
    catch(err)
    {
        console.log("BUY NOW ERROR =", err)
        res.status(500).json({message:"Error"})
    }
}


let getUserOrders = async(req,res)=>{

    try{

        let orders = await Order.find({userEmail:req.params.email}).sort({orderDate:-1})

        res.status(200).json(orders)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Orders"})
    }
}


let cancelOrder = async(req,res)=>{

    try{
        await Order.findOneAndUpdate({orderId:req.params.orderId}, {status:"Cancelled"})

        res.status(200).json({message:"Order Cancelled Successfully"})

    }
    catch(err)
    {
        res.status(500).json({message:"Error"})
    }
}

let getBusinessOrders = async(req,res)=>{

    try{

        let orders = await Order.find({businessEmail:req.params.email}).sort({orderDate:-1})

        res.status(200).json(orders)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Business Orders"})
    }
}

let updateOrderStatus = async(req,res)=>{

    try{

        await Order.findOneAndUpdate({orderId:req.params.orderId}, {status:req.body.status})

        res.status(200).json({message:"Status Updated Successfully"})

    }
    catch(err)
    {
        res.status(500).json({message:"Error Updating Status"})
    }
}


let getAllOrders = async(req,res)=>{

    try{

        let orders = await Order.find().sort({orderDate:-1})

        res.status(200).json(orders)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Orders"})
    }
}


let adminDeleteOrder = async(req,res)=>{

    try{

        await Order.findOneAndDelete({orderId:req.params.orderId})

        res.status(200).json({message:"Order Deleted Successfully"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Deleting Order"})
    }
}


module.exports= {placeOrder, buyNow, getUserOrders, cancelOrder, getBusinessOrders, updateOrderStatus, getAllOrders, adminDeleteOrder}