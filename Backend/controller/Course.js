const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

const  {uploadImageToCloudinary} = require("../utils/imageUploader");


// *************** create course handler function ***************

exports.createCourse = async(req, res) => {
    try{
        // fetch data 
        const {courseName, courseDescription,
             whatYouWillLearn, price, category} = req.body;
        
        // fetch thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || 
            !price || !category || !thumbnail){
                return res.status(400).json({
                    success : false,
                    message : "Fill all the details",
                });
            }
        
        // need to insert instructor in course schema
        // for this need to get instruction name 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor Details not found",
            });
        }

        // check given tag is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "Invalid tag",
            });
        } 

        // Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,
                                                            process.env.FOLDER_NAME)

        
        // create an entry for new course in db
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail : thumbnailImage.secure_url,
            category : categoryDetails._id,
        })

        // add this new course to the user schema of instructor 
        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
        );

        // update the category schema
        // Add the new course to the Categories
        await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);


        // return response
        return res.status(200).json({
            success : true,
            message : "Course created successfully ",
            data : newCourse,
        });
        

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in createCourse handler function",
            error : error.message,
        });
    }
}





// *************** getAllCourses handler function ***************

exports.getAllCourses = async(req, res) => {
    try{
        const allCourses = await Course.find({}, {
                                                    courseName : true,
                                                    price : true,
                                                    thumbnail : true,
                                                    instructor : true,
                                                    ratingAndReview : true,
                                                    studentsEnrolled : true,
                                            }).populate("instructor").exec(); 

        return res.status(200).json({
            success : true,
            message : "Data for all courses fetched successfully",
            allCourses : allCourses,
        });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Cannot fetch course data",
            error : error.message,
        });
    }
}




// *************** getCourseDetails handler function ***************

exports.getCourseDetails = async(req, res) => {
    try{
        // get course id
        
        const {courseId} = req.body;
        
        // validation
        if(!courseId){
            return res.json({
                success : false,
                message : "Course id is missing, getCourseDetails handler function",
            })
        }

        // console.log("Inside handler function yoyo");
        // fetch details
        const courseDetails = await Course.findById(courseId)
        .populate(
            {
                path : "instructor",
                populate : {
                    path : "additionalDetail",
                }
            }
        )
        .populate(
            {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        )
        .populate("ratingAndReview")
        .populate("category")
        .exec();

        // validation 
        if(!courseDetails){
            return res.json({
                success : false,
                message : "Invalid course id, error in getCourseDetails handler function",
            })
        }

        // return response
        return res.status(200).json({
            success : true,
            message : "All course details fetched successsfully",
            courseDetails : courseDetails,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in getCourseDetails handler function in course controller",
            error : error.message,
        })
    }
}