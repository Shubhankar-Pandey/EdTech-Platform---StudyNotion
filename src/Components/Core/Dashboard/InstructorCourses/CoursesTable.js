import { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../Common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from "../../../../Services/operation/courseDetailsAPI";


import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from "react-router-dom";



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
        <div className="text-richblack-5">

            <Table>

                <Thead>
                    <Tr>
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
                            <Td>No Courses Found</Td>
                        </Tr>)
                        : (
                            courses?.map((course) => (
                               <Tr key={course._id} className="flex gap-x-10 border-[1px] border-richblack-700 p-6">

                                    <Td className = "flex gap-x-4">

                                        <img src={course?.thumbnail}
                                        className="rounded-lg object-cover h-[150px] w-[220px]"
                                        alt="Course Thumbnail"/>

                                        <div className="flex flex-col">
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                            <p>Created : </p>
                                            {
                                                course.status === "Draft" ? 
                                                (<p>DRAFTED</p>)
                                                : (<p>PUBLISHED</p>)
                                            }
                                        </div>

                                    </Td>

                                    <Td>
                                        2hr 30min
                                    </Td>

                                    <Td>
                                        ${course.price}
                                    </Td>

                                    <Td>
                                        
                                        <button disabled={loading}
                                        onClick={() => {
                                            navigate(`/dashboard/edit-course/${course._id}`)
                                        }}
                                        >
                                            Edit
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
                                            Delete
                                        </button>
                                    
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