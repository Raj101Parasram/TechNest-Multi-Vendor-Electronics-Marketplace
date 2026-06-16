let mongoose = require("mongoose")

let cartSchema = new mongoose.Schema({

    userEmail:{ type:String, required:true },
    productId:{ type:String, required:true },
    quantity:{ type:Number, default:1 },
    addedAt:{type:Date,default:Date.now}
})

let Cart = mongoose.model("cart", cartSchema)

module.exports = Cart