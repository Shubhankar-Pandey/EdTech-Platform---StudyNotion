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
        <NavLink 
            to={link.path}
            className={`${matchRoute(link.path) && "bg-yellow-100 opacity-30"}`}
        >
            <div className="text-white">
                <Icon/>
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}


export default SidebarLink;