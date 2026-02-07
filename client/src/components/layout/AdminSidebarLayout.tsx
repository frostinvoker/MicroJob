import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useAuth } from "../../hooks/useAuth";

const AdminSidebarLayout: React.FC = () => {
  const authUser = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const roleOverride = authUser?.role === "superadmin" ? "superadmin" : "admin";
  const userName = authUser ? `${authUser.firstName} ${authUser.lastName}` : "Admin User";
  const userEmail = authUser?.email || "admin@example.com";

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        userName={userName}
        userEmail={userEmail}
        balance="₱67.67"
        messageCount={2}
        userRole={roleOverride}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      <div className={`flex-1 overflow-auto transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
        <div className="page-transition">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminSidebarLayout;
