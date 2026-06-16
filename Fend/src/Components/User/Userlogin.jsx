import React from 'react'
import { useState, useContext } from 'react'
import Ct from '../Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './User.css'

export const Userlogin = () => {

  let [msg, setmsg]= useState("")
  let [data, setdata]= useState({email:"", password:""})
  let {update}= useContext(Ct)
  let navigate= useNavigate()

  let fun=(e)=>{
    setdata({...data, [e.target.name]: e.target.value})
  }

  let log=(req,res)=>{
    if(data.email=="" && data.password==""){
      setmsg("All fields are required")
    }
    else
    {
      axios.post("http://localhost:5000/user/userlogin", data).then((res)=>{
        setmsg(res.data.message)
        if(res.data.message=="User logged in successfully"){
          update({token: "loggedin", role: "user", name: res.data.name, email: res.data.email})
          navigate('/')
        }
        else
        {
          update({token: "", role: "", name: ""})
        }

      }).catch((err)=>{
          setmsg(err.response.data.message)
      })
    }
  }



  return (
    <div className='userlogin'>
      <h2>Hello User Welcome to Our Website Please Login for Explore Our Website</h2>
      <div className='mainlogin'>
        <div className='login'>  
          <h2>User Login</h2>
          <label htmlFor="email">Email:
            <input type="text" placeholder='email' id='email' name="email" value={data.email} onChange={fun} />
          </label>
          <label htmlFor="password">Password:
            <input type="password" placeholder='password' id='password' name="password" value={data.password} onChange={fun} />
          </label>
          <h3>{msg}</h3>
          <button onClick={log}>Login</button>
          <p> 
            <span className="forgotpwd" onClick={()=>{ navigate("/changepwd")}}>Forgot Password?</span>
          </p>
        </div>
        <div className='newuser'>
          <h2>New User?</h2>
          <p>If you are a new user, please Register first then Login to access our services...</p>
          <button onClick={()=>navigate('/userreg')}>Register</button>
        </div>
      </div>
    </div>
  )
}


export default Userlogin;