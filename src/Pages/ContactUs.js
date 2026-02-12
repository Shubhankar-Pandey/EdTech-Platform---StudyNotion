import { IoMdChatbubbles } from "react-icons/io";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import ContactUsForm from "../Components/Core/Contact Page/ContactUsForm"
import Footer from "../Components/Common/Footer"


function ContactUs(){
    return (
        <div>

            <div className="w-11/12 flex justify-between mx-auto mt-20 mb-60">
            
                {/* Left part */}
                <div className="bg-richblack-800 rounded-xl p-10
                flex flex-col gap-12 w-[35%] max-h-fit">

                    <div className="flex gap-2">
                        <div className="text-richblack-100 text-2xl">
                            <IoMdChatbubbles />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-richblack-5 font-bold">
                                Chat on us
                            </p>
                            <p className="text-richblack-200 text-sm">
                                Our friendly team is here to help.
                            </p>
                            <p className="text-richblack-200 text-sm font-bold">
                                @mail address
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="text-richblack-100 text-2xl">
                            <BsGlobeCentralSouthAsia />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-richblack-5 font-bold">
                                Visit us
                            </p>
                            <p className="text-richblack-200 text-sm">
                                Come and say hello to our office HQ.
                            </p>
                            <p className="text-richblack-200 text-sm font-bold">
                                Here is the location/ address
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="text-richblack-100 text-2xl">
                            <IoCall />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-richblack-5 font-bold">
                                Call us
                            </p>
                            <p className="text-richblack-200 text-sm">
                                Mon - Fri From 8am to 5pm
                            </p>
                            <p className="text-richblack-200 text-sm font-bold">
                                +123 456 7890
                            </p>
                        </div>
                    </div>

                </div>

                {/* Right part  */}
                <div className="w-[60%] border-[1px] border-richblack-600
                rounded-xl p-10">
                    <h1 className="text-richblack-5 text-4xl">
                        Got a Idea? We've got the skills.
                    </h1>
                    <h1 className="text-richblack-5 text-4xl">
                        Let's team up
                    </h1>
                    <p className="text-richblack-300 mt-3">
                        Tell us more about yourself and what you're got in mind
                    </p>

                    <div className="mt-10">
                        <ContactUsForm/>
                    </div>
                    
                </div>
            
            </div>

            <Footer/>


        </div>
        
    )
}

export default ContactUs;