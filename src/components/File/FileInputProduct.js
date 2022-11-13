import { FileInput, Label } from "flowbite-react";
import React from "react";

const FileInputProduct = ({ value, setValue }) => {
  return (
    <div id="fileUpload" className="w-full mt-2">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Product Image" />
      </div>
      <input  type="file" className="bg-blue-500 w-full rounded-lg text-white" onChange={(e) => setValue(e.target.files[0])} />
    </div>
  );
};

export default FileInputProduct;
