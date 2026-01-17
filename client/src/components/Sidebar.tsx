import React from "react";
import { useNavigate } from "react-router-dom";
import bagtransIcon from "../assets/dashboard/bagtransIcon.png";
import searchIcon from "../assets/dashboard/searchIcon.png";
import helpIcon from "../assets/dashboard/helpIcon.png";
import logoutIcon from "../assets/dashboard/logoutIcon.png";
import mailIcon from "../assets/dashboard/mailIcon.png";
import messageIcon from "../assets/dashboard/messageIcon.png";
import walletIcon from "../assets/dashboard/walletIcon.png";
import settingsIcon from "../assets/dashboard/settingsIcon.png";

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

  return (
    <div className="w-64 bg-gradient-to-t from-cyan-600 to-indigo-900 text-white p-6 shadow-lg fixed h-screen overflow-y-auto">
      {/* User Profile */}
      <div className="bg-blue-500 rounded-2xl p-4 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center font-bold text-sm">
            {userName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-semibold text-sm">{userName}</p>
            <p className="text-blue-100 text-xs">{userEmail}</p>
          </div>
        </div>
        <div className="border-t border-blue-400 pt-3">
          <p className="text-blue-100 text-xs mb-1">Balance</p>
          <p className="text-2xl font-bold">{balance}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center gap-3 bg-gradient-to-b from-blue-300 to-cyan-600 px-4 py-3 rounded-xl text-black font-semibold transition hover:bg-blue-600"
        >
          <div className="w-5 h-5"></div>   <img src={mailIcon} alt="Dashboard Icon" className="w-5 h-5"/>
          Dashboard
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div> <img src={searchIcon} alt="Find Jobs Icon" className="w-5 h-5"/>
          Find Jobs
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div> <img src={bagtransIcon} alt="Browse Jobs Icon" className="w-5 h-5"/>
          Browse Jobs
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div> <img src={messageIcon} alt="Messages Icon" className="w-5 h-5"/>
          Messages
          {messageCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {messageCount}
            </span>
          )}
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div>  <img src={bagtransIcon} alt="Browse Jobs Icon" className="w-5 h-5"/>
          My Jobs
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div> <img src={walletIcon} alt="Wallet Icon" className="w-5 h-5"/>
          Wallet
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div> <img src={settingsIcon} alt="Settings Icon" className="w-5 h-5"/>
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500">
          <div className="w-5 h-5"></div> <img src={helpIcon} alt="Help Icon" className="w-4 h-4"/>
          Help & Support
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-blue-100 font-semibold transition hover:bg-blue-500"
        >
          <div className="w-5 h-5"></div> <img src={logoutIcon} alt="Logout Icon" className="w-5 h-5"/>
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
