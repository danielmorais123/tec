import React from "react";

const Chats = () => {
  return (
    <div className="bg-white flex justify-center p-3 rounded-2xl w-full xl:w-[350px]">
      <div className="bg-gray-50 w-[90%] p-2 flex justify-center items-center flex-col h-fit rounded-2xl">
        <img
        className="object-contain  w-20 "
          src={
            "https://cdn-icons-png.flaticon.com/512/3006/3006876.png"
          }
        />

        <h1 className="text-center mt-2 text-gray-600 tracking-wider">Daniel Sousa</h1>
        <span className="mt-1 tracking-wide">Online</span>
      </div>
    </div>
  );
};

export default Chats;
