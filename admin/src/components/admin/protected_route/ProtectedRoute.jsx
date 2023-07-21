import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { ClientApiService } from "../../../utils/apiClient";
const { add } = new ClientApiService();

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userObj = { phone: user?.tel, passport_number: user?.passport_number };

  const [state, setState] = useState({
    login: false,
    loading: true,
    err: null,
  });

  useEffect(() => {
    if (user) {
      setState({ ...state, loading: true });
      add("application/login", JSON.stringify(userObj))
        .then((res) => {
          res?.success
            ? setState({ loading: false, login: true })
            : setState({ loading: false, login: false });
        })
        .catch((err) => setState({ loading: false, login: false, err: err }));
    } else {
      setState({ login: false, loading: false });
    }
  }, []);

  // localdan olib backkendga jonatadi agar bor bolsa kiradi bulmasa yuq
  // ungacha loading bolib turadi
  if (state.err) return <h1>{state.err}</h1>;
  if (state.loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div class="w-12 h-12 rounded-full animate-spin border border-solid border-yellow-500 border-t-transparent shadow-md"></div>
      </div>
    );
  if (state.login) return children;
  else return <Navigate to={`/tkti-login`} replace />;
};

export default ProtectedRoute