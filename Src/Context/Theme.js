
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);
export const AuthContext = createContext(null);

export const Themeprovider = (props) => {
  const [dark, setDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const Authprovider = (props) => {
  const [login, setLogin] = useState(false);
  return (
    <AuthContext.Provider value={{ login, setLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};



