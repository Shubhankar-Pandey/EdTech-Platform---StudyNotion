const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");



// ****************************** resetPasswordToken ******************************

// here we receive email of the user 
// with this email we will create a token
// with this token we create a link, which is sent to email of user
// means we also need to sent the email containing the url
// url -> is create by token -> token is created by email
// url is sent in email of the user 
exports.resetPasswordToken = async(req, res) => {
    try{
        // get email from request body
        const {email} = req.body;
        // check user for this email, validation for email
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success : false,
                message : "No user is registered with this email",
            });
        }

        // generate token 
        const token = crypto.randomBytes(20).toString("hex");

        // update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email : email}, {
            token : token,
            resetPasswordExpires : Date.now() + 5*60*1000,
        },
        {new : true});

        // create url
        const url = `http://localhost:3000/updatePassword/${token}`;

        // send mail containing the url
        await mailSender(email,
                         "Reset password link", 
                          `Password reset link : ${url}`
                        )

        // return the response
        return res.status(200).json({
            success : true,
            message : "Email sent successfully, please check email and reset password",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, while sending mail for reseting password",
        });
    }
}





// ****************************** resetPassword ******************************


exports.resetPassword = async(req, res) => {
    try{
        // fetch data from req body
        const {token, password, confirmPassword} = req.body;

        // validation
        if(!password || !confirmPassword){
            return res.status(401).json({
                success : false,
                message : "Fill all the details",
            });
        }
        else if(password !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : "password and confirmPassword are not matched",
            });
        }

        // get user detail from db using token
        const userDetails = await User.findOne({token : token}); 

        // if no user exist -> means -> invalid token
        if(!userDetails){
            return res.status(401).json({
                success : false,
                message : "Invalid token",
            }); 
        }

        // check token time -> is it valid or expired
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success : false,
                message : "Token expired, reset password link expired",
            });
        }
        
        // if all things are good -> then update password in db
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // password update
        const updatedUser = await User.findOneAndUpdate(
            {token : token}, 
            {password : hashedPassword},
            {new : true}
        );

        // return response
        return res.status(200).json({
            success : true,
            message : "Password reset successfullly",
            updatedUser : updatedUser,
        });

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Something went wrong in reseting the password",
        });
    }
}