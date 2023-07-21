import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { UserLayout } from "./layouts";
import { Login, Application, Home, UserCabinet, News, NewsDetails } from "./pages";
import { PrivateRoute } from "./components";

import { useAppContext } from "./context/app.context"
import { ApiClietServices } from "./helpers"
const { post } = new ApiClietServices();

function App() {
  const { setAuthState } = useAppContext()

  const user = JSON.parse(localStorage.getItem("user"));
  const userObj = { phone: user?.tel, passport_number: user?.passport_number };


  useEffect(() => {
    if (user) {
      post("application/login", JSON.stringify(userObj))
        .then((res) => {
          res?.success ? setAuthState(true) : setAuthState(false)
        })
        .catch((err) => setAuthState(false))
    } else {
    }
  }, [user]);

  return (
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path=":lang/application" element={<Application />} />
          <Route path=":lang/login" element={<Login />} />
          <Route path=":lang/news" element={<News />} />
          <Route path=":lang/news/details/:id" element={<NewsDetails />} />
          <Route path=":lang/cabinet" element={<PrivateRoute><UserCabinet /></PrivateRoute>} />
        </Route>
      </Routes>
  );
}

export default App;
