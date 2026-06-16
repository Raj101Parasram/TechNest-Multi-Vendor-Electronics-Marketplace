import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './User.css'

const Userreg = () => {

  let [data, setData]= useState({"name":"", "email":"", "address":"", "pincode":"", "city":"", "state":"", "phone":"" })
  let [msg, setMsg]= useState("")
  let navigate= useNavigate()

  let fun=(e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  let reg=(req,res)=>{
      if(data.name=="" || data.email=="" || data.address=="" || data.pincode=="" || data.city=="" || data.state=="" || data.phone==""){
        setMsg("All fields are required")
        return
      }

      navigate("/useremail", {state:data})

      
  }
  return (
    <div className='userreg'>
      <h2>Hello User Welcome to Our Website Please Register for Explore Our Website</h2>
        <div className='already'>
          <h2>Already Registered?</h2>
          <p>If you are already registered, please login instead....
          <button onClick={()=>navigate('/userlogin')}>Login</button></p>
        </div>
        <div className='mainreg'>
              <h2>User Registration</h2>
            <div className='reg'>
              <div className='reg1'>
                <label htmlFor="name">Name:
                  <input type="text" placeholder='Enter name' id='name' name='name' value={data.name} onChange={fun} />
                </label>

                <label htmlFor="email">Email:
                  <input type="text" placeholder='Enter email' id='email' name='email' value={data.email} onChange={fun} />
                </label>

                <label htmlFor="phone">Phone:
                  <input type="text" placeholder='Enter phone' id='phone' name='phone' value={data.phone} onChange={fun} />
                </label>
              </div>
              <div className='reg2'>
                <label htmlFor="address">Address:
                  <input type="text" placeholder='Enter address' id='address' name='address' value={data.address} onChange={fun} />
                </label>

                <label htmlFor="pincode">Pincode:
                  <input type="text" placeholder='Enter pincode' id='pincode' name='pincode' value={data.pincode} onChange={fun} />
                </label>

                <label htmlFor="city">City:
                  <input type="text" placeholder='Enter city' id='city' name='city' value={data.city} onChange={fun} />
                </label>

                <label htmlFor="state">State:
                  <select placeholder='Enter state' id='state' name='state' value={data.state} onChange={fun}>
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </label>
              </div>
            </div>
              <div className='reg3'>

                <h3>{msg}</h3>
                <button onClick={reg}>Register</button>
              </div> 
        </div>
    </div>
  )
}


export default Userreg;