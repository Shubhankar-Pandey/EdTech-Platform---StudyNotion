import { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../Services/operation/courseDetailsAPI";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import { useNavigate } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaClock } from "react-icons/fa6";

function CoursesTable({ courses, setCourses }) {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confomationModal, setConfomationModal] = useState(null);
  const navigate = useNavigate();

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);

    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result);
    }

    setConfomationModal(null);
    setLoading(false);
  };

  return (
    <div className="text-richblack-5 mt-16 w-full">
      <Table className="w-full table-fixed">
        {/* ===== TABLE HEADER ===== */}
        <Thead>
          <Tr className="border-b border-richblack-700 text-left">
            <Th className="p-4 flex-1">Courses</Th>
            <Th className="p-4 w-auto md:w-[15%]">Duration</Th>
            <Th className="p-4 w-auto md:w-[15%]">Price</Th>
            <Th className="p-4 w-auto md:w-[20%] text-center">Action</Th>
          </Tr>
        </Thead>

        {/* ===== TABLE BODY ===== */}
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td colSpan={4} className="p-4 text-center">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="border-b border-richblack-700 align-top hover:bg-richblack-800 transition-all"
              >
                {/* ===== COURSE COLUMN ===== */}
                <Td className="p-4 flex-1">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={course?.thumbnail}
                      className="rounded-lg object-cover h-auto w-full md:h-[120px] md:w-[180px] aspect-video md:aspect-auto"
                      alt="Course Thumbnail"
                    />

                    <div className="flex flex-col gap-y-1">
                      <p className="font-semibold">
                        {course.courseName}
                      </p>

                      <p className="text-sm text-richblack-300 line-clamp-2">
                        {course.courseDescription}
                      </p>

                      <p className="text-xs text-richblack-300">
                        Created :
                      </p>

                      {/* STATUS */}
                      {course.status === "Draft" ? (
                        <div className="bg-richblack-700 rounded-full flex items-center py-1 px-3 gap-1 w-fit">
                          <FaClock className="text-pink-50 text-lg" />
                          <p className="text-pink-100 text-sm">
                            Drafted
                          </p>
                        </div>
                      ) : (
                        <div className="bg-richblack-700 rounded-full flex items-center py-1 px-3 gap-1 w-fit">
                          <IoMdCheckmarkCircle className="text-yellow-50 text-lg" />
                          <p className="text-yellow-100 text-sm">
                            Published
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Td>

                {/* ===== DURATION ===== */}
                <Td className="p-4 w-auto md:w-[15%] align-middle">
                  2hr 30min
                </Td>

                {/* ===== PRICE ===== */}
                <Td className="p-4 w-auto md:w-[15%] align-middle">
                  Rs.{course.price}
                </Td>

                {/* ===== ACTION ===== */}
                <Td className="p-4 w-auto md:w-[20%]">
                  <div className="flex md:justify-center gap-x-5 md:mt-12 items-center md:items-start mt-2">
                    <button
                      disabled={loading}
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                    >
                      <MdEdit className="text-richblack-400 text-lg hover:text-yellow-50 transition-all" />
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfomationModal({
                          text1:
                            "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () =>
                                handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () =>
                                setConfomationModal(null)
                            : () => {},
                        });
                      }}
                    >
                      <RiDeleteBin6Line className="text-richblack-400 text-lg hover:text-pink-200 transition-all" />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {/* ===== MODAL ===== */}
      {confomationModal && (
        <ConfirmationModal modalData={confomationModal} />
      )}
    </div>
  );
}

export default CoursesTable;