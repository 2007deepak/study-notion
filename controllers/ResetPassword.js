const User = require("../models/user");
const mailSender = require("../utills/mailSender");
const bcrypt = require("bcrypt");
//resetPasswordToken

exports.resetPasswordToken = async (req , res) => {
    try{

        //fetch email from body
        const  email = req.body.email;

        //validate email
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Your Email address is not register with us"
            })
        }
        //generatye otp
        
        const token  =  crypto.randomUUID();

        //update user by adding token and  expration time
        const updateDetails = await User.findOneAndUpdate(

            {email: email},{
                token:token,
                resetPassworExpire:Date.now() + 5*60*1000,
            },{new:true}
        )
        //create url
        const url =`http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailSender(email,
            "Password Reset Link",
            `Password Reset Link:${url}`
        );
        // return response

        return res.status(200).json({
          success: true,
          message: "Email sent successfully, please check email and change pwd",
        });


    }catch(error){
        return res.status(500).json({
          success: false,
          message: "Something went wrong while sending reset pwd mail",
        });
    }
}


//resetPassword


exports.resetPassword = async (req , res) => {
    try{

        //fect data

        const {token, password, confirmPassword} = req.body;
    
    //validate data
    if(!!password || !confirmPassword ) {
        return res.status(400).json({

            successs : false,
            message:"PAssword not matching",
        });

    }

    //gett userdetails from db using token
  
    const userdetails = await User.findOne({token: token});
    
    //if no entry - invalid token

    if(!userdetails){
        return res.status(404).json({
            success : false,
            message: "Invalid token or token expired, please try agin"
        })
    }
    //token time check
    if(userdetails.resetPassworExpire < Date.now()) {
        return res.status(400).json({
            success: false,
            messager: "Token is Invalid"
        })
    }

    //hash Password
    const hashPassword = await bcrypt.hash(password,10);

    //update password in db

    await User.findOneAndUpdate(
        {token: token},
        {password: hashPassword},
        {new:true}
    );
    //return response
    return res.status(200).json({
        success: true,
        message: "Password updated successfully"
    });


}catch(error){
    return res.status(500).json({
        success:false,
        message: "Something went wrong while resending reset pwd mail",
    });


}
}
