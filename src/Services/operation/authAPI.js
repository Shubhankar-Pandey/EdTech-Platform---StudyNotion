import { toast } from "react-hot-toast"

import {setLoading, setToken} from "../../Slices/authSlice" 
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints


export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

            // console.log("Reset password token response.... = ", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);

        }
        catch(error){
            console.log("RESET PASSWORD TOKEN ERROR... = ", error);
            toast.error("Fail to sent reset email");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});

            // console.log("Reset password token response.... = ", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password updated successfully");
        }
        catch(error){
            console.log("Error in updatin password ->  ERROR = ", error);
            toast.error("Fail to update password");
        }
        dispatch(setLoading(false));
    }
}