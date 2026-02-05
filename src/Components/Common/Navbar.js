import { matchPath, NavLink } from "react-router-dom";
import StudyNotionLOGO from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from "../Core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../Services/apiConnector";
import { categories } from "../../Services/apis";
import { FaAngleDown } from "react-icons/fa";




function Navbar(){

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    const totalItems = useSelector((state) => state.cart.totalItems); 

    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchCategories = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing sublinks result : ", result);
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
         border-b-[1px] border-b-richblack-700">

            <div className="flex w-11/12 max-w-maxContent items-center justify-between">

                {/* LOGO  */}
                <NavLink to={"/"}>
                    <img alt="StudyNotionLOGO" src={StudyNotionLOGO}
                     width={160} height={42} loading="lazy"></img>
                </NavLink>

                {/* Nav links  */}
                <nav>
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
                                                lg:w-[300px]">

                                                    <div className="absolute left-32 rounded
                                                    -top-2 h-6 w-6 rotate-45 bg-richblack-5">

                                                    </div>

                                                    {
                                                        subLinks?.length > 0 &&
                                                        subLinks.map((sublink, index) => (
                                                            <NavLink key={index} to={sublink.link}>
                                                            <p>{sublink.title}</p>
                                                            </NavLink>
                                                        )) }
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
                            className="relative">
                                <IoCartOutline />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </NavLink>
                        )
                    }
                    {
                        token === null && (
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
                        token !== null && <ProfileDropDown/>
                    }
                    
                </div>

            </div>
        </div>
    )
}

export default Navbar;