import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCodes from "../../../data/countrycode.json"


function ContactUsForm(){

    const [loading, setLoading] = useState(false);

    const {
        register, 
        handleSubmit,
        reset,
        formState : {errors , isSubmitSuccessful}
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                firstName : "",
                lastName : "",
                email : "",
                message : "",
                phoneNo : "",
            })
        }
    }, [isSubmitSuccessful, reset])


    const submitContactForm = async(data) => {
        console.log(data);
    }


    return (
        <form className="text-richblack-5 flex flex-col items-center gap-5"
         onSubmit={handleSubmit(submitContactForm)}>
        
            {/* FirstName and LastName  */}
            <div className="flex w-full justify-between">

                {/* First Name  */}
                <div className="flex flex-col w-[45%]">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        placeholder="Enter first name"
                        name="firstName"
                        id="firstName"
                        className="text-richblack-200 bg-richblack-800
                        border-b border-richblack-600 rounded-md p-2"
                        {...register("firstName", {required:true})}
                    />
                    {
                        errors.firstName && (
                            <span>Please enter your first name</span>
                        )
                    }
                </div>

                {/* Last Name  */}
                <div className="flex flex-col w-[45%]">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        placeholder="Enter last name"
                        name="lastName"
                        id="lastName"
                        className="text-richblack-200 bg-richblack-800
                        border-b border-richblack-600 rounded-md p-2"
                        {...register("lastName")}
                    />
                </div>                

            </div>

            {/* Email  */}
            <div className="flex flex-col w-full">
                <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        placeholder="Enter your email address"
                        name="email"
                        id="email"
                        className="text-richblack-200 bg-richblack-800
                            border-b border-richblack-600 rounded-md p-2"
                        {...register("email", {required:true})}
                    />
                    {
                        errors.email && (
                            <span>Please enter your email</span>
                        )
                    }
            </div>

            {/* Phone No.  */}
            <div className="w-full">

                <label htmlFor="phonenumber">Phone Number</label>

                <div className="flex gap-5 justify-between">

                    {/* Drop down  */}
                    <select
                        name="dropdown"
                        id="dropdown"
                        {...register("countryCode", {required:true})}
                        className="text-richblack-200 bg-richblack-800
                            border-b border-richblack-600 rounded-md p-2 w-[30%]"
                    >
                        {
                            CountryCodes.map((element, index) => (
                                <option key={index} value={element.code}>
                                    {element.code} -{element.country}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.countryCode && (
                            <span>Please select your country code</span>
                        )
                        
                    }

                    {/* Phone Number  */}
                    <input
                        className="text-richblack-200 bg-richblack-800
                        border-b border-richblack-600 rounded-md p-2 w-[65%]"
                        type="number"
                        placeholder="91**********"
                        name="phonenumber"
                        id="phonenumber"
                        {...register("phonenumber",
                            {
                                required: true,
                                maxLength : {value:10, message : "Invalid phone number"},
                                minLength : {value:8, message : "Invalid phone number"},
                            })}
                    />
                    {
                        errors.phonenumber && (
                            <span>Please enter phone number</span>
                        )
                        
                    }
                    
                </div>
                

            </div>
            
            {/* Message  */}
            <div className="flex flex-col w-full">
                <label htmlFor="message">Message</label>
                    <textarea
                        placeholder="Enter your message"
                        name="message"
                        id="message"
                        cols="30"
                        rows="7"
                        {...register("message", {required:true})}
                        className="text-richblack-200 bg-richblack-800
                            border-b border-richblack-600 rounded-md p-2"
                    />
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }
            </div>
            
            <button type="submit" className="bg-yellow-50 p-2
                text-black rounded-md hover:scale-95
                 transition-all duration-200 w-full mt-4">
                    Send Message
            </button>

        </form>
    )
}

export default ContactUsForm;