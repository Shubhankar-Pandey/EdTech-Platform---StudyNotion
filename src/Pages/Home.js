import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../Components/Core/HomePage/HighlightText"
import CTAButton from "../Components/Core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import BecomeAnInstructorSection from "../Components/Core/HomePage/BecomeAnInstructorSection";
import Footer from "../Components/Common/Footer";
import ExploreSection from "../Components/Core/HomePage/ExploreSection";
import ReviewSlider from "../Components/Common/ReviewSlider"




function Home(){
    return (
        <div>

            {/***************** Section 1 *****************/}
            <div className="relative flex flex-col w-full px-4 md:px-10 items-center
            justify-between text-white">
 
                <NavLink to={"/signup"}>
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800
                    font-bold text-richblack-200 transition-all duration-200
                    hover:scale-95 border-b-2 border-richblack-500">
                        <div className="flex items-center gap-2 px-10 py-[5px] rounded-full
                        transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRightLong />
                        </div>
                    </div>
                </NavLink>

                <div className="text-center text-3xl md:text-4xl font-semibold mt-8">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 w-[90%] md:w-[70%] text-center text-base md:text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-7 mt-8">
                    <CTAButton active = {true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active = {false} linkTo={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                
                <div className="relative w-full lg:w-[80%] mx-auto my-14 px-4 overflow-hidden md:overflow-visible flex items-center justify-center">
                    <div className="absolute inset-0 z-0 bg-blue-100 blur-2xl rounded-full scale-90 translate-x-[-10%] translate-y-[-10%] opacity-30"></div>
                    <video className="relative z-10 w-full object-cover shadow-[10px_10px_rgba(255,255,255)] md:shadow-[20px_20px_rgba(255,255,255)] rounded-md" muted autoPlay loop>
                        <source src={Banner} type="video/mp4"></source>
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                    <CodeBlocks
                        position = {"lg:flex-row"}
                        heading = {
                            <div className="text-4xl font-semibold">
                                Unlock Your
                                <HighlightText text={"coding potential "}/>
                                with our online courses.
                            </div>
                        }
                        subHeading = {
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                        }
                        ctabtn1 = {
                            {
                                btnText : "Try it Yourself",
                                linkTo : "/signup",
                                active : true,
                            }
                        }
                        ctabtn2 = {
                            {
                                btnText : "Learn More",
                                linkTo : "/signup",
                                active : false,
                            }
                        }
                        codeblock = {`<!DOCTYPE html> \n <html> \n head><title>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n /head> \n body> \n h1><ahref="/">Header</a> \n /h1> \n nav><ahref="one/">One</a><ahref="two/">Two</ \n a><ahref="three/">Three</a> \n /nav>`
                        }
                        backgroundGradient = {"bg-pink-100"}
                        codeColor = {"text-yellow-50"}
                    />
                </div>


                {/* Code Section 2 */}
                <div className="">
                    <CodeBlocks
                        position = {"lg:flex-row-reverse"}
                        heading = {
                            <div className="text-4xl font-semibold">
                                Start
                                <HighlightText text={"coding in seconds "}/>
                            </div>
                        }
                        subHeading = {
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1 = {
                            {
                                btnText : "Continue Lessons",
                                linkTo : "/signup",
                                active : true,
                            }
                        }
                        ctabtn2 = {
                            {
                                btnText : "Learn More",
                                linkTo : "/signup",
                                active : false,
                            }
                        }
                        codeblock = {`<!DOCTYPE html> \n <html> \n head><title>Example</ \n title><linkrel="stylesheet"href="styles.css"> \n /head> \n body> \n h1><ahref="/">Header</a> \n /h1> \n nav><ahref="one/">One</a><ahref="two/">Two</ \n a><ahref="three/">Three</a> \n /nav>`
                        }
                        backgroundGradient = {"bg-blue-100"}
                        codeColor = {"text-pink-100"}
                    />
                </div>

                {/* Explore Section  */}
                <ExploreSection/>

            </div>




            {/***************** Section 2 *****************/}
            <div className="bg-pure-greys-5 text-richblack-700">
                {/* Part 1 */}
                <div className="homepage_bg h-[250px] md:h-[310px] flex justify-center">
                    <div className="w-full px-4 md:px-10 flex flex-col md:flex-row items-center
                     justify-center gap-5">
                        <div className="flex gap-4 md:gap-7 mt-16">
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div className="flex gap-2 items-center justify-center">
                                    Explore Full Catalog
                                    <FaArrowRightLong/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>
                
                {/* Part 2 */}
                <div className="w-full px-4 md:px-10 flex flex-col md:flex-row mx-auto mt-10 md:mt-20 justify-evenly gap-10 md:gap-0"> 
                    <div className="w-full md:w-[45%] text-3xl md:text-4xl font-semibold">
                        Get the skill you need for a 
                        <HighlightText text={"job that is in demand"}/>
                    </div>
                    <div className="w-full md:w-[45%] flex flex-col items-start gap-5">
                        <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms.
                            Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <div className="mt-2 md:mt-7">
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div>Learn More</div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                
                <div className="w-full px-4 md:px-10 flex flex-col mx-auto mt-20 justify-between">
                    {/* Part 3 */}
                    <TimeLineSection/>

                    {/* Part 4 */}
                    <LearningLanguageSection/>
                </div>
                

            </div>



            {/***************** Section 3 *****************/}
            <div className="w-full px-4 md:px-10">
                <BecomeAnInstructorSection/>
                <h1 className="text-center text-4xl font-semibold mt-8 text-richblack-5">
                    Reviews from other learners
                </h1>
                <ReviewSlider />
            </div>



            {/***************** Section 4- Footer *****************/}
            <Footer/>


        </div>
    );
}


export default Home;