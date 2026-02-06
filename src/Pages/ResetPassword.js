import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPasswordResetToken } from "../Services/operation/authAPI";
import { CgAsterisk } from "react-icons/cg";
import { FaArrowLeftLong } from "react-icons/fa6";


function ResetPassword(){

    const {loading} = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const dispatch = useDispatch();


    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }


    return (
        <div className="flex justify-center items-center">
            {
                loading ? 
                (<div className="spinner mt-60"> </div>) 
                : (
                    <div className="w-[30%] flex flex-col mt-20"> 
                        <h1 className="text-richblack-5 text-3xl">
                            {
                                !emailSent ? "Reset your password" : "Check your email"
                            }
                        </h1> 

                        <p className="text-richblack-100 mt-5">
                            {
                                !emailSent ? 
                                 "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                                 : `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handleOnSubmit} className="flex flex-col gap-7 mt-10">
                            {
                                !emailSent && (
                                    <label>
                                        <div className="flex">
                                            <p className="text-richblack-5">Email Address</p>
                                            <CgAsterisk className="text-pink-200"/>
                                        </div>
                                        <input 
                                        type="email"
                                        required
                                        name="email"
                                        value = {email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter registered email address"
                                        className="p-2 text-richblack-200
                                        bg-richblack-800 border-b border-richblack-600
                                         rounded-md mt-1 w-full">
                                        </input>
                                    </label>
                                )
                            }

                            <button type="submit" className="bg-yellow-50 p-2 rounded-md text-black
                            hover:scale-95 transition-all duration-200">
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
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

export default ResetPassword;