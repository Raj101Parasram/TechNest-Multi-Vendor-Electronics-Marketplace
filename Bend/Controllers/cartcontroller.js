let Cart = require("../Models/cartmodel")
let Product = require("../Models/productmodel")


let addToCart = async(req,res)=>{

    try{

        let product = await Product.findOne({productId:req.body.productId})
        
        if(product.stock <= 0)
        {
            return res.status(400).json({message:"Out Of Stock"})
        }

        
        let exist = await Cart.findOne({ userEmail:req.body.userEmail, productId:req.body.productId })

        if(exist)
        {
            if(exist.quantity + 1 > product.stock)
            {
                return res.status(400).json({message:"Not Enough Stock Available"})
            }
            exist.quantity += 1

            await exist.save()
            return res.status(200).json({message:"Quantity Updated"})
        }
        let item = new Cart(req.body)
        
        await item.save()

        res.status(200).json({message:"Added To Cart"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Adding To Cart"})
    }
}


let getCart = async(req,res)=>{

    try{

        let items = await Cart.find({ userEmail:req.params.email })
        let products = []

        for(let item of items)
        {
            let product = await Product.findOne({ productId:item.productId })

            if(product)
            {
                products.push({ ...product._doc, quantity:item.quantity })
            }
        }
        res.status(200).json(products)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Cart"})
    }
}


let removeCart = async(req,res)=>{

    try{

        await Cart.findOneAndDelete({ userEmail:req.body.userEmail, productId:req.body.productId })

        res.status(200).json({message:"Removed From Cart"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Removing Product"})
    }
}

let updateQuantity = async(req,res)=>{

    try{

        let product = await Product.findOne({productId:req.body.productId})

        if(req.body.quantity > product.stock)
        {
            return res.status(400).json({message:"Stock Limit Reached"})
        }

        await Cart.findOneAndUpdate(
            {userEmail:req.body.userEmail, productId:req.body.productId}, {quantity:req.body.quantity}
        )

        res.status(200).json({message:"Quantity Updated"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Updating Quantity"})
    }
}


module.exports = { addToCart, getCart, removeCart, updateQuantity }