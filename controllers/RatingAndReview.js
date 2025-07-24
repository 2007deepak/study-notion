
const RatingAndReview = require("../models/RatingAndReview.js");
const Course = require("../models/Course.js");

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

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try{

        //get course ID

        const courseId = req.body.courseId;
        //calculate avg rating

        const result = await RatingAndReview.aggregate([

            {
                // course id pahle String me thi ab use ObjectId convert kar diya
                $match: {
                    course: new mongoose.Type.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "$rating"},
                }
            }
        ])

        //return rating
        if(result.lenght  > 0) {

            return res.status(200).json({
             averageRating: result[0].averageRating
            })
        }
        
        //if no reating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0 , no ratings givens till now',
            averageRating:0,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message

        })
        
    }


}
//getAllRatingAndReviews


exports.getAllRating = async (req,res) => {

    try{
        const allReviews = await RatingAndReview.find({})
            .sort({rating: "desc"})
            .populate({
                path:"user",
                select:"firstName lastName email image"

            })
            populate({
                path:"course",
                select: "courseNAme",
            })
            .exec();
        
    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message,
        })
        
    }

}