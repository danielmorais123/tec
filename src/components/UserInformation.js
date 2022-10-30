import { Button, Modal, Timeline } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { faCreditCard, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import SelectInput from "./SelectInput";
import { supabase } from "../supabase/supabaseConfig";
import { useAuth } from "../auth/useAuth";
import Address from "./Address";
import PaymentMethodCard from "./PaymentMethodCard";
import { PayPalButtons } from "@paypal/react-paypal-js";
const UserInformation = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Portugal");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectAddress, setSelectAddress] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const { authUser } = useAuth();

 



  useEffect(() => {
    if (success) {
      alert("Payment successful!!");
    }
  }, [success]);

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .eq("id", authUser?.id)
      .then((res) => {
        if (res.data) {
          setName(res.data[0]?.name);

          setPhoneNumber(res.data[0]?.phone);

          setAddress(res.data[0]?.address?.address);

          setCountry(res.data[0]?.address?.country);

          setCity(res.data[0]?.address?.city);

          setZipCode(res.data[0]?.address?.zipCode);
        }
      });
  }, [authUser]);

  const submitData = (e) => {
    e.preventDefault();
    supabase
      .from("users")
      .update({
        name: name,
        phone: phoneNumber,
        address: {
          address: address,
          country: country,
          zipCode: zipCode,
          city: city,
        },
      })
      .eq("email", authUser.email)
      .select()
      .then((data) => console.log(data));
  };

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "EUR",
              value: 0.01,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      console.log({ payer, details, data });
      setSuccess(true);
    });
  };

  return (
    <div className="mt-3 bg-white rounded-2xl p-5 w-full xl:w-[70%]">
      <h1 className="ml-2 p-2 text-lg tracking-wider">
        User Deliver Information
      </h1>

      <ol
        class={`relative border-l border-blue-500  dark:border-gray-700 p-1 ml-5 mt-3`}
      >
        <li class="mb-3 ml-5">
          <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <svg
              aria-hidden="true"
              class="w-3 h-3 text-blue-600 dark:text-blue-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Billing Information
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            About you
          </time>
          <div className="mt-4 flex items-center flex-wrap justify-between">
            <TextInput
              title="Enter Name"
              icon="name"
              placeholder="Henrique Azevedo"
              value={name}
              setValue={setName}
            />
            <TextInput
              title="Email Address"
              icon="email"
              placeholder="email@hotmail.com"
              position="center"
            />
            <TextInput
              title="Phone Number"
              icon="phone"
              placeholder="912345678"
              position="end"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </div>
          <div className="w-full">
            <TextArea value={address} setValue={setAddress} />
          </div>
          <div className="mt-4 flex  flex-wrap justify-between">
            <SelectInput value={country} setValue={setCountry} />
            <TextInput
              title="City"
              placeholder="Lisboa"
              position="center"
              icon="city"
              value={city}
              setValue={setCity}
            />
            <TextInput
              title="Zip Code"
              icon="zip"
              placeholder="2933-219"
              position="end"
              value={zipCode}
              setValue={setZipCode}
            />
          </div>
        </li>
        <li class="mb-4 ml-5">
          <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FontAwesomeIcon
              icon={faTruckFast}
              className="w-3 h-3 text-blue-600 dark:text-blue-400"
            />{" "}
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Shipping Information
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Where to?
          </time>
          <Address
            title={city}
            description={address}
            sub={country}
            subtitle={zipCode}
            selectAddress={selectAddress}
            setSelectAddress={setSelectAddress}
          />
        </li>
        <li class="ml-5 ">
          <span class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="w-3 h-3 text-blue-600 dark:text-blue-400"
            />
          </span>
          <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Payment Methods
          </h3>
          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Available Payments
          </time>
          <div className="flex  ">
            <PaymentMethodCard type="credit" title="Credit / Debit Card" />
            <PaymentMethodCard type="paypal" title="Paypal" />
          </div>
        </li>
      </ol>
      <div className="w-full flex justify-end ">
        <button
          onClick={(e) => {
            setOpenPaymentModal(true)
            submitData(e)
          } }
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          Procced
        </button>
      </div>

      {openPaymentModal ? (
        <React.Fragment>
          <Modal
            show={openPaymentModal}
            onClose={() => setOpenPaymentModal(false)}
          >
            <Modal.Header>Terms of Service</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  With less than a month to go before the European Union enacts
                  new consumer privacy laws for its citizens, companies around
                  the world are updating their terms of service agreements to
                  comply.
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  The European Union’s General Data Protection Regulation
                  (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                  common set of data rights in the European Union. It requires
                  organizations to notify users as soon as possible of high-risk
                  data breaches that could personally affect them.
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default UserInformation;
