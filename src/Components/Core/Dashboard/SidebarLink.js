import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";



function SidebarLink({link}){ 

    const Icon = Icons[link.icon];

    const location = useLocation(); 
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path : route}, location.pathname);
    }


    return (
        <NavLink to={link.path}>

            <div className={`flex ${matchRoute(link.path) && "bg-yellow-800"}`}>
                <div className={`w-[1%] ${matchRoute(link.path) && "bg-yellow-50"}`}></div>
                <div className={`flex gap-2 items-center p-2 mx-4
                    ${matchRoute(link.path) ? "text-yellow-50" : "text-richblack-300"}`}>
                    <Icon/>
                    <span>{link.name}</span>
                </div>
            </div>
            
        </NavLink>
    )
}


export default SidebarLink;