import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Core/Dashboard/Sidebar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function Dashboard(){

    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.auth);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if(profileLoading || authLoading){
        return (
            <div className="spinner mt-60"></div>
        )
    }

    return (
        <div className="flex w-full min-h-screen relative">
            
            {/* Hamburger for mobile */}
            {!isSidebarOpen && (
                <button 
                    className="absolute top-4 left-4 z-[100] md:hidden p-2 text-richblack-25 bg-richblack-800 border border-richblack-700 rounded-md shadow-md transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <AiOutlineMenu size={24} />
                </button>
            )}

            {/* Sidebar Overlay and Container */}
            <div className={`fixed inset-0 z-[40] bg-richblack-900/50 backdrop-blur-sm transition-opacity md:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsSidebarOpen(false)}></div>
            <div className={`fixed inset-y-0 left-0 z-[50] w-64 flex-shrink-0 md:relative transition-transform duration-300 transform md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            
            <div className="flex-1 overflow-auto bg-richblack-900">
                <div className="w-full pt-20 pb-10 md:py-10 px-4 md:px-10 text-richblack-5">
                    <Outlet/>
                </div>
            </div>
        
        </div>
    )
}

export default Dashboard;