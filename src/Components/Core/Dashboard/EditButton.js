import { NavLink } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";


function EditButton({link}){
    return (
        <div>
            <NavLink to={"/dashboard/settings"}
                className="bg-yellow-50 text-richblack-900
                px-3 rounded-lg flex gap-2 py-2">
                <LiaEdit className="text-2xl" />
                <p>Edit</p>
            </NavLink>
        </div>
    )
}

export default EditButton;