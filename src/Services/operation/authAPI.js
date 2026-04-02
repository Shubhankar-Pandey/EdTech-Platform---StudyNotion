import { toast } from "react-hot-toast"
import { setUser } from "../../Slices/profileSlice";
// import {setLoading, setToken} from "../../Slices/authSlice" 
import {setLoading} from "../../Slices/authSlice" 
import { resetCart, setCartState } from "../../Slices/cartSlice";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  LOGOUT_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints






export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}




export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  createPassword,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        createPassword,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}




export function login(email, password, navigate) {
  console.log("reached in login operations");
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("before calling api");
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      },{
        withCredentials: true,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")

      const userImage = response.data?.user?.image 
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      
        dispatch(setUser({ ...response.data.user, image: userImage }))

      const userId = response.data.user._id;
      const savedCart = localStorage.getItem(`cart_${userId}`);
      const savedTotal = localStorage.getItem(`total_${userId}`);
      const savedTotalItems = localStorage.getItem(`totalItems_${userId}`);

      if (savedCart && savedTotal && savedTotalItems) {
        dispatch(setCartState({
          cart: JSON.parse(savedCart),
          total: JSON.parse(savedTotal),
          totalItems: JSON.parse(savedTotalItems)
        }));
      }

      navigate("/dashboard/my-profile")
      
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}





export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

            console.log("Reset password token response.... = ", response);

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




export function logout(navigate) {
  // console.log("logout hit");
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await apiConnector("POST", LOGOUT_API, null, {
        withCredentials: true,
      });

      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user._id) {
          const userId = user._id;
          const currentCart = localStorage.getItem("cart");
          const currentTotal = localStorage.getItem("total");
          const currentTotalItems = localStorage.getItem("totalItems");
          
          if (currentCart) localStorage.setItem(`cart_${userId}`, currentCart);
          if (currentTotal) localStorage.setItem(`total_${userId}`, currentTotal);
          if (currentTotalItems) localStorage.setItem(`totalItems_${userId}`, currentTotalItems);
        }
      }

      dispatch(setUser(null));
      dispatch(resetCart());
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.log("LOGOUT API ERROR............", error);
      toast.error("Logout Failed");
    }
    dispatch(setLoading(false));
  };
}