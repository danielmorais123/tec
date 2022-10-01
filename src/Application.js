import React from "react";
import { useAuth } from "./auth/useAuth";
import Login from "./pages/Login";
import { supabase } from "./supabase/supabaseConfig";

const Application = () => {
  const { authUser,setAuthUser } = useAuth();

    const logout = async (e) => {
        e.preventDefault()
        await supabase.auth.signOut();
        setAuthUser(null)
    }

  return (
    <>
      {authUser ? (
        <div>
          <p>Ola {authUser.email} </p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Application;
