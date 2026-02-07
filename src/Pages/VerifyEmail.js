import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { NavLink } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { signUp, sendOtp } from "../Services/operation/authAPI";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function VerifyEmail(){

    const {loading, signupData} = useSelector((state) => state.auth);

    const [otp, setotp] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData){
            navigate("/signup");
        }
    }, [signupData, navigate])


    function handleOnSubmit(e){
        e.preventDefault();
        
        const {
            accountType,
            firstName,
            lastName,
            email,
            createPassword,
            confirmPassword,
        } = signupData;

        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            createPassword,
            confirmPassword,
            otp,
            navigate
        ));
    }
 


    return (
        <div className="text-white flex justify-center items-center mt-20">
            { 
                loading ? 
                (<div className="spinner mt-60"></div>)
                : (<div className="w-[30%]">

                    <h1 className="text-richblack-5 text-3xl">Verify email</h1>
                    <p 
                        className="text-richblack-100 mt-5">
                        A verification code has been sent to you. Enter the code below
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        <OTPInput
                            value = {otp}
                            onChange={setotp}
                            numInputs={6}
                            renderSeparator={<span className="rotate-90 mx-3 mt-5">|</span>}
                            renderInput={(props) => <input {...props}
                            placeholder="-"
                            className=" bg-richblack-600 text-richblack-5 mt-5
                            text-4xl rounded-md h-12 w-12"
                            />}
                        />
                        <button type="submit"
                        className="bg-yellow-50 p-2 rounded-md text-black
                            hover:scale-95 transition-all duration-200 mt-5 w-full">
                            Verify email
                        </button>
                    </form>
                    
                    <div className="flex justify-between items-center mt-5 w-full">

                        <NavLink to="/login" className="text-richblack-5 flex items-center gap-3
                            hover:underline transition-all duration-200 w-[35%]">
                            <FaArrowLeftLong />
                            <p className="hover">Back to login</p>
                        </NavLink>

                        <button className="hover:text-blue-100"
                        onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                            Resend it
                        </button>

                    </div>
                    

                </div>)
            }
        </div>
    )
}

export default VerifyEmail;