let mongoose = require('mongoose');

let businessSchema = new mongoose.Schema({
    Ownername:{ type: String, required: true },
    Bname:{ type: String, required: true },
    Bemail:{ type: String, required: true, unique: true },
    Baddress:{ type: String, required: true },   
    Bpincode:{ type: String, required: true },
    Bcity:{ type: String, required: true },
    Bstate:{ type: String, required: true },
    Bphone:{ type: String, required: true },
    Bpassword:{ type: String, required: true },
    Brole :{ type : String, enum:['business', 'admin'], default: 'business'},
    Bimg:{ type: String, default:""},
    Btype:{ type: String, default:"electronics"},
    BopDate:{ type: String, default:""},
    Botp:{ type:String, default:""},
    BcreatedAt:{ type: Date, default: Date.now }
})

let businessman= mongoose.model('business', businessSchema);

module.exports = businessman;