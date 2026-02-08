import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function MyProfile(){

    const {user} = useSelector((state) => state.profile);
    const navigation = useNavigate();


    return (
        <div>

            <h1>
                My Profile
            </h1>

        </div>
    )
}

export default MyProfile;

