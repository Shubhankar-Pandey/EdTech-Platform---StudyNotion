import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {addCourseDetails, editCourseDetails, fetchCourseCategories} from "../../../../Services/operation/courseDetailsAPI"
import { CgAsterisk } from "react-icons/cg";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import RequirementField from "./RequirementField"
import { setCourse, setStep } from "../../../../Slices/courseSlice";
import IconButton from "../../../Common/IconButton";
import toast from "react-hot-toast";


function CourseInformationForm(){

    const {token} = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors, isSubmitSuccessful},
    } = useForm();

    const dispatch = useDispatch();

    const {course, editCourse} = useSelector((state) => state.course);
    const [loading , setLoading] = useState(false);

    // console.log("course : ", course);
    // console.log("editCourse : ", editCourse);

    const [courseCategories, setCourseCategories] = useState([]);

    const getCategories = async() => {
        setLoading(true);
        const categories = await fetchCourseCategories();
        // console.log("cat : ", categories);
        if(categories.length > 0){
            setCourseCategories(categories);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTag", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("courseImage", course.thumbnail);
        }
        getCategories();
    }, [])


    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName 
            || currentValues.courseDescription !== course.courseDescription 
            || currentValues.coursePrice !== course.price 
            // || currentValues.courseTag.toString() !== course.tag 
            || currentValues.courseBenefits !== course.whatYouWillLearn 
            || currentValues.courseCategory !== course.category 
            || currentValues.courseRequirements.toString() !== course.instructions 
            // || currentValues.courseImage !== course.thumbnail 
        ){
            return true;
        }
        else return false;
    }


    // handle next button click 
    const onSubmit = async(data) => {

        if(editCourse){
            // means course edit karne aaye hai
            if(isFormUpdated()){
                const currentValues = getValues();

                const formData = new FormData();  
                formData.append("courseId", course._id);

                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }
                if(currentValues.courseDescription !== course.courseDescription){
                    formData.append("courseDescription", data.courseDescription);
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice);
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentValues.courseCategory !== course.category){
                    formData.append("category", data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                // if(currentValues.courseTag !== course.tag){
                //     formData.append("tag", data.courseTag);
                // }
                // if(currentValues.courseImage !== course.thumbnail){
                //     formData.append("thumbnail", data.courseImage);
                // }


                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made to the form");
            }
            return ;
        }  
        

        // create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        // formData.append("status", COURSE_STATUS.DRAFT);

        // console.log("formData : ", [...formData.entries()]);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
            setLoading(false);
        }
    }



    return (
        <div className="text-richblack-5">
            
            <form onSubmit={handleSubmit(onSubmit)}
            className="border-[1px] border-richblack-700 bg-richblack-800
            p-6 flex flex-col gap-8 rounded-md text-sm">
                
                {/* Title  */}
                <div className="flex flex-col gap-1">
                    <label className="flex" htmlFor="courseTitle">
                        <p> Course Title </p>
                        <CgAsterisk className="text-pink-200 text-sm"/>
                    </label>
                    <input
                        id="courseTitle"
                        placeholder="Enter course Title"
                        {...register("courseTitle", {required:true})}
                        className="p-2 bg-richblack-700 text-richblack-5
                         rounded-md border-b-[1px] border-richblack-500"
                    />
                </div>
                {
                    errors.courseTitle && (
                        <span>Course Title is Required**</span>
                    )
                }

                {/* Course Description  */}
                <div className="flex flex-col gap-1">
                    <label className="flex" htmlFor="courseShortDescription">
                        <p> Course Short Description </p>
                        <CgAsterisk className="text-pink-200 text-sm"/>
                    </label>
                    <textarea
                        rows="4"
                        id="courseShortDescription"
                        placeholder="Enter Description"
                        {...register("courseDescription", {required:true})}
                        className="p-2 bg-richblack-700 text-richblack-5
                        rounded-md border-b-[1px] border-richblack-500"
                    />
                </div>
                {
                    errors.courseShortDescription && (
                        <span>Course Description is Required**</span>
                    )
                }

                {/* Price  */}
                <div className="flex flex-col gap-1">
                    <label className="flex" htmlFor="coursePrice">
                        <p> Price </p>
                        <CgAsterisk className="text-pink-200 text-sm"/>
                    </label>
                    <div className="p-2 bg-richblack-700 text-richblack-5
                    rounded-md border-b-[1px] border-richblack-500
                     flex gap-2 items-center">
                        <HiOutlineCurrencyRupee className="text-2xl text-richblack-100"/>
                        <input
                        type="number"
                        id="coursePrice"
                        placeholder="Enter Course Price"
                        {...register("coursePrice", {required:true, valueAsNumber : true})}
                        className="px-2 py-1 bg-richblack-700 border-[1px] border-richblack-600 rounded-md"
                    />
                    </div>
                    
                </div>
                {
                    errors.coursePrice && (
                        <span>Course Price is Required**</span>
                    )
                }

                {/* Category  */}
                <div className="flex flex-col gap-1">
                    <label className="flex" htmlFor="courseCategory">
                        <p> Category </p>
                        <CgAsterisk className="text-pink-200 text-sm"/>
                    </label>
                    <select id="courseCategory"
                     className="p-2 bg-richblack-700 text-richblack-5
                        rounded-md border-b-[1px] border-richblack-500"
                        defaultValue=""
                        {...register("courseCategory", {required:true})}
                    >
                        <option value="">Select Category</option>
                        {
                            !loading && courseCategories.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                {
                    errors.courseCategory && (
                        <span>Course category is Required***</span>
                    )
                }


                {/* create custom component for handling tags input  */}
                {/* <ChipInput
                    label="Tags"
                    name = "courseTags"
                    placeholder = "Enter tags and press enter"
                    registe = {register}
                    errors = {errors}
                    setValue = {setValue}
                    getValues = {getValues}
                /> */}



                {/* create a component for uploading and showing preview of media  */}
                {/* <Upload
                    name = ""
                    label = ""
                    register = {register}
                    errors = {errors}

                /> */}


                {/* Course benefits  */}
                <div className="flex flex-col gap-1">
                    <label className="flex" htmlFor="courseBenefits">
                        <p> Benefits of the course </p>
                        <CgAsterisk className="text-pink-200 text-sm"/>
                    </label>
                    <textarea
                        rows="4"
                        id="courseBenefits"
                        placeholder="Enter Benefits of the course"
                        {...register("courseBenefits", {required:true})}
                        className="p-2 bg-richblack-700 text-richblack-5
                        rounded-md border-b-[1px] border-richblack-500"
                    />
                </div>
                {
                    errors.courseBenefits && (
                        <span>Course Benefit is Required**</span>
                    )
                }

                <RequirementField
                    name = "courseRequirements"
                    label = "Requirements / Instructions"
                    register = {register}
                    errors = {errors}
                    setValue = {setValue}
                    getValues = {getValues}
                />
                
                {/* Buttons at last  */}
                <div>
                    {
                        editCourse && (
                            <button 
                            onClick={() => dispatch(setStep(2))}>
                                Continue without saving 
                            </button>
                        )
                    }

                    <IconButton
                        customClasses={"bg-yellow-50 px-6 py-2 rounded-md text-richblack-900 font-bold transition-all duration-200 hover:scale-95"}
                        text = {!editCourse ? "Next" : "Save Changes"}
                    />
                </div>

                

            </form>

        </div>
    )
}

export default CourseInformationForm;