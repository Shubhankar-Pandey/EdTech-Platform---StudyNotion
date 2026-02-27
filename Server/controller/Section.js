const { LuRotateCwSquare } = require("react-icons/lu");
const Course = require("../models/Course");
const Section = require("../models/Section");


// *************** creating new Section handler function *************** 

exports.createSection = async (req, res) => {
    try{
        // fetch data 
        const {sectionName, courseId} = req.body;

        // validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : "Fill all the details",
            })
        }

        // create Section
        const newSection = await Section.create({
            sectionName,
        });

        // insert this section in course schema 
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id : courseId},
            {
                $push : {
                    courseContent : newSection._id,
                }
            },
            {new : true}
        )
        .populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
        

        // return response
        return res.status(200).json({
            success : true,
            message : "Section created successfully, and add in course",
            updatedCourse : updatedCourse,
        });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in creating Section",
            error : error.message,
        })
    }
}


// *************** update Section handler function *************** 
// update the name of the section

exports.updateSection = async (req, res) => {
    try{
        // fetch data
        const {sectionName, sectionId, courseId} = req.body;  

        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success : false,
                message : "Data missing",
            })
        }

        // update data
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new : true},
        )

        const updatedCourse = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
            path: "subSection",
            },
        });

        // return response
        return res.status(200).json({
            success : true,
            message : "Section name updated successfully",
            data : updatedCourse,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error in updating Section Name",
            error : error.message,
        })
    }
}


// *************** delete Section handler function *************** 

exports.deleteSection = async(req, res) => {
    try{
        // get Id -> assuming that we are sending Id in params
        const {sectionId, courseId} = req.body;

        // validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success : false,
                message : "Section ID is missing",
            });
        } 

        // delete section
        await Section.findByIdAndDelete(sectionId);
        // TODO [Testing] : we need to need to delete entry of this deleted section from course schema 
        // remove reference from course
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull : {
                    courseContent : sectionId,
                }
            },
            {new : true}
        ).populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        })



        // return response
        return res.status(200).json({
            success : true,
            message : "Section deleted successfully",
            data : updatedCourse
        })

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Error in deleting section",
            error : error.message,
        })
    }
}