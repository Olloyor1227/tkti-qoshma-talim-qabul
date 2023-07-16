import { useState, useEffect, useContext, createContext } from "react";

import { ApiClietServices } from "../helpers"
const { post } = new ApiClietServices();

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
  const [ authState, setAuthState ] = useState(false)
  const [ name, setName ] = useState(false)
  
  // const user = useState(JSON.parse(localStorage.getItem("user")) || {}) 
  // const userObj = { phone: user?.tel, passport_number: user?.passport_number };

  // useEffect(() => {
  //   if (user) {
  //     post("application/login", JSON.stringify(userObj))
  //       .then((res) => {
  //         res?.success ? setAuthState(true) : setAuthState(false)
  //       })
  //       .catch((err) => setAuthState(false))
  //   } else {
  //     setAuthState(false)
  //   }
  // }, []);
  return (
    <AppContext.Provider value={{ authState, setAuthState, name, setName }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;