// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controller

// Course Controller Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require("../controller/Course")


// Categories Controller Import
const {
  showAllCategory,
  createCategory,
  categoryPageDetails,
} = require("../controller/Category")

// Sections Controller Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controller/Section")

// Sub-Sections Controller Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controller/Subsection")

// Rating Controller Import
const {
  createRatingAndReview,
  getAverageRating,
  getAllRatingAndReviews,
} = require("../controller/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")



// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails", getCourseDetails)



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)



// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReviews)



// ************************* export the router *************************
module.exports = router