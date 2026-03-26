import StudyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { PiFacebookLogoFill } from "react-icons/pi";
import { PiGoogleLogoFill } from "react-icons/pi";
import { PiTwitterLogoFill } from "react-icons/pi";
import { FaYoutube } from "react-icons/fa";
import {FooterLink2} from "../../data/footer-links"
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { AiOutlineCopyright } from "react-icons/ai";



function Footer(){
    return (
        <div className="w-full bg-richblack-800 py-10 p-10 border-t border-richblack-600">

            <div className="w-full px-4 md:px-10 flex flex-col lg:flex-row gap-10">

                <div className="w-full lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-y-10">

                    <div className="text-richblack-400 text-sm
                     flex flex-col items-start gap-3">
                        <img alt="StudyNotionLogo" src={StudyNotionLogo}/>
                        <p className="text-richblack-100 font-semibold text-lg">Company</p>
                        <p>About</p>
                        <p>Careers</p>
                        <p>Affiliates</p>
                        <div className="flex gap-2 text-2xl">
                            <PiFacebookLogoFill />
                            <PiGoogleLogoFill />
                            <PiTwitterLogoFill />
                            <FaYoutube />
                        </div>
                    </div>

                    <div className="text-richblack-400 text-sm
                     flex flex-col items-start gap-3">
                        <p className="text-richblack-100 font-semibold text-lg">Resources</p>
                        <p>Articles</p>
                        <p>Blog</p>
                        <p>Chart Sheet</p>
                        <p>Code Challenges</p>
                        <p>Docs</p>
                        <p>Projects</p>
                        <p>Video</p>
                        <p>Workspaces</p>

                        <p className="text-richblack-100 font-semibold text-lg mt-5">Support</p>
                        <p>Help Center</p>
                    </div>

                    <div className="text-richblack-400 text-sm
                     flex flex-col items-start gap-3">
                        <p className="text-richblack-100 font-semibold text-lg">Plans</p>
                        <p>Paid memberships</p>
                        <p>For students</p>
                        <p>Business solutions</p>
                        

                        <p className="text-richblack-100 font-semibold text-lg mt-5">Community</p>
                        <p>Forums</p>
                        <p>Chapters</p>
                        <p>Events</p>
                    </div>

                </div>

                <div className="w-full lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-y-10">

                    <div className="flex flex-col gap-3">
                        <p className="text-richblack-100 font-semibold text-lg">{FooterLink2[0].title}</p>
                        <div className="text-richblack-400 text-sm
                            flex flex-col items-start gap-3">
                            {
                                FooterLink2[0].links.map((subject, index) => (
                                    <NavLink key={index} to={`${subject.link}`}>
                                        <p>{subject.title}</p>
                                    </NavLink>
                                ))
                            }
                        </div>  
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-richblack-100 font-semibold text-lg">{FooterLink2[1].title}</p>
                        <div className="text-richblack-400 text-sm
                            flex flex-col items-start gap-3">
                            {
                                FooterLink2[1].links.map((subject, index) => (
                                    <NavLink key={index} to={`${subject.link}`}>
                                        <p>{subject.title}</p>
                                    </NavLink>
                                ))
                            }
                        </div>  
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-richblack-100 font-semibold text-lg">{FooterLink2[2].title}</p>
                        <div className="text-richblack-400 text-sm
                            flex flex-col items-start gap-3">
                            {
                                FooterLink2[2].links.map((subject, index) => (
                                    <NavLink key={index} to={`${subject.link}`}>
                                        <p>{subject.title}</p>
                                    </NavLink>
                                ))
                            }
                        </div>  
                    </div>

                </div>
                
            </div>

            <div className="w-full border-t border-richblack-600 mt-10"></div>

            <div className="w-full mt-10 px-4 md:px-10 flex flex-col md:flex-row gap-4 justify-between items-center text-center">
                <div className="flex text-richblack-300 text-sm">
                    <div className="border-r border-richblack-700 px-2 cursor-pointer hover:text-richblack-50 transition-all duration-200">Privacy Policy</div>
                    <div className="border-r border-richblack-700 px-2 cursor-pointer hover:text-richblack-50 transition-all duration-200">Cookie Policy</div>
                    <div className="px-2 cursor-pointer hover:text-richblack-50 transition-all duration-200">Terms</div>
                </div>
                <div className="flex items-center gap-1 text-richblack-300 text-sm">
                    <p>Made with</p>
                    <FaHeart className="text-pink-200"/>
                    <p>Shubhankar</p>
                    <AiOutlineCopyright />
                    <p>2026 Studynotion</p>
                </div>
            </div>
            
        </div>
    )
}

export default Footer;