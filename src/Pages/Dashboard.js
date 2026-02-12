import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Core/Dashboard/Sidebar";


function Dashboard(){

    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.auth);

    if(profileLoading || authLoading){
        return (
            <div className="spinner mt-60"></div>
        )
    }

    return (
        <div className="flex w-screen min-h-screen relative">
            
            <Sidebar/>
            
            <div className="overflow-auto w-[80%] mx-auto">
                <div className="mx-auto max-w-[1000px] py-10">
                    <Outlet/>
                </div>
            </div>
        
        </div>
    )
}

export default Dashboard;