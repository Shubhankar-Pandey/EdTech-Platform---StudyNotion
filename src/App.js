import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Navbar from "./Components/Common/Navbar";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import AboutPage from "./Pages/AboutPage";
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import ContactUs from "./Pages/ContactUs";




function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>

        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path="/signup" element= {<SignupPage/>}></Route>
        <Route path="/resetPassword" element = {<ResetPassword/>}></Route>
        <Route path="/updatePassword/:id" element = {<UpdatePassword/>}></Route>
        <Route path="/verify-email" element = {<VerifyEmail/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/contact" element={<ContactUs/>}></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>

        </Route>


      </Routes>
    </div>
  );
}

export default App;
