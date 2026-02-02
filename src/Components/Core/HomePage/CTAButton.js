import { NavLink } from "react-router-dom";



function CTAButton({children, active, linkTo}){
    return (
        <NavLink to={linkTo}>
            <div className={`${active ? "bg-yellow-50 text-black border-b-2 border-r-2 border-yellow-5" :
             "bg-richblack-800 border-b-2 border-r-2 border-richblack-500 text-white"}
            text-center text-[13px] px-6 py-3 rounded-md font-bold
            hover:scale-95 transition-all duration-200`}>
                {children}
            </div>
        </NavLink>
    )
}

export default CTAButton;