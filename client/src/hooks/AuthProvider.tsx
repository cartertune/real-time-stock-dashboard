import { Session, User } from "@supabase/supabase-js";
import { useContext, useState, useEffect, createContext } from "react";
import { supabaseClient } from "../util/supabaseClient";
import { toast } from "react-toastify";

// create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined;
  token: string | null | undefined;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}>({ session: null, token: null, signIn: () => Promise.resolve(), signOut: () => { } });

export const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();

      if (error) {
        toast.error('Error getting user info')
        return;
      }

      setSession(session);
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
      return;
    }
  }

  const value = {
    session,
    signIn,
    signOut: () => supabaseClient.auth.signOut(),
    token: session?.access_token
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
