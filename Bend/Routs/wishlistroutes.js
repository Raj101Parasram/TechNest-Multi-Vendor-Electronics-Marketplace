let express = require("express")
let router = express.Router()   
let {toggleWishlist, getWishlist, removeWishlist, checkWishlist} = require("../Controllers/wishlistcontroller")

router.post("/toggle", toggleWishlist)
router.get("/check/:userEmail/:productId", checkWishlist)
router.get("/:email", getWishlist)
router.delete("/remove", removeWishlist)

module.exports = router