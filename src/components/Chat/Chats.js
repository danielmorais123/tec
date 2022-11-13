import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../supabase/supabaseConfig";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import SearchInput from "../TextInputs/SearchInput";
import { motion } from "framer-motion";

const Chats = ({
  users,
  chatIdSelected,
  setUserIdWithAuthUser,
  userIdWithAuthUser,
}) => {
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState("");
  const { authUser } = useAuth();

  console.log({ users });

  const usersFiltered = users.filter((user) => user?.email.includes(query));

  const chatsFiltered = chats.filter(
    (chat) =>
      (chat?.usersInChat[0] ===
        usersFiltered.find((u) => u?.id === chat?.usersInChat[0])?.id &&
        authUser?.id !== chat?.usersInChat[0]) ||
      (chat?.usersInChat[1] ===
        usersFiltered.find((u) => u?.id === chat?.usersInChat[1])?.id &&
        authUser?.id !== chat?.usersInChat[1])
  );

  console.log({ usersFiltered });
  console.log({ chatsFiltered });
  const navigate = useNavigate();

  const searchChat = () => {
    chats.filter((chat) => {});
  };

  useMemo(() => {
    supabase
      .from("chat")
      .select("*")
      .then((res) => {
        let allUsersChat = [];
        res.data.forEach((chat) => {
          if (chat.usersInChat.includes(authUser?.id)) {
            allUsersChat.push(chat);
          }
        });

        setChats(allUsersChat);
      });
  }, [authUser]);

  useEffect(() => {
    let chatSelected = chats.find((chat) => chat?.id === chatIdSelected);

    setUserIdWithAuthUser(
      chatSelected?.usersInChat[0] === authUser?.id
        ? chatSelected?.usersInChat[1]
        : chatSelected?.usersInChat[0]
    );
  }, [chats]);

  if (!authUser) {
    return <h1>Sign In</h1>;
  }

  return (
    <div className="bg-white flex flex-col  items-center  rounded-2xl w-full xl:w-[400px]">
      <div className="bg-gray-50 w-[90%] mt-3 p-2 flex justify-center items-center flex-col h-fit rounded-2xl">
        <label className="btn btn-ghost !bg-transparent btn-circle avatar ">
          <div className="w-[10rem] rounded-full">
            <img
              className="object-contain"
              src={
                users.find((user) => user.id === authUser.id)?.photoUrl
                  ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${
                      users.find((user) => user.id === authUser.id)?.photoUrl
                    } `
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              }
            />
          </div>
        </label>

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
      <SearchInput value={query} setValue={setQuery} onSubmit={searchChat} />
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
        {chatsFiltered.map((chat, index) => (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            key={index}
          >
            <div
              className={`flex p-2 justify-between items-center cursor-pointer ${
                chat?.id === chatIdSelected ? "bg-gray-100 " : "bg-none"
              }`}
              onClick={() => {
                navigate(`/chat/${chat.id}`);
                setUserIdWithAuthUser(
                  chat.usersInChat[0] === authUser?.id
                    ? chat?.usersInChat[1]
                    : chat?.usersInChat[0]
                );
              }}
            >
              <div className="flex">
                <label
                  tabIndex={0}
                  className="btn btn-ghost !bg-transparent btn-circle avatar "
                >
                  <div className="w-[44px] rounded-full">
                    <img
                      className="object-contain"
                      src={
                        users.find(
                          (user) =>
                            user.id === chat.usersInChat[0] &&
                            chat.usersInChat[0] !== authUser?.id
                        )?.photoUrl
                          ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${
                              users.find(
                                (user) =>
                                  user.id === chat.usersInChat[0] &&
                                  chat.usersInChat[0] !== authUser?.id
                              )?.photoUrl
                            } `
                          : users.find(
                              (user) =>
                                user.id === chat.usersInChat[1] &&
                                chat.usersInChat[1] !== authUser?.id
                            )?.photoUrl
                          ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${
                              users.find(
                                (user) =>
                                  user.id === chat.usersInChat[1] &&
                                  chat.usersInChat[1] !== authUser?.id
                              )?.photoUrl
                            } `
                          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                      }
                    />
                  </div>
                </label>

                <div className="ml-1 flex flex-col justify-evenly overflow-x-hidden">
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Chats;
