import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from "react"
import Ct from "../Ct"
import './Other.css'

const ShopProducts = ()=>{

    let { businessEmail } = useParams()
    let [products,setProducts] = useState([])
    let navigate = useNavigate()

    let [company,setCompany] = useState("")
    let [productType,setProductType] = useState("")
    let [category,setCategory] = useState("")
    let [minPrice,setMinPrice] = useState(0)
    let [maxPrice,setMaxPrice] = useState(100000)
    let [sort,setSort] = useState("")
    let [shop,setShop] = useState({})
    let { state } = useContext(Ct)
    let [likedProducts,setLikedProducts] = useState([])

    let applyFilter = ()=>{

    axios.post("http://localhost:5000/product/filtershopproducts",
    {        
      businessEmail,
      company,
      productType,
      category,
      minPrice,
      maxPrice,
      sort
    }).then((res)=>{

        setProducts(res.data)
    })
}

    useEffect(()=>{axios.get(`http://localhost:5000/product/shopproducts/${businessEmail}`).then((res)=>{

            setProducts(res.data)
        })

        axios.get(`http://localhost:5000/business/shopinfo/${businessEmail}`).then((res)=>{

          setShop(res.data)

          if(state.role === "user")
          {
              axios.get(`http://localhost:5000/wishlist/${state.email}`).then((res)=>{
                  
                let ids = res.data.map(item => item.productId)
                setLikedProducts(ids)
              })
          }
        })
    },[businessEmail,state.role,state.email])


    let toggleWishlist=(productId)=>
    {

      if(state.role !== "user")
      {
        navigate("/userlogin")
        return
      }
      
      axios.post("http://localhost:5000/wishlist/toggle",{userEmail:state.email, productId}).then((res)=>{
      
          if(res.data.liked)
          {
              setLikedProducts(prev => [...prev,productId])
          }
          else
          {
              setLikedProducts(prev => prev.filter(id => id !== productId))
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


    return(

      <div className="shopproductspage">
        
        <div className="shopinfo">
          <div className="shopheader">

            <img src={shop.Bimg? `http://localhost:5000/uploads/${shop.Bimg}` : "https://via.placeholder.com/150"} alt=""/>

            <div>
              <h1>{shop.Bname}</h1>
              <p>Owner :{shop.Ownername}</p>
              <p>Email :{shop.Bemail}</p>
              <p>Phone :{shop.Bphone}  </p>
              <p> City :{shop.Bcity}  </p>
              <p>Pincode :{shop.Bpincode}  </p>
              <p>Address :{shop.Baddress}  </p>
            </div>              
          </div>        
        </div>

      <div className="shopcontent">

          <div className="filtersection">
              
              <h2>Filters</h2>
              
              <label>Company</label>
              
              <select value={company} onChange={(e)=>setCompany(e.target.value)}>
              
                  <option value="">All Companies</option>
                  <option value="HP">HP</option>
                  <option value="Dell">Dell</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="Asus">Asus</option>
                  <option value="Acer">Acer</option>
                  <option value="Samsung">Samsung</option>
                  <option value="LG">LG</option>
                  <option value="Sony">Sony</option>
                  <option value="Boat">Boat</option>
                  <option value="JBL">JBL</option>
              
              </select>
              
              
              <label>Product Type</label>
              
              <select value={productType} onChange={(e)=>setProductType(e.target.value)}>
               
                  <option value="">All Products</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="TV">TV</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Earbuds">Earbuds</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Refrigerator">Refrigerator</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Trimmer">Trimmer</option>
                  <option value="Hair Dryer">Hair Dryer</option>
              
              </select>
              
              
              <label>Category</label>
              
              <select value={category} onChange={(e)=>setCategory(e.target.value)}>
              
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Computer Accessories">Computer Accessories</option>
              
              </select>
              
              <label> Min Price ₹{minPrice} </label>
              <input type="range" min="0" max="100000" step="500" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)}/>
              
              <label> Max Price ₹{maxPrice} </label>
              <input type="range" min="0" max="100000" step="500" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)}/>
              
              
              <label>Sort By</label>
              <select value={sort} onChange={(e)=>setSort(e.target.value)}>

                  <option value="">Default</option>
                  <option value="lowtohigh">Price Low To High</option>
                  <option value="hightolow">Price High To Low</option>
                  <option value="newest">Newest First</option>

              </select>

              <button className="applybtn" onClick={applyFilter}> Apply Filter </button>

              <button className="clearbtn" onClick={()=>{ 

                setCompany("")
                setProductType("")
                setCategory("")
                setMinPrice(0) 
                setMaxPrice(100000) 
                setSort("")

                axios.get(`http://localhost:5000/product/shopproducts/${businessEmail}`).then((res)=>{

                  setProducts(res.data)
                })
              }}>

                Clear Filter
              </button>

          </div>

          <div className="shopproductssection">
          {
            products.map((item)=>(
              <div className="shopproductcard" key={item.productId} >

                {state.role === "user" && (
                  <span className="likedicon" onClick={()=> toggleWishlist(item.productId)}> 

                    { likedProducts.includes(item.productId)? "❤️" : "🤍" }

                  </span>  
                )}

                <img src={`http://localhost:5000/uploads/${item.productImage}`} alt="" />
                
                <h2>{item.productName}</h2>
                <h3>{item.company}</h3>
                <p>₹ {item.price}</p>
                <h4 style={{color:item.stock > 0 ? "green" : "red"}}> 
                  {item.stock > 0 ? `Stock : ${item.stock}` : "Out Of Stock"} 
                </h4>
                
                {state.role === "user" && (
                  <button disabled={item.stock <= 0} onClick={()=>addToCart(item.productId)}>
                    { item.stock <= 0 ? "Out Of Stock" : "Add To Cart" }
                  </button>
                )}

                {state.role === "user" && (
                  <button onClick={()=>toggleWishlist(item.productId)}> 
                    {likedProducts.includes(item.productId)? "❤️ Wishlisted" : "🤍 Wishlist"} 
                  </button>
                )}

                {state.role === "user" && (
                  <button onClick={()=>{navigate(`/productinfo/${item.productId}`)}}> 
                    Know More 
                  </button>
                )}
              </div>
            ))}

          </div>

        </div>
      </div>
    )
}

export default ShopProducts