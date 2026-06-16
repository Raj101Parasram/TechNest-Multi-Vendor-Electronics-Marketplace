import React from 'react'
import { useState, useContext } from 'react'
import Ct from '../Ct'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Businesslogin = () => {

  let [msg, setmsg]= useState("")
  let [data, setdata]= useState({Bemail:"", Bpassword:""})
  let {update}= useContext(Ct)
  let navigate= useNavigate()

  let fun=(e)=>{
    setdata({...data, [e.target.name]: e.target.value})
  }

  let log=(req,res)=>{
    if(data.Bemail=="" && data.Bpassword==""){
      setmsg("All fields are required")
    }
    else
    {
      axios.post("https://technest-backend-1xqx.onrender.com/business/blogin", data).then((res)=>{
        setmsg(res.data.message)
        if(res.data.message=="Business logged in successfully"){
          update({token: res.data.token, role: res.data.role, name: res.data.name, email: res.data.email})
          navigate('/')
        }
        else
        {
          update({token: "", role: "", name: "", email: ""})
        }

      }).catch((err)=>{
          setmsg(err.response.data.message)
      })
    }
  }



  return (
    <div className='userlogin'>
      <h2>Hello Business Man Welcome to Our Website Please Login for Explore Our Services</h2>
      <div className='mainlogin'>
        <div className='login'>  
          <h2>Business Login</h2>
          <label htmlFor="Bemail">Business Email:
            <input type="text" placeholder='email' id='Bemail' name="Bemail" value={data.Bemail} onChange={fun} />
          </label>
          <label htmlFor="Bpassword">Business Password:
            <input type="text" placeholder='password' id='Bpassword' name="Bpassword" value={data.Bpassword} onChange={fun} />
          </label>
          <h3>{msg}</h3>
          <button onClick={log}>Login</button>
        </div>
        <div className='newuser'>
          <h2>New Business?</h2>
          <p>If you are a new business, please Register first then Login to access our services...</p>
          <button onClick={()=>navigate('/businessreg')}>Register</button>
        </div>
      </div>
    </div>
  )
}


export default Businesslogin;