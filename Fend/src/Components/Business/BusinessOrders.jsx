import React,{useEffect,useState,useContext} from "react"
import axios from "axios"
import Ct from "../Ct"
import "./Business.css"

const BusinessOrders = ()=>{

    let {state} = useContext(Ct)
    let [orders,setOrders] = useState([])

    let loadOrders = ()=>{

        axios.get(
            `https://technest-backend-1xqx.onrender.com/order/business/${state.email}`
        )
        .then((res)=>{

            setOrders(res.data)

        })
    }

    useEffect(()=>{

        if(state.email){
            loadOrders()
        }
    },[state.email])

    let updateStatus = (orderId,status)=>{

    axios.put(`https://technest-backend-1xqx.onrender.com/order/status/${orderId}`, {status}).then((res)=>
    {
        alert(res.data.message)
        loadOrders()
    })
}

    return(

        <div className="businessorders">
            <h1>Business Orders</h1>
            {
                orders.length === 0 ? <h2>No Orders Found</h2> : orders.map((item)=>(

                    <div className="ordercard" key={item.orderId}>

                        <img src={item.productImage} alt="" />

                        <div className="orderinfo">

                            <h2>{item.productName}</h2>

                            <p>
                            <strong>Customer:</strong> {item.userEmail}
                            </p>

                            <p>
                            <strong>Quantity:</strong> {item.quantity}
                            </p>

                            <p>
                            <strong>Price:</strong> ₹{item.totalPrice}
                            </p>

                            <p>
                            <strong>Status:</strong> {item.status}
                            </p>

                            <select value={item.status} onChange={(e)=>{updateStatus(item.orderId, e.target.value)}}>

                                <option value="Pending"> Pending </option>
                                <option value="Confirmed"> Confirmed </option>
                                <option value="Packed"> Packed </option>
                                <option value="Shipped"> Shipped </option>
                                <option value="Delivered"> Delivered </option>
                                <option value="Cancelled"> Cancelled </option>

                            </select>

                            <p>
                            <strong>Date:</strong>
                                {" "}
                                {new Date(item.orderDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BusinessOrders