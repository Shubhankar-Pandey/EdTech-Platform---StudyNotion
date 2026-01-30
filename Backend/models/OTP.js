const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email : {
        required : true,
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 5*60, // the document will be automatically
                        // deleted after 5 minutes of its creation time
    },
    otp : {
        type : String,
        required : true,
    },
})


// function to send email
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification email from StudyNotion", otp);
        console.log("Email send successfullly : ", mailResponse);
    }   
    catch(error){
        console.log("Error occurred in sending mail : ", error);
    }
}


// post save hook
otpSchema.post("save", async function (doc) {
    try {
        await sendVerificationEmail(doc.email, doc.otp);
    } catch (err) {
        console.error("OTP email failed:", err);
    }
});


module.exports = mongoose.model("OTP", otpSchema);