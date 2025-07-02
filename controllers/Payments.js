const User = require("../models/user.js")
const Course = require("../models/Course.js");
const mailSender = require("../utills/mailSender.js")
const {intance} = require("../config/razorpay");

const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail.js")
const mongoose = require("mongoose");
const { findById } = require("../models/Profile");
// ye wala line ko dyan me rakho isame change ho skate hai


//Capture the payment and initiate the rozorpay order

exports.capturePayment = async (req , res) => {

    // get courseId and userId

    const {course_id} = req.body;
    const userId = req.user.id;

    //validation
    //validation course id

    if(!course_id){
        return res.status(204).json ({
            success:false,
            message:"Please Provide valid course Id",
        })
    };
    // valid course Details
    let course;

    try{

     course = await findById(course_id);

        if(!course) {
            return res.json({
              success: false,
              message: "Could not fonnd course",
            });
        }
     //user already pay for the same course
     const isEnrolled = course.studentsEnrolled.some(
       (id) => id.toString() === userId
     );

     if (isEnrolled) {
       return res.status(200).json({
         success: false,
         message: "Student is already enrolled",
       });
     }
    
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
        
    }
};
//order create

