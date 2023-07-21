import { lazy } from "react";

const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const Sidebar = lazy(() => import("./admin/sidebar/Sidebar"));
const ProtectedRoute = lazy(() => import("./admin/protected_route/ProtectedRoute"));
const SkeletonPost = lazy(() => import("./skeleton_loader/SkeletonPost"));
const ErrorFallback = lazy(() => import("./error_fallback/ErrorFallback"))
const TextEditor = lazy(() => import("./admin/text_editor/TextEditor"))
const Form = lazy(() => import("./admin/form/Form"))
const FormHeader = lazy(() => import("./admin/form_header/FormHeader"))
const Table = lazy(() => import("./admin/table/Table"))
const ModalWrapper = lazy(() => import("./admin/modal_wrapper/ModalWrapper"))

export {
  Sidebar,
  AdminLayout,
  ProtectedRoute,
  SkeletonPost,
  ErrorFallback,
  TextEditor,
  Form,
  FormHeader, 
  Table,
  ModalWrapper
};
