import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseConfig";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("entrou");
    // Check active sessions and sets the user
    const session = supabase.auth.session();

    setAuthUser(session?.user ?? null);

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
       
        if (event === "PASSWORD_RECOVERY") {
          console.log("new pass");
          const newPassword = prompt(
            "What would you like your new password to be?"
          );
          if(!newPassword) {
            alert("Password can't be null. Try later.")
            return;
          }
          const { data, error } = await supabase.auth.update({
            password: newPassword,
          });

          if (data) alert("Password updated successfully!");
          if (error) alert("There was an error updating your password.");
        }
        if(event === "SIGNED_IN"){
          console.log("in")
          setAuthUser(session?.user ?? null);
          navigate("/")
        }
        if(event === "SIGNED_OUT"){
          console.log("out")
          setAuthUser(null)
          navigate("/login")
        }
        

      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
