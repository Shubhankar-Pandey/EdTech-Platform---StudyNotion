import "./App.css";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";


function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
