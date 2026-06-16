let mongoose = require("mongoose")

let wishlistSchema = new mongoose.Schema({

    userEmail:{
        type:String,
        required:true
    },

    productId:{
        type:String,
        required:true
    },

    addedAt:{
        type:Date,
        default:Date.now
    }

})

let wishlistModel = mongoose.model( "wishlist", wishlistSchema)

module.exports = wishlistModel