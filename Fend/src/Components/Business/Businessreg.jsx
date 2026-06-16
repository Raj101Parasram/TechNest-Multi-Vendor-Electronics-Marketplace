import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Businessreg = () => {
  
  let [data, setData]= useState({"Ownername":"", "Bname":"", "Bemail":"", "Baddress":"", "Bpincode":"", "Bcity":"", "Bstate":"", "Bphone":"" })
  let [msg, setMsg]= useState("")
  let navigate= useNavigate()

  let fun=(e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  let reg=(req,res)=>{
      if(data.Ownername=="" || data.Bname=="" || data.Bemail=="" || data.Baddress=="" || data.Bpincode=="" || data.Bcity=="" || data.Bstate=="" ||  data.Bphone==""){
        setMsg("All fields are required")
        return
      }
      navigate("/businessemail", {state:data})
      
  }
  return (
    <div className='userreg'>
      <h2>Hello Business Man Welcome to Our Website Please Register for Explore Our Services</h2>
        <div className='already'>
          <h2>Already Registered?</h2>
          <p>If you are already registered as a business, please login instead....
          <button onClick={()=>navigate('/businesslogin')}>Login</button></p>
        </div>
        <div className='mainreg'>
              <h2>Business Registration</h2>
            <div className='reg'>
              <div className='reg1'>
                <label htmlFor="Ownername"> Owner Name:
                  <input type="text" placeholder='Enter name' id='Ownername' name='Ownername' value={data.Ownername} onChange={fun} />
                </label>

                <label htmlFor="Bname">Business Name:
                  <input type="text" placeholder='Enter Business Name' id='Bname' name='Bname' value={data.Bname} onChange={fun} />
                </label>
                <label htmlFor="Bemail">Email:
                  <input type="text" placeholder='Enter email' id='Bemail' name='Bemail' value={data.Bemail} onChange={fun} />
                </label>

                <label htmlFor="Bphone">Phone:
                  <input type="text" placeholder='Enter phone' id='Bphone' name='Bphone' value={data.Bphone} onChange={fun} />
                </label>
              </div>
              <div className='reg2'>
                <label htmlFor="Baddress">Address:
                  <input type="text" placeholder='Enter address' id='Baddress' name='Baddress' value={data.Baddress} onChange={fun} />
                </label>

                <label htmlFor="Bpincode">Pincode:
                  <input type="text" placeholder='Enter pincode' id='Bpincode' name='Bpincode' value={data.Bpincode} onChange={fun} />
                </label>

                <label htmlFor="Bcity">City:
                  <input type="text" placeholder='Enter city' id='Bcity' name='Bcity' value={data.Bcity} onChange={fun} />
                </label>

                <label htmlFor="Bstate">State:
                  <select placeholder='Enter state' id='Bstate' name='Bstate' value={data.Bstate} onChange={fun}>
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


export default Businessreg;