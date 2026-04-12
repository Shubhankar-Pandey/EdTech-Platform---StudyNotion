import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../Services/operation/courseDetailsAPI";
import { setCourse } from "../../../../../Slices/courseSlice";
import { IoClose } from "react-icons/io5";
import IconButton from "../../../../Common/IconButton";
import Upload from "../Upload"
import { CgAsterisk } from "react-icons/cg";



function SubSectionModal({ modalData, setModalData, add = false, view = false, edit = false }) {

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);


    const { course } = useSelector((state) => state.course);


    useEffect(() => {
        if (view || edit) {
            // means course create ho chuka hai
            setValue("lectureTitle", modalData.title);
            setValue("lectureDescription", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, [])


    const isFormUpdated = () => {
        const currValues = getValues();
        if (currValues.lectureTitle !== modalData.title ||
            currValues.lectureDescription !== modalData.description ||
            currValues.lectureVideo !== modalData.videoUrl
        ) {
            return true;
        }
        else {
            return false;
        }

    }


    const handleEditSubSection = async () => {
        const currValues = getValues();

        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currValues.lectureTitle !== modalData.title) {
            formData.append("title", currValues.lectureTitle);
        }
        if (currValues.lectureDescription !== modalData.description) {
            formData.append("description", currValues.lectureDescription);
        }
        if (currValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currValues.lectureVideo);
        }

        setLoading(true);

        // API CALL
        const result = await updateSubSection(formData);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id.toString() === modalData.sectionId.toString() ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);

        setLoading(false);
    }


    const onSubmit = async (data) => {
        // console.log("on submit triggred");
        // console.log("data passed in onSubmit function : ", data);

        if (view) {
            // means bs view karna hai , kuch aur nahi karna hai 
            return;
        }

        if (edit) {
            // means edit karne aaye hai
            if (!isFormUpdated()) {
                toast.error("No changes made to the form");
            }
            else {
                // edit karna padega
                handleEditSubSection(data);
            }
            return;
        }


        const formData = new FormData();

        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("video", data.lectureVideo);

        setLoading(true);

        // console.log("before api call");

        // API CALL
        const result = await createSubSection(formData);

        // console.log("after api call result : ", result);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id.toString() === modalData.toString() ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            // console.log("course before created new subsection : ", course);
            dispatch(setCourse(updatedCourse));
            // console.log("coures after created new subsection : ", course);
        }

        setModalData(null);
        setLoading(false);
    }




    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

                <div className="flex justify-between items-center bg-richblack-700 p-5 rounded-t-lg">
                    <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={() => (!loading && setModalData(null))}>
                        <IoClose className="text-2xl text-richblack-5 hover:text-richblack-100" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10 text-richblack-5">

                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    <div className="flex flex-col w-full mt-5 gap-1">
                        <label htmlFor="lectureTitle" className="flex">
                            <p>Lecture Title</p>
                            <CgAsterisk className="text-sm text-pink-200" />
                        </label>
                        <input
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="p-2 bg-richblack-700 text-richblack-5
                            rounded-md border-b-[1px] border-richblack-500"
                        />
                        {errors.lectureTitle && (<span className="mt-1 text-[12px] text-yellow-100">Lecture Title is Required</span>)}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="lectureDescription" className="flex mt-5">
                            <p>Lecture Description</p>
                            <CgAsterisk className="text-sm text-pink-200" />
                        </label>
                        <textarea
                            id="lectureDescription"
                            rows="4"
                            placeholder="Enter lecture Description"
                            {...register("lectureDescription", { required: true })}
                            className="p-2 bg-richblack-700 text-richblack-5
                            rounded-md border-b-[1px] border-richblack-500 min-h-[130px] w-full"
                        />
                        {errors.lectureDescription && (<span className="mt-1 text-[12px] text-yellow-100">Lecture description is required</span>)}
                    </div>

                    {
                        !view && (
                            <div className="mt-5 flex justify-end">
                                <IconButton
                                    text={loading ? "loading..." : edit ? "Save Changes" : "Save"}
                                    customClasses={"bg-yellow-50 rounded-md hover:scale-95 transition-all duration-200 text-richblack-900 font-bold py-2 px-4"}
                                />
                            </div>
                        )
                    }

                </form>

            </div>

        </div>
    )
}

export default SubSectionModal;