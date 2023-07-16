import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import i18next from "i18next";

import { useAppContext } from "../../context/app.context";
import { ApiClietServices } from "../../helpers";
const { post } = new ApiClietServices();

export const PrivateRoute = ({ children, key }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userObj = { phone: user?.tel, passport_number: user?.passport_number };

  const [state, setState] = useState({login: false, loading: true, err: null})

  useEffect(() => {
    if (user) {
      setState({...state, loading: true})
      post("application/login", JSON.stringify(userObj))
        .then((res) => {
          res?.success ? setState({loading: false, login: true}) : setState({loading: false, login: false})
        })
        .catch((err) => setState({loading: false, login: false, err: err}))
    } else {
      setState({login: false, loading: false})
    }
  }, []);

  // localdan olib backkendga jonatadi agar bor bolsa kiradi bulmasa yuq
  // ungacha loading bolib turadi
  if (state.err) return <h1>{state.err}</h1>
  if (state.loading) return <h1>Loading...</h1>
  if (state.login) return children;
  else return <Navigate to={`/${i18next.language}/login`} replace />;
};
