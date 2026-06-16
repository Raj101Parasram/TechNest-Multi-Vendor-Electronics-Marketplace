let Wishlist = require("../Models/wishlistmodel")
let Product = require("../Models/productmodel")



let toggleWishlist = async(req,res)=>{

    try{

        let exist =
        await Wishlist.findOne({

            userEmail:req.body.userEmail,

            productId:req.body.productId

        })

        if(exist){

            await Wishlist.findByIdAndDelete(

                exist._id

            )

            return res.status(200).json({

                liked:false,

                message:"Removed From Wishlist"

            })

        }

        let item =
        new Wishlist(req.body)

        await item.save()

        res.status(200).json({

            liked:true,

            message:"Added To Wishlist"

        })

    }
    catch(err){

        res.status(500).json({

            message:"Error"

        })

    }

}


let checkWishlist = async(req,res)=>{

    try{

        let exist =
        await Wishlist.findOne({

            userEmail:req.params.userEmail,

            productId:req.params.productId

        })

        res.status(200).json({

            liked:exist ? true : false

        })

    }
    catch(err){

        res.status(500).json({

            liked:false

        })

    }

}


let getWishlist = async(req,res)=>{

    try{
        let items = await Wishlist.find({userEmail:req.params.email})
        let products = []

        for(let item of items)
        {
            let product = await Product.findOne({ productId:item.productId })

            if(product)
            {
                products.push(product)
            }
        }

        res.status(200).json(products)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Wishlist"})
    }
}


let removeWishlist = async(req,res)=>{

    try{
        await Wishlist.findOneAndDelete({
            userEmail:req.body.userEmail,
            productId:req.body.productId
        })
        res.status(200).json({message:"Removed From Wishlist"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Removing Wishlist"})
    }
}

module.exports={toggleWishlist, getWishlist, removeWishlist, checkWishlist}