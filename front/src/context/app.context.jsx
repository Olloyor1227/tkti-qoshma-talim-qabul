import { useState, useEffect, useContext, createContext } from "react";

import { ApiClietServices } from "../helpers"
const { post } = new ApiClietServices();

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [ authState, setAuthState ] = useState(false)
  const [ name, setName ] = useState(false)
  
  return (
    <AppContext.Provider value={{ authState, setAuthState, name, setName }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;