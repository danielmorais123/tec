import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { supabase } from "../../supabase/supabaseConfig";
import UserRounded from "../DropdownIcons/UserRounded";
import NotificationTab from "../DropdownIcons/NotificationTab";
import CartIcon from "../DropdownIcons/CartIcon";
import log from "../../img/logo.png";
const NavbarIntegrated = ({ productsInCart, setProductsInCart, users }) => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  return (
    <div className="flex flex-row z-10 bg-white xs:rounded-t-[30px]  p-4 justify-between items-center">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {/*<FontAwesomeIcon
          icon={faBars}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        /> */}
        <img src={log} className={`object-contain w-14 `} />
        <h1 className="ml-1 text-md xs:text-2xl text-red-400 font-bold tracking-wide ">
          Shop Astro
        </h1>
      </div>

      <div className="p-2 flex flex-row items-center">
        <NotificationTab />
        <CartIcon
          productsInCart={productsInCart}
          setProductsInCart={setProductsInCart}
        />

        <UserRounded users={users} logout={logout} />
      </div>
    </div>
  );
};

export default NavbarIntegrated;
