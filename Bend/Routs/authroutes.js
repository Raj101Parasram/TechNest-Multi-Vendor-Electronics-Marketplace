let express = require("express")

let router = express.Router()

let {checkLogin, logout} = require("../Controllers/authcontroller")

router.get("/checklogin",checkLogin)
router.get("/logout",logout)

module.exports=router
