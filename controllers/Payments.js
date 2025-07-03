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

  //order create

  const amount = course.price;
  const currency = "INR";

  const options = {
      ammount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes:{
          courseId:course_id,
          userId,
      }
  };
    try{


    //initiate the payment using razorpay
    const paymentResponse = await intance.orders.create(options);
    console.log(paymentResponse);

    //return response

    return res.status(200).json({
        success:true,
        courseName : course.courseName,
        thumbnail : course.thumbnail,
    courseDescription : course.courseDescription,
    orderId : paymentResponse.Id,
    currency:paymentResponse.currency,
    amount : paymentResponse.amount,
   })
    }catch(error)
      {
        console.log(error);
        res.json({
          success: false,
          message: "Could not initiate order",
        });
      }

};

    //Verify the Signatutre of Rozarpay and Server
exports.verifySignature = async(req, res) => {

  const webhookSecret = "12345678";
  const signature =req.headers["x-razorpay-signature"];

  // isame "sha256" ek algorigh hai and webhook hai
  const shasum = crypto.createHmac("sha256",webhookSecret);
  //convert into string formate 
  shasum.upadte(JSON.stringify(req.body));
  //jab bhi ham koi algo use karate hai use darsane ke liye ham digest ka use karte hai
  const digest = shasum.digest("hex");

  if(signature === digest)
  {
    
   console.log("Payment is Authorised");
        
      
    const {courseId,userId} = req.body.payload.payment.entity.notes;

    try
    {
      //fulfil the action
      //find the course and enroll the student in it
      const enrolledCourse =await Course.findOneAndUpdate(
                                      
                                        {_id:courseId},
                                        {$push:{studentsEnrolled : userId}},
                                        {new: true},
                                        
      );
        
      if(!enrolledCourse){
        return res.status(500).json({
          success:false,
          message:"Course not found"
        });
      }
      console.log(enrolledCourse);

      //find the student an added the course to their list enrolled courses me

      const enrolledStudent = await User.findOneAndUpdate(
                                      {_id:userId},
                                      {$push:{courses:courseId}},
                                      {new:true},
      );
      
      console.log(enrolledStudent);
      //mail send kardo confirmation wala
      const emailResponse = await mailSender(isEnrolledStudent.email,
        "Congaratulation from StudyNotion",
        "Congratulation,you are onboarded into new CodeHelp Course",

      );

      console.log(emailResponse);
      return res.status(200).json({
        success : true,
        message:"Singnature varified and Course Added",
      });
      }catch(error){
          console.log(error);
          return res.status(500).json({
            success:false,
            message:error.message,
          })
    }
  }       
  
  else{
    return res.status(400).json({
      success:false,
      message:"Invalid request"
    });

  }
  
};