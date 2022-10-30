import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import justicon from "../img/justicon.png";
import { supabase } from "../supabase/supabaseConfig";
import { HiCog } from "react-icons/hi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";
import { Dropdown } from "react-daisyui";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [picUrl, setPicUrl] = useState("")

  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate()

  const logout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    setAuthUser(null);
  };



  const getUserPhoto = () => {

    const result = supabase
      .from("users")
      .select("photoUrl")
      .eq("email", authUser?.email).then((response) => {

        const { publicURL, error } = supabase
          .storage
          .from('images')
          .getPublicUrl(`public/${response.data[0].photoUrl}`)

        setPicUrl(publicURL)
      })






  }


  useEffect(() => {
    getUserPhoto()

  }, [])




  return (
    <div className="bg-slate-600 w-full p-3 flex  items-center justify-between  lg:justify-around">
      <img src={justicon} className="w-[70px] object-contain" />
      <div className="md:hidden flex md:order-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={picUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden md:flex items-center">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge bg-red-400 !text-white badge-sm indicator-item">8</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52  shadow bg-white"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info text-sm">Subtotal: $999</span>
              <div className="card-actions">
                <button className="bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none transition font-medium px-3 p-2 rounded-lg text-sm text-white">
                  <FontAwesomeIcon icon={faCartShopping} />{'   '}
                  Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={picUrl} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>

            <li onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
