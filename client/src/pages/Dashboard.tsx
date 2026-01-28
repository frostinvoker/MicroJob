import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import analyticsIcon from "../assets/analyticsIcon.png";
import moneyIcon from "../assets/moneyIcon.png";
import bagIcon from "../assets/bagIcon.png";
import starIcon from "../assets/dashboard/starIcon.png";
import bagtransIcon from "../assets/dashboard/bagtransIcon.png";
import bagIcon1 from "../assets/dashboard/bagIcon1.png";
import clockIcon from "../assets/dashboard/clockIcon.png";
import walletIcon from "../assets/dashboard/walletIcon.png";
import walletIcon1 from "../assets/dashboard/walletIcon1.png";
import messageIcon from "../assets/dashboard/messageIcon.png";
import messageIcon1 from "../assets/dashboard/messageIcon1.png";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("you@example.com");

  useEffect(() => {
    const stored = localStorage.getItem("auth_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.username) setUserName(parsed.username);
        if (parsed?.email) setUserEmail(parsed.email);
      } catch (err) {
        console.warn("Failed to parse auth_user", err);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userName={userName} userEmail={userEmail} balance="₱67.67" messageCount={2} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        <div className="p-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl p-8 mb-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">Welcome back, {userName}!</h2>
                <p className="text-blue-100">Signed in with {userEmail}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
                <p className="text-sm text-blue-100 mb-1">Level</p>
                <p className="text-sm font-semibold">Pro Member</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-sm font-semibold">Verified Account</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {/* Total Earnings */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <img src={moneyIcon} alt="Money Icon" className="w-15 h-15"/>
                <span className="text-green-500 text-sm font-semibold">+12.5%</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Total Earnings</p>
              <p className="text-3xl font-bold text-gray-900">₱67.67</p>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <img src={bagIcon} alt="Bag Icon" className="w-12 h-12"/>
                <span className="text-blue-500 text-sm font-semibold">+3 this week</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Active Jobs</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>

            {/* Success Rate */}
           <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <img src={analyticsIcon} alt="Analytics Icon" className="w-12 h-12"/>
                <span className="text-blue-500 text-sm font-semibold">+3 this week</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>

            {/* Rating */}
             <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <img src={starIcon} alt="Star Icon" className="w-12 h-12"/>
                <span className="text-blue-500 text-sm font-semibold">89 reviews</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">Rating</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>

            {/* Profile Strength */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl">
                  85%
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center">Profile Strength</p>
            </div>
          </div>

          {/* Quick Actions & Profile Strength */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="text-gray-900 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 transition">
                  <img src={bagIcon1} alt="Browse Jobs" className="w-20 h-20"/>
                  <span className="font-semibold text-sm text-center">Browse<br/>Jobs</span>
                </button>
                <button className="text-gray-900 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 transition">
                  <img src={clockIcon} alt="My Applications" className="w-20 h-20"/>
                  <span className="font-semibold text-sm text-center">My<br/>Applications</span>
                </button>
                <button className="text-gray-900 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 transition">
                  <img src={walletIcon1} alt="Wallet" className="w-20 h-20"/>
                  <span className="font-semibold text-sm text-center">Wallet</span>
                </button>
                <button className="text-gray-900 rounded-2xl px-6 py-8 flex flex-col items-center gap-3 transition">
                  <img src={messageIcon1} alt="Messages" className="w-20 h-20"/>
                  <span className="font-semibold text-sm text-center">Messages</span>
                </button>
              </div>
            </div>

            {/* Profile Strength Details */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Strength</h3>
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-3xl">
                  85%
                </div>
              </div>
              <p className="text-gray-600 text-sm text-center mb-4">Almost there!</p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm">Add profile photo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm">Complete bio section</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 text-sm">Add portfolio items</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Jobs Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Active Jobs</h3>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">View All →</a>
            </div>

            <div className="space-y-4">
              {/* Job 1 */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Taga baril ng mga Bading</h4>
                    <p className="text-gray-600 text-sm">Tech Solutions Inc.</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Design</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Budget</p>
                      <p className="font-bold text-gray-900">₱350</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Time Left</p>
                      <p className="font-bold text-red-600">3 days left</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">In Progress</span>
                </div>
              </div>

              {/* Job 2 */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Rally sa bahay ni Marcos</h4>
                    <p className="text-gray-600 text-sm">Fashion Brand Co.</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Development</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Budget</p>
                      <p className="font-bold text-gray-900">₱2,500</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Time Left</p>
                      <p className="font-bold text-red-600">5 days left</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">In Progress</span>
                </div>
              </div>

              {/* Job 3 */}
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Suntukan sa Tondaligan Beach</h4>
                    <p className="text-gray-600 text-sm">StartUp Ventures</p>
                  </div>
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">Marketing</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Budget</p>
                      <p className="font-bold text-gray-900">₱800</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Time Left</p>
                      <p className="font-bold text-red-600">2 days left</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
