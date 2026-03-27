import { matchPath, NavLink } from "react-router-dom";
import StudyNotionLOGO from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Services/operation/authAPI";
import { apiConnector } from "../../Services/apiConnector";
import { categories } from "../../Services/apis";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";


function Navbar(){


    const user = useSelector((state) => state.profile.user);
    const totalItems = useSelector((state) => state.cart.totalItems); 


    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [subLinks, setSubLinks] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);

    const fetchCategories = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch(error){
            console.log("Could not fetch the catalog list");
        }
    }

    useEffect(() => {
        fetchCategories();
    },[])

    function matchRoute(route){
        return matchPath({path:route}, location.pathname);
    }

    return (
        <div className="flex h-14 items-center justify-center
         border-b-[1px] border-b-richblack-700 w-full px-4 md:px-10">

            <div className="flex w-full items-center justify-between">

                {/* LOGO  */}
                <NavLink to={"/"}>
                    <img alt="StudyNotionLOGO" src={StudyNotionLOGO}
                     width={160} height={42} loading="lazy"></img>
                </NavLink>

                {/* Nav links  */}
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ?
                                         (
                                            <div className="relative flex items-center gap-1 group
                                            hover:cursor-pointer">
                                                <p>{link.title}</p>
                                                <FaAngleDown />
                                                
                                                <div className="invisible absolute -left-28
                                                top-10 flex flex-col rounded-md
                                                bg-richblack-5 p-4
                                                text-richblack-900 opacity-0
                                                transition-all duration-200
                                                group-hover:visible
                                                group-hover:opacity-100
                                                lg:w-[300px] z-10">

                                                    <div className="absolute left-32 rounded
                                                    -top-2 h-6 w-6 rotate-45 bg-richblack-5">
                                                        
                                                    </div>

                                                    <div className="flex flex-col gap-4 mt-1">
                                                        {
                                                            subLinks?.length > 0 &&
                                                            subLinks.map((sublink, index) => (
                                                                <NavLink key={index} to={
                                                                    `/catalog/${sublink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`
                                                                }
                                                                    className="hover:bg-richblack-50
                                                                     p-2 rounded-md">
                                                                    <p>{sublink.name}</p>
                                                                </NavLink>
                                                            )) 
                                                        }
                                                    </div>

                                                    
                                                </div>

                                                
                                                
                                            </div>
                                         )
                                          : (<NavLink to={link?.path}>
                                                <p 
                                                className={`${matchRoute(link?.path) ?
                                                     "text-yellow-25" : ""}`}
                                                > {link?.title} </p>
                                          </NavLink>)
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login / Signup / Dashboard  */}
                <div className="flex gap-x-4 items-center">
                    {
                        user && user?.accountType !== "Instructor" && (
                            <NavLink to={"/dashboard/cart"}
                            className="relative text-richblack-25">
                                <IoCartOutline className="text-3xl hover:text-richblack-5" />
                                {
                                    totalItems > 0 && (
                                        <span className="text-richblack-900 absolute -top-1 -right-1 font-bold
                                         bg-yellow-50 rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </NavLink>
                        )
                    }

                    <div className="hidden md:flex gap-x-4 items-center">
                        {
                            user === null && (
                                <div className="flex text-richblack-25 gap-3">
                                    <NavLink to={"/login"}>
                                        <button
                                         className="border-[1px] py-1 px-2
                                          border-richblack-700 rounded-md
                                          bg-richblack-800
                                          hover:scale-95 transition-all duration-200
                                          hover:bg-richblack-700 hover:text-white">
                                            Log in
                                        </button>
                                    </NavLink>
                                    <NavLink to={"/signup"}>
                                        <button 
                                        className="border-[1px] py-1 px-2
                                          border-richblack-700 rounded-md
                                          bg-richblack-800
                                          hover:scale-95 transition-all duration-200
                                          hover:bg-richblack-700 hover:text-white">
                                            Sign up
                                        </button>
                                    </NavLink>
                                </div>
                                
                            )
                        }
                        {   
                            user !== null && <ProfileDropDown/>
                        }
                    </div>
                    
                    <button className="md:hidden text-richblack-100 ml-1" onClick={() => setIsMobileMenuOpen(true)}>
                        <AiOutlineMenu fontSize={24} />
                    </button>

                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[1000] bg-richblack-900/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center text-richblack-5">
                    <button className="absolute top-6 right-6 text-3xl text-richblack-100" onClick={() => setIsMobileMenuOpen(false)}>
                        <IoCloseOutline />
                    </button>
                    
                    <ul className="flex flex-col gap-6 text-2xl items-center font-medium">
                        <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/" className={matchRoute("/") ? "text-yellow-50" : ""}>Home</NavLink></li>
                        
                        {/* Mobile Catalog Dropdown */}
                        <li className="flex flex-col items-center">
                            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsMobileCatalogOpen(!isMobileCatalogOpen)}>
                                <span className={matchRoute("/catalog") ? "text-yellow-50" : ""}>Catalog</span>
                                <FaAngleDown className={`transition-transform duration-200 ${isMobileCatalogOpen ? "rotate-180" : ""}`} />
                            </div>
                            
                            <div className={`flex flex-col items-center w-[200px] rounded-md bg-richblack-5 overflow-hidden transition-all duration-300 ${isMobileCatalogOpen ? "max-h-[500px] opacity-100 mt-4 py-2" : "max-h-0 opacity-0 py-0"}`}>
                                {subLinks?.length > 0 ? (
                                    subLinks.map((sublink, index) => (
                                        <NavLink 
                                            key={index} 
                                            to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`}
                                            className="text-lg text-richblack-900 py-2 w-full text-center hover:bg-richblack-50"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {sublink.name}
                                        </NavLink>
                                    ))
                                ) : (
                                    <p className="text-richblack-900 text-sm p-2">No courses found</p>
                                )}
                            </div>
                        </li>

                        <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/about" className={matchRoute("/about") ? "text-yellow-50" : ""}>About Us</NavLink></li>
                        <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/contact" className={matchRoute("/contact") ? "text-yellow-50" : ""}>Contact Us</NavLink></li>
                        
                        {user !== null && (
                            <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/dashboard/my-profile" className={location.pathname.includes("dashboard") ? "text-yellow-50" : ""}>Dashboard</NavLink></li>
                        )}

                        {user === null ? (
                            <div className="flex flex-col gap-4 mt-4">
                                <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/login" className="px-6 py-2 border border-richblack-700 bg-richblack-800 rounded-md block text-center">Log in</NavLink></li>
                                <li onClick={() => setIsMobileMenuOpen(false)}><NavLink to="/signup" className="px-6 py-2 border border-richblack-700 bg-richblack-800 rounded-md block text-center">Sign up</NavLink></li>
                            </div>
                        ) : (
                            <li onClick={() => {
                                setIsMobileMenuOpen(false);
                                dispatch(logout(navigate));
                            }} className="mt-4">
                                <button className="px-6 py-2 bg-pink-800 text-pink-200 border border-pink-700 rounded-md">Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Navbar;