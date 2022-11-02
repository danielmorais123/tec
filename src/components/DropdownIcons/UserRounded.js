import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect,  useState } from "react";
import {
  faEnvelope,
  faGear,
  faMessage,
  faPerson,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../auth/useAuth";

const UserRounded = ({ logout, users }) => {
  const { authUser } = useAuth();
  const [userProfile, setUserProfile] = useState({});

  console.log({ users });
  useEffect(() => {
    setUserProfile(users.find((user) => user.id === authUser?.id));
  }, [users]);

  console.log({ userProfile });

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost !bg-transparent btn-circle avatar "
      >
        <div className="w-8 rounded-full">
          <img
            className="object-contain"
            src={
              userProfile?.photoUrl
                ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${userProfile?.photoUrl}`
                : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            }
          />
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3  shadow-2xl menu menu-compact dropdown-content bg-white rounded-box w-60 flex flex-wrap"
      >
        <div className="p-2">
          <h1 className=" px-1 text-purple-400 tracking-wider text-sm ml-2 font-bold ">
            <FontAwesomeIcon icon={faPerson} />{" "}
            {userProfile?.name || "Example Name"}
          </h1>
          <p className=" px-1 text-2xs ml-2 text-blue-500 ">
            {" "}
            <FontAwesomeIcon icon={faEnvelope} /> {authUser?.email}
          </p>
        </div>

        <hr className="" />
        <li className="flex justify-between items-center w-full flex-row rounded-lg">
          <a
            className="justify-between w-full"
            href={`/profile/${authUser?.id}`}
          >
            <div>
              <FontAwesomeIcon icon={faUser} />
              <span className="ml-3">Profile</span>
            </div>
          </a>
        </li>
        <li className="flex justify-between items-center w-full flex-row rounded-lg">
          <a
            className="justify-between w-full"
            href={`/chat`}
          >
            <div>
              <FontAwesomeIcon icon={faMessage} />
              <span className="ml-3">Messages</span>
            </div>
          </a>
        </li>
        <hr className="mt-1" />
        <li className="flex justify-between items-center w-full flex-row">
          <a className="justify-between w-full">
            <div>
              <FontAwesomeIcon icon={faGear} />
              <span className="ml-3">Settings</span>
            </div>
          </a>
        </li>
        <li
          onClick={logout}
          className="flex justify-between items-center w-full flex-row"
        >
          <a className="justify-between w-full">
            <div>
              <FontAwesomeIcon icon={faSignOut} />
              <span className="ml-3">Logout</span>
            </div>
          </a>
        </li>
      </div>
    </div>
  );
};

export default UserRounded;
