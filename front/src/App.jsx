import { Route, Routes } from "react-router-dom";

import { AdminLayout, UserLayout } from "./layouts";
import { Login, Application, Home, UserCabinet, News, NewsDetails, Applicants } from "./pages";
import { PrivateRoute } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path=":lang/application" element={<Application />} />
        <Route path=":lang/login" element={<Login />} />
        <Route path=":lang/news" element={<News />} />
        <Route path=":lang/news/details/:id" element={<NewsDetails />} />
        <Route
          path=":lang/cabinet"
          element={
            <PrivateRoute key="user">
              <UserCabinet />
            </PrivateRoute>
          }
        />
      </Route>

      <Route
        path="users-list"
        element={
          <PrivateRoute key="admin">
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route
          index
          element={<Applicants />}
        />
      </Route>
    </Routes>
  );
}

export default App;
