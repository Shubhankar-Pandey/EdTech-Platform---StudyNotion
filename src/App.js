import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Navbar from "./Components/Common/Navbar";



function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path="/signup" element= {<SignupPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
