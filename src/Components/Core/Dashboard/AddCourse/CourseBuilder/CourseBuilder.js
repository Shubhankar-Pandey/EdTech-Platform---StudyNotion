import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgAsterisk } from "react-icons/cg";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { FaArrowRight } from "react-icons/fa";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../Services/operation/courseDetailsAPI";


function CourseBuilder(){

    const [loading, setLoading] = useState(false);

    const { token } = useSelector((state) => state.auth);

    const {register, handleSubmit, formState:{errors}, getValues, setValue} = useForm()

    const[editSectionName, setEditSectionName] = useState(null);

    const {course} = useSelector((state) => state.course);

    const dispatch = useDispatch();


    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goNext = () => {
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one Secton");
            return;
        }
        if(course.courseContent.some((section) => section.length === 0)){
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        // if everything is good
        dispatch(setStep(3));
    }


    const onSubmit = async(data) => {
        setLoading(true);
        
        let result;

        if(editSectionName){
            // means abhi edit kar rahe hai
            result = await updateSection(
                {
                    sectionName : data.sectionName,
                    sectionId : editSectionName,
                    courseId : course._id
                },
                token,
            )
        }
        else{
            // means create section 
            result = await createSection(
                {
                    sectionName : data.sectionName,
                    courseId : course._id,
                },
                token,
            )
        }


        // values update karna hai
        // naya section add or update hua hai means course ki value change karni padegi
        if(result){
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        // loading ko false karo
        loading(false);

    }



    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
 
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    

    return (
        <div className="border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <p className="text-2xl"> Course Builder </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">

                <div className="flex flex-col gap-1">

                    <label htmlFor="sectionName" className="flex">
                        <p>Section name</p>
                        <CgAsterisk className="text-pink-200 text-sm"/> 
                    </label>

                    <input
                        id="sectionName"
                        placeholder="Add section name"
                        {...register("sectionName", {required:true})}
                        className="p-2 bg-richblack-700 text-richblack-5
                         rounded-md border-b-[1px] border-richblack-500 w-full"
                    />
                    {
                        errors.sectionName && (<span>Section name is required</span>)
                    }

                </div>

                <div className="flex items-end gap-8">

                    <button type="submit" className="border-[1px] border-yellow-50 text-yellow-50
                    rounded-md p-2 mt-6 hover:scale-95 transition-all duration-200">
                        {
                            editSectionName ? 
                            (<div className="flex items-center gap-2">
                                <p>Edit Section Name</p>
                                <IoAddCircleOutline />
                            </div>)
                            : (<div className="flex items-center gap-2">
                                <p>Create Section</p>
                                <IoAddCircleOutline />
                            </div>) 
                        }
                    </button>
                    {
                        editSectionName && <button type="button"
                         onClick={cancelEdit}
                        className="text-richblack-200 underline hover:text-richblack-25">
                            Cancel edit </button>
                    }

                </div>

            </form>


            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
                )
            }
            
            <div className="flex gap-6 justify-end mt-10">

                <button className="bg-richblack-300 py-2 px-6 font-bold rounded-md text-richblack-900
                hover:scale-95 transition-all duration-200"
                onClick={goBack}>
                    Back
                </button>

                <button className="bg-yellow-50 py-2 px-6 font-bold rounded-md text-richblack-900
                 flex items-center gap-2 hover:scale-95 transition-all duration-200"
                 onClick={goNext}>
                    <p>Next</p>
                    <FaArrowRight />
                </button>
            </div>


        </div>
    )
}

export default CourseBuilder;