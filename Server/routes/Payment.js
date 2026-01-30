// Import the required modules
const express = require("express")
const router = express.Router()

// import controllers 
const { capturePayment, verifySignature } = require("../controller/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/auth")

// map controllers
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)


// ************************* export the router *************************
module.exports = router