import React from "react";

const UserFullInformation = () => {
  return (
    <div className=" my-2 flex flex-grow w-full bg-white rounded-2xl   ">
      <ul className="flex w-full">
        <li className="xs5:w-[10rem] w-full  bg-blue-500/80 h-fit text-white font-bold  tracking-wider hover:text-white rounded-t-2xl px-4 py-4 cursor-pointer transition border border-b-2">About</li>
        <li className="xs5:w-[10rem] w-full  h-fit text-gray-500 font-bold  tracking-wider  rounded-t-2xl px-4 py-4 cursor-pointer transition border border-b-2">Email</li>
        <li className="xs5:w-[10rem] w-full  h-fit text-gray-500 font-bold  tracking-wider  rounded-t-2xl px-4 py-4 cursor-pointer transition border border-b-2">Kanban</li>
      </ul>
    </div>
  );
};

export default UserFullInformation;
