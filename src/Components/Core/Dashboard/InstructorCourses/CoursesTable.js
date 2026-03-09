import { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../Common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from "../../../../Services/operation/courseDetailsAPI";


import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa6";




function CoursesTable({courses, setCourses}){

    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confomationModal, setConfomationModal] = useState(null); 
    const navigate = useNavigate();

    const handleCourseDelete = async(courseId) => {
        setLoading(true);

        await deleteCourse({courseId : courseId}, token);

        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }
        setConfomationModal(null);
        setLoading(false);
    }
 

    return (
        <div className="text-richblack-5 mt-10 ">

            <Table className="w-full">

                <Thead>
                    <Tr className="border-b border-richblack-700"> 
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses.length === 0 ? 
                        (<Tr>
                            <Td className="p-4">No Courses Found</Td>
                        </Tr>)
                        : (
                            courses?.map((course) => (
                               <Tr key={course._id} className="border-b border-richblack-700">

                                    {/* Course column  */}
                                    <Td className="p-4 align-top">

                                        <div className="flex gap-x-4">
                                            <img src={course?.thumbnail}
                                            className="rounded-lg object-cover h-[150px] w-[220px]"
                                            alt="Course Thumbnail"/>

                                            <div className="flex flex-col gap-y-1">
                                                <p className="font-semibold">{course.courseName}:</p>
                                                <p className="text-sm text-richblack-300">{course.courseDescription}</p>
                                                <p className="text-xs">Created : </p>
                                                {/* TODO : add created At  */}
                                                {
                                                    course.status === "Draft" ? 
                                                    (<div className="bg-richblack-700 rounded-full flex justify-center items-center py-1 px-3 gap-1">
                                                        <FaClock className="text-pink-50 text-lg"/>
                                                        <p className="text-pink-100">Drafted</p>
                                                        </div>)
                                                    : (<div className="bg-richblack-700 rounded-full flex justify-center items-center py-1 px-4 gap-1">
                                                        <IoMdCheckmarkCircle className="text-yellow-50 text-lg"/>
                                                        <p className="text-yellow-100">Published</p>
                                                        </div>)
                                                }
                                            </div>
                                        </div>

                                    </Td>
                                    
                                    {/* Duration  */}
                                    <Td>
                                        2hr 30min
                                    </Td>
                                    
                                    {/* Price  */}
                                    <Td>
                                        ${course.price}
                                    </Td>
                                    
                                    {/* Action  */}
                                    <Td>
                                        <div className="flex gap-x-3">
                                            <button disabled={loading}
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                            }}
                                            >
                                                <MdEdit className="text-richblack-400"/>
                                            </button>

                                            <button disabled={loading}
                                            onClick={() =>  {
                                                setConfomationModal({
                                                    text1 : "Do you want to delete this course ?",
                                                    text2 : "All the data related to this course will be deleted",
                                                    btn1Text : "Delete",
                                                    btn2Text : "Cancel",
                                                    btn1Handler : !loading ? () => handleCourseDelete(course._id) : () => {},
                                                    btn2Handler : !loading ? () => setConfomationModal(null) : () => {},
                                                })
                                            }}>
                                                <RiDeleteBin6Line className="text-richblack-400"/>
                                            </button>
                                        </div>
                                    
                                    </Td>

                               </Tr>
                            ))
                        )
                    }
                </Tbody>

            </Table>

            {
                confomationModal && <ConfirmationModal modalData={confomationModal} />
            }

        </div>
    )
}


export default CoursesTable;