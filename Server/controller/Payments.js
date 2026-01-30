const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");


// **************** capture the payment and initiate the razorpay order ****************

exports.capturePayment = async(req, res) => {
    try{
        // get course id and user id 
        const {course_id} = req.body;
        const userId = req.user.id;

        // validation 
        if(!course_id){
            return res.json({
                success : false,
                message : "course id is missing",
            })
        }

        // valid course
        const course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success : false,
                message : "Please enter a valid course id",
            })
        }

        // user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        const isUserPresent = course.studentEnrolled.includes(uid);
        if(isUserPresent){
            return res.json({
                success : false,
                message : "you already have this course",
            })
        }

        // order create 
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount : amount * 100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            // notes me -> couseId and userid daal do
            // taaki baad me jab payment successfull ho jaaye tab
            // student ke courser me ye wala course id daalna padega
            // and course ke enrollments me student ka id daalna padega
            notes : { 
                courseId : course_id,
                userId,
            }
        }

        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options); 
        console.log(paymentResponse);       
        
        // return response
        return res.status(200).json({
            success : true,
            message : "Order created successfully",
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail : thumbnail,
            orderId : paymentResponse.id,
            amount : paymentResponse.amount,
            currency : paymentResponse.currency,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error while creating order, in payments file in controller",
            error : error.message,
        })
    }
};


// **************** verify signature of razorpay and server ****************

exports.verifySignature = async(req, res) => {
    try{
        // this request is hit by razorpay's webhook
        // ye client se request nahi aaya hai
        const webhookSecret = "12345678";

        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature === digest){
            console.log("Payment is authorized");
            
            // student ko ye course allot kar do
            // therefore we need courseId and userID
            // isiliye notes me courseId and userID daala tha

            const {courseId, userId} = req.body.payload.payment.entity.notes;

            // find the course and enroll student in it
            const updatedCourse = await Course.findByIdAndUpdate(
                {_id : courseId},
                {
                    $push : {
                        studentEnrolled : userId,
                    }
                },
                {new : true},
            );

            if(!updatedCourse){
                return res.status(500).json({
                    success : false,
                    message : "Course not found",
                });
            }

            // find the student and push course in user's courses
            const updatedUser = await User.findByIdAndUpdate(
                {_id : userId},
                {
                    $push : {
                        courses : courseId,
                    }
                },
                {new : true},
            );

            if(!updatedUser){
                return res.status(500).json({
                    success : false,
                    message : "User not found",
                });
            }

            // mail send karo confirmation wala
            const emailResponse = await mailSender(
                updatedUser.email,
                "New course Registered",
                "Congratulations, you are onboarded into new Studnotion Course",
            );

            return res.status(200).json({
                success : true,
                message : "Signature verified and course added",
            })

        }
        else{
            return res.status(400).json({
                success : false,
                message : "Razorpay signature in not matching with server"
            });
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error while verifying the signature of razorpay and server",
            error : error.message,
        });
    }
} 