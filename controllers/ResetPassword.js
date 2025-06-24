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

