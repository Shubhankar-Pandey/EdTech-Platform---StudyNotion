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
        const {sectionName, sectionId} = req.body;  

        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success : false,
                message : "Data missing",
            })
        }

        // update data
        const updatedSection = await Section.findByIdAndUpdate(
            {sectionId},
            {sectionName},
            {new : true},
        )

        // return response
        return res.status(200).json({
            success : true,
            message : "Section name updated successfully",
            updatedSection : updatedSection,
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
        const {sectionId} = req.params;

        // validation
        if(!sectionId){
            return res.status(400).json({
                success : false,
                message : "Section ID is missing",
            });
        } 

        // delete section
        await Section.findByIdAndDelete(sectionId);
        // TODO [Testing] : do we need to need to delete entry from course schema ??
        // Answer -> Nahi karna padega auto update ho jaayega 
        // Find out -> auto update kaise ho gaya ?


        // return response
        return res.status(200).json({
            success : true,
            message : "Section deleted successfully"
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