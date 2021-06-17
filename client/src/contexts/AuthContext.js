import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

//call this to access any auth context values
export function useAuth() {
  return useContext(AuthContext);
}

// This is the wrapper for the app that houses the context
export function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    console.log(auth);
    setUserAuth(auth);
  }, []);

  const value = {
    userAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
