let mongoose = require("mongoose")

let productSchema = new mongoose.Schema({

    businessEmail:{type:String,required:true},
    businessName:{type:String,required:true},
    businessPincode:{type:String, required: true},
    businessCity:{type:String, required: true},

    productId:{type:String,default:""},
    productName:{type:String,required:true},
    category:{type:String,required:true},
    productType:{type:String, required:true},
    company:{type:String, required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    discount:{type:Number,default:0},
    stock:{type:Number,required:true},
    productImage:{type:String,default:""},

    status:{type:String,default:"Active"},
    createdAt:{type:Date,default:Date.now}

})

let productModel = mongoose.model( "products", productSchema)

module.exports = productModel