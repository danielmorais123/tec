import React, { useEffect, useMemo, useState } from "react";

import NavbarIntegrated from "../components/Navbar/NavbarIntegrated";
import ShopCards from "../components/Shop/ShopCards";
import { motion } from "framer-motion";

import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase/supabaseConfig";
const ShopPage = (props) => {
  const {
    productsInCart,
    setProductsInCart,
    setOpen,
    open,
    selected,
    setSelected,
    users,
  } = props;

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
      <div className="bg-gray-100 flex flex-col rounded-t-[30px] flex-grow">
        <NavbarIntegrated
          setOpen={setOpen}
          open={open}
          productsInCart={productsInCart}
          setProductsInCart={setProductsInCart}
          users={users}
        />
        <div className="flex flex-grow   mx-3 flex-col xl:flex-row">
          <ShopCards
            productsInCart={productsInCart}
            setProductsInCart={setProductsInCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
