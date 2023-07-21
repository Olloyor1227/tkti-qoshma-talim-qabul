import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";

import App from "./App";
import { SkeletonPost, ErrorFallback } from "./components";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={[...Array(10).keys()].map((i) => (
          <SkeletonPost key={i} />
        ))}
      >
        <App />
      </Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);
