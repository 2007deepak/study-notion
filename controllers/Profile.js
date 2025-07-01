const Profile = require("../models/Profile.js");
const User = require("../models/user.js");


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
