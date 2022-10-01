import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseConfig";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setAuthUser(session?.user ?? null);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (authUser != null) {
      navigate("/");
      return;
    } else {
      navigate("/login");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
