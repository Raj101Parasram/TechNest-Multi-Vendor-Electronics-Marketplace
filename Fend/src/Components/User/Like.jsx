import React, { useContext, useEffect, useState}
from "react"
import axios from "axios"
import Ct from "../Ct"
import { useNavigate } from "react-router-dom"


const Like = ()=>{
    
    let { state } = useContext(Ct)
    let [products,setProducts] = useState([])
    let navigate = useNavigate()

    useEffect(()=>{

    if(!state.email) return;

    axios.get(
        `https://technest-backend-1xqx.onrender.com/wishlist/${state.email}`
    )
    .then((res)=>{
        setProducts(res.data);
    })
    .catch((err)=>{
        console.log(err);
    });

},[state.email]);


    let removeItem=(id)=>{

        axios.delete("https://technest-backend-1xqx.onrender.com/wishlist/remove",{data:{ userEmail:state.email, productId:id}}).then(()=>{

            setProducts(products.filter(p=>p.productId!==id))
        })
    }

    return(
      <div className="wishlistpage">
          <h1> My Wishlist </h1>
          <div className="wishlistgrid">
          {
              products.map((item)=>(
                  <div className="wishlistcard" key={item.productId}>

                        <img src={item.productImage}/>

                        <h2>{item.productName}</h2>
                        <h3>{item.company}</h3>
                        <h4>{item.productType}</h4>
                        <p>₹{item.price}</p>
                        <p>{item.discount}% Off</p>
                        <h2> ₹ {item.price - (item.price*item.discount/100)} </h2>
                        
                        <button onClick={()=>{navigate(`/productinfo/${item.productId}`)}}> Know More </button>
                        
                        <button onClick={()=>{removeItem(item.productId)}}> Remove </button>

                  </div>
              ))
          }
          </div>
      </div>
    )
}

export default Like