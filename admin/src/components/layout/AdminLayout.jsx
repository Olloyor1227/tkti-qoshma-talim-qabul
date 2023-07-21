import { Outlet } from "react-router-dom";
import { Sidebar } from "..";
const AdminLayout = () => {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full overflow-x-hidden overflow-y-scroll border border-red-500">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
