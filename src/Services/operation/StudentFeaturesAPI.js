import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzplogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice"



const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;


function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
} 


async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error){
        console.log("Payment success email error .... , : ", error);
    }
}

// verify payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, 
            {Authorization : `Bearer ${token}`}
        )

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment successfull, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(error){
        console.log("Verify payment error.... : ", error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}



export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading.....");
    try{
        // load the script 
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay payment SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            {courses},
            {Authorization: `Bearer ${token}`}
        )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        // options 
        const options = {
            key : process.env.RAZORPAY_KEY,
            currency : orderResponse.data.message.currency,
            amount : `${orderResponse.data.message.amount}`,
            order_id : orderResponse.data.message.id,
            name : "StudyNotion",
            decription : "Thank you for purchasing the course",
            image : rzplogo,
            prefill : {
                name : `${userDetails.firstName}`,
                email : `${userDetails.email}`,
            },
            handler : function(response){
                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch);
                // send successfull wala mail 
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("Payment failed");
            console.log("error : ", response.error);
        })

    }
    catch(err){
        console.log("PAYMENT API ERROR.....");
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}
