import { Avatar, Dropdown, Label } from "flowbite-react";
import React from "react";
import { useAuth } from "../auth/useAuth";
import FileUpload from "../components/FileUpload";
import Navbar from "../components/Navbar";
import { supabase } from "../supabase/supabaseConfig";

const Dash = () => {
  return (
    <div className="flex flex-col bg-gray-200 h-screen">
      <Navbar />
      <FileUpload />
    </div>
  );
};

export default Dash;
