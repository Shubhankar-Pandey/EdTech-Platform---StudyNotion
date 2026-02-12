import { useState } from "react";
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from "./HighlightText";
import ExploreCourses from "./ExploreCourses";



function ExploreSection(){

    const [courseIndex, setCourseIndex] = useState(0);

    return (
        <div className="flex flex-col items-center mb-60">
            <div className="flex gap-1 text-3xl mt-16">
                <p>Unlock the</p>
                <HighlightText text="Power of Code"/>
            </div>

            <p className="text-richblack-300 text-sm mt-2">
                Learn to Build Anything You Can Imagine
            </p>
            
            <div className="flex gap-5 bg-richblack-800 border-b-richblack-500 border-b-2
             px-4 py-2 rounded-full mt-10">
                {
                    HomePageExplore.map((course, index) => (
                        <div key={index} className={`text-richblack-200
                         px-4 py-2 rounded-full hover:bg-richblack-900 hover:cursor-pointer
                         duration-200 transition-all font-bold
                         ${index === courseIndex && "bg-richblack-900"}
                         `} onClick={() => {
                            setCourseIndex(index);
                         }}>
                            <p>{course.tag}</p>
                        </div>
                    ))
                }
            </div>

            <ExploreCourses index = {courseIndex}/>

        </div>
    )
}


export default ExploreSection;