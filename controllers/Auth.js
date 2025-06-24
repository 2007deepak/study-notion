const User = require("../models/user.js");
const OTP = require("../models/OTP.js");
const otpGenerator = reqiure("otp-generator");

require("dotenv").config();

//sendOTP
exports.sendOTP = async(req , res) =>{

    //fetch email from body

    const {email} = req.body;

    //check if user already exist
    const checkUserPresent = await User.findOne({email});

    //if user is already exist return response

    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User is alraedy registered"
        })
    }
    //otp generator
    
    var otp = otpGenerator.generate(6, 
        {
            upperCaseAlphabets : false,
            loverCaseAlphabets : false,
            specialChars : false,
        }
    );
    console.log(`OTP is ${otp}`);

    try{
      //check unique otp or not
      const checkOTP = await OTP.find({ otp: otp });

      while (result) {
        otp = otpGenerator(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await OTP.find({ otp: otp });
      }
      //isame email user ke liye generate ho raha hai
      // otp generate kiya gya otp hai

      const otpPayload = { email, otp };

      //craete an entry for otp in database
      const otpBody = await OTP.create({ otp: otp });

      console.log(otpBody);

      // returan response successful

      res.status(200).json({
        success: true,
        message: "Otp sent Successfully",
        otp,
      });
    }catch(error)
    {
        console.log(error);
        
    }


}


//signup


//Login


//ChangePassword

