const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");

const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// *************** send OTP ***************

exports.sendOTP = async(req, res) => {
    try{
        // fetch email from req body
        let {email} = req.body;
        if(!email){
            return res.status(400).json({
                success : true,
                message : "Email required"
            })
        }

        email = email.toLowerCase();
        
        // check if user already exist 
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success : false,
                message : "User already registered",
            })
        }

        // generate otp
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false,
        })

        // otp must be unique
        let checkUniqueOTP = await OTP.findOne({otp});
        
        while(checkUniqueOTP){
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets : false,
                upperCaseAlphabets : false,
                specialChars : false,
            })

            checkUniqueOTP = await OTP.findOne({otp});
        }

        // create an entry in db
        await OTP.create({email, otp});
        // otp schema me hi user ke mail pe otp send hoga
        // using post middleware 
        // check otp schema in model folder


        // return response
        return res.status(200).json({
            success : true,
            message : "OTP sent successfully",
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
};



// *************** signup ***************

exports.signUp = async(req, res) => {
    try{
        // fetch data from req body
        const {firstName, lastName,createPassword,
             confirmPassword, accountType, otp} = req.body;

        let {email} = req.body;


        // request body me jo otp hai -> wo jab user email verfiy karne ke liye
        // apna email dekh ke otp likhega, to ye wo wala otp hai

        // validate karlo -> data missing check
        if(!firstName || !lastName || !email || !createPassword || 
            !confirmPassword || !otp){
                return res.status(403).json({
                    success : false,
                    message : "Details missing, fill all the details",
                });
        }

        email = email.toLowerCase();

        // createPassword and confirmPassword match karo
        if(confirmPassword !== createPassword){
            return res.status(400).json({
                success : false,
                message : "CreatePassword and confirmPassword are not matching",
            });
        }

        // check user already exist or not
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(400).json({
                success : false,
                message : "User already registered",
            });
        }

        // find most recent otp stored for the user
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

        // validate otp
        if(recentOtp.length == 0){
            // otp not found
            return res.status(400).json({
                success : false,
                message : "OTP not found",
            });
        }
        else if(otp !== recentOtp.otp){
            // req body wala otp and recentOtp match karo for validation
            // else if me aaye mtlb -> invalid otp
            return res.status(400).json({
                success : false,
                message : "Invalid OTP",
            });
        }

        // now hash password 
        const hashedPassword = await bcrypt.hash(createPassword, 10);

        // create additional details -> profile for user
        const profileDetails = await Profile.create({
            gender : null, 
            dateOfBirth : null, 
            about : null, 
            contactNumber : null,
        })

        // create entry of user in db
        const newUser = await User.create({
            firstName, 
            lastName,
            email,
            password : hashedPassword,
            accountType,
            additionalDetail : profileDetails._id, 
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        }) 


        // return response
        newUser.password = undefined;
        return res.status(200).json({
            success : true,
            message : "User created successfully",
            user : newUser,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "User cannot be registered, please try again",
        })
    }
}



// *************** login ***************

exports.login = async(req, res) => {
    try{
        // fetch data from req body
        const {email, password} = req.body;
        
        // validation
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Details missing, fill all the details",
            });
        }

        // check user pehle se register hai ki nahi
        const user = await User.findOne({email}).populate("additionalDetail");
        if(!user){
            return res.status(401).json({
                success : false,
                message : "User is not registered, please signup first",
            });
        }

        // now match the passwords
        if(await bcrypt.compare(password, user.password)){
            // verified, then -> send jwt token 
            const payload = {
                email : user.email,
                accountType : user.accountType,
                id : user._id,
            }

            const token = jwt.sign(payload, process.env.JWTSECRET, {
                expiresIn : "2h"
            });

            // user = user.toObject();
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                httpOnly: true,   // prevents XSS -> not able to change cookie data
                secure: true,     // HTTPS only
                expires : new Date(Date.now() + 3*24*60*60*1000),
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                message : "Logged in successfully",
                token, 
                user,
            })
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Wrong password, try again",
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Login failure, please try again",
        })
    }
}



// *************** change Password ***************

exports.changePassword = async(req, res) => {
    try{
        // get data from req body
        // data are = oldPassword, newPassword, confirmNewPassword
        // validation
        // update password in db
        // send mail -> password updated ka mail bhej do
        // return response
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "",
        })
    }
}