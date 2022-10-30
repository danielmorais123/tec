import React from "react";
import Chats from "../components/Chats";
import Drawer from "../components/Drawer";
import NavbarIntegrated from "../components/NavbarIntegrated";
import Sidebar from "../components/Sidebar";

const Chat = ({
  open,
  setOpen,
  productsInCart,
  setProductsInCart,
  selected,
  setSelected,
}) => {
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
        <div className="flex flex-grow   my-3 mx-6 flex-col xl:flex-row">
          <Chats />
        </div>
      </div>
    </div>
  );
};

export default Chat;
