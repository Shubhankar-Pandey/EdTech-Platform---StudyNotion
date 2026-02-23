import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";



function NestedView({handleChangeEditSectionName}){

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    // console.log("course data in nested view section : ", course);


    const handleDeleteSection = (sectionId) => {
        
    }



    return (
        <div className="mt-10">

            <div className="border-[1px] border-richblack-600 p-4 bg-richblack-700 rounded-md">
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open>

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

                                    <button onClick={handleChangeEditSectionName(section._id, section.sectionName)}>
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

                        </details>
                    ))
                }
            </div>

        </div>
    )
}

export default NestedView;