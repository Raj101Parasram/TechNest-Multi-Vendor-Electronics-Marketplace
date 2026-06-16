import React,{useContext,useEffect,useState} from "react"
import axios from "axios"
import Ct from "../Ct"
import "./Business.css"

const BusinessDashboard = ()=>{

    let {state} = useContext(Ct)
    let [data,setData] = useState({

        totalProducts:0,
        totalOrders:0,
        pendingOrders:0,
        deliveredOrders:0,
        revenue:0
    })

    useEffect(()=>{

        if(state.email){

            axios.get(
                `https://technest-backend-1xqx.onrender.com/business/dashboard/${state.email}`
            )
            .then((res)=>{

                setData(res.data)

            })
        }
    },[state.email])

    return(

        <div className="dashboardpage">

            <h1>Business Dashboard</h1>

            <div className="dashboardgrid">

                <div className="dashboardcard">
                    <h2>Total Products</h2>
                    <h1>{data.totalProducts}</h1>
                </div>

                <div className="dashboardcard">
                    <h2>Total Orders</h2>
                    <h1>{data.totalOrders}</h1>
                </div>

                <div className="dashboardcard">
                    <h2>Pending Orders</h2>
                    <h1>{data.pendingOrders}</h1>
                </div>

                <div className="dashboardcard">
                    <h2>Delivered Orders</h2>
                    <h1>{data.deliveredOrders}</h1>
                </div>

                <div className="dashboardcard">
                    <h2>Total Revenue</h2>
                    <h1>₹{data.revenue}</h1>
                </div>
            </div>
        </div>
    )
}

export default BusinessDashboard