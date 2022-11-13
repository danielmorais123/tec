import { FileInput, Label } from "flowbite-react";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { supabase } from "../../supabase/supabaseConfig";

const FileUpload = () => {
  const [errorMsg, setErrorMsg] = useState("Erro!");
  const navigate = useNavigate();

  const { authUser } = useAuth();

  const uploadProfileFile = async (e) => {
    e.preventDefault();
    let file;

    if (!authUser) {
      navigate("/login");
      return;
    }

    const result = await supabase
      .from("users")
      .select("email")
      .eq("email", authUser?.email);

    if (result.data.length === 0) {
      setErrorMsg("There was an error uploading your file");
      return;
    }

    if (e.target.files[0]) file = e.target.files[0];
    const resulta = await supabase
      .from("users")
      .update({
        photoUrl: file?.name,
      })
      .eq("email", authUser.email)
      .select();

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`usersPhotos/${file?.name}`, file);

    setErrorMsg(error.message);
  };

  return (
    <>
      {" "}
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
      {<h1>{errorMsg}</h1>}
    </>
  );
};

export default FileUpload;
