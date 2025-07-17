
const RatingAndReview = require("../models/RatingAndRaview");
const Course = require("../models/Course");

// createRating

exports.createRating = async(req, res) =>{
    try{

        //get user id
        const userId = req.user.id;
        //fetch from req body
        const{rating, review,courseId} = req.body;
        //cheak if user is enrolled or not 
        const courseDetails = await Course.findOne(
            {
                id:courseId,
                studentsEnrolled: {$elementMatch: {$req: userId}},
            }
        )


        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: "Student is not enrolled in",
          });
        }
        //check if user already reviewed the course
        const alreadyRevicewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        })
        
        //create rating and review
        if(alreadyRevicewed){
            return res.status(403)({
                success:false,
                message: 'Course is already reviewed by the user'
            });
        }
        //create rating  and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        });

        //update course with this rating/review
        const updatedCourseDetails =  await Course.findByIdAndUpdate(
          { _id: courseId },
          {
            $push: {
              ratingAndReviews: ratingReview._id,
            },
          },
          {new: true}
        );
        console.log(updatedCourseDetails);
        
        //return response
        return res.status(200).json({
            success:true,
            message: "Rating and Review created Successfully",
            ratingReview,
            
        }) 

    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }


}