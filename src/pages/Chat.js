import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import ChatBetweenUsers from "../components/Chat/ChatBetweenUsers";
import Chats from "../components/Chat/Chats";

import NavbarIntegrated from "../components/Navbar/NavbarIntegrated";

import { supabase } from "../supabase/supabaseConfig";

const Chat = ({
  open,
  setOpen,
  productsInCart,
  setProductsInCart,
  selected,
  setSelected,
  users,
}) => {
  const { chatId } = useParams();
  const chatIdSelected = parseInt(chatId);

  const [userIdWithAuthUser, setUserIdWithAuthUser] = useState();

  const { authUser } = useAuth();

  useEffect(() => {
    supabase
      .from("cart")
      .select("products")
      .eq("id", authUser?.id)
      .then((value) => {
        if (value.data) setProductsInCart(value.data[0].products);
      });
  }, [authUser]);

  return (
    <div className="flex relative flex-row  min-h-screen">
      {/*<Sidebar open={open} selected={selected} setSelected={setSelected} />
      <Drawer open={open} setOpen={setOpen} /> */}
      <div className="bg-gray-100 flex flex-col rounded-tl-[30px] flex-grow">
        <NavbarIntegrated
          setOpen={setOpen}
          open={open}
          productsInCart={productsInCart}
          setProductsInCart={setProductsInCart}
          users={users}
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
