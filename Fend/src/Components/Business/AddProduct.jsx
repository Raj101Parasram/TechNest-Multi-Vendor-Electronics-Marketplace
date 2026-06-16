import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Ct from '../Ct'
import './Business.css'

const AddProduct = () => {

    let { state } = useContext(Ct)
    let [msg,setMsg] = useState("")
    let [data,setData] = useState({ businessEmail:state.email, businessName:state.name,
        
        productName:"",
        category:"Electronics",
        company:"",
        productType:"",
        description:"",
        price:"",
        discount:"",
        stock:""
    })
    let [image,setImage] = useState(null)


    useEffect(()=>{
        setData(prev=>({ ...prev, businessEmail:state.email, businessName:state.name }))

    },[state.email,state.name])


    let fun=(e)=>{setData({...data, [e.target.name]:e.target.value})}

    let addProduct=()=>{

        let formData = new FormData()

        Object.keys(data).forEach((key)=>{
            formData.append(key, data[key])
        })

        formData.append("productImage", image)

        console.log(data)

        axios.post("http://localhost:5000/product/addproduct", formData, {headers:{"Content-Type":"multipart/form-data"}}).then((res)=>{

            setMsg(res.data.message)

            setData({
                businessEmail:state.email,
                businessName:state.name,
                productName:"",
                category:"Electronics",
                company:"",
                productType:"",
                description:"",
                price:"",
                discount:"",
                stock:""
            })
            setImage(null)
        }).catch((err)=>
          {
            setMsg(err.response?.data?.message)
          })
    }

    return (

        <div className="addproductpage">

            <div className="addproductcard">

                <h1>Add Product</h1>

                <input type="text" name="productName" placeholder="Product Name" value={data.productName} onChange={fun}/>
                <input type="text" name="category"  value={data.category} onChange={fun} readOnly/>

                <input type="text" name="company" placeholder="Company Name" value={data.company} onChange={fun}/>

                <select name="productType" value={data.productType} onChange={fun}>

                    <option value="">Select Product Type</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="TV">TV</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="AC">AC</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Keyboard">Keyboard</option>

                </select>
                <textarea name="description" placeholder="Description" value={data.description} onChange={fun} />
                <input type="number" name="price" placeholder="Price" value={data.price} onChange={fun}/>
                <input type="number" name="discount" placeholder="Discount %" value={data.discount} onChange={fun}/>
                <input type="number" name="stock" placeholder="Stock Quantity" value={data.stock} onChange={fun}/>
                <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                
                {image && (
                
                    <img src={URL.createObjectURL(image)} alt="preview" className="previewimg"/>
                
                )}
                
                <h3>{msg}</h3>
    
                <button onClick={addProduct}> Add Product </button>
            </div>
        </div>
    )
}

export default AddProduct