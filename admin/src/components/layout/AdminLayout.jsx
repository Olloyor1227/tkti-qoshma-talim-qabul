import { Outlet } from "react-router-dom";
import { Sidebar } from "..";
const AdminLayout = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full overflow-x-hidden overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
