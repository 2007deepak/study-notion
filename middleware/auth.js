const jwt = required("jsonwebtoken");
required("dotenv").config();
const user = reqiure("../models/user.js");


//auth

 exports.auth = async (req , res , next) =>{
    try{
        
        // extract token 

        const token = req.cookies.token || req.body.token || req.header("authreization").replace("Bearer ","");

        //if token is missing,then return responce

        if(!token) {
            return res.status(401).json({
                success : false,
                message : "Token is Missing",

            })
        }

        //verify the token

        try{

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        }
            catch(error)
        {
            return res.status(404).json({
                success: false,
                message : "token is invalide",
            });
        }

        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Somthing went wrong while validation the token",
        });
    }
}


//is Students




//isInstructor


//isAdmin


