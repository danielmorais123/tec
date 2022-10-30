import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseConfig";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("AUTHEN")

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (event === "PASSWORD_RECOVERY") {

          const newPassword = prompt(
            "What would you like your new password to be?"
          );
          if (!newPassword) {
            alert("Password can't be null. Try later.")
            return;
          }
          const { data, error } = await supabase.auth.update({
            password: newPassword,
          });

          if (data) alert("Password updated successfully!");
          if (error) alert("There was an error updating your password.");
        }
        if (event === "SIGNED_IN") {
          console.log("sign in")
          if (!authUser) setAuthUser(session.user)
          if (session.user.identities[0].provider.toLowerCase() !== "email") {

            const userExists = await supabase
              .from("users")
              .select("email")
              .eq("email", session.user.email);


            if (userExists.data.length === 0) {

              const result = await supabase.from("users").insert({
                id: session.user.id,
                email: session.user.email,
                created_at: session.user.created_at,
                provider: session.user.identities[0].provider
              });

            }

          }



        }
        if (event === "SIGNED_OUT") {
          console.log("sign out")
          if (!authUser) setAuthUser(null)
          navigate("/login")
        }


      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);


  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();
    console.log({session})
    if (session) {

      setAuthUser(session.user)

    }
    else {
      console.log("FICA NULO")
      setAuthUser(null)
     
    }
  }, [])



  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
