let mongoose = require("mongoose")

let orderSchema = new mongoose.Schema({

    orderId:{ type:String, default:"" },
    userEmail:{ type:String, required:true },
    businessEmail:{ type:String, required:true },
    productId:{ type:String, required:true },
    productName:{ type:String, required:true },
    productImage:{ type:String, default:"" },
    quantity:{ type:Number, default:1 },
    price:{ type:Number, required:true },
    totalPrice:{type:Number, required:true},
    status:{ type:String, default:"Pending" },
    orderDate:{ type:Date, default:Date.now }

})

let ordermodel = mongoose.model("orders",orderSchema)

module.exports = ordermodel