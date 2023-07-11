import { useState, useEffect, useContext, createContext } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [ authState, setAuthState ] = useState(false)

  return (
    <AppContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;