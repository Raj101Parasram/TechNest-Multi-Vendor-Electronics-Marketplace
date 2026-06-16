import React, { useEffect, useState } from "react"
import axios from "axios"
import "./Admin.css"

const AdminDashboard = () => {

    let [data, setData] = useState({})

    useEffect(() => {

        axios.get(
            "https://technest-backend-1xqx.onrender.com/business/admindashboard"
        )
        .then((res) => {

            setData(res.data)

        })
        .catch((err) => {

            console.log(err)

        })

    }, [])

    return (

        <div className="admindashboard">

            <h1>Admin Dashboard</h1>

            {/* Analytics Cards */}

            <div className="adminstats">

                <div className="statcard">
                    <h2>Total Users</h2>
                    <h3>{data.totalUsers || 0}</h3>
                </div>

                <div className="statcard">
                    <h2>Total Businesses</h2>
                    <h3>{data.totalBusinesses || 0}</h3>
                </div>

                <div className="statcard">
                    <h2>Total Products</h2>
                    <h3>{data.totalProducts || 0}</h3>
                </div>

                <div className="statcard">
                    <h2>Total Orders</h2>
                    <h3>{data.totalOrders || 0}</h3>
                </div>

                <div className="statcard">
                    <h2>Revenue</h2>
                    <h3>₹{data.totalRevenue || 0}</h3>
                </div>

                <div className="statcard">
                    <h2>Pending Orders</h2>
                    <h3>{data.pendingOrders || 0}</h3>
                </div>

                <div className="statcard">
                    <h2>Cancelled Orders</h2>
                    <h3>{data.cancelledOrders || 0}</h3>
                </div>

            </div>

            {/* Management Cards */}

            <div className="admincards">

                <div
                    className="admincard"
                    onClick={() => {
                        window.location.href = "/manageusers"
                    }}
                >
                    <h2>Manage Users</h2>
                </div>

                <div
                    className="admincard"
                    onClick={() => {
                        window.location.href = "/managebusinesses"
                    }}
                >
                    <h2>Manage Businesses</h2>
                </div>

                <div
                    className="admincard"
                    onClick={() => {
                        window.location.href = "/manageproducts"
                    }}
                >
                    <h2>Manage Products</h2>
                </div>

                <div
                    className="admincard"
                    onClick={() => {
                        window.location.href = "/manageorders"
                    }}
                >
                    <h2>Manage Orders</h2>
                </div>

            </div>

        </div>
    )
}

export default AdminDashboard