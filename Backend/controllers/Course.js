const Course = require("../models/Course.js");
const Category = require("../models/category.js");
const User = require("../models/user.js");
const { uploadingImageToCloudinary } = require("../utils/imageUploader.js");

exports.createCourse = async (req, res) => {
  try{
    //get user ID from request object
    const userId = req.user.id;

    //get all required field from request body

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      status,
      instructions,
      category,
      language,
    } = req.body;
   console.log("req.body", req.body);
   console.log("req.files", req.files);
   console.log("courseName:", courseName);
   console.log("courseDescription:", courseDescription);
   console.log("whatYouWillLearn:", whatYouWillLearn);
   console.log("price:", price);
   console.log("tag:", tag);
   console.log("category:", category);
   
   
    //get thumbnail
    const thumbnail = req.files?.thumbnailImage;
console.log("language:", language);
console.log("thumbnail:", thumbnail);
    //check if any of the reqiured field are missing

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category ||
      !language
    ){
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
      //console.log( "status is : ", status);
      
    }
    //check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    //Cheack if the tag given is Valid
    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadingImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log("Thumbail uploaded",thumbnailImage);
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
      language: language,
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//Edit Course

exports.editCourse = async (req, res) => {
  try {
    console.log("EDIT COURSE API HIT");

    // 1. req.body se courseId aur fields nikalo
    const {
      courseId,
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      status,
      thumbnail,
      instructions,
      category,
      language,
    } = req.body;

    // 2. courseId check karo
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course Id is required",
      });
    }
    // 3. existing course find karo

    const coursesDetail = await Course.findById(courseId);

    if (!coursesDetail) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    // 4. course update karo aur response bhejo aur vahi sab dena hoga jo course me diya ha

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tag,
        thumbnail,
        category,
        instructions,
        language,
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Course edited successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to edit course",
      error: error.message,
    });
  }
};

//get all courses

exports.getAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      data: allCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    });
  }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getInstructorCourses = async (req, res) => {
  try{
    //get the instructor Id from the authenticated user or request body
    const instructorId = req.user.id

    //Find all courses belonging to the instructor 
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({createdAt: -1})

    //Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch(error){
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message
    })
  }
}
//Delete Course 

exports.deleteCourse = async (req, res) => {
  try{
    const {courseId} = req.body;
    //find the course

    const{conseId} = req.body;
    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    //Unroll all students from the course

    const studentsEnrolled = course.studentsEnrolled;
      for(const studentId of studentsEnrolled){
        await User.findByIdAndUpdate(studentId, {
          $pull: {
           courses: courseId },
  })
}
//Delte section and sub-sections
const courseSection = course.courseContent
for(const sectionId of courseSection){
  //delete all sub-section of the section
  const section = await section.findById(sectionId)
  if(section){
  const subSections = section.subSection;
  for(const subSectionId of subSections){
    await subSectionId.findByIdAndDelete(subSectionId)
  }
}
//Delete the csection
await section.findByIdAndDelete(sectionId)
}
//Delete the course
await Course.findByIdAndDelete(courseId)
return res.status(200).json({
  success: true,
  message: "Course deleted successfully",
})
  }catch(error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    })
  }
}