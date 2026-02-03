import instructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRightLong } from "react-icons/fa6";

function BecomeAnInstructorSection(){
    return (
        <div className="w-full flex justify-center gap-24 mt-10 mb-20 p-10">

            {/* Left side  */}
            <div className="w-[50%] relative">

                <div className="absolute -translate-x-4 -translate-y-4
                bg-white inset-0"> </div>
                
                <img alt="instructorImage" src={instructorImage}
                 className="relative z-10 block"></img>
                
            </div>

            {/* Right Side  */}
            <div className="w-[40%] flex flex-col items-start justify-center">
                <div className="font-bold text-4xl text-white">
                    <p>Become an</p>
                    <HighlightText text = "instructor"/>
                </div>
                
                <p className="text-richblack-200 mt-5 mb-20">Instructors from around the world teach millions
                    of students on StudyNotion. We provide the tools
                    and skills to teach what you love.
                </p>
                
                <CTAButton active={true} linkTo={"/signup"}>
                    <div className="flex items-center gap-3">
                        Start Teaching Today
                        <FaArrowRightLong/>
                    </div>
                </CTAButton>

            </div>
        </div>
    )
}

export default BecomeAnInstructorSection;