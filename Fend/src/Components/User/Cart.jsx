import React,{useEffect,useState,useContext} from "react"
import axios from "axios"
import Ct from "../Ct"
import { useNavigate } from "react-router-dom"
import "./User.css"

const Cart = ()=>{

    let {state} = useContext(Ct)
    let navigate = useNavigate()
    let [products,setProducts] = useState([])

    let loadCart=()=>{

        axios.get(`https://technest-backend-1xqx.onrender.com/cart/${state.email}`).then((res)=>{

            setProducts(res.data)
        })
    }

    useEffect(()=>{

        if(state.email)
        {
            loadCart()
        }
    },[state.email])

    let increaseQuantity=(item)=>{

        axios.put("https://technest-backend-1xqx.onrender.com/cart/quantity",{ userEmail:state.email, productId:item.productId, quantity:item.quantity + 1 }).then(()=>
        {
            loadCart()

        }).catch((err)=>{

            alert(err.response?.data?.message)
        })
    }

    let decreaseQuantity=(item)=>{

        if(item.quantity === 1)
        {
            return
        }

        axios.put("https://technest-backend-1xqx.onrender.com/cart/quantity",{userEmail:state.email, productId:item.productId, quantity:item.quantity - 1}).then(()=>
        {
            loadCart()
        })
    }

    let removeProduct=(productId)=>{

        axios.delete("https://technest-backend-1xqx.onrender.com/cart/remove",
        {
            data:{ userEmail:state.email, productId }
        }).then(()=>
        {
            loadCart()
        })
    }



    let subtotal = products.reduce(

        (total,item)=>
        {
            let finalPrice = item.price - (item.price * item.discount / 100)
            return total + (finalPrice * item.quantity)

        },0
    )


    let deliveryCharge = subtotal > 1000 || subtotal == 0 ? 0 : 100

    let grandTotal = subtotal + deliveryCharge


    return(

        <div className="cartpage">
            <h1>My Cart</h1>
            {
                products.map((item)=>(
                  
                    <div className="cartcard" key={item.productId} >

                        <img src={item.productImage} alt="" />

                        <div className="cartdetails">

                            <h2>{item.productName}</h2>
                            <h3>{item.company}</h3>
                            <p>
                                ₹ {item.price - (item.price * item.discount / 100 )}
                            </p>
                            <p>
                                Stock : {item.stock}
                            </p>
                        </div>

                        <div className="quantitybox">

                            <button onClick={()=> decreaseQuantity(item)} > - </button>
                            <span> {item.quantity} </span>
                            <button disabled={item.quantity >= item.stock} onClick={()=> increaseQuantity(item)} > + </button>
                        </div>

                        <button className="removebtn" onClick={()=> removeProduct(item.productId)} > Remove </button>

                    </div>
                ))
            }

            <div className="cartsummary">

                <h2> Subtotal : ₹{subtotal} </h2>
                <h2> Delivery : ₹{deliveryCharge} </h2>
                <h1> Total : ₹{grandTotal} </h1>

                {state.role === "user" && (
                  <button className="buybtn" onClick={()=> navigate("/checkout")} >
                      Proceed To Buy
                  </button>
                )}

            </div>
        </div>
    )
}

export default Cart