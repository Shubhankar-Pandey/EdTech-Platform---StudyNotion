import timeLineImage from "../../../assets/Images/TimelineImage.png";
import TimeLineBlock from "./TimeLineBlock";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

function TimeLineSection(){
    return (
        <div className="flex w-full justify-evenly gap-10 mb-40">
            <div className="flex flex-col justify-evenly p-12">
                <TimeLineBlock logo = {Logo1} heading = "Leadership"
                 subheading = "Fully committed to the success company"/>
                <div className="ml-7 h-[10%] border-dotted border-l-2 border-pure-greys-200"></div>

                <TimeLineBlock logo = {Logo2} heading = "Responsibility"
                 subheading = "Students will always be our top priority"/>
                <div className="ml-7 h-[10%] border-dotted border-l-2 border-pure-greys-200"></div>

                <TimeLineBlock logo = {Logo3} heading = "Flexibility"
                 subheading = "The ability to switch is an important skills"/>
                <div className="ml-7 h-[10%] border-dotted border-l-2 border-pure-greys-200"></div>

                <TimeLineBlock logo = {Logo4} heading = "Solve the problem"
                 subheading = "Code your way to a solution"/>
            </div>
            <div className="w-[55%] relative">
                <img src={timeLineImage} alt="time line image"></img>
                <div className="bg-caribbeangreen-700 w-[70%] absolute z-10
                -bottom-12 left-24 flex p-10">
                    <div className="w-[50%] flex items-center justify-center gap-5
                     border-r border-caribbeangreen-200">
                        <div className="font-bold text-4xl text-white">
                            10
                        </div>
                        <div className="flex flex-col items-start text-sm text-caribbeangreen-200">
                            <p>YEARS</p>
                            <p>EXPERIENCES</p>
                        </div>
                    </div>
                    <div className="w-[50%] flex items-center justify-center gap-5">
                        <div className="font-bold text-4xl text-white">
                            250
                        </div>
                        <div className="flex flex-col items-start text-sm text-caribbeangreen-200">
                            <p>TYPES OF</p>
                            <p>COURSES</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default TimeLineSection;