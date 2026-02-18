import { useSelector } from "react-redux";
import { MdOutlineFileUpload } from "react-icons/md";
import { updateDisplayPicture } from "../../../../Services/operation/SettingsAPI";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";



function Setting(){

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

    const [newProfilePic, setNewProfilePic] = useState(null);

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

        const submitContactForm = async(data) => {
            console.log(data);
        }



    function handleOnUpload(){
        if(!newProfilePic){
            toast.error("Please select an image");
        }
        else{
            updateDisplayPicture(token, newProfilePic);
        }
        
    }

    return (
        <div className="text-richblack-5 flex flex-col">
            <h1 className="text-2xl text-richblack-5"> Setting </h1>

            {/* Update profile picture  */}
            <div className="w-[70%] mx-20 mt-16 bg-richblack-800 p-4
             rounded-lg border-[1px] border-richblack-700
              flex items-center gap-8">

                <img alt="userImage" src={user.image}
                className="w-16 h-16 rounded-full"></img>

                <div>
                    <p>Change profile picture</p>
                    
                    <div className="flex gap-2">
                        <input
                        type="file"
                        className=" w-[80%] border-[1px] border-richblack-700 rounded-md
                                    file:mr-4 file:py-1 file:px-2 mt-2
                                    file:rounded-md 
                                    file:border-0 
                                    file:bg-richblack-700
                                    file:text-richblack-50
                                    hover:file:bg-richblack-600"
                        onChange={(e) => {
                            setNewProfilePic(e.target.value);
                        }}
                        />

                        <button className="bg-yellow-50 text-richblack-900
                                px-2 rounded-md mt-2 py-1 flex gap-1 items-center
                                hover:scale-95 transition-all duration-200"
                                onClick={handleOnUpload}>
                                <MdOutlineFileUpload className="text-xl"/>
                            Upload
                        </button>
                    </div>
                    
                </div>

            </div>

            {/* Update Profile Information  */}
            <div className="w-[70%] mx-20 mt-16 bg-richblack-800 p-4
             rounded-lg border-[1px] border-richblack-700
              flex flex-col items-center gap-8">
                <p>Profile Information</p>

                <form className="flex flex-col gap-4 w-11/12"
                onSubmit={handleSubmit(submitContactForm)}>

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
                                    <div className="flex gap-2">
                                        <label htmlFor="male">Male</label>
                                        <input 
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            {...register("gender")}
                                        />
                                    </div>
                                    {/* Female  */}
                                    <div className="flex gap-2">
                                        <label htmlFor="female">Female</label>
                                        <input 
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            {...register("gender")}
                                        />
                                    </div>
                                    {/* Other  */}
                                    <div className="flex gap-2">
                                        <label htmlFor="other">Other</label>
                                        <input 
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            {...register("gender")}
                                        />
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

        </div>
    )
}

export default Setting;