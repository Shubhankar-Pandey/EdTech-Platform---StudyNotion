const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const User = require("../models/User")

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    )
    console.log("Email Res ", emailRes)

    const admin = await User.findOne({ accountType: "Admin" })
    const adminEmail = admin ? admin.email : "admin@studynotion.com"

    const adminHtml = `
      <div>
        <h2>New Contact Us Message</h2>
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countrycode} ${phoneNo}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `

    await mailSender(
      adminEmail,
      "New Contact Us Submission",
      adminHtml
    )

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}