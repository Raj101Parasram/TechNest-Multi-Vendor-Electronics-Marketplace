import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import './Business.css'

const EditProduct = ()=>{

    let { productId } = useParams()
    let navigate = useNavigate()
    let [data,setData] = useState({
        productName:"",
        category:"",
        brand:"",
        description:"",
        price:"",
        discount:"",
        stock:""
    })
    let [image,setImage] = useState(null)
    let [msg,setMsg] = useState("")

    useEffect(()=>{
        axios.get( `https://technest-backend-1xqx.onrender.com/product/singleproduct/${productId}`).then((res)=>{
            
            setData(res.data)
        })
    },[])

    let fun=(e)=>{
        setData({ ...data,[e.target.name]:e.target.value})
    }

    let updateProduct=()=>{

        let formData = new FormData()
        
        Object.keys(data).forEach((key)=>{formData.append(key, data[key])})

        if(image)
        {
            formData.append("productImage",image)
        }

        axios.put(`https://technest-backend-1xqx.onrender.com/product/updateproduct/${productId}`, formData).then((res)=>{

            alert(res.data.message)
            navigate("/businessproducts")
        })
        .catch((err)=>{

            setMsg(err.response?.data?.message)
        })
    }

    return(
        <div className="addproductpage">

            <div className="addproductcard">
                <h1>Edit Product</h1>

                <input type="text" name="productName" value={data.productName} onChange={fun}/>
                <input type="text" name="brand" value={data.brand} onChange={fun}/>
                <textarea name="description" value={data.description} onChange={fun}/>
                <input type="number" name="price" value={data.price} onChange={fun}/>
                <input type="number" name="discount" value={data.discount} onChange={fun} />
                <input type="number" name="stock" value={data.stock} onChange={fun} />
                <input type="file" onChange={(e)=>{ setImage(e.target.files[0] )}} />

                {image && (
                
                    <img src={URL.createObjectURL(image)} alt="preview" className="previewimg"/>
                
                )}
                
                <h3>{msg}</h3>
                <button onClick={updateProduct}> Update Product </button>
            
            </div>
        </div>
    )
}

export default EditProduct