import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditButton from "./EditButton"




function MyProfile(){

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    console.log("user : ", user);


    return (
        <div className="text-white w-full">

            <h1 className="text-2xl text-richblack-5">
                My Profile
            </h1>

            <div className="w-[70%] mx-20 mt-16 bg-richblack-800 p-4
             rounded-lg border-[1px] border-richblack-700
              flex items-center gap-5">
                
                <img alt="userImage" src={user.image}
                className="w-16 h-16 rounded-full"></img>

                <div className="flex w-full justify-between items-center p-2">

                    <div className="flex flex-col">
                        <p>
                            {user.firstName}
                            {" "}
                            {user.lastName}
                        </p>
                        <p className="text-sm text-richblack-300">{user.email}</p>
                    </div>

                    <EditButton link={"/edit-profile"}/>
                
                </div>

            </div>

            <div className="w-[70%] mx-20 mt-4 bg-richblack-800 p-4
             rounded-lg border-[1px] border-richblack-700
              flex flex-col">

                <div className="flex justify-between">
                    <p className="text-richblack-5">Personal Details</p>
                    <EditButton link={"/edit-profile"}/>
                </div>

                <div className="flex justify-between w-[60%] text-sm">
                    <div className="flex flex-col">
                        <p className="text-richblack-600">First Name</p>
                        <p className="text-richblack-5">{user.firstName}</p>
                    </div>
                    <div>
                        <p className="text-richblack-600">Last Name</p>
                        <p className="text-richblack-5">{user.lastName}</p>
                    </div>
                </div>

                <div className="flex justify-between w-[60%] text-sm mt-4">
                    <div className="flex flex-col">
                        <p className="text-richblack-600">Email</p>
                        <p className="text-richblack-300">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-richblack-600">Gender</p>
                        
                            {
                                user.additionalDetail.gender ? (
                                    <p className="text-richblack-5">
                                        {user.additionalDetail.gender}
                                    </p>
                                )
                                : (<p className="text-richblack-5">Add gender</p>)
                            }
                        
                    </div>
                </div>

              </div>

            

        </div>
    )
}

export default MyProfile;

