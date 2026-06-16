let express = require("express")
let router = express.Router()
let upload = require("../middleware/upload")
let {addproduct, getBusinessProducts, deleteProduct, updateProduct, getSingleProduct, searchProducts, getHomeShops, getShopProducts, filterShopProducts, getAllProducts, adminDeleteProduct} = require("../Controllers/productcontroller")



router.post("/addproduct", upload.single("productImage"), addproduct)
router.get("/businessproducts/:email", getBusinessProducts)
router.get("/singleproduct/:productId", getSingleProduct)
router.put("/updateproduct/:productId", upload.single("productImage"), updateProduct)
router.delete("/deleteproduct/:productId", deleteProduct)
router.get("/search", searchProducts)
router.get( "/homeshops", getHomeShops)
router.get("/shopproducts/:businessEmail", getShopProducts)
router.post("/filtershopproducts", filterShopProducts)

router.get("/allproducts", getAllProducts)
router.delete("/admindelete/:productId", adminDeleteProduct)

module.exports = router