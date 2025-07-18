const express = require("express")
const router =  express.Router()

//Import Controller

// Course controllers Imports
const {createCourse, getCourseDetails, getAllCourse} = require("../controllers/Course");


//Categories Conrollers Imports
const{createCategory, showAllCategory, categoryPageDetails} = require("../controllers/Category");

//Section Conroller imports
const{createSection,updateSectioon,deleteSection} = require("../controllers/Section")

//Subsection Conroller imports

const{createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection")