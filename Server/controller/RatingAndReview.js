const Course = require("../models/Course");
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");


// *************** createRatingAndReview ***************

exports.createRatingAndReview = async(req, res) => {
    try{
        // get user id
        const userId = req.user.id;

        // fetch data from request body
        const {rating, review, courseId} = req.body;

        // check if user is enrolled in this course or not
        const user = await User.findById(userId);

        if(!user){
            return res.json({
                success : false,
                message : "Invalid user id"
            });
        }

        const isCoursePresent = user.courses.includes(courseId);

        if(!isCoursePresent){
            return res.json({
                success : false,
                message : "You are not registered in this course",
            });
        }


        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user : userId,
                course : courseId,
            }
        );

        if(alreadyReviewed){
            return res.json({
                success : false,
                message : "You are already review this course",
            })
        }


        // create rating and review
        const newRatingAndReview = await RatingAndReview.create({
            user : userId,
            rating,
            review,
            course : courseId,
        })
        
        // push this rating and review in course schema 
        await Course.findByIdAndUpdate(
            {_id : courseId},
            {
                $push : {
                    ratingAndReview : newRatingAndReview._id,
                }
            },
            {new : true},
        )


        // return response
        return res.status(200).json({
            success : true,
            message : "Rating and review is created successfully and added in course schema",
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in creating Rating",
            error : error.message,
        })
    }
}




// *************** getAverageRating ***************

exports.getAverageRating = async(req, res) => {
    try{
        // get course id
        const {courseId} = req.body;

        // calculate avgRating
        const result = await RatingAndReview.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group : {
                    _id : null,
                    averageRating : {$avg : "$rating"},
                }
            }
        ])

        // return avgRating
        if(result.length > 0){
            return res.status(200).json({
                success : true,
                message : "Average rating calculated successfully",
                averageRating : result[0].averageRating,
            });
        }
        
        // if no rating review exist
        return res.status(200).json({
            success : true,
            message : "Average rating is 0, no rating is given to this course till now",
            averageRating : 0,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in calculating Average Rating",
            error : error.message,
        })
    }
}



// *************** getAllRatingAndReviews ***************

exports.getAllRatingAndReviews = async(req, res) => {
    try{
        // db call
        const allRatingAndReviews = await RatingAndReview.find()
                                    .sort({rating : "desc"})
                                    .populate({
                                        path : "user",
                                        select : "firstName lastName email image",
                                    })
                                    .populate({
                                        path : "course",
                                        select : "courseName",
                                    })
                                    .exec();
        
        // return response
        res.status(200).json({
            success : true,
            message : "All ratings and reviews fetched successfully",
            allRatingAndReviews,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in getting all ratings and reviews",
            error : error.message,
        })
    }
}