import ContactUsForm from "../Contact Page/ContactUsForm";



function ContactFormSection(){
    return (
        <div className="flex flex-col items-center mt-40">
            <h1 className="text-3xl text-richblack-5">Get in Touch</h1>
            <p className="text-richblack-300 mt-3">We’d love to here for you,
                Please fill out this form.</p>
            <div className="mt-14">
                <ContactUsForm/>
            </div>
        </div>
    )
}

export default ContactFormSection;