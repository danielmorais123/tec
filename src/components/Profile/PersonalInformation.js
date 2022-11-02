import React from "react";
import social from "../../img/socialinfo.svg";

const PersonalInformation = () => {
  return (
    <div className="bg-white rounded-xl  flex flex-col  lg:w-[350px] h-[50%] my-2 ">
      <h1 className="p-2 text-md text-gray-500 font-bold tracking-wide ml-4">
        Personal Information
      </h1>
      <hr />
      <div className="flex  w-full flex-col xs:flex-row lg:flex-col">
        <div className="mt-3 ml-4 w-full xs:w-2/3 lg:w-full">
          <p className="p-2 text-gray-400 text-sm">
            Hi my name is Jennifer Bennett. I'm the Co-founder and Head of
            Design at Company agency.
          </p>

          <p className="px-2 pb-2 text-gray-400 mt-1 text-sm">
            {" "}
            I'm the Co-founder and Head of Design at Company agency.
          </p>
        </div>
        <div className="flex justify-center p-2 w-full xs:w-1/3 lg:w-fit">
          <img src={social} className=" w-[200px] lg:w-[50%] object-contain p-1" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
