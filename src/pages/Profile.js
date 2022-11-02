import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

import NavbarIntegrated from "../components/Navbar/NavbarIntegrated";
import PersonalInformation from "../components/Profile/PersonalInformation";
import UserProfileCard from "../components/Profile/UserProfileCard";

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
        <div className="flex flex-grow flex-col lg:flex-row w-fit my-3 mx-6  ">
          <div className="flex flex-grow flex-col  justify-between">
            <UserProfileCard />
            <PersonalInformation />
          </div>
          <div className="flex flex-grow flex-col ml-0 lg:ml-4 mt-2 lg:mt-0">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
