import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import Ct from '../Ct'
import './Business.css'
import { useNavigate } from 'react-router-dom'

const BusinessProducts = ()=>{

    let {state} = useContext(Ct)
    let navigate= useNavigate()
    let [products,setProducts] = useState([])

    let getProducts = ()=>{

        axios.get(`https://technest-backend-1xqx.onrender.com/product/businessproducts/${state.email}`).then((res)=>{

          setProducts(res.data)

        })
    }


    useEffect(()=>{
        if(state.email){
            getProducts()
        }
    },[state.email])


    let del=(productId)=>{

        axios.delete(`https://technest-backend-1xqx.onrender.com/product/deleteproduct/${productId}`).then((res)=>{

            alert(res.data.message)
            getProducts()
        })
    }

    return(
        <div className="businessproducts">
            <h1>Your Products</h1>

            <div className="productgrid">
                {
                  products.map((item)=>{return(
                          <div className="productcard" key={item.productId} >

                             <img src={`https://technest-backend-1xqx.onrender.com/uploads/${item.productImage}`}alt=""/>

                              <h2> {item.productName} </h2>

                              <p> {item.category} </p>

                              <p> ₹{item.price} </p>

                              <p> Stock : {item.stock} </p>

                              <div className="productactions">
                                  
                                  <button onClick={()=>{ navigate(`/editproduct/${item.productId}`) }}> Edit </button>

                                  <button onClick={()=>{ del(item.productId) }}> Delete </button>
                              </div>
                            </div>
                    )})
                }
            </div>
        </div>
    )
}

export default BusinessProducts