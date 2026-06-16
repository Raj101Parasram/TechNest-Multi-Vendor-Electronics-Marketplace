let express=require("express")
let mongoose= require("mongoose")
require("dotenv").config()
let userrouts= require("./Routs/userrouts")
let businessrouts= require("./Routs/businessrouts")
let cookieParser = require("cookie-parser")
let cors = require("cors")
let authroutes = require("./Routs/authroutes")
let productroutes = require("./Routs/productroutes")
let wishlistroutes = require("./Routs/wishlistroutes")
let cartroutes = require("./Routs/cartroutes")
let orderroutes = require("./Routs/orderroutes")

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log("Error connecting to MongoDB: ", err.message)
})



let app= express()
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use(cookieParser())
app.use("/auth",authroutes)
app.use("/uploads", express.static("uploads"))
app.use("/user", userrouts)
app.use("/business", businessrouts)
app.use("/product", productroutes)
app.use("/wishlist", wishlistroutes)
app.use("/cart", cartroutes)
app.use("/order", orderroutes)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})