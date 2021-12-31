import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyStoredToken = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    verifyStoredToken();
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
    
    // Update the state variables
    setIsLoggedIn(false);
    setUser(null);
  } 

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logInUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
