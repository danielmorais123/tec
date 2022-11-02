import React, { useEffect } from "react";

import NavbarIntegrated from "../components/Navbar/NavbarIntegrated";

import CheckOutSum from "../components/Checkout/CheckOutSum";
import UserInformation from "../components/Checkout/UserInformation";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase/supabaseConfig";

const Checkout = (props) => {
  const {
    productsInCart,
    setProductsInCart,
    setOpen,
    open,
    selected,
    setSelected,
    users
  } = props;

  const {authUser} = useAuth()

  useEffect(() => {
    supabase
      .from("cart")
      .select("products")
      .eq("id", authUser?.id)
      .then((value) => {
        if (value.data) setProductsInCart(value.data[0].products);
      });
  }, [authUser]);

  console.log({ check: productsInCart });
  return (
    <div className="flex relative flex-row  min-h-screen">
      {/* <Sidebar open={open} selected={selected} setSelected={setSelected} />
      <Drawer open={open} setOpen={setOpen} />*/}
      <div className="bg-gray-100 flex flex-col rounded-tl-[30px] flex-grow">
        <NavbarIntegrated
          setOpen={setOpen}
          open={open}
          productsInCart={productsInCart}
          setProductsInCart={setProductsInCart}
          users={users}
        />
        <div className="flex   my-3 mx-6 flex-col xl:flex-row">
          <UserInformation />
          <CheckOutSum productsInCart={productsInCart} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
