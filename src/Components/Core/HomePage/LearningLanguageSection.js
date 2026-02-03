import HighlightText from "./HighlightText";
import image1 from "../../../assets/Images/Know_your_progress.svg"
import image2 from "../../../assets/Images/Compare_with_others.svg"
import image3 from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "./CTAButton";


function LearningLanguageSection(){
    return (
        <div className="w-full flex flex-col">

            {/* Part 1 - text */}
            <div className="flex flex-col gap-3 items-center mx-auto">
                <div className="font-bold text-4xl">
                    Your swiss knife for 
                    <HighlightText text = "learning any language" />
                </div>
                <div className="text-center w-[75%]">
                    Using spin making learning multiple languages easy.
                    with 20+ languages realistic voice-over, progress
                    tracking, custom schedule and more.
                </div>
            </div>

            {/* Part 2 - images  */}
            <div className="relative flex justify-center mt-16">
                {/* image 1 */}
                <div className="relative right-80"> 
                    <img src={image1} alt="know_your_progress"></img>
                </div>
                <div className="absolute -top-10 right-80">
                    <img src={image2} alt="compare_with_others"></img>
                </div>
                <div className="absolute -right-4 -top-8">
                    <img src={image3} alt="Plan_your_lessons"></img>
                </div>
            </div>

            <div className="flex items-center justify-center mt-28 mb-20">
                <CTAButton active={true} linkTo={"/signup"}>
                    <div>Learn More</div>
                </CTAButton>
            </div>
            
        </div>
    )
}

export default LearningLanguageSection;