let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    address:{ type: String, required: true },
    phone:{ type: String, required: true },
    pincode:{ type: String, required: true },
    city:{ type: String, required: true },
    state:{ type: String, required: true },
    password:{ type: String, required: true },
    profileImage:{ type: String, default:""},
    gender:{ type: String, default:""},
    dob:{ type: String, default:""},
    country:{ type:String, default:"India"},
    otp:{ type:String, default:""},
    createdAt:{ type: Date, default: Date.now }

})

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;