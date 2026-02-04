import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/MicroIcon.png";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  balance?: string;
  messageCount?: number;
  userRole?: "hire" | "work" | "both" | "admin" | "superadmin"; // Optional override
}

const Sidebar: React.FC<SidebarProps> = ({
  userName = "Jonas Enriquez",
  userEmail = "joserizal@gmail.com",
  balance = "$67.67",
  messageCount = 2,
  userRole = "work", // Default to work, NOT both
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const authUser = useAuth();
  
  // Get role from auth user (backend source of truth)
  const userRoleFromAuth = authUser?.role || "work";
  
  // Debug logging
  console.log("[Sidebar] Full authUser object:", authUser);
  console.log("[Sidebar] Role from authUser:", userRoleFromAuth);
  console.log("[Sidebar] localStorage auth_user:", localStorage.getItem("auth_user"));

  // Menu items based on user role
  const workerMenuItems = [
    { icon: "find-jobs", label: "Apply Jobs", path: "/find-jobs" },
    { icon: "applied-jobs", label: "Applied Jobs", path: "/worker/applied-jobs" },
  ];

  const employerMenuItems = [
    { icon: "➕", label: "Post a Job", path: "/employer/post-job" },
    { icon: "📋", label: "My Job Posts", path: "/employer/job-posts" },
  ];

  const commonMenuItems = [
    { icon: "messages", label: "Messages", path: "/messages", notification: true },
    { icon: "e-wallet", label: "E-Wallet", path: "/e-wallet" },
  ];

  // Build menu items array based on role
  let menuItems: any[] = [];
  
  console.log("[Sidebar] Building menu for role:", userRoleFromAuth);
  
  if (userRoleFromAuth === "work") {
    // Worker: Only Apply Jobs + Applied Jobs
    menuItems = [...workerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using WORKER menu items");
  } else if (userRoleFromAuth === "hire") {
    // Employer: Only Post Jobs + My Job Posts
    menuItems = [...employerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using EMPLOYER menu items");
  } else if (userRoleFromAuth === "both") {
    // Both: All items
    menuItems = [...workerMenuItems, ...employerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using BOTH menu items");
  } else if (userRoleFromAuth === "admin" || userRoleFromAuth === "superadmin") {
    // Admin: All items
    menuItems = [...workerMenuItems, ...employerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using ADMIN menu items");
  } else {
    // Unknown: Default to worker
    menuItems = [...workerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using DEFAULT (worker) menu items");
  }
  
  console.log("[Sidebar] Final menu items:", menuItems.map(i => i.label));

  const bottomMenuItems = [
    { icon: "notifications", label: "Notifications", path: "/notifications", notification: true },
    { icon: "settings", label: "Settings", path: "/settings" },
    { icon: "support", label: "Support", path: "/support" },
  ];

  return (
    <div
      className={`bg-white text-gray-800 shadow-lg fixed h-screen overflow-y-auto flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={{ padding: isCollapsed ? "12px" : "24px" }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between mb-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Micro Jobs Logo" className="h-8 w-8" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-black">Micro Jobs</span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:text-gray-900 transition text-lg"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-1 flex-1 flex flex-col">
        {/* Main Section */}
        <div className="space-y-1 pb-4 border-b border-gray-200">
          {/* Dashboard Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-semibold transition relative ${
              location.pathname === "/dashboard"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:bg-gray-100"
            } ${isCollapsed ? "px-2" : ""}`}
            title={isCollapsed ? "Dashboard" : ""}
          >
            <img 
              src="/icons/dashboard.svg" 
              alt="Dashboard" 
              className="w-5 h-5 flex-shrink-0"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            {!isCollapsed && <span>Dashboard</span>}
          </button>

          {/* Menu Items based on role */}
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-semibold transition relative ${
                location.pathname === item.path
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isCollapsed ? "px-2" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <img 
                src={`/icons/${item.icon}.svg`} 
                alt={item.label} 
                className="w-5 h-5 flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              {!isCollapsed && <span>{item.label}</span>}
              {item.notification && (
                <span className={`w-2 h-2 bg-blue-600 rounded-full ${isCollapsed ? "absolute right-2 top-2" : ""}`}></span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="space-y-1 py-4 border-b border-gray-200">
          {bottomMenuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-semibold transition relative ${
                location.pathname === item.path
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isCollapsed ? "px-2" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <img 
                src={`/icons/${item.icon}.svg`} 
                alt={item.label} 
                className="w-5 h-5 flex-shrink-0"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              {!isCollapsed && <span>{item.label}</span>}
              {item.notification && (
                <span className={`w-2 h-2 bg-blue-600 rounded-full ${isCollapsed ? "absolute right-2 top-2" : ""}`}></span>
              )}
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => {
              setShowLogoutConfirm(true);
            }}
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition relative"
            title={isCollapsed ? "Logout" : ""}
          >
            <img 
              src="/icons/logout.svg" 
              alt="Logout" 
              className="w-5 h-5 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            {!isCollapsed && <span>Logout</span>}
          </button>

          {/* Logout Confirmation - Inside Sidebar */}
          {showLogoutConfirm && !isCollapsed && (
            <div className="mt-3 rounded-lg border border-red-300 bg-red-50 p-3">
              <p className="text-sm text-red-800 font-semibold mb-3">Confirm logout?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    localStorage.removeItem("auth_user");
                    localStorage.removeItem("auth_token");
                    window.dispatchEvent(new Event("auth_user_updated"));
                    setShowLogoutConfirm(false);
                    navigate("/signin", { replace: true });
                  }}
                  className="flex-1 bg-red-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-white text-red-700 text-sm font-semibold py-2 rounded-lg border border-red-300 hover:bg-red-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-gray-200 pt-6">
        <button className="w-full flex items-center justify-between lg:justify-start gap-3 hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-lg flex-shrink-0">
              👨
            </div>
            {!isCollapsed && (
              <div className="text-left">
                <p className="text-gray-600 text-xs">Welcome back 👋</p>
                <p className="font-bold text-gray-900 text-sm">{userName}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <span className="text-gray-400">›</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
