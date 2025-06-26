    const Course = require("../models/Course.js");
    const Section = require("../models/Section.js");



    exports.createSection = async(req,res) => {


    //fetch data

    const {SectionName , courseId} = req. body;

    // data validation
    try{
        
    if(!SectionName || !courseId){

        return res.status(400).json({
            success:false,
            message: "Missing Properties"
        }) 

    }
    //create Section

    const  newSection = await newSection.create({SectionName});


    //update the course with section objectId

    const course = await course.findOneAndUpdate(
                                        courseId,
                                        {
                                        $push:{
                                            courseContent:newSection._id,

                                        } ,
                                        },
                                        {new:true},
                                        
    );

    //HW : use populate to replace section / sub-section both in the updatedCourseDetalis

    //return response
    return res.status(200).json({
        success:true,
        message:"Section created successfully",
        updatedCourseDetails,
    });

    }
    catch(error){
        console.log(error);
        return res.stauts(200).json({
            success: true,
            message:"Unable to create Section,plese try again",

        });
    
    }
}

exports.updateSectioon = async (req, res) => {

    try{

        //data fetch karana

     const {sectionName , sectionId} = req.body;

        //data validation krana

    if(!sectionName || !sectionId){
        
        return res.status(200).json({
          success: true,
          message: "creation not ",
        });
    }


        // data Update karana

        const updateSection = await updateSection.findByIdAndUpdate(sectionId, {sectionName}, {new:true}

        );

        // response return karana
        return res.status(200).json({
          success: true,
          message: "Section Updated successfully",
         
        });

    }catch(error)
    {
        console.log(error);
        return res.stauts(200).json({
          success: true,
          message: "Unable to cUpdate Section ,plaese try again ",
          error:error.message,
        });
    }
}