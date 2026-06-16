let express = require("express")

let router = express.Router()

let { addToCart, getCart, removeCart, updateQuantity } = require("../Controllers/cartcontroller")

router.post("/add", addToCart)
router.get("/:email", getCart)
router.delete("/remove", removeCart)
router.put("/quantity", updateQuantity)


module.exports = router