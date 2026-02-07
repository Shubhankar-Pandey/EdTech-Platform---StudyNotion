import { useState } from "react";
import signupPageImage_for_Instructor from "../assets/Images/loginpageImageForInstructor.jpg"
import frame from "../assets/Images/frame.png"
import signupPageImage_for_Student from "../assets/Images/signup.webp"
import { CgAsterisk } from "react-icons/cg";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../Services/operation/authAPI";



function SignupPage(){

    const [createPasswordVisible, setCreatePasswordVisible] = useState(false);
    const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        accountType : "Student",
        firstName : "",
        lastName : "",
        email : "",
        createPassword : "",
        confirmPassword : "",
    })

    function selectRoleHandler(user){
        setFormData(prev => ({
            ...prev,
            accountType : user,
        }))
    }

    function changeHandler(e){
        setFormData(prev => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    function handleOnSubmit(e){
        e.preventDefault();

        if(formData.createPassword !== formData.confirmPassword){
            toast.error("Password do not match");
            return;
        }

        const signupData = {
            ...formData,
        }

        dispatch(setSignupData(signupData));

        dispatch(sendOtp(formData.email, navigate))

        setFormData({
            accountType : "Student",
            firstName: "",
            lastName: "",
            email: "",
            createPassword: "",
            confirmPassword: "",
        })

    }   



    return (
        <div>
            <div className="w-11/12 flex mx-auto mt-16 justify-evenly">

                {/* Part 1 - form  */}
                <div className="w-[40%]">

                    <p className="text-richblack-5 text-2xl">
                        Join the millions learning to code with StudyNotion for free
                    </p>
                    
                    <div className="flex bg-richblack-800 text-richblack-200
                     rounded-full w-[50%] border-b border-richblack-600 mt-9
                     hover:cursor-pointer"> 
                        <div onClick={() => selectRoleHandler("Student")}
                        className = {`w-[50%] m-1 rounded-full flex items-center p-2
                         justify-center
                          ${formData.accountType === "Student" ?
                           "bg-richblack-900 border-richblack-200 border-2 text-white" :
                            "" }`}>
                            <p className="">Student</p>
                        </div>
                        <div onClick={() => selectRoleHandler("Instructor")}
                         className={`w-[50%] m-1 rounded-full flex items-center p-2 
                         justify-center ${formData.accountType === "Instructor" ?
                          "bg-richblack-900 border-richblack-200 border-2 text-white" :
                           "" }`}>
                            <p>Instructor</p>
                        </div>
                    </div>

                    <form onSubmit={handleOnSubmit}>
                        
                        {/* First Name  & Last Name */}
                        <div className="flex mt-8 gap-2">

                            <div className="flex flex-col">
                                <label htmlFor="firstName" className="text-white font-thin text-sm mb-1 flex">
                                    First Name
                                    <CgAsterisk className="text-pink-200" />
                                </label>
                                <input onChange={changeHandler} 
                                type="text"
                                name = "firstName"
                                id="firstName"
                                required
                                value={formData.firstName}
                                className="text-richblack-200  p-2
                                bg-richblack-800 border-b border-richblack-600 rounded-md"
                                placeholder="Enter first name"></input>
                            </div>

                            <div className="flex flex-col w-[40%]">
                                <label htmlFor="lastName" className="text-white font-thin text-sm mb-1 flex">
                                    Last Name
                                    <CgAsterisk className="text-pink-200" />
                                </label>
                                <input onChange={changeHandler} 
                                type="text"
                                name = "lastName"
                                id="lastName"
                                required
                                value={formData.lastName}
                                className="text-richblack-200  p-2
                                bg-richblack-800 border-b border-richblack-600 rounded-md"
                                placeholder="Enter last name"></input>
                            </div>

                        </div>
                        
                        {/* Email  */}
                        <div className="flex flex-col mt-6">
                            <label htmlFor="email" className="text-white font-thin text-sm mb-1 flex">
                                Email Address
                                <CgAsterisk className="text-pink-200" />
                            </label>
                            <input onChange={changeHandler} 
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            className="text-richblack-200 w-[80%] p-2
                             bg-richblack-800 border-b border-richblack-600 rounded-md"
                            placeholder="Enter email address"></input>
                        </div>
                        
                        {/* Create Password and confirm Password  */}
                        <div className="flex gap-2 mt-6">

                            {/* Create Password  */}
                            <div className="flex flex-col">
                                <label htmlFor="createPassword" className="text-white font-thin text-sm mb-1 flex">
                                    Create Password
                                    <CgAsterisk className="text-pink-200" />
                                </label>
                                <div className="relative">
                                    <input onChange={changeHandler}
                                    type= {createPasswordVisible === true ? "text" : "password"}
                                    name = "createPassword"
                                    id="createPassword" 
                                    required
                                    value={formData.createPassword}
                                    className="text-richblack-200 w-full p-2
                                    bg-richblack-800 border-b border-richblack-600 rounded-md"
                                    placeholder="Enter Password">
                                    </input>
                            
                                    <button
                                    type="button"
                                    onClick={() => {
                                        setCreatePasswordVisible(!createPasswordVisible)
                                    }}
                                        className="absolute -translate-x-7 translate-y-3
                                        text-richblack-200 text-xl">
                                        {
                                            createPasswordVisible === true ? 
                                                <IoEyeOffSharp /> :
                                                <IoEyeSharp />
                                        } 
                                    </button>
                                                            
                                </div>
                                                        
                            </div>
                            
                            {/* Confirm Password  */}
                            <div className="flex flex-col">
                                <label htmlFor="confirmPassword" className="text-white font-thin text-sm mb-1 flex">
                                    Confirm Password
                                    <CgAsterisk className="text-pink-200" />
                                </label>
                                <div className="relative">
                                    <input onChange={changeHandler}
                                    type= {confirmPasswordVisible === true ? "text" : "password"}
                                    name = "confirmPassword"
                                    id="confirmPassword" 
                                    required
                                    value={formData.confirmPassword}
                                    className="text-richblack-200 w-full p-2
                                    bg-richblack-800 border-b border-richblack-600 rounded-md"
                                    placeholder="Enter Password">
                                    </input>
                            
                                    <button
                                    type="button"
                                    onClick={() => {
                                        setconfirmPasswordVisible(!confirmPasswordVisible)
                                    }}
                                        className="absolute -translate-x-7 translate-y-3
                                        text-richblack-200 text-xl">
                                        {
                                            confirmPasswordVisible === true ? 
                                                <IoEyeOffSharp /> :
                                                <IoEyeSharp />
                                        } 
                                    </button>
                                                            
                                </div>
                                                        
                            </div>

                        </div>

                        <button type="submit" className="mt-10 w-[80%] bg-yellow-50 p-2
                         rounded-md hover:scale-95 transition-all duration-200">
                            Create Account
                        </button>


                    </form>

                </div>



                {/* Part 2 - image  */}
                <div className="w-[40%] object-cover relative mt-6">
                    <img alt="frame" src={frame}/>
                    {
                        formData.accountType === "Student" ?
                        (<img alt="loginPageImage" src={signupPageImage_for_Student}
                            className="absolute z-10 -top-6 right-6"/>) 
                        : (<img alt="loginPageImage" src={signupPageImage_for_Instructor}
                            className="lg:h-[425px] absolute z-10 -top-6 right-6"/>)
                    }
                    
                </div>

            </div>

        </div>
    )
}

export default SignupPage;