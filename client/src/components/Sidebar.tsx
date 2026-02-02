import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/MicroIcon.png";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  balance?: string;
  messageCount?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName = "Jonas Enriquez",
  userEmail = "joserizal@gmail.com",
  balance = "$67.67",
  messageCount = 2,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedEmployer, setExpandedEmployer] = useState(false);

  const menuItems = [
    { icon: "dashboard", label: "Dashboard", path: "/dashboard" },
    { icon: "find-jobs", label: "Find jobs", path: "/find-jobs" },
    { icon: "applied-jobs", label: "Applied Jobs", path: "/applied-jobs" },
    { icon: "messages", label: "Messages", path: "/messages", notification: true },
    { icon: "saved-jobs", label: "Saved jobs", path: "/saved-jobs" },
    { icon: "e-wallet", label: "E-Wallet", path: "/e-wallet" },
    { icon: "admin", label: "Admin Dashboard", path: "/admin" },
  ];

  const bottomMenuItems = [
    { icon: "notifications", label: "Notifications", path: "/notifications", notification: true },
    { icon: "settings", label: "Settings", path: "/settings" },
    { icon: "support", label: "Support", path: "/support" },
  ];

  const employerSubItems = [
    { icon: "📊", label: "Dashboard", path: "/employer/dashboard" },
    { icon: "📋", label: "Applications", path: "/employer/applications" },
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
              src={`/icons/${menuItems[0].icon}.svg`} 
              alt="Dashboard" 
              className="w-5 h-5 flex-shrink-0"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            {!isCollapsed && <span>Dashboard</span>}
          </button>

          {/* Employer Dropdown */}
          <div>
            <button
              onClick={() => setExpandedEmployer(!expandedEmployer)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <img 
                  src="/icons/employer.svg" 
                  alt="Employer" 
                  className="w-5 h-5 flex-shrink-0"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {!isCollapsed && <span>Employer</span>}
              </div>
              {!isCollapsed && (
                <span
                  className={`text-lg transition-transform duration-200 ${
                    expandedEmployer ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              )}
            </button>

            {/* Employer Submenu */}
            {expandedEmployer && !isCollapsed && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-300 pl-4">
                {employerSubItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition text-sm ${
                      location.pathname === item.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <img 
                      src={`/icons/${item.icon}.svg`} 
                      alt={item.label} 
                      className="w-4 h-4"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Remaining Menu Items */}
          {menuItems.slice(1).map((item) => (
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
