import { Button } from "flowbite-react";
import React, { useState } from "react";
import { supabase } from "../supabase/supabaseConfig";

const Dialog = ({ setOpenModal }) => {
  const [emailToConfirm, setEmailToConfirm] = useState("");
  const resetPassword = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      emailToConfirm,
      {
        redirectTo: "http://localhost:3000/password-reset", //// this will redirect to us at password-reset page,
        //// you can also set your own page for it.
      }
    );
   
  };

  return (
    <>
      <div
        aria-hidden="false"
        class="fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
        data-testid="modal"
        role="dialog"
      >
        <div class="relative h-full w-full p-4 md:h-auto max-w-2xl">
          <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <div class="flex items-start justify-between rounded-t dark:border-gray-600 border-b p-5">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                Reset Password
              </h3>
              <button
                aria-label="Close"
                class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setOpenModal(false)}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="h-5 w-5"
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
            <div class="p-6">
              <div class="space-y-6 flex justify-center">
                <div class="relative w-[85%] mt-4 ">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    value={emailToConfirm}
                    onChange={(e) => {
                      setEmailToConfirm(e.target.value);
                    }}
                    type="text"
                    id="email-address-icon"
                    class={`bg-gray-50 border placeholder-gray-300  border-gray-300
                     text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="mailtoconfirm@flowbite.com"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={resetPassword}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
