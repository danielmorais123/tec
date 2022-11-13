import { Divider, Slider } from "@mui/material";
import React, { useMemo, useState } from "react";

import { supabase } from "../../supabase/supabaseConfig";
import ShoppingCard from "./../Shop/ShoppingCard";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBarsStaggered,
  faBinoculars,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useAuth } from "../../auth/useAuth";
import DialogResetPass from "../Modals/DialogResetPass";
import ModalCreateItem from "../Modals/ModalCreateItem";

const PrettoSlider = styled(Slider)({
  color: "rgb(168 85 247)",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid rgb(168 85 247)",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "rgb(168 85 247)",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const ShopCards = (props) => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState([0, 1000]);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [price, setPrice] = useState();
  const [selectedTab, setSelectedTab] = useState("horizontal");
  const [benefits, setBenefits] = useState([]);
  const [categories, setCategories] = useState("");

  const { productsInCart, setProductsInCart } = props;

  const { authUser } = useAuth();

  const productsFiltered = products.filter(
    (product) =>
      product?.title.toLowerCase().includes(query.toLowerCase()) &&
      product?.price > value[0] &&
      product?.price < value[1]
  );
  console.log({ products });
  console.log({ productsFiltered });
  useMemo(() => {
    supabase
      .from("product")
      .select("*")
      .then((res) => {
        setProducts(res.data);
      });

    supabase
      .from("users")
      .select("*")
      .then((res) => setUsers(res.data));
  }, []);

  console.log({ openModal });

  return (
    <div className="flex-grow flex">
      <div className="flex-grow  bg-white  shadow-lg  m-5 rounded-2xl flex  flex-col justify-start ">
        <h1 className="p-2 py-4 tracking-wide text-md text-[#252525] font-semibold ml-3">
          Top Product
        </h1>
        <Divider />
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="w-[90%] mx-auto md:mx-0 md:ml-3 md:max-w-[300px] p-2 flex flex-col justify-between items-start my-2">
            <h1 className="w-full uppercase tracking-wide text-sm text-[#868383] font-bold">
              Price Range
            </h1>
            <PrettoSlider
              max="1000"
              value={value}
              onChange={(e, newValue) => setValue(newValue)}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="flex  items-center">
            <React.Fragment>
              <motion.div
                onClick={() => setOpenModal(true)}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
                className="p-2 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className=" text-xl text-blue-500"
                />
              </motion.div>
              {openModal ? (
                <ModalCreateItem
                  users={users}
                  setOpenModal={setOpenModal}
                  title={title}
                  setTitle={setTitle}
                  benefits={benefits}
                  setBenefits={setBenefits}
                  description={description}
                  setDescription={setDescription}
                  categories={categories}
                  setCategories={setCategories}
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  price={price}
                  setPrice={setPrice}
                />
              ) : null}
            </React.Fragment>

            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="w-[85%] md:w-[250px] h-fit relative md:mr-3 mx-auto md:mx-0 rounded-full p-2 bg-gray-100"
            >
              <FontAwesomeIcon icon={faSearch} size="sm" className="px-2" />
              <input
                placeholder="Search..."
                className="bg-gray-100 outline-none w-[60%]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </motion.div>
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="self-end md:self-center justify-center  flex  mt-1 p-2 md:mr-2 md:mt-0  items-center"
            >
              <FontAwesomeIcon
                icon={faBinoculars}
                onClick={() => setSelectedTab("horizontal")}
                className={`${
                  selectedTab === "horizontal"
                    ? "bg-blue-500 text-white"
                    : "bg-none text-blue-500"
                } cursor-pointer p-2 mr-1 rounded-full `}
              />
              <FontAwesomeIcon
                icon={faBarsStaggered}
                onClick={() => setSelectedTab("vertical")}
                className={`${
                  selectedTab === "vertical"
                    ? "bg-blue-500 text-white"
                    : "bg-none text-blue-500"
                } cursor-pointer  p-2 mr-1 rounded-full `}
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-row items-center flex-wrap">
          {productsFiltered.map((product, index) => (
            <ShoppingCard
              key={index}
              product={product}
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
              userSeller={users.find((user) => user.id == product.userSellerId)}
            />
          ))}
        </div>

        {/*<div className=' w-[95%] bg-white p-5 min-h-[600px] h-fit my-5 flex justify-center rounded-2xl mx-3 items-center flex-grow  flex-wrap '>
                    {products.map((item) => (
                        <ShoppingCard key={item.id} title={item.title} description={item.description} price={item.price} image={item.image} addedToCart={item.addedToCart} />
                    ))}

                
            </div>*/}
      </div>
    </div>
  );
};

export default ShopCards;
