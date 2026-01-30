// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controller/Auth");


const {
  resetPasswordToken,
  resetPassword,
} = require("../controller/ResetPassword");


const { auth } = require("../middleware/auth")





// Routes for Login, signUp, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signUp
router.post("/signUp", signUp)

// Route for sending OTP to the user's email
router.post("/sendOTP", sendOTP)

// Route for Changing the password
router.post("/changepassword", auth, changePassword)





// ********************************************************************************************************
//                                 Reset Password -> (in case of Forgot Password)
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router