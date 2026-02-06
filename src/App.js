import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Navbar from "./Components/Common/Navbar";
import ResetPassword from "./Pages/ResetPassword";
import UpdatePassword from "./Pages/UpdatePassword";



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
      </Routes>
    </div>
  );
}

export default App;
