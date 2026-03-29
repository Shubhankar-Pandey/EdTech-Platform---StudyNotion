const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail")
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");








// initiate the razorpay order
exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0){
        return res.json({
            success : false,
            message : "Please provide CourseId",
        })
    }

    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success : false,
                    message : "Could not find the course",
                })
            }
            
            if(course.studentEnrolled.includes(userId)){
                return res.status(200).json({
                    success : false,
                    message : "Student in already enrolled",
                })
            }

            totalAmount += course.price;
        }
        catch(err){
            console.log("Error in capturePayment controller : error : ", err);
            return res.status(500).json({
                success : false,
                message : err.message,
            })

        }
    }

    const options = {
        amount : totalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString(),
    }


    try{
        const paymentResponse = await instance.orders.create(options);
        return res.json({
            success : true,
            message : paymentResponse,
        })
    }
    catch(error){
        console.log("Error while creating razorpay order : error : ", error);
        return res.status(500).json({
            success : false,
            message : "Could not initiate razorpay order",
        })
    }
}


// helper function to enroll the students in their respective courses after successfull payment
const enrollStudent = async(courses, userId, res) => {
    try{
        if(!courses || !userId){
            return res.status(400).json({
                success : false,
                message : "Please provide data for courses and userId",
            })
        }
    }
    catch(err){
        console.log("Error in enrollStudent function after successfull payment : error : ", err);
        return res.status(500).json({
            sucess : false,
            message : err.message,
        })
    }

    for(const courseId of courses){
        try{
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                {_id : courseId},
                {
                    $push:{
                        studentEnrolled : userId,
                    }
                },
                {new : true}
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success : false,
                    message : "Course not found",
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID : courseId,
                completedVideos : [],
                userId : userId,
            })

            // find the student and enroll this course to the list of enrolledCourses of student
            const enrolledStudent = await User.findByIdAndUpdate(
                {_id : userId},
                {
                    $push : {
                        courses : courseId,
                        courseProgress : courseProgress._id,
                    }
                },
                {new : true}
            )

            if(!enrolledStudent){
                return res.status(500).json({
                    success : false,
                    message : "Student not found",
                })
            }

            // student ko mail send kardo
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrollStudent.firstName + enrollStudent.lastName}`)
            )

        }
        catch(error){
            console.log("error in enrollStudent function after payment successfull : ", error);
            return res.status(500).json({
                success : false,
                message : error.message,
            })
        }
    }
}


// verify the payment 
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || 
        !razorpay_payment_id || 
        !razorpay_signature ||
        !courses || !userId){
            return res.status(200).json({
                success : false,
                message : "Payment failed, due to some data are missing",
            })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if(expectedSignature === razorpay_signature){
        // enroll karwao student ko
        await enrollStudent(courses, userId, res);

        // return res
        return res.status(200).json({
            success : true,
            message : "Payment Verified",
        })
    }

    return res.status(500).json({
        success : false,
        message : "Payment Failed",
    })
}


// send payment successfull email to the student
exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success : false,
            message : "Please provide all the fields",
        })
    }

    try{
        // find out student
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName + " " + enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )
        )
    }   
    catch(error){
        console.log("Error in sendPaymentSuccessEmail controller : ", error);
        return res.status(500).json({
            success : false,
            message : error.message
        })

    }
}