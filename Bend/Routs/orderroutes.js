let express = require("express")
let router = express.Router()
let {placeOrder, buyNow, getUserOrders, cancelOrder, getBusinessOrders, updateOrderStatus, adminDeleteOrder, getAllOrders} = require("../Controllers/ordercontroller")



router.post("/placeorder", placeOrder)
router.post("/buynow", buyNow)
router.get("/user/:email", getUserOrders)
router.put( "/cancel/:orderId", cancelOrder)
router.get("/business/:email", getBusinessOrders)
router.put("/status/:orderId", updateOrderStatus)

router.get("/allorders", getAllOrders)
router.delete("/admindelete/:orderId", adminDeleteOrder)

module.exports = router