import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Ct from '../Ct'
import './User.css'

const UserProfile = () => {

    let {state} = useContext(Ct)

    let [edit,setEdit] = useState(false)

    let [data,setData] = useState({
        name:"",
        email:"",
        address:"",
        pincode:"",
        city:"",
        state:"",
        phone:"",
        gender:"",
        dob:"",
        country:"",
        profileImage:""
    })

    let [image,setImage] = useState(null);

    useEffect(()=>{

        if(state.email){
        
            axios.get(
                `https://technest-backend-1xqx.onrender.com/user/profile/${state.email}`
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
                "https://technest-backend-1xqx.onrender.com/user/updateprofile",
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

        formData.append("email", state.email);

        formData.append("profileImage", image);

        try{

            let res = await axios.post(
                "https://technest-backend-1xqx.onrender.com/user/updateprofileimage",
                formData
            );

            alert(res.data.message);

            // Fetch latest user data
            let profileRes = await axios.get(
                `https://technest-backend-1xqx.onrender.com/user/profile/${state.email}`
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
                        src={data.profileImage ? `https://technest-backend-1xqx.onrender.com/uploads/${data.profileImage}`
                        :
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                        alt="profile"
                        className="profileavatar"
                        />

                    <h1>{data.name}</h1>
                    <p>{data.email}</p>

                </div>

                <div className='profilegrid'>

                    <label>
                        Name
                        <input
                        type='text'
                        name='name'
                        value={data.name}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Gender
                        <select name='gender' value={data.gender} onChange={fun} disabled={!edit}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label>
                        Date of Birth
                        <input
                        type='date'
                        name='dob'
                        value={data.dob}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Email
                        <input
                        type='email'
                        name='email'
                        value={data.email}
                        disabled
                        />
                    </label>

                    <label>
                        Phone
                        <input
                        type='tel'
                        name='phone'
                        value={data.phone}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Address
                        <input
                        type='text'
                        name='address'
                        value={data.address}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Pincode
                        <input
                        type='text' 
                        name='pincode'
                        value={data.pincode}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        City
                        <input
                        type='text'
                        name='city'
                        value={data.city}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        State
                        <input
                        type='text'
                        name='state'
                        value={data.state}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Country
                        <input
                        type='text'
                        name='country'
                        value={data.country}
                        onChange={fun}
                        disabled={!edit}
                        />
                    </label>

                    <label>
                        Profile Image
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

export default UserProfile