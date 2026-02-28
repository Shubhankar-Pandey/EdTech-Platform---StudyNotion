import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../Common/IconButton";
import { IoCaretBackOutline } from "react-icons/io5";
import { resetCourseState, setStep } from "../../../../../Slices/courseSlice";
import { editCourseDetails } from "../../../../../Services/operation/courseDetailsAPI";
import { useNavigate } from "react-router-dom";





function PublishForm(){

    const {register, handleSubmit, setValue, getValues} = useForm();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if(course?.status === "Published"){
            setValue("public", true);
        }
    }, [])


    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async() => {
        // console.log("reached in handleCoursePublish and getValues(public) : ", getValues("public"));
        if((course?.status === "Published" && getValues("public")  === true) ||
            (course?.status === "Draft" && getValues("public") === false)){
            // means form update nahi hua hai
            // no need to make API call
            goToCourses();
            return;
        }
        // if form is Updated
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? "Published" : "Draft";
        formData.append("status", courseStatus);

        // console.log("fromData : ", [...formData.entries()]);

        // now API call karenge
        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }

        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }



    return (
        <div className="border-[1px] border-richblack-700 p-6 bg-richblack-800 rounded-lg">

            <p>Publish Course</p>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        className="h-4 w-4"
                    />
                    <label htmlFor="public">Make this course as Public</label>
                </div>

                <div className="flex justify-between mt-16">
                    <button
                        disabled = {loading}
                        type="button"
                        onClick={goBack}
                        className="bg-richblack-600 border-b-[1px] border-richblack-300 py-2 px-4
                         rounded-md hover:scale-95 transition-all duration-200 font-bold 
                         flex items-center gap-2"
                    > <span><IoCaretBackOutline /></span>Back</button>

                    <IconButton
                        disabled={loading}
                        text="Save Changes"
                        customClasses={"bg-yellow-50 px-4 py-2 text-richblack-900 font-bold rounded-md hover:scale-95 transition-all duration-200"}
                    />
                </div>

            </form>

        </div>
    )
}


export default PublishForm;