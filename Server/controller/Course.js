const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress");

const { convertSecondsToDuration } = require("../utils/secToDuration")
const  {uploadImageToCloudinary} = require("../utils/imageUploader");


// *************** create course handler function ***************

exports.createCourse = async(req, res) => {
    try{
        // console.log();
        // console.log("reached in crete course controller -> request : ", req.body);
        // fetch data 
        const {courseName, courseDescription,
             whatYouWillLearn, price, category, tag, status,
			instructions,} = req.body;
        
        // fetch thumbnail
        const thumbnail = req.files.thumbnail;

        // console.log("thumbnail : ", thumbnail);

        // validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || 
            !price || !category || !tag){
                return res.status(400).json({
                    success : false,
                    message : "Fill all the details",
                });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        // console.log();
        // console.log("Validation checked");
        
        // need to insert instructor in course schema
        // for this need to get instruction name 
        // console.log("req.user : ", req.user);
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);

        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor Details not found",
            });
        }

        // check given category is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "Invalid Category",
            });
        } 

        // Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,
                                                            process.env.FOLDER_NAME)

        // console.log("image uploaded to cloudinary");

        
        // create an entry for new course in db
        // console.log("Befor creating the course");
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail : thumbnailImage.secure_url,
            category : categoryDetails._id,
            status: status,
			instructions: instructions,
            tag : tag,
        })
        // console.log("after course created");

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
        await Category.findOneAndUpdate(
			{ name : category },
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


// *************** Edit Course Details ***************
exports.editCourse = async (req, res) => {
  console.log("editCourse body:", req.body);

  try {
    const { courseId } = req.body;
    const updates = { ...req.body };

    delete updates.courseId;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success:false,
        message: "Course not found",
      });
    }

    // thumbnail update
    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;

      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );

      course.thumbnail = thumbnailImage.secure_url;
    }

    // update fields
    for (const key in updates) {
      if (key === "tag" || key === "instructions") {
        course[key] =
          typeof updates[key] === "string"
            ? JSON.parse(updates[key])
            : updates[key];
      } else {
        course[key] = updates[key];
      }
    }

    await course.save();

    await course.populate([
      {
        path: "instructor",
        populate: { path: "additionalDetail" },
      },
      { path: "category" },
      { path: "ratingAndReview" },
      {
        path: "courseContent",
        populate: { path: "subSection" },
      },
    ]);

    res.json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// *************** Delete the Course ***************
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
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


// *************** getFullCourseDetails handler function ***************

exports.getFullCourseDetails = async (req, res) => {
  try {
    // console.log("reached in getFullCourseDetails, request body : ", req.body);
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}