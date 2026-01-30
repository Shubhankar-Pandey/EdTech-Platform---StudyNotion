const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// *************** update profile handler ***************

exports.updateProfile = async(req, res) => {
    try{
        // fetch data 
        const {contactNumber, gender, dateOfBirth = "", about = ""} = req.body;

        // get userId
        const userId = req.user.id; 

        // validation 
        if(!contactNumber || !gender || !userId){
            return res.status(400).json({
                success : false,
                message : "Details missing, fill the required details", 
            });
        }

        // get user
        const user = await User.findById(userId);

        // get profile from user schma
        const profileId = user.additionalDetail; 

        // update profile schema
        const updatedProfile = await Profile.findByIdAndUpdate(
            {_id : profileId},
            {
                gender : gender,
                contactNumber : contactNumber,
                dateOfBirth : dateOfBirth,
                about : about
            },
            {new : true},
        )

        // return response
        return res.status(200).json({
            success : true,
            message : "User's profile updated successfully",
            updatedProfile,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error while updating profile",
            error : error.message,
        })
    }
};


// *************** delete Account ***************
// explore -> how can we schedule this deletion operation

exports.deleteAccount = async(req, res) => {
    try{
        // get id
        const id = req.user.id;

        // validation
        const userDetail = await User.findById({_id : id});
        if(!userDetail){
            return res.status(400).json({
                success : false,
                message : "Invalid user id",
            })
        }

        // HW : unenroll user from all enrolled courses
        

        // delete profile
        const profileId = userDetail.additionalDetail;
        await Profile.findByIdAndDelete({_id : profileId});

        // delete user
        await User.findByIdAndDelete({_id : id});
        
        // return response
        return res.status(200).json({
            success : true,
            message : "User profile deleted successfully",
        });

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "Error while deleting the user profile",
        });
    }
}


// *************** get all user detail handler ***************

exports.getAllUserDetails = async(req, res) => {
    try{
        // get id 
        const id = req.user.id;

        // validation and get user detail
        const userDetails = await User.findById(id).populate("additionalDetail").exec();

        // return response
        return res.status(200).json({
            success : true,
            message : "All user details fetched successfully",
            userDetails : userDetails,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Error while fetching the user details",
            error : error.message,
        });
    }
}



// **************** udpate profile image **************** 
exports.updateDisplayPicture = async (req, res) => {
    try {

        // validation
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture is required",
            });
        }
        // fetch data 
      const displayPicture = req.files.displayPicture
      const userId = req.user.id

      // start uploading
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      
      // update user
      const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )

      // return response
      res.status(200).json({
        success: true,
        message: "Image Updated successfully",
        data: updatedUser,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  

// **************** get enrolled courses of user ****************


exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};