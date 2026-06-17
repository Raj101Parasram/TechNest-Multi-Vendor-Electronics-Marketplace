import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import Ct from '../Ct'
import './User.css'

const Order = ()=>{

    let { state } = useContext(Ct)
    let [orders,setOrders] = useState([])

    useEffect(()=>{

        if(state.email)
        {
          axios.get(`https://technest-backend-1xqx.onrender.com/order/user/${state.email}`).then((res)=>{

            setOrders(res.data)

          }).catch((err)=>{

                console.log(err)
            })
        }
    },[state.email])

    let cancelOrder = (orderId)=>
    {

        axios.put(`https://technest-backend-1xqx.onrender.com/order/cancel/${orderId}`).then((res)=>{

            alert(res.data.message)
            setOrders(orders.map((item)=> item.orderId === orderId ? {...item,status:"Cancelled"} : item))

        }).catch((err)=>
        {
            console.log(err)
        })
    }

    return(

        <div className="orderpage">
            <h1>My Orders</h1>

            {
                orders.length === 0 ?

                <h2>No Orders Found</h2> : orders.map((item)=>

                    <div className="ordercard" key={item.orderId} >

                        <img src={item.productImage} alt="" />

                        <div className="orderdetails">

                            <h2>{item.productName}</h2>
                            <p>Quantity :{item.quantity}</p>
                            <p>Price :₹{item.price}</p>
                            <p>Total :₹{item.totalPrice}</p>
                            <p>Status :{item.status}</p>
                            <p> Ordered : {new Date(item.orderDate).toLocaleDateString()} </p>
                            
                            <p>Status : {item.status}</p>
                            {
                                item.status === "Pending" &&
                            
                                <button className="cancelorderbtn" onClick={()=>cancelOrder(item.orderId)}> Cancel Order </button>
                            }

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Order