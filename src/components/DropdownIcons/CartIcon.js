import {
  faCartShopping,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

import shoppingcart from "../../img/shoppingcart.svg";

const CartIcon = ({ productsInCart, setProductsInCart }) => {
  const [total, setTotal] = useState(0);

  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let totalCheckout = 0;
    productsInCart.forEach((product) => {
      totalCheckout += product.price;
    });
    setTotal(totalCheckout);
  }, [productsInCart]);

  console.log({ productsInCart });
  return (
    <div className="dropdown dropdown-end relative w-5 h-5 mr-3">
      <label
        tabIndex={0}
        className="btn btn-ghost !bg-transparent btn-circle w-full !h-5 items-start"
      >
        <div className="w-full cursor-pointer">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="!h-full w-full object-contain text-gray-400"
          />
          <span className="bg-red-400 text-white rounded-full px-1 text-2xs absolute top-[-9px] right-[-9px]">
            {productsInCart.length}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3   shadow-2xl menu menu-compact dropdown-content rounded-box bg-white w-[300px]   flex flex-col flex-wrap"
      >
        <div className="w-full flex bg-blue-500 text-gray-100 rounded-t-lg cursor-pointer justify-center items-center">
          <h1 className="tracking-wide font-semibold text-sm text-center p-1 ">
            Shopping Cart
          </h1>
        </div>

        {productsInCart && productsInCart.length >= 1 ? (
          <div className="flex flex-col max-h-[250px] overflow-y-scroll  p-2 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100">
            <div className="flex items-center">
              <div className="ml-4">
                <h1 className="text-sm text-black font-semibold tracking-wide">
                  Total :
                </h1>
                <span className="text-sm text-blue-500 font-bold">
                  {total}€
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                type="button"
                class="text-white m-2 w-fit mx-auto bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  class="mr-2 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                </svg>
                Check Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-wrap flex-col items-center">
            <img src={shoppingcart} className="p-3 w-[50%] object-contain" />
            <h1 className="p-2 text-gray-600 text-sm ">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-red-500 w-5 h-4 mr-1"
              />
              Your cart is empty. Add Items to the cart.
            </h1>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartIcon;
