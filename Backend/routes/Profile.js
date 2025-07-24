const express = require("express")
const router = express.Router()
const {auth} = require("../middleware/auth.js")
const {
  updateProfile,
  deleteProfile,
  getALLUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile.js");


const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword.js")


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account

router.delete("/deleteProfile",  auth,deleteProfile);
router.put("/updateProfile", auth, updateProfile)
router.get("/getuserDetails", auth, getALLUserDetails)

//get Enrollment Course
router.get("/getEnrolledCourse",auth,getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

// Route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);


module.exports = router;