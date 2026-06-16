import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './Other.css'
import Ct from "../Ct"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const ProductInfo = ()=>{

    let { productId } = useParams()
    let [product,setProduct] = useState({})
    let [liked,setLiked] = useState(false)
    let { state } = useContext(Ct)
    let navigate =useNavigate()


    useEffect(()=>{axios.get(`http://localhost:5000/product/singleproduct/${productId}`).then((res)=>{

            setProduct(res.data)

            if(state.role === "user")
            {
                axios.get(`http://localhost:5000/wishlist/check/${state.email}/${productId}`).then((res)=>{
                
                    setLiked(res.data.liked)
                })
            }
        }) 
    },[productId, state.role, state.email])

    let toggleWishlist = ()=>{

        if(state.role !== "user")
        {
            navigate("/userlogin")
            return
        }

        axios.post("http://localhost:5000/wishlist/toggle", { userEmail:state.email, productId:product.productId }).then((res)=>
        {
            setLiked(res.data.liked)

        }).catch((err)=>{
            
            console.log(err)
        })
    }

    let addToCart=(productId)=>{

      if(state.role !== "user")
      {
          navigate("/userlogin")
          return
      }

      axios.post("http://localhost:5000/cart/add", {userEmail:state.email,productId}).then((res)=>
      {
          alert(res.data.message)
      })
    }

    let placeOrder=()=>{axios.post("http://localhost:5000/order/placeorder", {userEmail:state.email}).then((res)=>
        {
            alert(res.data.message)
            navigate("/order")
        })
    }

    let finalPrice = product.price ? product.price - (product.price * product.discount / 100) : 0



    return(

        <div className="productinfopage">
            <div className="productinfocard">

                <div className="productimage">
                    <img src={`http://localhost:5000/uploads/${product.productImage}`}alt=""/>
                </div>

                <div className="productdetails">

                    <h1> {product.productName} </h1>
                    <h2> {product.company} </h2>
                    <p> Product Type : {product.productType} </p>
                    <p> Category : {product.category}</p>
                    <p> Price : ₹ {product.price} </p>
                    <p> Discount : {product.discount} % </p>
                    <h2> Final Price : ₹ {finalPrice} </h2>
                    <p> Stock : {product.stock} </p>
                    <p> Shop : {product.businessName} </p>
                    <p> Description : </p>

                    <div className="descriptionbox">
                        {product.description}
                    </div>

                    {state.role === "user" && (
                    <div className="productbuttons">

                        <button onClick={()=>{navigate(`/checkout?productId=${product.productId}`)}}>
                            Buy Now
                        </button>

                        <button onClick={()=>addToCart(product.productId)}> 
                            Add To Cart 
                        </button>
                       
                        <button onClick={toggleWishlist}>
                            {liked ? "❤️ Wishlisted" : "♡ Wishlist"}
                        </button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductInfo