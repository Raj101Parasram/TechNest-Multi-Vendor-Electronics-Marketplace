import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import './User.css'

const UserEmail = () => {

  let location = useLocation()
  let navigate = useNavigate()

  // Data coming from UserReg page
  let [data,setData] = useState(location.state)

  let [otp,setOtp] = useState("")
  let [password,setPassword] = useState("")
  let [confirmPassword,setConfirmPassword] = useState("")
  let [msg,setMsg] = useState("")
  let [editable,setEditable] = useState(false)

  let sendOtp = ()=>{

    axios.post(
      "http://localhost:5000/user/sendotp",
      {
        email:data.email
      }
    )
    .then((res)=>{
      setMsg(res.data.message)
    })
    .catch((err)=>{
      setMsg("Error sending OTP")
    })
  }

  let verify = ()=>{

    if(password !== confirmPassword){
      setMsg("Passwords do not match")
      return
    }

    axios.post(
      "http://localhost:5000/user/verifyotp",
      {
        ...data,
        otp,
        password
      }
    )
    .then((res)=>{

      alert(res.data.message)

      if(res.data.message === "Account Created Successfully"){
        navigate("/userlogin")
      }

    })
    .catch((err)=>{
      setMsg(err.response?.data?.message)
    })
  }

  return (
    <div className='useremail'>

      <div className='emailbox'>

        <h2>Email Verification</h2>

        <label>
          Email

          <input
            type="email"
            value={data.email}
            readOnly={!editable}
            onChange={(e)=>{
              setData({
                ...data,
                email:e.target.value
              })
            }}
          />

        </label>

        <button
          onClick={()=>{
            setEditable(!editable)
          }}
        >
          {editable ? "Save Email" : "Edit Email"}
        </button>

        <button onClick={sendOtp}>
          Send OTP
        </button>

        <input
          type="text"
          placeholder='Enter OTP'
          value={otp}
          onChange={(e)=>{
            setOtp(e.target.value)
          }}
        />

        <input
          type="password"
          placeholder='Create Password'
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />

        <input
          type="password"
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e)=>{
            setConfirmPassword(e.target.value)
          }}
        />

        <h3>{msg}</h3>

        <button onClick={verify}>
          Verify & Create Account
        </button>

      </div>

    </div>
  )
}

export default UserEmail