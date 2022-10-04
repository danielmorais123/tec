import { FileInput, Label } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseConfig";

const FileUpload = () => {
  const [eerror, setEerror] = useState();

  const uploadProfileFile = async (e) => {
    e.preventDefault();
    let file;

    let userAuth = supabase.auth.user();

    const result = await supabase
      .from("users")
      .select("email")
      .eq("email", userAuth.email);

    console.log({ result });
    if (result.data.length === 0) {
      setEerror("There was an error uploading your file");
      return;
    }

    console.log({ eerror });

    const resulta = await supabase
      .from("users")
      .update({
        photoUrl: file?.name,
      })
      .eq("email", userAuth.email);

    console.log({ resulta });

    if (e.target.files[0]) file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`public/${file?.name}`, file);

    console.log({ data, error });
  };

  return (
    <div id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload file" />
      </div>
      <FileInput
        id="file"
        helperText="A profile picture is useful to confirm your are logged into your account"
        onChange={(e) => {
          uploadProfileFile(e);
        }}
      />
    </div>
  );
};

export default FileUpload;
