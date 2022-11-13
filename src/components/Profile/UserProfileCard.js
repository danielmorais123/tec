import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { supabase } from "../../supabase/supabaseConfig";
import TableAbout from "../Tables/TableAbout";

const UserProfileCard = ({ user, setUser }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const sendMessage = async () => {
    const result = await supabase
      .from("chat")
      .select("*")
      .contains("usersInChat", [authUser?.id, user?.id]);

    if (result.data[0]) {
      navigate(`/chat/${result.data[0].id}`);
      return;
    }

    const createChat = await supabase.from("chat").insert({
      usersInChat: [authUser?.id, user?.id],
    });
    if (!createChat.error) {
      navigate(`/chat/${createChat.data[0]?.id}`);
      return;
    }
  };

  const uploadProfileFile = async (e) => {
    e.preventDefault();
    let file;

    if (!authUser) {
      navigate("/login");
      return;
    }

    const result = await supabase
      .from("users")
      .select("email")
      .eq("email", authUser?.email);

    if (result.data.length === 0) {
      setErrorMsg(
        "There is no user with your email. Check if your account is validate."
      );
      return;
    }

    if (e.target.files[0]) file = e.target.files[0];
    const resulta = await supabase
      .from("users")
      .update({
        photoUrl: file?.name,
      })
      .eq("email", authUser.email)
      .select();

    if (resulta.error) {
      setErrorMsg(resulta.error.message);
      return;
    }

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`usersPhotos/${file?.name}`, file);
    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setUser((prev) => {
      return { ...prev, photoUrl: file?.name };
    });
  };

  return (
    <div className="bg-white rounded-xl  flex flex-col  lg:w-[350px] h-[50%] my-2 ">
      <h1 className="p-2 text-md text-gray-500 font-bold tracking-wide ml-4">
        About User
      </h1>

      <hr />
      <div className="flex flex-col items-center justify-between h-full">
        <div className="w-full mt-2 flex flex-row items-center pl-2">
          <div className="group relative transition duration-500 ease-in-out cursor-pointer">
            <label className="btn btn-ghost !bg-transparent btn-circle avatar group-hover:opacity-60">
              <div className="w-20 rounded-full">
                <img
                  className="object-contain"
                  src={`https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${user?.photoUrl}`}
                />
              </div>
            </label>
            {authUser?.id === user?.id ? (
              <>
                {" "}
                <label
                  htmlFor="chat_files"
                  className="absolute top-3 left-3 cursor-pointer hover:opacity-80 hidden group-hover:flex"
                >
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6"
                    fill="black"
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
                  onChange={(e) => uploadProfileFile(e)}
                />
              </>
            ) : null}
          </div>
          <div className="flex flex-col justify-center ml-2">
            {user?.name ? (
              <p className="text-gray-500 text-sm   ">{user?.name}</p>
            ) : null}
            <p className="text-gray-500 text-xs  ">{user?.email}</p>
          </div>
        </div>
        {user?.id !== authUser?.id ? (
          <button
            onClick={sendMessage}
            class="text-gray-900 mb-4 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 "
          >
            <FontAwesomeIcon icon={faInbox} className="mr-1" />
            Send Message
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfileCard;
