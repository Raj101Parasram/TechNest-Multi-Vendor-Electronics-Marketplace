import React,{useEffect,useState} from "react"
import axios from "axios"
import "./Admin.css"

const ManageUsers = ()=>{

    let [users,setUsers] = useState([])

    let loadUsers = ()=>{

        axios.get("http://localhost:5000/user/allusers").then((res)=>
        {
            setUsers(res.data)
        })
    }

    useEffect(()=>{
        loadUsers()
    },[])

    let deleteUser=(email)=>{

        if(!window.confirm("Delete User ?"))
        {
            return
        }

        axios.delete(`http://localhost:5000/user/deleteuser/${email}`).then((res)=>{

            alert(res.data.message)
            loadUsers()
        })
    }

    return(

        <div className="manageusers">

            <h1>Manage Users</h1>

            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        users.map((user)=>(
                            <tr key={user.email}>

                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>

                                <td>
                                    <button className="deletebtn" onClick={()=>deleteUser(user.email)} >
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

export default ManageUsers