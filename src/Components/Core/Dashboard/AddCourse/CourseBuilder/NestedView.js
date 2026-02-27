import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../Common/ConfirmationModal"
import { deleteSection, deleteSubSection } from "../../../../../Services/operation/courseDetailsAPI";
import { setCourse } from "../../../../../Slices/courseSlice";




function NestedView({handleChangeEditSectionName}){

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    // console.log("course data in nested view section : ", course);


    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId : course._id,
            token,
        })

        if(result){
            dispatch(setCourse(result))
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token,
        })

        if(result){
            // Problem faced : deleteSub section ka backend controller response me updated section 
            // return kar raha hai, aur hum usse setCourse kar rahe the. Jabki course return hi nahi 
            // ho raha tha, to setCourse karne pr course me returned section ka data chala ja raha tha,
            // isliye UI update nahi ho raha tha. Hume to updated Course ka data chaahiye, respone me
            // updated Section mil raha hai

            // is updatedSection se updated course built karna padega 
            // replace old section by the new updated section 
            // then setCourse with this new (updatedCourse)

            const updatedCourseContent = course.courseContent.map((section) => section._id.toString() === sectionId.toString() ? result : section);
            const updatedCourse = {...course, courseContent : updatedCourseContent};
    
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }

    // console.log("course : ", course);

    return (
        <div className="mt-10">

            <div className="border-[1px] border-richblack-600 p-4 bg-richblack-700 rounded-md">
                {
                    course?.courseContent?.map((section) => (

                        // <details> acts like a container that can be opened or closed.
                        <details key={section._id} open>
                            {/* <summary> is the heading/title of the collapsible section. */}
                            <summary className="flex items-center justify-between 
                            border-b-[1px] border-richblack-600 mt-3">

                                <div className="flex gap-2 items-center ">
                                    <RxDropdownMenu className="text-xl text-richblack-400
                                     hover:text-richblack-100"/>
                                    <p className="first-letter:capitalize text-richblack-50">
                                        {section.sectionName}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 text-xl text-richblack-400">

                                    <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                        <MdModeEditOutline className="hover:text-richblack-100"/>
                                    </button>

                                    <button onClick={() => {
                                        setConfirmationModal({
                                            text1 : "Delete this section ?",
                                            text2 : "All the lectures in this section will be deleted",
                                            btn1Text : "Delete",
                                            btn2Text : "Cancel",
                                            btn1Handler : () => handleDeleteSection(section._id),
                                            btn2Handler : () => setConfirmationModal(null),
                                        })
                                    }}>
                                        <RiDeleteBin6Line className="hover:text-richblack-100"/>
                                    </button>

                                    <div className="font-light">|</div>

                                    <div>
                                        <FaCaretDown className="hover:text-richblack-100"/>
                                    </div>

                                </div>


                            </summary>
                            
                            {/* content of each summary section, which is in toggled behavior, hidden or opened  */}
                            <div className="mt-5"> 
                                {
                                    section.subSection?.map((item) => (
                                        <div key={item._id} 
                                        onClick={() => setViewSubSection(item)}
                                        className="flex justify-between w-[82%] mx-auto">

                                            <div className="flex gap-2 items-center ">
                                                <RxDropdownMenu className="text-xl text-richblack-400
                                                hover:text-richblack-100"/>
                                                <p className="first-letter:capitalize text-richblack-50">
                                                    {item.title}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3 text-xl text-richblack-400"
                                                onClick={(e) => e.stopPropagation()}
                                                // e.stopPropagation se parent div ka onClick iss div pe (child div pe kaam nahi karega)
                                            >

                                                <button onClick={() => setEditSubSection({...item, sectionId : section._id})}>
                                                    <MdModeEditOutline className="hover:text-richblack-100"/>
                                                </button>

                                                <button onClick={() => {
                                                        setConfirmationModal({
                                                            text1 : "Delete this Subsection ?",
                                                            text2 : "Current lecture will be deleted",
                                                            btn1Text : "Delete",
                                                            btn2Text : "Cancel", 
                                                            btn1Handler : () => handleDeleteSubSection(item._id, section._id),
                                                            btn2Handler : () => setConfirmationModal(null),
                                                        })
                                                    }}>
                                                    <RiDeleteBin6Line className="hover:text-richblack-100"/>
                                                </button>

                                            </div>

                                        </div>
                                    ))
                                }

                                {/* Add new lecture button  */}
                                <button onClick={() => setAddSubSection(section._id)}
                                    className="flex gap-1 items-center text-yellow-50 mt-12 mb-8 border-[1px] border-yellow-50 p-2
                                    rounded-md hover:scale-95 transition-all duration-200 text-sm"> 
                                    <FaPlus />
                                    <p>Add Lecture</p>
                                </button>

                            </div>

                        </details>
                    ))
                }
            </div>


            {
                addSubSection ? (<SubSectionModal 
                    modalData = {addSubSection}
                    setModalData = {setAddSubSection}
                    add = {true}
                />)
                : viewSubSection ? (<SubSectionModal 
                    modalData = {viewSubSection}
                    setModalData = {setViewSubSection}
                    view = {true}
                />)
                : editSubSection && (<SubSectionModal 
                    modalData = {editSubSection}
                    setModalData = {setEditSubSection}
                    edit = {true}
                />)
            }


            {
                confirmationModal && (
                    <ConfirmationModal modalData={confirmationModal}/>
                )
            }


        </div>
    )
}

export default NestedView;