import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DropZone from "../File/DropZone";
import FileInputProduct from "../File/FileInputProduct";
import CheckboxItemsSelect from "../TextInputs/CheckboxItemsSelect";
import Input from "../TextInputs/Input";
import SelectInput from "../TextInputs/SelectInput";
import { supabase } from "../../supabase/supabaseConfig";
import TextArea from "../TextInputs/TextArea";
import { useAuth } from "../../auth/useAuth";

const ModalCreateItem = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const {
    setOpenModal,
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    benefits,
    setBenefits,
    categories,
    setCategories,
    imageFile,
    setImageFile,
  } = props;

  console.log({ errorMessage });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (price <= 0) {
      setErrorMessage("Price needs to be higher than 0");
      return;
    }
    let newBenefits = benefits.split(",");

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/productsImages/${imageFile?.name}`, imageFile);

    if (error) {
      setErrorMessage("That was an error uploading your image");
      return;
    }

    const result = await supabase.from("product").insert({
      title,
      description,
      price,
      benefits: newBenefits,
      category: categories,
      image: imageFile.name,
      userSellerId: authUser?.id,
    });

    console.log({ result });
    if (result.error) {
      setErrorMessage("There was an error inserting your product.");
      return;
    }

    setOpenModal(false);
  };

  return (
    <div
      aria-hidden="false"
      className="fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
      data-testid="modal"
      role="dialog"
    >
      <div className="relative h-full w-full p-4 md:h-auto max-w-2xl">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-3">
            <h3 className="text-lg text-gray-900 dark:text-white font-medium">
              Create your product
            </h3>
            <button
              aria-label="Close"
              className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setOpenModal(false)}
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6">
            <div className="flex md:flex-row flex-col  flex-wrap">
              <form
                onSubmit={onSubmit}
                className="flex md:flex-row flex-col  flex-wrap"
              >
                <Input
                  value={title}
                  setValue={setTitle}
                  title="Title"
                  placeholder="Item"
                />
                <Input
                  value={description}
                  setValue={setDescription}
                  title="Description"
                  placeholder="Item description"
                />
                <Input
                  value={price}
                  setValue={setPrice}
                  title="Price"
                  placeholder="Value €"
                />
                <SelectInput
                  value={categories}
                  setValue={setCategories}
                  options={["Playstation", "Xbox", "PC", "Nintendo"]}
                  isCreate={true}
                />
                <TextArea value={benefits} setValue={setBenefits} isBenefit />
                <FileInputProduct value={imageFile} setValue={setImageFile} />
                <div className="flex justify-end w-full mt-1">
                  <button
                    type="submit"
                    class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/344/shop.png"
                      className="mr-2 -ml-1 w-4 h-4 text-black"
                    />
                    Add product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateItem;
