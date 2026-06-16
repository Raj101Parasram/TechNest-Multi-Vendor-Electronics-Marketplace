import React, { useContext, useState } from 'react'
import Ct from '../Ct'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import './Other.css'

const Nav = () => {

  let obj = useContext(Ct)
  let [menu, setMenu] = useState(false)

  let navigate = useNavigate()
  let [search,setSearch] = useState("")
  let [city,setCity] = useState("")
  let [pincode,setPincode] = useState("")

  let searchProducts = ()=>{
  
    navigate(`/?search=${search}&city=${city}&pincode=${pincode}`)
  
  }


  return (

    <div className='mainnav'>

      {/* LEFT */}

      <div className='navleft'>
        <Link to='/'>Home</Link>
      </div>


      {/* CENTER */}  {/* SEARCH */}

      <div className='navcenter'>

        <div className='search'>

          <input type="text" placeholder='Product / Shop Name' value={search} onChange={(e)=>{ setSearch(e.target.value) }}/>

          <select value={city} onChange={(e)=>{ setCity(e.target.value) }}>

            <option value="">All Cities</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>

          </select>

          <input type="text" placeholder='Pincode' value={pincode} onChange={(e)=>{ setPincode(e.target.value) }}/>
    
          <button onClick={searchProducts}>Search</button>

        </div>


        {/* BEFORE LOGIN */}

        {obj.state.token === "" && (
          <div className='middlelinks'>
            <Link to='/userlogin'>User Login</Link>
            <Link to='/businesslogin'>Business Login</Link>
          </div>
        )}


        {/* USER LOGIN */}

        {obj.state.role === "user" && (
          <div className='middlelinks'>
            <Link to='/like'>Like</Link>
            <Link to='/cart'>Cart</Link>
          </div>
        )}


        {/* BUSINESS LOGIN */}

        {obj.state.role === "business" && (
          <div className='middlelinks'>
            <Link to='/addproduct'>Add Product</Link>
            <Link to='/businessproducts'>Your Products</Link>
            <Link to='/businessorders' onClick={() => setMenu(false)}> Orders </Link>
          </div>
        )}

        {/* ADMIN LOGIN */}

        {obj.state.role === "admin" && (
          <div className='middlelinks'>
            <Link to='/admindashboard'>Dashboard</Link>
          </div>
        )}

      </div>


      {/* RIGHT SIDE */}

      <div className='rightmenu'>

        <button
          className='menuicon'
          onClick={() => setMenu(!menu)}
        >
          ☰
        </button>


        {menu && (

          <div className='dropdownmenu'>

            {/* BEFORE LOGIN */}

            {obj.state.token === "" ? (
              <>

                <div className='middlelinkss'>
                  <Link to='/userlogin' onClick={() => setMenu(false)}>User Login</Link>
                  <Link to='/businesslogin' onClick={() => setMenu(false)}>Business Login</Link>
                </div>

                <Link to='/userreg' onClick={() => setMenu(false)}>User Register</Link>

                <Link to='/businessreg' onClick={() => setMenu(false)}>Business Register</Link>

                <a href="#aboutas" onClick={() => setMenu(false)}>About Us</a>

                <Link to='/help' onClick={() => setMenu(false)}>Help</Link>

              </>
            ) : (
              <>

                {/* USER MENU */}

                {obj.state.role === "user" && (
                  <>
                    <Link to='/userprofile' onClick={() => setMenu(false)}>Profile</Link>
                    <div className='middlelinkss'>
                      <Link to='/like' onClick={() => setMenu(false)}>Like</Link>
                      <Link to='/cart' onClick={() => setMenu(false)}>Cart</Link>
                    </div>
                    <Link to='/order' onClick={() => setMenu(false)}>Orders</Link>
                    <Link to='/changepwd' onClick={() => setMenu(false)}>Change Password</Link>
                  </>
                )}


                {/* BUSINESS MENU */}

                {obj.state.role === "business" && (
                  <>
                    <Link to='/businessprofile' onClick={() => setMenu(false)}>Profile</Link>
                    <Link to='/businessdashboard' onClick={() => setMenu(false)}> Business Dashboard</Link>
                    <div className='middlelinkss'>
                      <Link to='/addproduct' onClick={() => setMenu(false)}>Add Product</Link>
                  
                      <Link to='/businessproducts' onClick={() => setMenu(false)}>Your Products</Link>

                      <Link to='/businessorders' onClick={() => setMenu(false)}> Orders </Link>
                    </div>
                    <Link to='/bchangepwd' onClick={() => setMenu(false)}>Change Password</Link>
                  </>
                )}

                {/* ADMIN MENU */}

                {obj.state.role === "admin" && (
                  <div className='middlelinkss'>
                    <Link to='/admindashboard'>Dashboard</Link>
                  </div>
                )}

                <a href="#aboutas" onClick={() => setMenu(false)}>About Us</a>

                <Link to='/help' onClick={() => setMenu(false)}>Help</Link>

                <Link to='/logout' onClick={() => setMenu(false)}>Logout</Link>

              </>
            )}

          </div>

        )}

      </div>

    </div>

  )
}

export default Nav