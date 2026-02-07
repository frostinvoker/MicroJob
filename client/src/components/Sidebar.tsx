import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/MicroIcon.png";
import bagIcon1 from "../assets/dashboard/bagIcon1.png";
import bagtransIcon from "../assets/dashboard/bagtransIcon.png";
import clockIcon from "../assets/dashboard/clockIcon.png";
import helpIcon from "../assets/dashboard/helpIcon.png";
import logoutIcon from "../assets/dashboard/logoutIcon.png";
import mailIcon from "../assets/dashboard/mailIcon.png";
import messageIcon from "../assets/dashboard/messageIcon.png";
import messageIcon1 from "../assets/dashboard/messageIcon1.png";
import searchIcon from "../assets/dashboard/searchIcon.png";
import settingsIcon from "../assets/dashboard/settingsIcon.png";
import starIcon from "../assets/dashboard/starIcon.png";
import walletIcon from "../assets/dashboard/walletIcon.png";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  balance?: string;
  messageCount?: number;
  userRole?: "hire" | "work" | "both" | "admin" | "superadmin"; // Optional override
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName = "Jonas Enriquez",
  userEmail = "joserizal@gmail.com",
  balance = "$67.67",
  messageCount = 2,
  userRole,
  isCollapsed: isCollapsedProp,
  onToggleCollapse,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isSidebarCollapsed = isCollapsedProp ?? isCollapsed;
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [roleSelectorOpen, setRoleSelectorOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<"work" | "hire">(() => {
    const stored = localStorage.getItem("sidebar_active_role");
    return stored === "hire" ? "hire" : "work";
  });
  const authUser = useAuth();
  
  // Get role from auth user (backend source of truth), allow prop override
  const userRoleFromAuth = userRole ?? authUser?.role ?? "work";
  
  // Debug logging
  console.log("[Sidebar] Full authUser object:", authUser);
  console.log("[Sidebar] Role from authUser:", userRoleFromAuth);
  console.log("[Sidebar] Role override prop:", userRole);
  console.log("[Sidebar] localStorage auth_user:", localStorage.getItem("auth_user"));

  // Menu items based on user role
  const workerMenuItems = [
    { icon: "find-jobs", label: "Apply Jobs", path: "/find-jobs" },
    { icon: "applied-jobs", label: "Applied Jobs", path: "/worker/applied-jobs" },
  ];

  const employerMenuItems = [
    { icon: "➕", label: "Post a Job", path: "/employer/post-job" },
    { icon: "📋", label: "My Job Posts", path: "/employer/job-posts" },
    { icon: "applied-jobs", label: "Applications", path: "/employer/applications" },
  ];

  const commonMenuItems = [
    { icon: "messages", label: "Messages", path: "/messages", notification: true },
    { icon: "e-wallet", label: "E-Wallet", path: "/e-wallet" },
  ];

  const baseAdminMenuItems = [
    { icon: "dashboard", label: "Dashboard", path: "/admin-dashboard" },
    { icon: "users", label: "Users", path: "/admin/users" },
    { icon: "job-posting-monitoring", label: "Job Posting Monitoring", path: "/admin/job-posting-monitoring" },
    { icon: "e-wallet-monitoring", label: "E-Wallet Monitoring", path: "/admin/e-wallet-monitoring" },
    { icon: "administrator", label: "Administrator", path: "/admin/administrator" },
  ];

  const adminMenuItems = [
    ...baseAdminMenuItems,
    { icon: "settings", label: "Settings", path: "/admin/system-admin" },
  ];

  const superAdminMenuItems = [
    ...baseAdminMenuItems,
    { icon: "system-admin", label: "System Admin", path: "/admin/system-admin" },
  ];

  const effectiveRole = userRoleFromAuth === "both" ? activeRole : userRoleFromAuth;
  const isAdminView = effectiveRole === "admin" || effectiveRole === "superadmin";


  // Build menu items array based on role
  let menuItems: any[] = [];
  
  console.log("[Sidebar] Building menu for role:", effectiveRole);
  
  if (effectiveRole === "work") {
    // Worker: Only Apply Jobs + Applied Jobs
    menuItems = [...workerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using WORKER menu items");
  } else if (effectiveRole === "hire") {
    // Employer: Only Post Jobs + My Job Posts
    menuItems = [...employerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using EMPLOYER menu items");
  } else if (effectiveRole === "admin" || effectiveRole === "superadmin") {
    // Admin: Dedicated admin menu
    menuItems = effectiveRole === "superadmin" ? superAdminMenuItems : adminMenuItems;
    console.log("[Sidebar] Using ADMIN menu items");
  } else {
    // Unknown: Default to worker
    menuItems = [...workerMenuItems, ...commonMenuItems];
    console.log("[Sidebar] Using DEFAULT (worker) menu items");
  }
  
  console.log("[Sidebar] Final menu items:", menuItems.map(i => i.label));

  const bottomMenuItems =
    effectiveRole === "admin" || effectiveRole === "superadmin"
      ? []
      : [
          { icon: "notifications", label: "Notifications", path: "/notifications", notification: true },
          { icon: "settings", label: "Settings", path: "/settings" },
          { icon: "support", label: "Support", path: "/support" },
        ];

  const iconMap: Record<string, string> = {
    dashboard: starIcon,
    "find-jobs": searchIcon,
    "applied-jobs": mailIcon,
    "post-job": bagtransIcon,
    "job-posts": bagIcon1,
    applications: messageIcon1,
    messages: messageIcon,
    "e-wallet": walletIcon,
    "job-posting-monitoring": bagIcon1,
    "e-wallet-monitoring": walletIcon,
    users: messageIcon,
    administrator: settingsIcon,
    notifications: clockIcon,
    settings: settingsIcon,
    support: helpIcon,
    logout: logoutIcon,
  };

  const vectorIcons: Record<string, React.ReactNode> = {
    dashboard: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    "job-posting-monitoring": (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
    "e-wallet-monitoring": (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3z" />
        <path d="M17 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
        <circle cx="16" cy="12" r="1" />
      </svg>
    ),
    administrator: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08A1.65 1.65 0 0 0 10.91 3V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.08a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    "system-admin": (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
        <path d="M12 8l1.5 3 3.3.5-2.4 2.3.6 3.4-3-1.6-3 1.6.6-3.4-2.4-2.3 3.3-.5z" />
      </svg>
    ),
  };

  const renderIcon = (iconKey: string) => {
    if (isAdminView && vectorIcons[iconKey]) {
      return <span className="inline-flex items-center justify-center">{vectorIcons[iconKey]}</span>;
    }
    return (
      <img
        src={iconMap[iconKey] || starIcon}
        alt=""
        aria-hidden="true"
        className="h-5 w-5 grayscale"
      />
    );
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return `${first}${last}`.toUpperCase();
  };

  const menuButtonBase = `w-full flex items-center gap-3 transition relative ${
    isSidebarCollapsed ? "justify-center px-2" : "justify-start px-4"
  } ${isAdminView ? "rounded-2xl py-3 text-[15px] font-semibold" : "rounded-lg py-3 font-semibold"}`;
  const menuButtonActive = "text-blue-600 bg-blue-50";
  const menuButtonInactive = isAdminView ? "text-slate-600 hover:bg-gray-100" : "text-gray-700 hover:bg-gray-100";

  return (
    <div
      className={`fixed h-screen overflow-y-auto flex flex-col transition-all duration-300 ${
        isSidebarCollapsed ? "w-20" : "w-64"
      } ${isAdminView ? "bg-white text-slate-700 border-r border-gray-100" : "bg-white text-gray-800 shadow-lg"}`}
      style={{ padding: isSidebarCollapsed ? "12px" : isAdminView ? "24px 20px" : "24px" }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="MicroJobs Logo" className="h-8 w-8" />
          {!isSidebarCollapsed && <span className="text-xl font-bold text-black">MicroJobs</span>}
        </div>
        {!isAdminView && (
          <button
            onClick={() => {
              if (onToggleCollapse) {
                onToggleCollapse();
              } else {
                setIsCollapsed(!isCollapsed);
              }
            }}
            className="text-gray-600 hover:text-gray-900 transition text-lg"
            title={isSidebarCollapsed ? "Expand" : "Collapse"}
          >
            {isSidebarCollapsed ? "›" : "‹"}
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={`flex-1 flex flex-col ${isAdminView ? "gap-2" : "space-y-1"}`}>
        {/* Main Section */}
        <div className={isAdminView ? "space-y-2" : "space-y-1 pb-4 border-b border-gray-200"}>
          {/* Role Selector */}
          {!isSidebarCollapsed && userRoleFromAuth !== "admin" && userRoleFromAuth !== "superadmin" && (
            <div className="mb-3">
              {userRoleFromAuth === "both" ? (
                <>
                  <button
                    onClick={() => setRoleSelectorOpen(!roleSelectorOpen)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-sky-50 text-sky-700 font-semibold border border-sky-100"
                  >
                    <span>{activeRole === "hire" ? "Employer" : "Worker"}</span>
                    <span className="text-sky-500">▾</span>
                  </button>
                  {roleSelectorOpen && (
                    <div className="mt-2 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                      <button
                        onClick={() => {
                          setRoleSelectorOpen(false);
                          setActiveRole("work");
                          localStorage.setItem("sidebar_active_role", "work");
                          navigate("/find-jobs");
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        Worker
                      </button>
                      <button
                        onClick={() => {
                          setRoleSelectorOpen(false);
                          setActiveRole("hire");
                          localStorage.setItem("sidebar_active_role", "hire");
                          navigate("/employer/applications");
                        }}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        Employer
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-50 text-sky-700 font-semibold border border-sky-100">
                  <span>
                    {userRoleFromAuth === "hire"
                      ? "Employer"
                      : userRoleFromAuth === "admin"
                      ? "Admin"
                      : userRoleFromAuth === "superadmin"
                      ? "System Admin"
                      : "Worker"}
                  </span>
                </div>
              )}
            </div>
          )}
          {/* Dashboard Button (hide for employer/admin; admin has its own menu) */}
          {effectiveRole !== "hire" && effectiveRole !== "admin" && effectiveRole !== "superadmin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className={`w-full flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-start"} gap-3 px-4 py-3 rounded-lg font-semibold transition relative ${
                location.pathname === "/dashboard"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              } ${isSidebarCollapsed ? "px-2" : ""}`}
              title={isSidebarCollapsed ? "Dashboard" : ""}
            >
              {renderIcon("dashboard")}
              {!isSidebarCollapsed && <span>Dashboard</span>}
            </button>
          )}

          {/* Menu Items based on role */}
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`${menuButtonBase} ${
                location.pathname === item.path ? menuButtonActive : menuButtonInactive
              }`}
              title={isSidebarCollapsed ? item.label : ""}
            >
              {renderIcon(item.icon)}
              {!isSidebarCollapsed && <span>{item.label}</span>}
              {item.notification && (
                <span className={`w-2 h-2 bg-blue-600 rounded-full ${isSidebarCollapsed ? "absolute right-2 top-2" : ""}`}></span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={isAdminView ? "space-y-2 mt-4" : "space-y-1 py-4 border-b border-gray-200"}>
          {bottomMenuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`${menuButtonBase} ${
                location.pathname === item.path ? menuButtonActive : menuButtonInactive
              }`}
              title={isSidebarCollapsed ? item.label : ""}
            >
              {renderIcon(item.icon)}
              {!isSidebarCollapsed && <span>{item.label}</span>}
              {item.notification && (
                <span className={`w-2 h-2 bg-blue-600 rounded-full ${isSidebarCollapsed ? "absolute right-2 top-2" : ""}`}></span>
              )}
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => {
              setShowLogoutConfirm(true);
            }}
            className={`w-full flex items-center ${
              isSidebarCollapsed ? "justify-center px-2" : "justify-start px-4"
            } gap-3 rounded-2xl py-3 font-semibold text-red-600 hover:bg-red-50 transition relative`}
            title={isSidebarCollapsed ? "Logout" : ""}
          >
            {renderIcon("logout")}
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>

          {/* Logout Confirmation - Inside Sidebar */}
          {showLogoutConfirm && !isSidebarCollapsed && (
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
      <div className="border-t border-gray-100 pt-6">
        <button className="w-full flex items-center justify-between gap-3 rounded-2xl px-2 py-2 hover:bg-gray-50 transition">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
              {getInitials(userName)}
            </div>
            {!isSidebarCollapsed && (
              <div className="text-left">
                <p className="text-gray-500 text-xs">Welcome back 👋</p>
                <p className="font-semibold text-gray-900 text-base">{userName}</p>
              </div>
            )}
          </div>
          {!isSidebarCollapsed && <span className="text-gray-400 text-xl leading-none">›</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
