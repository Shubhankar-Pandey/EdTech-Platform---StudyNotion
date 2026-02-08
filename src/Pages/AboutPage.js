import HighlightText from "../Components/Core/HomePage/HighlightText"
import aboutus1 from "../assets/Images/aboutus1.webp" 
import aboutus2 from "../assets/Images/aboutus2.webp" 
import aboutus3 from "../assets/Images/aboutus3.webp" 
import Quote from "../Components/Core/About Page/Quote"
import foundingStoryImage from "../assets/Images/FoundingStory.png";
import StatsComponent from "../Components/Core/About Page/StatsComponent"
import LearningGrid from "../Components/Core/About Page/LearningGrid"
import ContactFormSection from "../Components/Core/About Page/ContactFormSection"
import Footer from "../Components/Common/Footer"




function AboutPage(){
    return (
        <div className="flex flex-col items-center">
            
            {/* Section 1  */}
            <section className="flex flex-col items-center mt-20">

                <div className="text-richblack-200">About us</div>

                <div className="flex flex-col items-center mt-10">

                    <header className = "flex flex-col items-center w-[55%]">
                        <div className="flex flex-col items-center text-3xl">
                            <p className="text-richblack-5">
                                Driving Innovation in Online Education for a
                            </p>
                            <HighlightText text={"Brighter Future"}/>
                        </div>
                        
                        <p className="text-richblack-300 text-center mt-5">
                            Studynotion is at the
                            forefront of driving innovation in online education.
                            We're passionate about creating a brighter future by
                            offering cutting-edge courses, leveraging emerging
                            technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>

                    <div className="flex gap-3 flex-wrap mt-10">
                        <img alt="aboutUsImage1" src={aboutus1}></img>
                        <img alt="aboutUsImage2" src={aboutus2}></img>
                        <img alt="aboutUsImage3" src={aboutus3}></img>
                    </div>

                </div>



            </section>

            {/* Section 2 */}
            <section className="flex justify-center mt-20">
                <Quote/>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col mt-20
             border-t border-richblack-600">

                <div className="flex justify-evenly mt-20 items-center">

                    <div className="w-[35%] flex flex-col">

                        <h1 className="text-3xl text-pink-300 font-bold">Our Founding Story</h1>

                        <p className="text-richblack-300 mt-5">
                            Our e-learning platform was born out of a
                            shared vision and passion for transforming education.
                            It all began with a group of educators, technologists,
                            and lifelong learners who recognized the need for accessible,
                            flexible, and high-quality learning opportunities in a
                            rapidly evolving digital world.
                        </p>

                        <p className="text-richblack-300 mt-3">
                            As experienced educators ourselves, we witnessed
                            firsthand the limitations and challenges of traditional
                            education systems. We believed that education should
                            not be confined to the walls of a classroom or restricted
                            by geographical boundaries. We envisioned a platform that
                            could bridge these gaps and empower individuals from all
                            walks of life to unlock their full potential.
                        </p>

                    </div>

                    <div className="w-[35%]">
                        <img alt="foundingStoryImage" src={foundingStoryImage}/>
                    </div>

                </div>


                <div className="flex justify-evenly mt-40 items-center">

                    <div className="w-[35%] flex flex-col">
                        <h1 className="text-3xl font-bold text-brown-200">Our Vision</h1>
                        <p className="text-richblack-300 mt-5">
                            With this vision in mind, we set out on a journey
                            to create an e-learning platform that would
                            revolutionize the way people learn. Our team
                            of dedicated experts worked tirelessly to
                            develop a robust and intuitive platform that
                            combines cutting-edge technology with engaging
                            content, fostering a dynamic and interactive
                            learning experience.
                        </p>
                    </div>

                    <div className="w-[35%] flex flex-col">
                        <h1 className="text-3xl font-bold text-blue-100">Our Mission</h1>
                        <p className="text-richblack-300 mt-5">
                            our mission goes beyond just delivering courses
                            online. We wanted to create a vibrant community
                            of learners, where individuals can connect,
                            collaborate, and learn from one another.
                            We believe that knowledge thrives in an
                            environment of sharing and dialogue, and we
                            foster this spirit of collaboration through
                            forums, live sessions, and networking opportunities.
                        </p>
                    </div>

                </div>

                

            </section>

            {/* Section 4 */}
            <StatsComponent/>


            {/* Section 5 */}
            <section>
                <LearningGrid/>
            </section>

            {/* Section 5  */}
            <section>
                <ContactFormSection/>
            </section>

            {/* Footer  */}
            <Footer/>
        </div>
    )
}

export default AboutPage;