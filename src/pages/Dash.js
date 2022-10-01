import React from "react";
import { useAuth } from "../auth/useAuth";
import { supabase } from "../supabase/supabaseConfig";

const Dash = () => {
  const { authUser, setAuthUser } = useAuth();

  const logout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    setAuthUser(null);
  };

  return <div>
    <button onClick={logout}>Logout</button>
  </div>;
};

export default Dash;
