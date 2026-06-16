import React,{useEffect,useState} from "react"
import axios from "axios"
import "./Admin.css"

const ManageOrders = ()=>{

    let [orders,setOrders] = useState([])

    let loadOrders = ()=>{

        axios.get("http://localhost:5000/order/allorders").then((res)=>
        {
            setOrders(res.data)
        })
    }

    useEffect(()=>{

        loadOrders()

    },[])

    let deleteOrder=(orderId)=>{

        if(!window.confirm("Delete Order ?"))
        {
            return
        }

        axios.delete(`http://localhost:5000/order/admindelete/${orderId}`).then((res)=>{

            alert(res.data.message)
            loadOrders()
        })
    }

    return(

        <div className="manageorders">

            <h1>Manage Orders</h1>

            <table>
                <thead>

                    <tr>

                        <th>Order ID</th>
                        <th>User</th>
                        <th>Business</th>
                        <th>Product</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((item)=>(
                            
                            <tr key={item.orderId}>

                                <td>{item.orderId}</td>
                                <td>{item.userEmail}</td>
                                <td>{item.businessEmail}</td>
                                <td>{item.productName}</td>
                                <td>₹{item.totalPrice}</td>
                                <td>{item.status}</td>

                                <td>

                                    <button className="deletebtn" onClick={()=> deleteOrder(item.orderId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ManageOrders