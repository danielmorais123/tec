import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

import NavbarIntegrated from "../components/Navbar/NavbarIntegrated";
import PersonalInformation from "../components/Profile/PersonalInformation";
import UserFullInformation from "../components/Profile/UserFullInformation";
import UserProfileCard from "../components/Profile/UserProfileCard";
import TableAbout from "../components/Tables/TableAbout";

import { supabase } from "../supabase/supabaseConfig";

const Profile = ({
  open,
  setOpen,
  productsInCart,
  setProductsInCart,
  selected,
  setSelected,
  users,
}) => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const { authUser } = useAuth();

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .then((res) => setUser(res.data[0]));
  }, [id]);

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
        <div className="flex flex-grow p-2  bg-gray-100 flex-col lg:flex-row">
          <div className="flex overflow-x-hidden flex-col h-full w-[94%] xs:w-[98%] lg:w-fit min-h-[90vh] xs:min-h-[0vh] mx-2">
            <UserProfileCard user={user} setUser={setUser} />
            <PersonalInformation />
          </div>
          <div className="flex flex-grow w-[94%] xs:w-[98%] mx-auto lg:w-fit lg:ml-4 lg:mr-2">
            <UserFullInformation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
