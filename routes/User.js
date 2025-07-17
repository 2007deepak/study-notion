const express =  require("express")
const router  = express.Router()

//import rquired controllers and middleware function

const {
    signUp,
    login,
    sendOTP,
    // changePassword ya wala Auth handler abhi baki hai ise karana hai
} = require("../controllers/Auth")

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword")

const {auth} = require("../middleware/auth")
