import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import ChangeProfilePicture from "./ChangeProfilePicture";



function Setting(){

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

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
                    contactNumber : "",
                    dateOfBirth : "",
                    gender : "",
                    about : "",
                })
            }
        }, [isSubmitSuccessful, reset])

        const updateProfileDetails = async(data) => {
            console.log(data);
        }


    return (
        <div className="text-richblack-5 flex flex-col">
            <h1 className="text-2xl text-richblack-5"> Settings </h1>

            {/* Update profile picture  */}
            <ChangeProfilePicture/>

            {/* Update Profile Information  */}
            <div className="w-[70%] mx-20 mt-16 bg-richblack-800 p-4
             rounded-lg border-[1px] border-richblack-700
              flex flex-col items-center gap-8">
                <p>Profile Information</p>

                <form className="flex flex-col gap-4 w-11/12"
                onSubmit={handleSubmit(updateProfileDetails)}>

                        {/* First name and last name  */}
                        <div className="flex justify-between">
                            {/* First Name  */}
                            <div className="flex flex-col w-[40%]">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name = "firstName"
                                    placeholder={user.firstName}
                                    className="bg-richblack-700 text-richblack-200
                                    border-b-[1px] border-richblack-300 rounded-md p-2"
                                    {...register("firstName")}
                                />
                            </div>
                            {/* Last name  */}
                            <div className="flex flex-col w-[40%]">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name = "lastName"
                                    placeholder={user.lastName}
                                    className="bg-richblack-700 text-richblack-200
                                    border-b-[1px] border-richblack-300 rounded-md p-2"
                                    {...register("lastName")}
                                />
                            </div>
                        </div>

                        {/* Date of birth and gender  */}
                        <div className="flex justify-between">

                            {/* Date of birth  */}
                            <div className="flex flex-col w-[40%]">
                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className="bg-richblack-700 text-richblack-200
                                    border-b-[1px] border-richblack-300 rounded-md p-2"
                                    placeholder= {user.dateOfBirth && user.dateOfBirth } 
                                    {...register("dateOfBirth")}
                                />
                            </div>
                            {/* Gender  */}
                            <div className="w-[40%]">
                                <label htmlFor="gender">Gender</label>

                                <div className="bg-richblack-700 rounded-md
                                border-b-[1px] border-richblack-300 p-2
                                flex justify-evenly">
                                    {/* Male  */}
                                    <div className="flex gap-1">
                                        <input 
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            {...register("gender")}
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    {/* Female  */}
                                    <div className="flex gap-1">
                                        <input 
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            {...register("gender")}
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    {/* Other  */}
                                    <div className="flex gap-1">
                                        <input 
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            {...register("gender")}
                                        />
                                        <label htmlFor="other">Other</label>
                                    </div>
                                </div>

                            </div>
                            
                        </div>

                        {/* Contact number and about  */}
                        <div className="flex justify-between">
                            {/* Contact number */}
                            <div className="flex flex-col w-[40%]">
                                <label htmlFor="contactNumber">Contact Number</label>
                                <input
                                    type="number"
                                    name = "contactNumber"
                                    placeholder={user.contactNumber ? user.contactNumber : "91*******"}
                                    className="bg-richblack-700 text-richblack-200
                                    border-b-[1px] border-richblack-300 rounded-md p-2"
                                    {...register("contactNumber")}
                                />
                            </div>
                            {/* about  */}
                            <div className="flex flex-col w-[40%]">
                                <label htmlFor="about">About</label>
                                <input
                                    type="text"
                                    name = "about"
                                    placeholder={user.about ? 
                                        user.about.length > 10 ?
                                         user.about.substring(0, 10) + "....." : user.about 
                                    : "Write about yourself"}
                                    className="bg-richblack-700 text-richblack-200
                                    border-b-[1px] border-richblack-300 rounded-md p-2"
                                    {...register("about")}
                                />
                            </div>
                        </div>
                        
                        {/* Save and cancel button  */}
                        <div className="flex justify-center gap-4 mt-10">

                            <button
                            className="w-[40%] bg-yellow-50 rounded-md text-richblack-900 p-2
                            transition-all duration-200 hover:scale-95"
                            type="submit">Save</button>

                            <button
                            className="w-[40%] bg-richblack-700 rounded-md text-richblack-5
                            p-2 transition-all duration-200 hover:scale-95 border-b-[1px]
                            border-richblack-300"
                            type="button"
                            onClick={reset}
                            >Cancel</button>

                        </div>
                        
                </form>
            
            </div>

            {/* Delete account  */}
            <div className="w-[70%] mx-20 mt-16 gap-6 flex p-6 rounded-md
                border-[1px] border-pink-700 bg-pink-900">
                    <div className="bg-pink-700 p-3 rounded-full max-h-min">
                        <RiDeleteBin6Line className="text-pink-200 text-3xl"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Delete Account</h2>
                        <p className="text-pink-25 mt-4">Would you like to delete account ?</p>
                        <p className="text-pink-25 mt-2">This account contains Paid Courses.
                            Deleting your account will remove all the contain
                            associated with it.
                        </p>
                        <p className="text-pink-300 mt-2">
                            I want to delete my account.
                        </p>
                    </div>
            </div>

        </div>
    )
}

export default Setting;