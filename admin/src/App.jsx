import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import {
  AdminLayout,
  ProtectedRoute,
  SkeletonPost,
} from "./components";
import {
  FourZeroFour,
  Dashboard,
  Users,
  Banner,
  Media,
  LoginRegister,
  News
} from "./pages";


function App() {
  return (
    <div
      className={`w-screen h-screen overflow-x-hidden flex flex-col`}
      onScroll={(e) => smallActions.handleScroll(e.currentTarget.scrollTop)}
    >
      <Routes>
        <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} >
            <Route
              index
              element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><Dashboard /></Suspense>}
            />
            <Route
              path="application"
              element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><Users /></Suspense> }
            />
            <Route
              path="banner"
              element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><Banner /></Suspense>}
            />
            <Route
              path="news"
              element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><News /></Suspense>}
            />
            <Route
              path="media"
              element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><Media /></Suspense>}
            />
        </Route>

        <Route
          path="tkti-login"
          element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><LoginRegister /></Suspense>}
        />
        <Route
          path="404"
          element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><FourZeroFour /></Suspense>}
        />
        <Route
          path="*"
          element={<Suspense fallback={[...Array(10).keys()].map((i) => (<SkeletonPost key={i} />))}><FourZeroFour /></Suspense>}
        />
      </Routes>
    </div>
  );
}

export default App;
