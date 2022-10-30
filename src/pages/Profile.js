import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseConfig";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .then((res) => setUser(res.data[0]));
  }, [id]);

  return <div>{user.name}</div>;
};

export default Profile;
