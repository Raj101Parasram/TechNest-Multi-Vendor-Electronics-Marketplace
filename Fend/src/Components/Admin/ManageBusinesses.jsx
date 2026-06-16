import React,{useEffect,useState} from "react"
import axios from "axios"
import "./Admin.css"

const ManageBusinesses = ()=>{

    let [businesses,setBusinesses] = useState([])

    let loadBusinesses = ()=>{

        axios.get(
            "https://technest-backend-1xqx.onrender.com/business/allbusinesses"
        )
        .then((res)=>{

            setBusinesses(res.data)

        })
        .catch((err)=>{

            console.log(err)

        })
    }

    useEffect(()=>{

        loadBusinesses()

    },[])

    let deleteBusiness=(email)=>{

        if(
            !window.confirm(
                "Delete Business ?"
            )
        ){
            return
        }

        axios.delete(
            `https://technest-backend-1xqx.onrender.com/business/deletebusiness/${email}`
        )
        .then((res)=>{

            alert(res.data.message)

            loadBusinesses()

        })
        .catch((err)=>{

            console.log(err)

        })
    }

    return(

        <div className="manageusers">

            <h1>Manage Businesses</h1>

            <table>

                <thead>

                    <tr>

                        <th>Business Name</th>
                        <th>Owner</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        businesses.map((item)=>(
                            
                            <tr key={item.Bemail}>

                                <td>{item.Bname}</td>

                                <td>{item.Ownername}</td>

                                <td>{item.Bemail}</td>

                                <td>{item.Bphone}</td>

                                <td>{item.Bcity}</td>

                                <td>

                                    <button
                                        className="deletebtn"
                                        onClick={()=>
                                            deleteBusiness(
                                                item.Bemail
                                            )
                                        }
                                    >
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

export default ManageBusinesses