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

            <div className="w-11/12 mx-auto flex">

                <div className="w-[50%] flex gap-10 border-r border-richblack-700">

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

                <div className="w-[50%] flex gap-10 justify-end">

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

            <div className="w-11/12 border-t border-richblack-600 mt-10"></div>

            <div className="w-11/12 mt-10 flex justify-between">
                <div className="flex text-richblack-300 text-sm">
                    <div className="border-r border-richblack-700 px-2">Privacy Policy</div>
                    <div className="border-r border-richblack-700 px-2">Cookie Policy</div>
                    <div className="px-2">Terms</div>
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