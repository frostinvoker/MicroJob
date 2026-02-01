import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";
import { NavBar } from "./NavBar";

export function DashboardLayout() {
  return (
    <div className="bg-[#f8f8f8] flex min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
