import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../Services/operation/authAPI";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../Common/ConfirmationModal";



function Sidebar(){

    const {user, loading : profileLoading} = useSelector((state) => state.profile);
    const {loading : authLoading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);


    if(profileLoading || authLoading){
        return (
            <div className="spinner mt-60"></div>
        )
    }


    return (
        <div className="bg-richblack-400">
            <div className="flex min-w-[222px] flex-col
             border-r-[1px] border-richblack-700 h-[calc(100vh - 3.5rem)]
             bg-richblack-800 py-10">

                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type){
                                return null;
                            }
                            return (
                                <SidebarLink key={link.id} link={link}/>
                            )
                        })
                    }
                </div>

                <div className="flex flex-col">
                    <SidebarLink 
                        link={
                            {
                                name : "Settings",
                                path : "/dashboard/settings",
                                icon : "VscSettingsGear",
                            }
                        }
                    />

                    <button 
                        onClick={() => setConfirmationModal(
                            {
                                text1 : "Are you sure",
                                text2 : "You will be logged out from your account",
                                btn1Text : "Logout",
                                btn2Text : "Cancel",
                                btn1Handler : () => dispatch(logout(navigate)),
                                btn2Handler : () => setConfirmationModal(null),
                            }
                        )}
                            className="text-richblack-200"
                        >

                        <div className="flex items-center gap-x-2 text-richblack-200">
                            <VscSignOut/>
                            <span>Logout</span>
                        </div>

                    </button>

                </div>

            </div>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        
        </div>

    )
}

export default Sidebar;