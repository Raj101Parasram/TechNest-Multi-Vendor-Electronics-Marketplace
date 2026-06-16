import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../User/User.css'

const BchangePWD = () => {

    let navigate = useNavigate()

    let [data,setData] = useState({

        Bemail:"",
        Bphone:"",
        Botp:"",
        Bpassword:"",
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

        axios.post("https://technest-backend-1xqx.onrender.com/business/sendresetotp", {Bemail:data.Bemai}, {withCredentials: true})
        .then((res)=>{

            setMsg(res.data.message)
        })
        .catch((err)=>{

            setMsg(err.response.data.message)
        })
    }

    let changePassword=()=>{

        if(
            data.Bpassword !==
            data.confirmPassword
        ){

            setMsg(
                "Passwords do not match"
            )

            return
        }

        axios.post( "https://technest-backend-1xqx.onrender.com/business/changepassword", data, {withCredentials: true})
        .then((res)=>{

            alert(res.data.message)

            navigate("/businesslogin")
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
                    name="Bemail"
                    placeholder="Email"
                    value={data.Bemail}
                    onChange={fun}
                    readOnly={!editable}
                />

                <input
                    type="text"
                    name="Bphone"
                    placeholder="Phone"
                    value={data.Bphone}
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
                    name="Botp"
                    placeholder="OTP"
                    value={data.Botp}
                    onChange={fun}
                />

                <input
                    type="password"
                    name="Bpassword"
                    placeholder="New Password"
                    value={data.Bpassword}
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

export default BchangePWD

