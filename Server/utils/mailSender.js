const nodemailer = require("nodemailer");

// It is a 2 step process 
// 1.) Create transporter
// 2.) SendMail using transporter

const mailSender = async (email, title, body) => {
    try{
        // create transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST, 
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS,
            }
        })

        // send mail using transporter
        let info = await transporter.sendMail({
            from : 'StudyNotion || CodeHelp - by Babbar',
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        })
        return info;
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;