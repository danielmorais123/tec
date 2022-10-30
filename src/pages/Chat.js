import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import ChatBetweenUsers from "../components/ChatBetweenUsers";
import Chats from "../components/Chats";
import Drawer from "../components/Drawer";
import NavbarIntegrated from "../components/NavbarIntegrated";
import Sidebar from "../components/Sidebar";
import { supabase } from "../supabase/supabaseConfig";

const Chat = ({
  open,
  setOpen,
  productsInCart,
  setProductsInCart,
  selected,
  setSelected,
}) => {
  const { chatId } = useParams();
  const chatIdSelected = parseInt(chatId);
  const [users, setUsers] = useState([]);
  const [userIdWithAuthUser, setUserIdWithAuthUser] = useState();
 

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .then((res) => setUsers(res.data));
  }, []);

  const { authUser } = useAuth();

  return (
    <div className="flex relative flex-row  min-h-screen">
      <Sidebar open={open} selected={selected} setSelected={setSelected} />
      <Drawer open={open} setOpen={setOpen} />
      <div className="bg-gray-100 flex flex-col rounded-tl-[30px] flex-grow">
        <NavbarIntegrated
          setOpen={setOpen}
          open={open}
          productsInCart={productsInCart}
          setProductsInCart={setProductsInCart}
        />
        <div className="flex flex-grow  my-3 mx-6 flex-col xl:flex-row">
          <Chats
            users={users}
            userIdWithAuthUser={userIdWithAuthUser}
            setUserIdWithAuthUser={setUserIdWithAuthUser}
            chatIdSelected={chatIdSelected}
          />
          <ChatBetweenUsers
            userIdWithAuthUser={userIdWithAuthUser}
            setUserIdWithAuthUser={setUserIdWithAuthUser}
            chatIdSelected={chatIdSelected}
            users={users}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
