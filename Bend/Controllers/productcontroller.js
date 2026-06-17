let Product = require("../Models/productmodel")
let Business = require("../Models/businessmodel")

let addproduct = async(req,res)=>{

    if(!req.file)
    {
        return res.status(400).json({message:"Please select product image"})
    }

    try{

        let business = await Business.findOne({
            Bemail:req.body.businessEmail
        })

        if(!business)
        {
            return res.status(404).json({message:"Business not found"})
        }

        let product = new Product({...req.body, 

                    businessCity:business.Bcity,
                    businessPincode:business.Bpincode,
                    productImage:req.file.path,
                    productId:Date.now().toString()
            })

        await product.save()

        res.status(201).json({message:"Product added successfully"})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:err.message, message:"Error adding Product"})
    }

}


let getBusinessProducts = async(req,res)=>{

    try{

        let products = await Product.find({businessEmail:req.params.email})
        
        res.status(200).json(products)
    }
    catch(err)
    {
        res.status(500).json({message:"Error fetching products"})
    }
}

let deleteProduct = async(req,res)=>{

    try{

        await Product.findOneAndDelete({productId:req.params.productId})

        res.status(200).json({message:"Product deleted successfully"})

    }
    catch(err)
    {
        res.status(500).json({message:"Error deleting product"})
    }
}


let getSingleProduct = async(req,res)=>{

    try{

        let product = await Product.findOne({ productId:req.params.productId })
        res.status(200).json(product)
    }


    catch(err){res.status(500).json({message:"Error fetching product"})}

}


let updateProduct = async(req,res)=>{

    try{
        let updateData = { ...req.body }

        if(req.file){
            updateData.productImage = req.file.filename
        }

        await Product.findOneAndUpdate({ productId:req.params.productId}, updateData)
        
        res.status(200).json({message:"Product Updated Successfully"})
    
    }
    catch(err){
        res.status(500).json({message:"Error Updating Product"})
    }
}


// Home Page Controller

let searchProducts = async(req,res)=>{

    try{

        let {search, city, pincode} = req.query

        let query = {}

        if(search){
            query.$or = [{productName:{ $regex:search, $options:"i" }}, {businessName:{ $regex:search, $options:"i" }}]
        }

        let products = await Product.find(query)

        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json({ message:"Error Searching Products" })
    }
}




let getHomeShops = async(req,res)=>{

    try
    {

        let { search, city, pincode } = req.query
        let query = {}

        if(search)
        {
            query.$or = [ {productName:{$regex:search, $options:"i"}}, {businessName:{$regex:search, $options:"i"}} ]
        }

        if(city && city !== "")
        {
            query.businessCity = city
        }

        if(pincode && pincode !== "")
        {
            query.businessPincode = pincode
        }

        let products = await Product.find(query)

            let shops = {}
            products.forEach((item)=>{
            
                if(!shops[item.businessEmail]){
                
                    shops[item.businessEmail] = {
                    
                        businessEmail:item.businessEmail,
                        businessName:item.businessName,
                        products:[]
                    }
                }
            
                if(shops[item.businessEmail].products.length < 5)
                {
                    shops[item.businessEmail].products.push(item)
                }
            })
        
            res.status(200).json(Object.values(shops))
    }
    catch(err){
        res.status(500).json({message:"Error"})
    }
}



// Shop Produts Code :-

let getShopProducts = async(req,res)=>{

    try{
        let products = await Product.find({businessEmail:req.params.businessEmail})

        res.status(200).json(products)
    }
    catch(err){

        res.status(500).json({message:"Error Fetching Shop Products"})
    }
}

let filterShopProducts = async(req,res)=>{

    try{

        let { businessEmail, company, productType, category, minPrice, maxPrice, sort } = req.body

        let query = {businessEmail}

        if(company)
        {
            query.company = company
        }

        if(productType)
        {
            query.productType = productType
        }

        if(category)
        {
            query.category = category
        }

        query.price = { $gte:Number(minPrice), $lte:Number(maxPrice)}

        let products

        if(sort === "lowtohigh")
        {
            products = await Product.find(query).sort({price:1})
        }

        else if(sort === "hightolow")
        {
            products = await Product.find(query).sort({price:-1})
        }

        else if(sort === "newest")
        {
            products = await Product.find(query).sort({createdAt:-1})
        }

        else
        {
            products = await Product.find(query)
        }
        res.status(200).json(products)

    }
    catch(err){

        res.status(500).json({message:"Error Filtering Products"})
    }
}


let getAllProducts = async(req,res)=>{

    try{

        let products = await Product.find().sort({createdAt:-1})

        res.status(200).json(products)
    }
    catch(err)
    {
        res.status(500).json({message:"Error Fetching Products"})
    }
}


let adminDeleteProduct = async(req,res)=>{

    try{

        await Product.findOneAndDelete({productId:req.params.productId})

        res.status(200).json({message:"Product Deleted Successfully"})
    }
    catch(err)
    {
        res.status(500).json({message:"Error Deleting Product"})
    }
}


module.exports =  {addproduct, getBusinessProducts, deleteProduct, getSingleProduct, updateProduct, searchProducts, getHomeShops, getShopProducts, filterShopProducts, getAllProducts, adminDeleteProduct} 