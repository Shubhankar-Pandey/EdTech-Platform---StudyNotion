import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import HighlightText from "../Components/Core/HomePage/HighlightText"
import CTAButton from "../Components/Core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";




function Home(){
    return (
        <div>

            {/***************** Section 1 *****************/}
            <div className="relative mx-auto flex flex-col w-11/12 items-center
            justify-between text-white max-w-maxContent">
 
                <NavLink to={"/signup"}>
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800
                    font-bold text-richblack-200 transition-all duration-200
                    hover:scale-95">
                        <div className="flex items-center gap-2 px-10 py-[5px] rounded-full
                        transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRightLong />
                        </div>
                    </div>
                </NavLink>

                <div className="text-center text-4xl font-semibold mt-8">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className="flex gap-7 mt-8">
                    <CTAButton active = {true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active = {false} linkTo={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className="shadow-blue-200 mx-3 my-14 ">
                    <video muted autoPlay loop>
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
                        backgroundGradient = {""}
                        codeColor = {"text-yellow-25"}
                    />
                </div>


                {/* Code Section 2 */}
                <div>
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
                        backgroundGradient = {""}
                        codeColor = {"text-pink-100"}
                    />
                </div>



            </div>




            {/***************** Section 2 *****************/}



            {/***************** Section 3 *****************/}



            {/***************** Section 4- Footer *****************/}



        </div>
    );
}


export default Home;