const Course = require("../models/Course.js");
const Section = require("../models/Section.js");

exports.createSection = async (req, res) => {
  //fetch data

  const { sectionName, courseId } = req.body;

  // data validation
  try {
    // console.log("req.body", req.body);

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    //create Section

    const newSection = await Section.create({ sectionName });

    //update the course with section objectId

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true },
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    return res.status(200).json({
      success: true,
      updatedCourseDetails,
    });
  } catch (error) {
    console.log("error hai", error);
    return res.status(200).json({
      success: false,
      message: "Unable to create Section,plese try again",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data fetch karana

    const { sectionName, sectionId, courseId } = req.body;

    //data validation krana

    if (!sectionName || !sectionId || !courseId) {
      return res.status(200).json({
        success: true,
        message: "Section name, section ID and course ID are required",
      });
    }

    // data Update karana
    // yaha par ahame jo change kiya hai voSection ke aage ka SectionName ko hata diya hai
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true },
    );
    const updatedCourse = await Course.findById(courseId)
      .populate("courseContent")
      .exec();

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "section not Found",
      });
    }
    // response return karana
    return res.status(200).json({
      success: true,
      message: "Section Updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to Update Section ,plaese try again ",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get ID
    const { sectionId, courseId } = req.body;

    //use findByIdandDelete
    await Section.findByIdAndDelete(sectionId);
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId }, // ✅ ye missing hai shayad
    });
    // Step 3: updated course wapas bhejo
    const updatedCourseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();
    //return response
    return res.status(200).json({
      success: true,
      message: "Section delete successfully",
      data: updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section , please try again",
      error: error.message,
    });
  }
};
