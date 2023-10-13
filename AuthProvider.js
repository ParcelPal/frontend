import React, { createContext, useContext, useState } from 'react';

// Step 1: Create a new context
const AuthContext = createContext();

// Step 2: Create a context provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  // Function to set the authenticated user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out the user
  const logout = () => {
    setUser(null);

    console.log(children)
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 3: Create a custom hook to access the context
export function useAuth() {
  return useContext(AuthContext);
}
