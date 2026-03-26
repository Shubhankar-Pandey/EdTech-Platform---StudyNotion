import CTAButton from "./CTAButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";


function CodeBlocks({
    position, heading, subHeading, ctabtn1, ctabtn2, codeblock, 
    backgroundGradient, codeColor
}){
    return (
        <div className={`flex flex-col ${position} w-full md:w-11/12 my-20 justify-between gap-10`}>

            {/* Section 1 */}
            <div className="w-full lg:w-[50%] flex flex-col gap-8 px-4 md:px-0">
                {heading}
                <div className="text-richblack-300 font-bold">
                    {subHeading}
                </div>
                <div className="flex gap-7 mt-7">
                    <CTAButton active = {ctabtn1.active} linkTo={ctabtn1.linkTo}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRightLong />
                        </div>
                    </CTAButton>
                    <CTAButton active = {ctabtn2.active} linkTo={ctabtn2.linkTo}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>


            {/* Section 2 */}
            <div className="flex text-[1rem] w-full lg:w-[500px]
            border-l-richblack-400 border-t-richblack-400 border-l-2 border-t-2
            p-2 rounded-md relative mx-auto md:mx-0">
                {/* HW : Gradient */}

                <div className="text-center flex flex-col w-[10%]
                 text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2
                 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock, 5000, ""]}
                        repeat={Infinity}
                        style={
                            {
                                whiteSpace : "pre-line",
                                display : "block"
                            }
                        }
                        omitDeletionAnimation = {true}
                    />
                </div>

                <div className={`absolute z-10 right-20 -top-20 inset-5 blur-3xl rounded-full opacity-25 ${backgroundGradient}`}>

                </div>

            </div>


        </div>
    );
}

export default CodeBlocks;