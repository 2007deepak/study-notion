const User = require("../models/user.js");
const OTP = require("../models/OTP.js");
const otpGenerator = reqiure("otp-generator");
const bcrypt = required("bcrypt");
const jwt = required("jsonwebtoken");
const nodemailer = required("nodemailer");


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
        return res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }

}

//signup

exports.signUp = async(req, res) => {

   try{
     //  data fetch  from request body
     const {
       email,
       password,
       otp,
       firstName,
       lastName,
       confirmPassword,
       accountType,
       contactNumber,
     } = req.body;

     //validate karlo
     if (
       !firstName ||
       !lastName ||
       !email ||
       !password ||
       !confirmPassword ||
       !otp
     ) {
       return res.status(400).json({
         success: false,
         message: "Please fill all the  fields are  required",
       });
     }

     //check is user alread exist or not

     const existingUser = await User.findOne({ email });

     if (existingUser) {
       return res.status(401).json({
         success: false,
         message: "User is already registered",
       });
     }

     //password match or not
     if (password !== confirmPassword) {
       return res.status(400).json({
         success: false,
         message:
           "Password and ConfirmPassword  Value does not match, please try again",
       });
     }

     //find the otp Stored for the user

     const recentOtp = await OTP.find({ email })
       .sort({ createdAT: -1 })
       .limit(1);

     console.log(recentOtp);

     //validate OTP

     if (recentOtp.length === 0) {
       //OTP not found
       return res.status(404).json({
         success: false,
         message: "OTP not Found",
       });
     } else if (otp !== recentOtp[0].otp) {
       //invalid OTP
       return res.status(400).json({
         success: false,
         message: "OTP Not Matched Please try again",
       });
     }

     //Hash Password
     const hashPassword = await bcrypt.hash(password, 10);

     // entry create in Database
     const profileDetails = await Profiler.create({
       gender: null,
       dateOfBirth: null,
       about: null,
       contactNumber: null,
     });

     const user = await User.create({
       firstName,
       lastName,
       email,
       password: hashPassword,
       accountType,
       additionalDetails: profileDetails._id,
       // image:
     });
     // return response

     return res.status(500).json({
       success: true,
       message: "User is Registered Successfully",
       user,
     });
   }
   catch(error){
    console.log(error);
    return res.status(500).json({
        success: false,
        message: error.message,  
      });
    
   }
}


//Login

exports.login = async(req, res) => {

    try{
        //get data from req body
        const {email, password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields are required",
            })
        }
        //user check exist or not
        const user = await User.findOne({ email}).populate("additionalDetails");
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not registered, please signup first" , 
            })

        }
        //generrate JWT,after password matching means compare
        if (!bcrypt.compareSync(password, user.password)) {
          const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          user.token = token;
          user.password = undefined;

          //create a cookie and send response
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
          res.cookies("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Login Succssfully",
          });
        } 
        else {
          return res.status(400).json({
            succes: false,
            message: "Logged in Successfully",

          });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        });
    
        
    }
}

//ChangePassword
// abhi ye karana hai mujhe

// exports.changePassword = async (req, res) => {
//   //get data from req body

//   try{

//     const { email, oldPassword, newPassword, confirmPassword } = req.body;

//     //validation

//     if (!email || !oldPassword || !newPassword || !confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all the fields are required",
//       });

//       //

//       // update password in DB
//     }
//   }catch(error){
//     console.log(error);;
//     return res.status(500).json({
//         success: false,
//         message: error.messsage,
//     })
    
//   }
// };

// exports.mailSender = async(email,  title, body) =>{

//     try{
//         let transporter = nodemailer.createTransporter({
//           createTransporterhost: process.env.MAIL_hOST,
//           auth: {
//             user: process.env.MAIL_USER,
//             pass: process.env.MAIL_USER,
//           },
//         });

//         let mailOptions = await transporter.sendMail({
//           from: "StudyNotion || CodeHelp - by Babbar",
//           to: `${email}`,
//           subject: `${title}`,
//           html: `${body}`,
//         });
//         console.log(mailOptions);
//         return mailOptions;

//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: error.messsage,
//         });
        
//     }
// }





