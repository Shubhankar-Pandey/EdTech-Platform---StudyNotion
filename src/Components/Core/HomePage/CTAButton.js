import { NavLink } from "react-router-dom";



function CTAButton({children, active, linkTo}){
    return (
        <NavLink to={linkTo}>
            <div className={`${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
            text-center text-[13px] px-6 py-3 rounded-md font-bold
            hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </NavLink>
    )
}

export default CTAButton;