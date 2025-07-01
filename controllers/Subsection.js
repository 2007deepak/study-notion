    const SubSection = require("../models/SubSection.js")
    const Section = require("../models/Section.js");


    exports.createSubSection = async (req , res ) => {

    try{
    // fetch data
    const {sectionId, title, timeDuration, description} = req.body;

    // extract file/data
    const video = req.files.videofiles;
    // validation
    if(!sectionId || !title || !timeDuration || description || video) {
        return res.status(400).json({
            success: false,
            message:"All field are required",
        });
    }
    //upload video to cloudinary

    const uploadDetails = await uploadingimangeToCloudinary(video, process.env.FOLDER_NAME);
    //create a sub-section 

    const SubSectionDetails = await SubSection.create({
    title: title,
    description:description,
    timeDuration:timeDuration,
    videoUrl:uploadDetails.secure_url,
    });
    //update section with this sub section ObjectID
    const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                
    {$push:{
        SubSection:SubSectionDetails._id,
    }},
    {new:true});

    // main chahata hu only updatedsection ka data log karana hai id na dikhe sab
    // mujhe papuated dikhe
    //HW: log update section here, after adding papulate qurey

    //response return

    return res.status(200).json({
            success : true,
            massage: "Sub Section Created Successfully",
            updatedSection,

    });
    }catch(error)
    {
        return res.status(500).json({
            success : flase,
            massage: "Internal Server Issuse",
            error:error.message,


        });
    }
}

//HW : UpdateSubSEction 

//HW : delete SubSection karana hai