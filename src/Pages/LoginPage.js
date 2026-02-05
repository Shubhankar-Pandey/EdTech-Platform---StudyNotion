import loginPageImage_for_Student from "../assets/Images/login.webp"
import loginPageImage_for_Instructor from "../assets/Images/loginpageImageForInstructor.jpg"
import frame from "../assets/Images/frame.png"
import { NavLink } from "react-router-dom";
import { CgAsterisk } from "react-icons/cg";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";


function LoginPage(){

    const [isVisible, setVisible] = useState(false);

    const [formData, setFormValue] = useState({
        role : "Student",
        email : "",
        password : "",
    })

    function selectRoleHandler(user){
        setFormValue(prev => ({
            ...prev,
            role : user,
        }));
    }

    function emailHandler(event){
        setFormValue(prev => ({
        ...prev,
        email: event.target.value,
    }));
    }

    function passwordHandler(event){
        setFormValue(prev => ({
            ...prev,
            password : event.target.value,
        }));
    }

    
    return (
        <div>
            <div className="w-11/12 flex mx-auto mt-16 justify-evenly">

                {/* Part 1 */}
                <div className="w-[40%]">

                    <p className="text-richblack-5 text-3xl">Welcome Back</p>
                    <p className="text-richblack-100 mt-2">Build skills for today,
                         tommorrow and beyond.</p>
                    
                    <div className="flex bg-richblack-800 text-richblack-200
                     rounded-full w-[50%] border-b border-richblack-600 mt-8
                     hover:cursor-pointer"> 
                        <div onClick={() => selectRoleHandler("Student")}
                        className = {`w-[50%] m-1 rounded-full flex items-center p-2
                         justify-center
                          ${formData.role === "Student" ?
                           "bg-richblack-900 border-richblack-200 border-2 text-white" :
                            "" }`}>
                            <p className="">Student</p>
                        </div>
                        <div onClick={() => selectRoleHandler("Instructor")}
                         className={`w-[50%] m-1 rounded-full flex items-center p-2 
                         justify-center ${formData.role === "Instructor" ?
                          "bg-richblack-900 border-richblack-200 border-2 text-white" :
                           "" }`}>
                            <p>Instructor</p>
                        </div>
                    </div>
                    
                    <form>
                        <div className="flex flex-col mt-8">
                            <label htmlFor="email" className="text-white font-thin text-sm mb-1 flex">
                                Email Address
                                <CgAsterisk className="text-pink-200" />
                            </label>
                            <input onChange={emailHandler} 
                            type="text"
                            id="email"
                            required
                            value={formData.email}
                            className="text-richblack-200 w-[80%] p-2
                            bg-richblack-800 border-b border-richblack-600 rounded-md"
                            placeholder="Enter email address"></input>
                        </div>

                        <div className="flex flex-col mt-8">
                            <label htmlFor="password" className="text-white font-thin text-sm mb-1 flex">
                                Password
                                <CgAsterisk className="text-pink-200" />
                            </label>
                            <div className="relative w-[80%]">
                                <input onChange={passwordHandler}
                                type= {isVisible === true ? "text" : "password"}
                                id="password" 
                                required
                                value={formData.password}
                                className="text-richblack-200 w-full p-2
                                bg-richblack-800 border-b border-richblack-600 rounded-md"
                                placeholder="Enter Password">
                                </input>

                                <button
                                 type="button"
                                 onClick={() => {
                                    // e.preventDefault();
                                    setVisible(!isVisible)
                                }}
                                 className="absolute -translate-x-7 translate-y-3
                                 text-richblack-200 text-xl">
                                    {
                                        isVisible === true ? 
                                            <IoEyeOffSharp /> :
                                            <IoEyeSharp />
                                    } 
                                </button>
                                
                            </div>
                            
                        </div>

                        <div className="text-blue-200 flex justify-end
                        w-[80%] font-light text-sm p-1 hover:text-blue-50">
                            <NavLink>Forgot Password</NavLink>
                        </div>

                        <button type="submit" className="mt-8 w-[80%] bg-yellow-50 p-2
                        rounded-md hover:scale-95 transition-all duration-200">
                            Login
                        </button>

                    </form>
                
                </div>

                {/* Part 2 - image  */}
                <div className="w-[40%] object-cover relative mt-6">
                    <img alt="frame" src={frame}/>
                    {
                        formData.role === "Student" ?
                        (<img alt="loginPageImage" src={loginPageImage_for_Student}
                            className="absolute z-10 -top-6 right-6"/>) 
                        : (<img alt="loginPageImage" src={loginPageImage_for_Instructor}
                            className="lg:h-[425px] absolute z-10 -top-6 right-6"/>)
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default LoginPage;

 