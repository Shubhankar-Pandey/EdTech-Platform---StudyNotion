// Import the required modules
const express = require("express")
const router = express.Router()

// import controllers 
const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controller/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// map controllers
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);


// ************************* export the router *************************
module.exports = router