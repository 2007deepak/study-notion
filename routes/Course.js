const express = require("express")
const router =  express.Router()

//Import Controller

// Course controllers Imports
const {createCourse, getCourseDetails, getAllCourse} = require("../controllers/Course");


//Categories Controllers Imports
const{createCategory, showAllCategory, categoryPageDetails} = require("../controllers/Category");

//Section Controller imports
const{createSection,updateSection,deleteSection} = require("../controllers/Section")

//Subsection Controller imports

const{createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection")

//const controllers Rating and Reviwe imports
const {createRating, getAverageRating,getAllRating} = require("../controllers/RatingAndReview")

//import middleware 
const {auth,isStudent,isInstructor,isAdmin} = require("../middleware/auth");


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//Course can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);

//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);

//Add update a Section 
router.post("/updateSection", auth, isInstructor, updateSection);

//Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);

//delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);

//Get all Registered Course
router.get("/getAllCourse", getAllCourse)

//get Details for a Specific Courses
router.get("/getCourseDetalis", getCourseDetails);