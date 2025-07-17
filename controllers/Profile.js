const Profile = require("../models/Profile.js");
const User = require("../models/user.js");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {

    try{

        //get data
        const {dataOfBirth="", about="", contanctNumber, gender} = req.body;

        //get user id
         const id = req.user.id;

         //validation
         if (!contanctNumber || !gender || !id) {

            return res.status(400).json({
                success: false,
                message:"All fields are require",
            });
        }

        //find Profile
        const userDetalis = await User.findById(id);
        const profileId = userDetalis.additionalDetails;
        const profilesDetails = await Profile.findById(profileId);


        //update profile

        profilesDetails.dateOfBirth = dataOfBirth;
        profilesDetails.about = about;
        profilesDetails.gender =  gender;
        profilesDetails.contactNumber = contanctNumber;
        await profilesDetails.save();

        // return response
        return res.status(200).json({
            success: true,
            message : "Profile Updated Successfully",
            profilesDetails,
        })

    }catch(error)
    {
        return res.status(500).json({
          success: false,
          error: error.message,
        });

    }
}

// deletion of user PRofile

exports.deletProfile = async(res, req) =>{


   try{
     //get id
     const id = req.user.id;

     // validation
     const userDetails = await User.findId(id);
     if (!userDetails) {
       return res.status(404).json({
         success: false,
         message: "User not found",
       });
     }

     // delete Profiles

     await Profile.findByIdDelete({ _id: userDetails.additionalDetails });

     //user delete

     await User.findByIdAndDelete({ _id: id });

     //response

     return res.status(200).json({
       success: true,
       message: "User Details Successfully",
     });

   }catch(error)
   {

    return res.status(404).json({
      success: false,
      message: 'User cannot be deleted successfully',
    });
   }

}

exports.getALLUserDetails = async (res , req) => {

    try{

        // get user id

        const id = req.user.id;
    
        // validation and  get user detalis 
        const userDetails = await User.findById(id).populate(
          "additionalDetails"
        )
        	.exec();
		console.log(userDetails);
        //return response
        return res.status(200).json({
          success: true,
          message: "User Data Fetched Successfully",
        });

    }catch(error)
    {
        return res.status(404).json({
            success:false,
            message:error.massege,

        });
    }
}


exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
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