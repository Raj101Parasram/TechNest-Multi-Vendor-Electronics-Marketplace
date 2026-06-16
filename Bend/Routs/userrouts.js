let express=require("express")
let router=express.Router()
let {userlogin, userreg, getprofile, updateprofile, updateProfileImage, sendOtp, verifyOtp, sendResetOtp, changePassword, getAllUsers, deleteUser}= require("../Controllers/usercontroler")
let multer = require("multer")
let upload = require("../middleware/upload")

router.post("/userlogin", userlogin)
router.post("/userreg", userreg)
router.post("/sendotp", sendOtp)
router.post("/verifyotp", verifyOtp)
router.post("/sendresetotp", sendResetOtp)
router.post("/changepassword", changePassword)
router.get("/profile/:email",getprofile)
router.put("/updateprofile",updateprofile)
router.post("/updateprofileimage", upload.single("profileImage"), updateProfileImage);

router.get("/allusers", getAllUsers)
router.delete("/deleteuser/:email", deleteUser)

module.exports= router