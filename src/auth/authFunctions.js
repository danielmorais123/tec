import { supabase } from "../supabase/supabaseConfig";

export const loginWithEmailAndPassword = async (email, password) => {
  return supabase.auth.signIn({
    email: email,
    password: password,
  });
};

export const registerWithEmailAndPassword = async (email, password) => {
  return supabase.auth.signUp({
    email: email,
    password: password,
  });
};
