let express=require("express")
let router=express.Router()
let {businesslogin, businessreg, sendBOtp, verifyBOtp, sendBusinessResetOtp, changeBusinessPassword, getBusinessProfile, updateBusinessProfile, updateBusinessImage, getShopInfo, getBusinessDashboard, getAdminDashboard, getAllBusinesses, deleteBusiness, adminDashboard}= require("../Controllers/businesscontroler")
let upload = require("../middleware/upload")

router.post("/blogin", businesslogin)
router.post("/breg", businessreg)
router.post("/sendotp",sendBOtp)
router.post("/verifyotp",verifyBOtp)
router.post("/sendresetotp",sendBusinessResetOtp)
router.post("/changepassword",changeBusinessPassword)
router.post("/updateprofileimage", upload.single("Bimg"), updateBusinessImage)
router.get("/profile/:Bemail",getBusinessProfile)
router.put("/updateprofile",updateBusinessProfile)
router.get("/shopinfo/:businessEmail", getShopInfo)
router.get("/dashboard/:email", getBusinessDashboard)

router.get("/admindashboard", getAdminDashboard)
router.get("/allbusinesses", getAllBusinesses)
router.delete("/deletebusiness/:Bemail", deleteBusiness)
router.get("/admindashboard", adminDashboard)

module.exports= router