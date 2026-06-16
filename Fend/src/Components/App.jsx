import React from 'react'
import { useState } from 'react';
import Ct from './Ct';
import { Routes, Route } from 'react-router-dom';
import axios from "axios"
import { useEffect } from "react"
import './App.css'

import Businesslogin from './Business/Businesslogin';
import Businessreg from './Business/Businessreg';
import AddProduct from './Business/AddProduct';
import BusinessProducts from './Business/BusinessProducts';
import BusinessProfile from './Business/BusinessProfile';
import BusinessEmail from './Business/BusinessEmail';
import BchangePWD from './Business/BchangePWD';
import EditProduct from './Business/EditProduct';
import BusinessOrders from './Business/BusinessOrders';
import BusinessDashboard from './Business/BusinessDashboard';

import Nav from './Other/Nav';
import Home from './Other/Home';
import AboutAS from './Other/AboutAS';
import Help from './Other/Help';
import Logout from './Other/Logout';
import ShopProducts  from './Other/ShopProducts';
import ProductInfo from './Other/ProductInfo';

import Cart from './User/Cart';
import Userreg from './User/Userreg';
import Userlogin from './User/Userlogin';
import Like from './User/Like';
import Order from './User/Order';
import UserEmail from './User/UserEmail';
import UserProfile from './User/UserProfile';
import ChangePassword from './User/ChangePassword';
import Checkout from './User/Checkout';

import AdminDashboard from './Admin/AdminDashboard';
import ManageUsers from './Admin/ManageUsers';
import ManageBusinesses from './Admin/ManageBusinesses';
import ManageProducts from './Admin/ManageProducts';
import ManageOrders from './Admin/ManageOrders';


export const App = () => {

  let [state, setState]= useState({"token":"", "role":"", "name":"", "email":""});
  let update= (data)=>{
    setState((prev)=>({...prev, ...data}))
  }


  useEffect(()=>{
    
      axios.get(
          "https://technest-backend-1xqx.onrender.com/auth/checklogin",
          {
            withCredentials:true
          }
      )
      .then((res)=>{

        console.log("CHECK LOGIN =", res.data)
      
          if(res.data.loggedIn)
          {
            update({
                token:"loggedin",
                email:res.data.email,
                role:res.data.role,
                name:res.data.name
            })
            console.log("Login Restored =", res.data)
          }
        
      })
    
  },[])


  return (
    <Ct.Provider value={{state, update}}>
      <Nav/>
      <Routes>

          {/* Other Folder */}
      
          <Route path='/' element={<Home/>}/>
          <Route path='/help' element={<Help/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/shopproducts/:businessEmail' element={<ShopProducts/>}/>
          <Route path='/productinfo/:productId' element={<ProductInfo/>}/>
          
          {/* User Folder */}

          <Route path='/userlogin' element={<Userlogin/>}/>
          <Route path='/userreg' element={<Userreg/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/like' element={<Like/>}/>
          <Route path='/order' element={<Order/>}/>
          <Route path='/useremail' element={<UserEmail/>}/>
          <Route path='/changepwd' element={<ChangePassword/>}/>
          <Route path='/userprofile' element={<UserProfile/>}/>
          <Route path='/checkout' element={<Checkout/>}/>

          {/* Business Folder */}

          <Route path='/businesslogin' element={<Businesslogin/>}/>
          <Route path='/businessreg' element={<Businessreg/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/bchangepwd' element={<BchangePWD/>}/>
          <Route path='/businessproducts' element={<BusinessProducts/>}/>
          <Route path='/businessprofile' element={<BusinessProfile/>}/>
          <Route path='/businessemail' element={<BusinessEmail/>}/>
          <Route path='/editproduct/:productId' element={<EditProduct/>}/>
          <Route path='/businessorders' element={<BusinessOrders/>}/>
          <Route path='/businessdashboard' element={<BusinessDashboard/>}/>
          
          {/* Admin Folder */}

          <Route path='/admindashboard' element={<AdminDashboard/>}/>
          <Route path='/manageusers' element={<ManageUsers/>}/>
          <Route path='/managebusinesses' element={<ManageBusinesses/>}/>
          <Route path='/manageproducts' element={<ManageProducts/>}/>
          <Route path='/manageorders' element={<ManageOrders/>}/>

      </Routes>
      <AboutAS/>
    </Ct.Provider>
  )
}

export default App;