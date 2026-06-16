import { useEffect, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Ct from "../Ct"

const Logout = ()=>{

    let navigate = useNavigate()

    let { update } = useContext(Ct)

    useEffect(()=>{

        axios.get(
            "https://technest-backend-1xqx.onrender.com/auth/logout",
            {
                withCredentials:true
            }
        )
        .then(()=>{

            update({

                token:"",
                role:"",
                name:"",
                email:""

            })

            navigate("/")

        })

    },[])

    return <h2>Logging Out...</h2>
}

export default Logout