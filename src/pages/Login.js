import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../auth/authFunctions";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase/supabaseConfig";
import { Carousel } from "flowbite-react";
import { HiLockClosed } from "react-icons/hi";
const Login = () => {
  const { authUser, setAuthUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    let response = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(response);
    setAuthUser(response.user);
  };

  const login = async (e) => {
    e.preventDefault();

    let { user } = await loginWithEmailAndPassword(email, password);

    setAuthUser(user);
  };

  const loginWithFacebook = async (e) => {
    e.preventDefault();
    console.log("entrou facebook");
    const { user, session, error } = await supabase.auth.signIn({
      provider: "facebook",
    });
    console.log({ user, error, session });
    setAuthUser(user);
  };

  return (
    <div className="h-screen bg-gray-200 flex flex-col  lg:flex-row lg:justify-center items-center w-full">
      <div className="lg:w-[50%] md:w-[65%]  flex justify-center items-center bg-white lg:mx-10  w-[90%] rounded-xl mt-4 p-5  lg:max-w-[400px] lg:h-[70%]">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="font-bold mt-1 lg:text-3xl">Daniel</h1>
          <h3 className="tracking-wide font-semibold mt-5">Welcome Back !</h3>
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
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email-address-icon"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@flowbite.com"
            />
          </div>

          <div class="relative w-[85%] mt-4">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <HiLockClosed className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="email-address-icon"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Website@123"
            />
          </div>

          <button
            onClick={login}
            class="w-[85%] mt-4 lg:w-[50%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
              type="button"
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
      </div>
      <div className="bg-white flex-grow  w-full lg:w-[65%] xl:w-[50%] lg:h-screen mt-4 lg:mt-0 lg:ml-2 rounded-t-2xl lg:rounded-r-none lg:rounded-l-3xl">
        <div className=" flex flex-col justify-center   ">
          <img
            className="p-5 mt-2 object-cover"
            src="https://themesbrand.com/borex/layouts/assets/images/login-img.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
