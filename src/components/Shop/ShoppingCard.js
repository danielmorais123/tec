import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCartShopping, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import { motion } from "framer-motion";

import { supabase } from "../../supabase/supabaseConfig";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const ShoppingCard = (props) => {
  const { title, created_at, category, benefits, price, rating, image, id } =
    props.product;
  const { productsInCart, setProductsInCart, userSeller } = props;

  const { authUser } = useAuth();

  const navigate = useNavigate();

  const removeItemFromCard = (e) => {
    e.preventDefault();
    let deleteItemFromCart = [];
    productsInCart.forEach((element) => {
      if (element !== id) {
        deleteItemFromCart.push(element);
      }
    });

    supabase
      .from("cart")
      .update({ products: deleteItemFromCart })
      .eq("id", authUser?.id)
      .then((value) => {
        setProductsInCart(productsInCart.filter((item) => item !== id));
      });
  };

  const addItemToCart = (e) => {
    e.preventDefault();
    const copy = Array.from(productsInCart);
    copy.push(props.product.id);
    let saveItemsOnCart = [];
    copy.forEach((element) => {
      saveItemsOnCart.push(element);
    });

    supabase
      .from("cart")
      .update({ products: saveItemsOnCart })
      .eq("id", authUser?.id)
      .then((value) => {
        setProductsInCart(copy);
      });
  };

  console.log({ productsInCart });

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row w-[90%] xl:w-[45%] bg-white  relative   mx-auto border p-4 rounded-2xl shadow-xl my-5"
    >
      <motion.img
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="bg-gray-100 p-2 w-[95%] md:w-1/3 mx-auto rounded-2xl object-contain "
        src={`https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/public/productsImages/${image}`}
      />
      <div className="flex flex-col w-[95%] mx-auto md:p-2 md:justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-black font-medium tracking-wide p-2 ">
              {title}
            </h1>
          </div>

          <p className="text-xs px-2 mb-1">{category}</p>
          <Rating value={rating} readOnly precision={1} className="px-1 mb-1" />
          <div className="flex flex-col ml-2 ">
            {benefits &&
              benefits.map((benefit, index) => (
                <p
                  key={index}
                  className="text-gray-400 font-thin text-sm md:text-md flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-purple-400 mr-4 text-[0.4rem]"
                  />
                  {benefit}
                </p>
              ))}
          </div>
        </div>

        <div>
          <p className="p-2 font-bold text-black">{price}€</p>
          <div className="flex items-center justify-between">
            {!productsInCart.includes(id) ? (
              <button
                onClick={addItemToCart}
                className="ml-2 bg-blue-500 hover:bg-blue-600 w-fit  focus:ring-4 focus:ring-blue-300 focus:outline-none transition font-medium px-3 p-2 rounded-lg text-sm text-white"
              >
                <FontAwesomeIcon icon={faCartShopping} className="pr-2" />
                {"   "}
                Add to Cart
              </button>
            ) : (
              <button
                onClick={removeItemFromCard}
                className="ml-2 bg-red-500 hover:bg-red-600 w-fit  focus:ring-4 focus:ring-red-300 focus:outline-none transition font-medium px-3 p-2 rounded-lg text-sm text-white"
              >
                <FontAwesomeIcon icon={faCartShopping} className="pr-2" />
                {"   "}
                Remove from Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute md:top-3 md:right-3 right-5 bottom-5 md:bottom-0 cursor-pointer"
        onClick={() => navigate(`/profile/${userSeller?.id}`)}
      >
        <img
          className="w-10 rounded-full h-10 bg-gray-300 object-contain "
          src={
            userSeller?.photoUrl
              ? `https://hxedsbvrgndfewrzlynl.supabase.co/storage/v1/object/public/images/usersPhotos/${userSeller?.photoUrl}`
              : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
          }
        />
      </div>
    </motion.div>
  );
};

export default ShoppingCard;
