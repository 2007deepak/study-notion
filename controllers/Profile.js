const Profile = require("../models/Profile.js");
const User = require("../models/user.js");
const { uploadingImageToCloudinary } = require("../utils/imageUploader.js");

exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { dateOfBirth = "",about = "",contactNumber,gender }=req.body;

    //get user id
    const id = req.user.id;

    //validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are require",
      });
    }  
    //find Profile
    const userDetalis = await User.findById(id);
    const profileId = userDetalis.additionalDetails;
    const profilesDetails = await Profile.findById(profileId);

    //update profile
    profilesDetails.dateOfBirth = dateOfBirth;
    profilesDetails.about = about;
    profilesDetails.gender = gender;
    profilesDetails.contactNumber = contactNumber;
    await profilesDetails.save();

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      profilesDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// deletion of user PRofile

exports.deleteProfile = async (req, res) => {
  try {
    //get id
    console.log("Printing ID: ", req.user.id);
    const id = req.user.id;

    // validation
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // delete Profiles
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });
    //user delete
    await User.findByIdAndDelete({ _id: id });

    //response
    return res.status(200).json({
      success:true,
      message:"User Delete Successfully",
    });

    } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User cannot be deleted successfully",
      error: error.message,
    });
  }
};

exports.getALLUserDetails = async (req, res) => {
  try {
    // get user id
    const id = req.user.id;

    // validation and  get user detalis
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      data:userDetails,
    });
  } catch (error) {
    return res.status(404).json({
      success:false,
      message:error.massege,
    });
   }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadingImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};