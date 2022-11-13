import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { supabase } from "../../supabase/supabaseConfig";
import {
  faCircle,
  faEnvelope,
  faPaperPlane,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import FileUpload from "../File/FileUpload";

const ChatBetweenUsers = ({
  chatIdSelected,
  users,
  setUserIdWithAuthUser,
  userIdWithAuthUser,
}) => {
  const [conversation, setConversation] = useState([]);
  const [imageMessage, setImageMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [userInConversation, setUserInConversation] = useState({});

  const { authUser } = useAuth();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase
      .from("messages")
      .select("*")
      .eq("chatId", chatIdSelected)
      .then((res) => {
        setConversation(res.data);
      });
  }, [chatIdSelected]);

  console.log({ userIdWithAuthUser });

  console.log({ conversation });

  useEffect(() => {
    setUserInConversation(users.find((user) => user.id === userIdWithAuthUser));
  }, [userIdWithAuthUser, users]);

  console.log({ userInConversation });
  useEffect(() => {
    const sub = supabase
      .from("messages")
      .on("INSERT", (mes) => {
        console.log({ mes });
        setMsg("");

        setConversation((prev) => {
          return [...prev, mes.new];
        });
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(sub);
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!chatIdSelected) {
      alert("Select a chat");
      return;
    }

    if (imageMessage) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(
          `public/chatMessagesImages/${imageMessage?.name}`,
          imageMessage
        );

      if (error) {
        setErrorMsg(error.message);
        console.log({ errorMsg });
        return;
      }
    }

    supabase
      .from("messages")
      .insert({
        chatId: chatIdSelected,
        userSenderId: authUser.id,
        message: msg,
        typeMessage: imageMessage ? "file" : "text",
        image: imageMessage.name || null,
      })
      .then((value) => console.log({ value }));

    supabase
      .from("chat")
      .update({
        lastMessage: imageMessage ? "Enviou um ficheiro" : msg,
        lastMessage_created: new Date(),
      })
      .eq("id", chatIdSelected)
      .then((res) => console.log({ res }));

    setImageMessage("");
  };

  if (!authUser) {
    return <></>;
  }

  return (
    <div className="bg-white flex flex-col  items-center  rounded-2xl xl:ml-10 mt-5 xl:mt-0 justify-between  flex-grow  ">
      <div className="w-full flex flex-col">
        {conversation ? (
          <div className="flex justify-between w-full  p-3">
            <div className="flex">
              <img
                src={
                  userInConversation?.photoUrl
                    ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${userInConversation?.photoUrl} `
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                }
                className="w-12 h-12 rounded-full object-contain bg-gray-200"
              />
              <div className="ml-3 flex flex-col justify-center">
                <h1 className="text-gray-600">{userInConversation?.email}</h1>
                <span className="text-sm flex items-center ">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[4px] text-green-400 mr-1"
                  />{" "}
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center p-2">
              <FontAwesomeIcon icon={faSearch} className="px-2" />
              <div>
                <FontAwesomeIcon icon={faCircle} className=" text-[4px]" />
                <FontAwesomeIcon icon={faCircle} className=" text-[4px] ml-1" />
                <FontAwesomeIcon icon={faCircle} className="text-[4px] ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <h1 className="p-2 text-2xl">Select a chat</h1>{" "}
          </div>
        )}
        <hr className=" w-full" />
      </div>

      <div className="max-h-[72vh] overflow-y-scroll relative overflow-x-hidden w-full flex flex-col scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100">
        {conversation &&
          conversation.map((mes, index) => (
            <div
              key={mes.id}
              className={` flex   ${
                authUser?.id === mes.userSenderId &&
                "self-end mr-5 flex-row-reverse "
              } 
        ${authUser?.id !== mes.userSenderId && "self-start ml-5 "} `}
            >
              <img
                src={
                  users.find((user) => user.id === mes.userSenderId)?.photoUrl
                    ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${userInConversation?.photoUrl} `
                    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                }
                className="w-10 h-10 rounded-full object-contain bg-gray-200 mt-2"
              />
              <div
                className={`
            ${authUser?.id === mes.userSenderId ? "mr-2" : "ml-2"} 
            overflow-y-hidden pt-1 max-w-[300px] min-w-[150px] h-fit overflow-y-scroll scrollbar-thin overflow-x-hidden scrollbar-thumb-red-400 scrollbar-track-gray-100  relative  bg-gray-100 text-gray-700 my-2 rounded-md min-h-[80px]  text-sm`}
              >
                {" "}
                <p className="w-full overflow-hidden px-1 mx-1 text-xs">
                  {" "}
                  {mes?.message}
                </p>
                {mes?.typeMessage !== "text" ? (
                  <img
                    className="p-3 object-contain"
                    src={`https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/public/chatMessagesImages/${mes.image}`}
                  />
                ) : null}
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col w-full">
        <hr className=" w-full content-end" />
        <form
          onSubmit={onSubmit}
          className="w-full flex p-3 justify-center items-center"
        >
          <div className="relative w-full flex flex-row">
            <label
              htmlFor="chat_files"
              className="absolute top-2 left-2 cursor-pointer hover:opacity-80"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Upload image</span>
            </label>
            <input
              type="file"
              className="hidden"
              id="chat_files"
              onChange={(e) => setImageMessage(e.target.files[0])}
            />
            {/*<div className="flex absolute inset-y-0 justify-center left-10 items-center pl-3 pointer-events-none">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="w-4 h-4 text-gray-500 dark:text-gray-400 "
            />
          </div> */}

            <input
              disabled={chatIdSelected ? false : true}
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              id="simple-search"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Send Message..."
              required
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBetweenUsers;
