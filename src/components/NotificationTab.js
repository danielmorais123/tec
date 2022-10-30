import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "flowbite-react";
import React from "react";
import { faBell, faEye } from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";
import Message from "./Message";

const NotificationTab = () => {
  const abc = ["a", "b", "c", "d", "e", "f"];
  return (
    <div className="dropdown dropdown-end relative w-5 h-5 mr-2">
      <label
        tabIndex={0}
        className="btn btn-ghost !bg-transparent btn-circle w-full !h-5 items-start "
      >
        <div className="w-full text-gray-400 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "18px", width: "16px" }}
            viewBox="0 0 448 512"
          >
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
          </svg>
          <span className="bg-red-400 text-white rounded-full px-1 text-2xs absolute top-[-9px] right-[-6px]">
            2
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3  shadow-2xl menu menu-compact dropdown-content rounded-box bg-white w-[230px] xs:w-[300px] flex flex-col flex-wrap"
      >
        <div className="w-full flex bg-red-400 text-gray-100 rounded-t-lg cursor-pointer justify-center items-center">
          <FontAwesomeIcon icon={faBell} />
          <h1 className="tracking-wide font-semibold text-sm text-center p-1 ">
            Notifications
          </h1>
        </div>

        <Divider />
        <div className="flex flex-col max-h-[250px] overflow-y-scroll  scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100">
          {abc.map((a, index) => (
            <Message key={index} dontShowDivider={abc.length - 1 === index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationTab;
