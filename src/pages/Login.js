import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../auth/authFunctions";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase/supabaseConfig";

import { HiLockClosed, HiEye, HiEyeOff, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import logo from "../img/logo.png";
import { Button, Toast, Modal } from "flowbite-react";
import Dialog from "./Dialog";

const Login = () => {
  const { authUser, setAuthUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [isEyeOff, setIsEyeOff] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const result = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (result.data.length === 0) {
      setErrorMsg("Email not found. Try another one.");
      return;
    }

    let { user, error } = await loginWithEmailAndPassword(email, password);
    if (error.message.includes("Invalid login credentials")) {
      setErrorMsg("Wrong Email and Password combination");
      return;
    }
    if (!error) {
      navigate("/");
    }
  };

  const loginWithFacebook = async (e) => {
    e.preventDefault();

    const { user, session, error } = await supabase.auth.signIn({
      provider: "facebook",
    });
    if (!error) {
      setAuthUser(user);
      navigate("/");
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
    if (!error) {
      setAuthUser(user);
      navigate("/");
    }
  };

  return (
    <div className="h-screen bg-gray-200 relative flex flex-col lg:flex-row lg:justify-center items-center w-full">
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="lg:w-[50%] md:w-[65%] relative flex justify-center items-center bg-white lg:mx-10  w-[90%] rounded-xl mt-4 p-5  lg:max-w-[400px] lg:h-[70%]"
      >
        {errorMsg ? (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 mt-1"
          >
            <Toast style={{ backgroundColor: "#DB4437", height: "9px" }}>
              <div className="inline-flex h-5 w-8 shrink-0 items-center justify-center rounded-lg  text-red-800 dark:bg-red-800 dark:text-red-200">
                <HiX
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setErrorMsg("")}
                />
              </div>
              <div className="ml-3 text-white text-sm font-normal">
                {errorMsg}
              </div>
            </Toast>
          </motion.div>
        ) : null}
        <div className=" flex flex-col justify-center items-center">
          <img src={logo} className="w-[50%] min-w-[150px]" />
          <h3 className="tracking-wide text-gray-500 font-semibold mt-3 text-lg">Welcome Back !</h3>
          <p className="text-xs text-gray-400 mt-2">
            Sign in to use our application
          </p>

          <div class="relative w-[85%] mt-4">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMsg) {
                  setErrorMsg("");
                }
              }}
              type="text"
              id="email-address-icon"
              class={`bg-gray-50 border placeholder-gray-300  ${
                errorMsg ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="example@flowbite.com"
            />
          </div>

          <div class="relative w-[85%] mt-4">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <HiLockClosed className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) {
                  setErrorMsg("");
                }
              }}
              type={!isEyeOff ? "password" : "text"}
              id="email-address-icon"
              class={`bg-gray-50 border placeholder-gray-300  ${
                errorMsg ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Website@123"
            />
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex absolute inset-y-0 right-0 items-center pr-3 "
            >
              {!isEyeOff ? (
                <HiEye
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setIsEyeOff(true)}
                />
              ) : (
                <HiEyeOff
                  className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  onClick={() => setIsEyeOff(false)}
                />
              )}
            </motion.div>
          </div>
          <React.Fragment>
            <p
              className="text-xs underline mt-1 text-gray-400 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              Forgot your password?
            </p>
            {openModal ? (
              <Dialog
                setOpenModal={setOpenModal}
                setEmail={setEmail}
                email={email}
                setErrorMsg={setErrorMsg}
              />
            ) : null}
          </React.Fragment>

          <button
            onClick={login}
            class="w-[85%] mt-2 lg:w-[50%] text-white bg-[#0F9D58] hover:bg-[#0F9D58]/90 focus:ring-4 focus:ring-[#0F9D58] font-medium rounded-xl text-sm px-5 py-2.5  mb-2 dark:bg-[#0F9D58] dark:hover:[#0F9D58] focus:outline-none dark:focus:[#0F9D58]"
          >
            Log In
          </button>
          <p className="text-sm text-gray-400 mt-5">- Or you can join with -</p>
          <div className="w-[90%] flex flex-row flex-wrap justify-center mt-2">
            <button
              onClick={loginWithFacebook}
              class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
              Sign in with Facebook
            </button>
            <button
              onClick={signInWithGoogle}
              class="text-white bg-[#DB4437] hover:bg-[#DB4437]/90 focus:ring-4 focus:outline-none focus:ring-[#DB4437]/50 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#DB4437]/55 mr-2 mb-2"
            >
              <svg
                class="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
          <p className="text-sm text-gray-400 flex mt-6">
            Don't you have an account?{" "}
            <Link to="/register">
              <p className="ml-1 text-[#46469e] underline">Sign Up Now</p>
            </Link>{" "}
          </p>
        </div>
      </motion.div>
      <div className="bg-white flex-grow w-full lg:w-[65%] xl:w-[50%] lg:h-screen mt-4 lg:mt-0 lg:ml-2 rounded-t-2xl lg:rounded-r-none lg:rounded-l-3xl flex flex-col justify-evenly">
        <div className=" flex flex-col justify-center items-center   ">
          <motion.img
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="p-5 mt-2 object-cover lg:max-w-[60%] w-[80%]"
            src="https://themesbrand.com/borex/layouts/assets/images/login-img.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
