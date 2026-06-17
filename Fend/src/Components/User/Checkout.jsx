import React,{useContext,useEffect,useState} from "react"
import axios from "axios"
import Ct from "../Ct"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import "./User.css"

const Checkout = ()=>{

    let { state } = useContext(Ct)
    let navigate = useNavigate()
    let location = useLocation()
    let [products,setProducts] = useState([])

    let params =new URLSearchParams(location.search)
    let productId =params.get("productId")

    useEffect(()=>{

        if(state.role !== "user")
        {
            navigate("/userlogin")
        }

        if(productId)
        {
            axios.get(`https://technest-backend-1xqx.onrender.com/product/singleproduct/${productId}`).then((res)=>{

                setProducts([{...res.data,quantity:1}])
            })
        }
        else
        {
            axios.get(`https://technest-backend-1xqx.onrender.com/cart/${state.email}`).then((res)=>{

                setProducts(res.data)
            })
        }
    },[productId,state.email])



    let subtotal = products.reduce(

        (total,item)=>{

            let finalPrice = item.price - (item.price *item.discount / 100) 
            return total + (finalPrice * item.quantity)

        }, 0
    )

    let deliveryCharge = subtotal > 1000 ? 0 : 100
    
    let grandTotal = subtotal + deliveryCharge

    let placeOrder=()=>{

    if(productId)
    {
        axios.post("https://technest-backend-1xqx.onrender.com/order/buynow",{userEmail:state.email,productId}).then((res)=>{

            alert(res.data.message)
            navigate("/order")
        })
    }
    else
    {
        axios.post("https://technest-backend-1xqx.onrender.com/order/placeorder",{userEmail:state.email}).then((res)=>{

            alert(res.data.message)
            navigate("/order")
        })
    }
}

    return(
        <div className="checkoutpage">

            <h1>Checkout</h1>
            {
                products.map((item)=>(

                    <div className="checkoutcard" key={item.productId} >

                        <img src={item.productImage} alt="" />

                        <div>

                            <h2> {item.productName} </h2>
                            <h3> {item.company} </h3>
                            <p> Qty : {item.quantity} </p>
                            <p> ₹ {item.price -(item.price *item.discount / 100) } </p>
                        </div>

                    </div>
                ))
            }

            <div className="checkoutsummary">

                <h2> Subtotal : ₹{subtotal} </h2>
                <h2> Delivery : ₹{deliveryCharge} </h2>
                <h1> Total : ₹{grandTotal} </h1>

                <button onClick={placeOrder}> Place Order </button>
            </div>
        </div>
    )
}

export default Checkout