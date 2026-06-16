import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Ct from '../Ct'
import '../User/User.css'


const BusinessProfile = () => {

    let {state} = useContext(Ct)

    let [edit,setEdit] = useState(false)

    let [data,setData] = useState({
      Ownername:"",
      Bname:"",
      Bemail:"",
      Baddress:"",
      Bpincode:"",
      Bcity:"",
      Bstate:"",
      Bphone:"",
      Btype:"",
      BopDate:"",
      Bimg:""
    })

    let [image,setImage] = useState(null);

    useEffect(()=>{

        if(state.email){
        
            axios.get(
                `https://technest-backend-1xqx.onrender.com/business/profile/${state.email}`
            )
            .then((res)=>{
            
                setData(res.data)
            
            })
            .catch((err)=>{
            
                console.log(err)
            
            })
        
        }
    
    },[state.email])

    let fun=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }

    let save = async()=>{

        try{

            let res = await axios.put(
                "https://technest-backend-1xqx.onrender.com/business/updateprofile",
                data
            );

            if(image){
                await uploadImage();
            }

            alert(res.data.message);

            setEdit(false);

        }
        catch(err){
            console.log(err);
        }
    }

    let uploadImage = async()=>{

        let formData = new FormData();

        formData.append("Bemail", state.email);

        formData.append("Bimg", image);

        try{

            let res = await axios.post(
                "https://technest-backend-1xqx.onrender.com/business/updateprofileimage",
                formData
            );

            alert(res.data.message);

            // Fetch latest user data
            let profileRes = await axios.get(
                `https://technest-backend-1xqx.onrender.com/business/profile/${state.email}`
            );

            setData(profileRes.data);

        }
        catch(err){
            console.log(err);
        }
    }
    



    return (

        <div className='profilepage'>

            <div className="profilecard">
                <div className="profileheader">


                    <img
                        src={data.Bimg ? `https://technest-backend-1xqx.onrender.com/uploads/${data.Bimg}`
                        :
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                        alt="profile"
                        className="profileavatar"
                        />

                    <h1>{data.Bname}</h1>
                    <p>{data.Bemail}</p>

                </div>

                <div className='profilegrid'>

                    <label>
                        Business Name
                        <input
                        type='text'
                        name='Bname'
                        value={data.Bname}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Owner Name
                        <input
                          type='text'
                          name='Ownername'
                          value={data.Ownername}
                          onChange={fun}
                          disabled={!edit}
                        />
                    </label>

                    <label>
                        Business Opening Date

                        <input
                          type='date'
                          name='BopDate'
                          value={data.BopDate}
                          onChange={fun}
                          disabled={!edit}
                        />

                    </label>

                    <label>

                        Business Type

                        <select
                          name="Btype"
                          value={data.Btype}
                          onChange={fun}
                          disabled={!edit}
                        >
                        
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="grocery">Grocery</option>
                          <option value="furniture">Furniture</option>
                          <option value="other">Other</option>

                        </select>

                    </label>

                    <label>
                        Email
                        <input
                        type='email'
                        name='Bemail'
                        value={data.Bemail}
                        disabled
                        />
                    </label>

                    <label>
                        Phone
                        <input
                        type='tel'
                        name='Bphone'
                        value={data.Bphone}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Address
                        <input
                        type='text'
                        name='Baddress'
                        value={data.Baddress}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Pincode
                        <input
                        type='text' 
                        name='Bpincode'
                        value={data.Bpincode}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        City
                        <input
                        type='text'
                        name='Bcity'
                        value={data.Bcity}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        State
                        <input
                        type='text'
                        name='Bstate'
                        value={data.Bstate}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Business Image
                        <input
                        type="file"
                        disabled={!edit}
                        onChange={(e)=>{
                                setImage(e.target.files[0])
                        }}
                        />
                    </label>

                </div>

                <div className="profileactions">

                  {!edit ? (
                    <button
                      className="profilebtn"
                      onClick={()=>setEdit(true)}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        className="profilebtn"
                        onClick={save}
                      >
                        Save Changes
                      </button>
                
                      <button
                        className="profilebtn cancelbtn"
                        onClick={()=>setEdit(false)}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                </div>
            </div>

        </div>
    )
}

export default BusinessProfile