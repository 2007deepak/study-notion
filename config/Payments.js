const {intance} = require("../config/rozorpay");
const Course = require("../models/Course");
const User = require("../models/user")
const mailSender = require("../utills/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");


//cappture the payment and initiate the  Rozorpay

exports.capturePayment = async (req,res) => {

    // get courseId and UserId
    const {course_id} = req.body;
    const userId = req.user.id
    //valid courseID
    if(!course_id){
        return res.json({
            succese:false,
            message:"Plese provide valid course id"
        })

    }
    
    //validCorseDetails
    let course;
    try{
        course = await Course.findById(course_id)
        if(!course){
            return res.json({
                succese:false,
                message:"Could not find the Course"
            })
        }
    }catch(error)
    {

    }
    //user already pay for the  same course
    //order create 
    //returne response

}