const express =  require("express")
const router  = express.Router()

//import rquired controllers and middleware function

const {
    signUp,
    login,
    sendOTP,
    // changePassword ya wala Auth handler abhi baki hai ise karana hai
} = require("../controllers/Auth.js")

// const {
//     resetPasswordToken,
//     resetPassword,
// } = require("../controllers/ResetPassword.js")

const {auth} = require("../middleware/auth.js")


//Routes for login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Route for user login

router.post("/login", login)

//Route for user singup
router.post("/signup",signUp)

//Route for sending OTP to the user's email
router.post("/sendOtp", sendOTP)

//Route for Changing the Password
//router.post("/changepassword",auth, changePassword)

//********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************


module.exports = router;
