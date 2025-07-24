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
    //get thumbnail
    const thumbnail = req.files?.thumbnailImage;

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
    ) {
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
