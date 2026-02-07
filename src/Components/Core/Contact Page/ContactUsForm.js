import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


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

    }


    return (
        <form onSubmit={handleSubmit(submitContactForm)}>

            <div>

                {/* First Name  */}
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


                {/* Last Name  */}
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



        </form>
    )
}

export default ContactUsForm;