import { HomePageExplore } from "../../../data/homepage-explore";
import { FaUserFriends } from "react-icons/fa";
import { BiSolidVector } from "react-icons/bi";



function ExploreCourses({index}){
    return (
        <div className="flex justify-evenly absolute -bottom-24">
            {
                HomePageExplore[index].courses.map((course, index) => (
                    <div key={index} className={`w-[25%] p-6 mt-10
                    flex flex-col justify-between cursor-pointer
                    ${index === 0 ? "bg-white shadow-[10px_10px_0px_#ffd60a]" : "bg-richblack-800"}`}>

                        <div>
                            <p className={`font-bold
                                ${index === 0 && "text-black"}`}>{course.heading}</p>
                            <p className="mt-5
                            text-richblack-400 text-sm">{course.description}</p>
                        </div>
                        
                        <div className={`flex justify-between border-t
                         border-dashed mt-16 pt-2
                         ${index === 0 ? "text-blue-500" : "text-richblack-300"}`}>
                            <div className="flex gap-2 items-center">
                                <FaUserFriends />
                                <p>{course.level}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <BiSolidVector />
                                <p>{course.lessionNumber}</p>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default ExploreCourses;