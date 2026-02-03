import loginPageImage from "../assets/Images/login.webp";
import frame from "../assets/Images/frame.png";
import { NavLink } from "react-router-dom";
import { CgAsterisk } from "react-icons/cg";
import { useState } from "react";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

function LoginPage() {
  const [isVisible, setVisible] = useState(false);

  const [formData, setFormValue] = useState({
    role: "Student",
    email: "",
    password: "",
  });

  function selectRoleHandler(user) {
    setFormValue((prev) => ({
      ...prev,
      role: user,
    }));
  }

  function emailHandler(event) {
    setFormValue((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  }

  function passwordHandler(event) {
    setFormValue((prev) => ({
      ...prev,
      password: event.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="min-h-screen bg-richblack-900">
      <div
        className="w-11/12 mx-auto mt-20
        flex flex-col lg:flex-row
        items-center lg:items-start
        justify-center lg:justify-evenly
        gap-12"
      >
        {/* Part 1 - Form */}
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40%]">
          <p className="text-richblack-5 text-3xl sm:text-4xl font-semibold">
            Welcome Back
          </p>
          <p className="text-richblack-100 mt-2">
            Build skills for today, tomorrow and beyond.
          </p>

          {/* Role Selector */}
          <div
            className="flex bg-richblack-800 text-richblack-200
            rounded-full w-full sm:w-[70%] md:w-[60%] lg:w-[50%]
            border border-richblack-600 mt-8"
          >
            <div
              onClick={() => selectRoleHandler("Student")}
              className={`w-1/2 m-1 rounded-full flex items-center justify-center p-2
              cursor-pointer transition-all duration-200
              ${
                formData.role === "Student"
                  ? "bg-richblack-900 border border-richblack-200 text-white"
                  : ""
              }`}
            >
              Student
            </div>

            <div
              onClick={() => selectRoleHandler("Instructor")}
              className={`w-1/2 m-1 rounded-full flex items-center justify-center p-2
              cursor-pointer transition-all duration-200
              ${
                formData.role === "Instructor"
                  ? "bg-richblack-900 border border-richblack-200 text-white"
                  : ""
              }`}
            >
              Instructor
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="mt-6">
            {/* Email */}
            <div className="flex flex-col mt-6">
              <label
                htmlFor="email"
                className="text-white text-sm mb-1 flex items-center gap-1"
              >
                Email Address
                <CgAsterisk className="text-pink-200 text-xs" />
              </label>

              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={emailHandler}
                placeholder="Enter email address"
                className="text-richblack-200 w-full sm:w-[90%] md:w-[80%]
                p-2 bg-richblack-800 border-b border-richblack-600 rounded-md"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mt-6">
              <label
                htmlFor="password"
                className="text-white text-sm mb-1 flex items-center gap-1"
              >
                Password
                <CgAsterisk className="text-pink-200 text-xs" />
              </label>

              <div className="relative w-full sm:w-[90%] md:w-[80%]">
                <input
                  type={isVisible ? "text" : "password"}
                  id="password"
                  required
                  value={formData.password}
                  onChange={passwordHandler}
                  placeholder="Enter password"
                  className="text-richblack-200 w-full p-2 pr-10
                  bg-richblack-800 border-b border-richblack-600 rounded-md"
                />

                <button
                  type="button"
                  aria-label={isVisible ? "Hide password" : "Show password"}
                  onClick={() => setVisible((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                  text-richblack-200 text-xl hover:text-white"
                >
                  {isVisible ? <IoEyeOffSharp /> : <IoEyeSharp />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div
              className="text-blue-200 flex justify-end
              w-full sm:w-[90%] md:w-[80%]
              text-sm mt-2 hover:text-blue-100"
            >
              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-8 w-full sm:w-[90%] md:w-[80%]
              bg-yellow-50 text-richblack-900 p-2
              font-semibold rounded-md
              hover:scale-95 transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>

        {/* Part 2 - Image */}
        <div className="hidden lg:block w-[40%] relative">
          <img src={frame} alt="frame" />
          <img
            src={loginPageImage}
            alt="login"
            className="absolute bottom-6 right-6"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
