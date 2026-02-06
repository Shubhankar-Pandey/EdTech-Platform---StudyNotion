import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { resetPassword } from "../Services/operation/authAPI";
import { CgAsterisk } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";


function UpdatePassword(){

    const dispatch = useDispatch();
    const location = useLocation();

    const {loading} = useSelector((state) => state.auth); 

    const [formData, setFormData] = useState({
        password : "",
        confirmPassword : "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    function handleOnChange(e){
        setFormData(prev => ({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split('/').pop();
        dispatch(resetPassword(formData.password, formData.confirmPassword, token));
    }



    return (
        <div className="text-white flex justify-center items-center">
            {
                loading ? 
                (
                    <div className="spinner mt-60"> </div>
                )
                : (
                    <div className="w-[30%] flex flex-col mt-20">
                        <h1 className="text-richblack-5 text-3xl">Choose new password</h1>
                        <p className="text-richblack-100 mt-5">Almost done. Enter your new password and youre all set.</p>

                        <form onSubmit={handleOnSubmit} className="flex flex-col gap-8 mt-6">

                            <label className="relative">
                                <div className="flex">
                                    <p className="text-richblack-5">New password</p>
                                    <CgAsterisk className="text-pink-200"/>
                                </div>
                                <input
                                    required
                                    type= {showPassword ? "text" : "password"}
                                    name="password"
                                    value = {formData.password}
                                    onChange={handleOnChange}
                                    className="p-2 text-richblack-200
                                        bg-richblack-800 border-b border-richblack-600
                                         rounded-md mt-1 w-full"
                                ></input>
                                <div className="absolute right-3 top-10">
                                    {
                                        showPassword ? 
                                        (
                                            <IoEyeOffSharp onClick={() => {setShowPassword(false)}}/>
                                        ) 
                                        : (
                                            <IoEyeSharp onClick={() => {setShowPassword(true)}}/>
                                        )
                                    }
                                </div>
                                
                            </label>
                            <label className="relative">
                                <div className="flex">
                                    <p className="text-richblack-5">Confirm new password</p>
                                    <CgAsterisk className="text-pink-200"/>
                                </div>
                                <input
                                    required
                                    type= {showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value = {formData.confirmPassword}
                                    onChange={handleOnChange}
                                    className="p-2 text-richblack-200
                                     bg-richblack-800 border-b border-richblack-600
                                        rounded-md mt-1 w-full"
                                ></input>
                                <div className="absolute right-3 top-10">
                                    {
                                        showConfirmPassword ? 
                                        (
                                            <IoEyeOffSharp onClick={() => {setShowConfirmPassword(false)}}/>
                                        ) 
                                        : (
                                            <IoEyeSharp onClick={() => {setShowConfirmPassword(true)}}/>
                                        )
                                    }
                                </div>
                                
                                
                                
                            </label>

                            <button type="submit" 
                            className="bg-yellow-50 p-2 rounded-md text-black
                            hover:scale-95 transition-all duration-200 mt-3">
                                Reset Password
                            </button>

                        </form>

                        <NavLink to="/login" className="mt-7 text-richblack-5 flex items-center gap-3
                        hover:underline transition-all duration-200 w-[35%]">
                            <FaArrowLeftLong />
                            <p>Back to login</p>
                        </NavLink>
                        
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;
