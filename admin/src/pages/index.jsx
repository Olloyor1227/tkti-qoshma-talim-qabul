import { lazy } from "react";

const FourZeroFour = lazy(() => import("./404/404.jsx"));
const Dashboard = lazy(() => import("./admin/dashboard/Dashboard"));
const Users = lazy(() => import("./admin/users/Users"));
const News = lazy(() => import("./admin/news/News"));
const Banner = lazy(() => import("./admin/banner/Banner"));
const Media = lazy(() => import("./admin/media/Media"));
const LoginRegister = lazy(() => import("./login_register/LoginRegister"));


export {
  FourZeroFour,
  Dashboard,
  Users,
  Banner,
  Media,
  LoginRegister,
  News
};
