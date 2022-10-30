import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../supabase/supabaseConfig";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Chats = ({
  users,
  chatIdSelected,
  userIdWithAuthUser,
  setUserIdWithAuthUser,
}) => {
  const [chats, setChats] = useState([]);

  const { authUser } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("chat")
      .select("*")
      .contains("usersInChat", [authUser?.id])
      .then((res) => setChats(res.data));
  }, []);

  if (!authUser) {
    return <h1>Sign In</h1>;
  }

  return (
    <div className="bg-white flex flex-col  items-center  rounded-2xl w-full xl:w-[400px]">
      <div className="bg-gray-50 w-[90%] mt-3 p-2 flex justify-center items-center flex-col h-fit rounded-2xl">
        <img
          className=" w-20 h-20 object-contain rounded-full"
          src={
            "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
          }
        />

        <h1 className="text-center mt-2 text-gray-600 tracking-wider text-2xs xs:text-md">
          {authUser?.email}
        </h1>
        <span className="mt-1 tracking-wide flex items-center text-sm text-[0.6rem]">
          <FontAwesomeIcon
            icon={faCircle}
            className="text-green-300 mr-1 text-[5px] xs:text-[7px]"
          />
          Online
        </span>
      </div>
      <div class="relative  mt-10 w-[90%]">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Chat"
          required
        />
        <button
          type="submit"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <div className="w-full mt-5 ">
        <ul className="flex items-center w-full  bg-gray-100">
          <li className="bg-blue-500 text-white py-2  tracking-wider text-center rounded-xl cursor-pointer w-[50%] text-sm">
            Chats
          </li>
          <li className=" text-gray-600  py-2 text-center rounded-lg tracking-wider cursor-pointer w-[50%] text-sm">
            {" "}
            Contacts
          </li>
        </ul>
      </div>
      <hr />
      <div className=" w-full mt-1">
        <h1 className="px-3 text-gray-700 tracking-wider text-sm">Recent</h1>
        <hr />
      </div>
      <div className="w-full max-h-[50vh] overflow-y-scroll hover:transition-all duration-150  scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100">
        {chats
          .sort((a, b) => a.created_at + b.created_at)
          .map((chat, index) => (
            <div key={index}>
              <div
                className={`flex p-2 justify-between items-center cursor-pointer ${
                  chat?.id === chatIdSelected && "bg-gray-100 "
                }`}
                onClick={() => {
                  navigate(`/chat/${chat.id}`);
                  setUserIdWithAuthUser(chat.id);
                }}
              >
                <div className="flex">
                  <img
                    src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-2 flex flex-col justify-evenly overflow-x-hidden">
                    <p className="xs:text-sm text-xs text-gray-700 tracking-wide ">
                      {authUser?.id === chat.usersInChat[1]
                        ? users.filter(
                            (user) => user.id == chat.usersInChat[0]
                          )[0]?.email
                        : users.filter(
                            (user) => user.id == chat.usersInChat[1]
                          )[0]?.email}
                    </p>
                    <p className="text-2xs text-gray-400">{chat.lastMessage}</p>
                  </div>
                </div>
                <span className="text-2xs xs:text-xs">
                  {chat.lastMessage_created}
                </span>
              </div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chats;
