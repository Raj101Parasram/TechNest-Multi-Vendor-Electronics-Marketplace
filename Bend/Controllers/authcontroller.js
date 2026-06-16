let jwt = require("jsonwebtoken")

let checkLogin = (req,res)=>{
    console.log("Cookies =", req.cookies)

    try{

        let token = req.cookies.token

        if(!token){

            return res.json({
                loggedIn:false
            })
        }

        let data = jwt.verify(
            token,
            process.env.SECRET_KEY
        )

        res.json({ loggedIn:true, email:data.email, role:data.role, name:data.name})
    }
    catch(err){

        res.json({

            loggedIn:false

        })

    }

}


let logout = (req,res)=>{

    res.clearCookie("token")

    res.json({

        message:"Logout Successful"

    })

}

module.exports={checkLogin, logout}
