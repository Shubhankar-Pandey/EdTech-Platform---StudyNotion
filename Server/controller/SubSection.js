const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// **************** creating subSection ****************

exports.createSubSection = async(req, res) => {
    try{
        // fetch data
        // console.log("reached in create subsection controller");
        // console.log("req body : ", req.body);

        const {title, description} = req.body;
        const {sectionId} = req.body;

        // extract file video
        const video = req.files.video;

        // console.log("video : ", video);

        // validation
        if(!title || !description || !sectionId || !video ){
            return res.status(400).json({
                success : false,
                message : "fill all the details",
            });
        }

        // console.log("validation checked")

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        // console.log("cloudinary uploaded successfully -> uploadDetails : ", uploadDetails);

        // create subsection
        const newSubSection = await SubSection.create({
            title,
            timeDuration : `${uploadDetails.duration}`,
            description,
            videoUrl : uploadDetails.secure_url,
        });

        // console.log("SubSection created")

        // push this subsection in section schema
        const updateSection = await Section.findByIdAndUpdate(
            {_id : sectionId},
            {
                $push : {
                    subSection : newSubSection._id,
                }
            },
            {new : true},
        ).populate("subSection")

        // console.log("everything done");

        // return response
        return res.status(200).json({
            success : true,
            message : "Subsection created successfully",
            data : updateSection,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error while creatig subsection",
            error : error.message,
        })
    }
}


// ****************** updated Subsection ****************** 

 exports.updateSubSection = async (req, res) => {
  // console.log("reached in updateSubSection controller -> request body = ", req.body);
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save();

      const updatedSection = await Section.findById(sectionId).populate("subSection");
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data : updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }



// ****************** delete subsection ******************

  exports.deleteSubSection = async (req, res) => {
    // console.log("delete subSection pe reach ho gaya hai");
    // console.log("request body : ", req.body);
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
      // console.log("subSection :", subSection);

      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection");
      // console.log("getting updated subSection");
      
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data : updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }