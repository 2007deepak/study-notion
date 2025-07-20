const express = require("express")
const router = express.Router()
const {auth} = require("../middleware/auth.js")
const {
  updateProfile,
  deletProfile,
  getALLUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controllers/Profile.js");


// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account

router.delete("/deleteProfile", deletProfile);
router.put("/updateProfile", auth, updateProfile)
router.get("/getuserDetails", auth, getALLUserDetails)

//get Enrollment Course
router.get("/getEnrolledCourse",auth,getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router;