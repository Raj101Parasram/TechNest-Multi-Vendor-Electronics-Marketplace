import React,{useEffect,useState, useContext} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import './Other.css'
import Ct from '../Ct'

export const Home = () => {
  
  let navigate = useNavigate()
  let location = useLocation()
  let { state } = useContext(Ct)
  let [shops,setShops] = useState([])
  let [likedProducts,setLikedProducts] = useState([])

  useEffect(()=>{

      let params = new URLSearchParams(location.search)
      let search = params.get("search") || ""
      let city = params.get("city") || ""
      let pincode = params.get("pincode") || ""

      axios.get(`http://localhost:5000/product/homeshops?search=${search}&city=${city}&pincode=${pincode}`).then((res)=>
      {
          setShops(res.data)
      })

      if(state.role === "user")
      {
          axios.get(`http://localhost:5000/wishlist/${state.email}`).then((res)=>
          {
            console.log("WISHLIST =",res.data)
            let ids = res.data.map(item => item.productId)  
            setLikedProducts(ids)
          })
      }
  },[location.search,state.role,state.email])


  let toggleWishlist=(productId)=>{

      if(state.role !== "user")
      {
          navigate("/userlogin")
          return
      }

      axios.post("http://localhost:5000/wishlist/toggle",{userEmail:state.email, productId}).then((res)=>{

          if(res.data.liked)
          {
            setLikedProducts(prev=>[...prev, productId])
          }
          else
          {
            setLikedProducts(prev=> prev.filter(id=>id!==productId))
          }
      })
  }


  let addToCart=(productId)=>{

      if(state.role !== "user")
      {
          navigate("/userlogin")
          return
      }

      axios.post("http://localhost:5000/cart/add", {userEmail:state.email,productId}).then((res)=>
      {
          alert(res.data.message)
      })
  }

  return (

  <div className="homeproducts">

    {
      
      shops.map((shop)=>(

        <div className="shopcard" key={shop.businessEmail}>
          <h1> {shop.businessName} </h1>
            <div className="shopproducts">
              {
                shop.products.map((item)=>(
                
                  <div className="homeproductcard" key={item.productId}>

                    {state.role === "user" && (
                      <span className="likedicon" onClick={()=>toggleWishlist(item.productId)}>    
                        { likedProducts.includes(item.productId)? "❤️" : "♡"}
                      </span>
                    )}
                  
                      <img src={`http://localhost:5000/uploads/${item.productImage}`} alt="" />
                      <h3> {item.productName} </h3>
                      <p> ₹{item.price} </p>


                    {state.role === "user" && (
                      <button onClick={()=>addToCart(item.productId)}> Add To Cart </button>
                    )}
                  
                  </div>
                ))
              }
            </div>
            
              <button onClick={()=>{navigate(`/shopproducts/${shop.businessEmail}`)}}> View Shop </button>
        </div> 
      ))
    }
  </div>
  )
}


export default Home;