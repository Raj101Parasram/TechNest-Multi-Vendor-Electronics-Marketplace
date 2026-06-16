import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './User.css'

const ChangePassword = () => {

    let navigate = useNavigate()

    let [data,setData] = useState({

        email:"",
        phone:"",
        otp:"",
        password:"",
        confirmPassword:""

    })

    let [editable,setEditable] = useState(false)

    let [msg,setMsg] = useState("")

    let fun=(e)=>{

        setData({

            ...data,

            [e.target.name]:e.target.value

        })

    }

    let sendOtp=()=>{

        axios.post(

            "https://technest-backend-1xqx.onrender.com/user/sendresetotp",

            {

                email:data.email

            }

        )
        .then((res)=>{

            setMsg(res.data.message)

        })
        .catch((err)=>{

            setMsg(
                err.response.data.message
            )

        })

    }

    let changePassword=()=>{

        if(
            data.password !==
            data.confirmPassword
        ){

            setMsg(
                "Passwords do not match"
            )

            return
        }

        axios.post(

            "https://technest-backend-1xqx.onrender.com/user/changepassword",

            data

        )
        .then((res)=>{

            alert(
                res.data.message
            )

            navigate("/userlogin")

        })
        .catch((err)=>{

            setMsg(
                err.response.data.message
            )

        })

    }

    return (

        <div className="changepasswordpage">

            <div className="changecard">

                <h1>Change Password</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={fun}
                    readOnly={!editable}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={data.phone}
                    onChange={fun}
                    readOnly={!editable}
                />

                <div className="changebtns">

                    <button
                        className="changebtn editbtn"
                        onClick={()=>{
                            setEditable(!editable)
                        }}
                    >
                        {editable ? "Save" : "Edit"}
                    </button>
                    
                    <button
                        className="changebtn sendotpbtn"
                        onClick={sendOtp}
                    >
                        Send OTP
                    </button>
                    
                </div>

                <input
                    type="text"
                    name="otp"
                    placeholder="OTP"
                    value={data.otp}
                    onChange={fun}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={data.password}
                    onChange={fun}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={fun}
                />

                <h3>{msg}</h3>

                <button className="changebtn verifybtn" onClick={changePassword}>Change Password</button>

            </div>

        </div>

    )

}

export default ChangePassword

