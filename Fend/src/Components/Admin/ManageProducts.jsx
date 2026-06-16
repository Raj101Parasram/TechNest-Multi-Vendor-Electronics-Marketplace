import React,{useEffect,useState} from "react"
import axios from "axios"
import "./Admin.css"

const ManageProducts = ()=>{

    let [products,setProducts] = useState([])

    let loadProducts = ()=>{

        axios.get("https://technest-backend-1xqx.onrender.com/product/allproducts").then((res)=>{

            setProducts(res.data)
        })
    }

    useEffect(()=>{
    loadProducts()
    },[])

    let deleteProduct=(productId)=>{

        if(!window.confirm("Delete Product ?"))
        {
            return
        }

        axios.delete(`https://technest-backend-1xqx.onrender.com/product/admindelete/${productId}`).then((res)=>{

            alert(res.data.message)
            loadProducts()
        })
    }

    return(

        <div className="manageproducts">

            <h1>Manage Products</h1>

            <div className="adminproductgrid">

                {
                    products.map((item)=>(

                        <div className="adminproductcard" key={item.productId} >

                            <img src={`https://technest-backend-1xqx.onrender.com/uploads/${item.productImage}`} alt="" />

                            <h2>{item.productName}</h2>
                            <p> Shop : {item.businessName} </p>
                            <p> Company : {item.company} </p>
                            <p> Price : ₹{item.price} </p>
                            <p> Stock : {item.stock} </p>

                            <button className="deletebtn" onClick={()=> deleteProduct(item.productId)}>
                                Delete
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ManageProducts