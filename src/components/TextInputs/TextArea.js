import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TextArea = ({ value, setValue, isBenefit }) => {
  return (
    <div className="w-full">
      {isBenefit ? (
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Benefits
        </label>
      ) : (
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            className="w-4 h-4 text-gray-400 dark:text-gray-400"
          />
          Address Information
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`${
          isBenefit
            ? "Insert the benefits with commas. Example : Great Product,Amazing price, Fantastic"
            : "Enter full Address..."
        } `}
        required
      ></textarea>
    </div>
  );
};

export default TextArea;
