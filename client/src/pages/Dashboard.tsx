import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import Sidebar from "../components/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false); // sidebar collapse state
  const [userName, setUserName] = useState("Jonas Dick");
  const [userEmail, setUserEmail] = useState("you@example.com");
  const [activeVacancyTab, setActiveVacancyTab] = useState("Application Sent");
  const [showNotifications, setShowNotifications] = useState(false);

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

  const recommendations = [
    { id: 1, title: "Senior React Developer", company: "Tech Solutions Inc.", salary: "₱80,000 - ₱120,000", description: "We're looking for an experienced React developer...", location: "Manila, PH", type: "Remote", daysAgo: "2 days ago", initials: "TS" },
    { id: 2, title: "Full Stack Developer", company: "Innovation Labs", salary: "₱70,000 - ₱100,000", description: "Join our dynamic team building next-generation SaaS...", location: "Cebu, PH", type: "Hybrid", daysAgo: "5 days ago", initials: "IL" },
    { id: 3, title: "Mobile Developer", company: "Digital Ventures", salary: "₱75,000 - ₱110,000", description: "Build amazing mobile experiences with React Native...", location: "Makati, PH", type: "On-site", daysAgo: "1 week ago", initials: "DV" },
  ];

  const companies = [
    { id: 1, name: "Google Philippines", abbreviation: "GP", vacancies: "24 Vacancies", employees: "10,000+ employees", category: "Technology" },
    { id: 2, name: "Microsoft", abbreviation: "MS", vacancies: "18 Vacancies", employees: "5,000+ employees", category: "Software" },
    { id: 3, name: "Amazon Web Services", abbreviation: "AWS", vacancies: "32 Vacancies", employees: "8,000+ employees", category: "Cloud Services" },
    { id: 4, name: "Meta Platforms", abbreviation: "MP", vacancies: "15 Vacancies", employees: "3,000+ employees", category: "Social Media" },
  ];

  const recentActivities = [
    { id: 1, type: "accepted", title: "Your application has been accepted for Senior Frontend Developer", time: "1m ago", icon: "✓" },
    { id: 2, type: "scheduled", title: "Interview scheduled with Tech Corp on Friday at 2:00 PM", time: "15m ago", icon: "🕐" },
    { id: 3, type: "message", title: "New message from HR Manager at Innovation Labs", time: "1h ago", icon: "✉️" },
    { id: 4, type: "viewed", title: "Application viewed by Google Inc.", time: "2h ago", icon: "👁️" },
  ];

  const techStack = [
    { name: "React", color: "bg-blue-600", initial: "R" },
    { name: "Node.js", color: "bg-green-600", initial: "N" },
    { name: "TypeScript", color: "bg-yellow-600", initial: "TS" },
  ];

  const notifications = [
    { id: 1, title: "New Application Received", description: "Sarah Chen applied for Senior Frontend Developer position", time: "5 minutes ago", isNew: true },
    { id: 2, title: "Application Status Updated", description: "Michael Rodriguez has been moved to interview stage", time: "1 hour ago", isNew: true },
    { id: 3, title: "Job Posting Approved", description: "Your Backend Engineer job posting is now live", time: "2 hours ago", isNew: true },
  ];

  return (
  <div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <Sidebar
      userName={userName}
      userEmail={userEmail}
      balance="₱67.67"
      messageCount={2}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed} // allow toggling collapse
    />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 p-8 pb-20 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search by skills, name, or expertise..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-4 top-2.5 text-gray-400">🔍</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative hover:opacity-80 transition"
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold absolute -top-1 -right-1">
                  {notifications.length}
                </div>
                <span className="text-2xl">🔔</span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">
                      Notifications ({notifications.length})
                    </h3>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-900 text-sm">
                                {notif.title}
                              </h4>
                              {notif.isNew && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs mb-2">
                              {notif.description}
                            </p>
                            <p className="text-gray-500 text-xs">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 border-t border-gray-200 text-center">
                    <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 bg-yellow-400 rounded-full px-3 py-1">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
          </div>
        </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#2265A2] rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Interviews Schedule</p>
                  <p className="text-4xl font-bold">12</p>
                </div>
                <div className="text-2xl">📅</div>
              </div>
              <p className="text-xs text-blue-100 mt-3">↑ +12%</p>
            </div>

            <div className="bg-[#0F2854] rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-200 text-sm mb-2">Application Sent</p>
                  <p className="text-4xl font-bold">37</p>
                </div>
                <div className="text-2xl">✈️</div>
              </div>
              <p className="text-xs text-blue-200 mt-3">↑ +8%</p>
            </div>

            <div className="bg-[#2265A2] rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-2">E-wallet</p>
                  <p className="text-4xl font-bold">12</p>
                </div>
                <div className="text-2xl">💳</div>
              </div>
              <p className="text-xs text-blue-100 mt-3">↑ +5%</p>
            </div>

            <div className="bg-[#0F2854] rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-200 text-sm mb-2">Unread Messages</p>
                  <p className="text-4xl font-bold">8</p>
                </div>
                <div className="text-2xl">✉️</div>
              </div>
              <p className="text-xs text-blue-200 mt-3">↓ -3%</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Verified Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">100</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-1">%</p>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  <span className="text-green-500">✓</span>
                  Profile Verified
                </h3>
                <p className="text-gray-600 text-xs">All requirements completed</p>
              </div>

              {/* Tech Stack */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Tech Stack</h3>
                  <span className="text-sm text-gray-600">{techStack.length} Skills</span>
                </div>
                <div className="space-y-3">
                  {techStack.map((tech, idx) => (
                    <div key={idx} className={`${tech.color} rounded-lg p-3 text-white font-semibold text-center`}>
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Recent Activities</h3>
                  <a href="#" className="text-blue-600 text-sm font-semibold">View all</a>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-b-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "accepted" ? "bg-green-100" :
                        activity.type === "scheduled" ? "bg-blue-100" :
                        activity.type === "message" ? "bg-yellow-100" :
                        "bg-gray-100"
                      }`}>
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-700 font-semibold text-xs">{activity.title}</p>
                        <p className="text-gray-500 text-xs mt-1">● {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Vacancy Stats Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-lg">Vacancy Stats</h3>
                  <select className="text-sm bg-gray-100 border border-gray-300 rounded-lg px-3 py-1">
                    <option>This Month</option>
                  </select>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                  {["Application Sent", "Interviews", "Rejected", "This Month"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveVacancyTab(tab)}
                      className={`px-4 py-2 font-semibold text-sm transition ${
                        activeVacancyTab === tab
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Chart Placeholder - Line Chart */}
                <div className="h-96 relative mb-6">
                  <Line
                    data={{
                      labels: ["Week 01", "Week 02", "Week 03", "Week 04", "Week 05", "Week 06", "Week 07", "Week 08", "Week 09", "Week 10"],
                      datasets: [
                        {
                          label: "Application Sent",
                          data: [5, 8, 11, 15, 18, 22, 25, 28, 32, 35],
                          borderColor: "#3b82f6",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          borderWidth: 3,
                          fill: true,
                          tension: 0.4,
                          pointRadius: 5,
                          pointBackgroundColor: "#3b82f6",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 2,
                          pointHoverRadius: 7,
                        },
                        {
                          label: "Interviews",
                          data: [3, 4, 7, 10, 12, 15, 18, 19, 23, 27],
                          borderColor: "#10b981",
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          borderWidth: 3,
                          fill: true,
                          tension: 0.4,
                          pointRadius: 5,
                          pointBackgroundColor: "#10b981",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 2,
                          pointHoverRadius: 7,
                        },
                        {
                          label: "Rejected",
                          data: [2, 2, 3, 4, 5, 5, 6, 6, 7, 8],
                          borderColor: "#ef4444",
                          backgroundColor: "rgba(239, 68, 68, 0.1)",
                          borderWidth: 3,
                          fill: true,
                          tension: 0.4,
                          pointRadius: 5,
                          pointBackgroundColor: "#ef4444",
                          pointBorderColor: "#ffffff",
                          pointBorderWidth: 2,
                          pointHoverRadius: 7,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: "bottom",
                          labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                              size: 13,
                              weight: "bold",
                            },
                            color: "#6b7280",
                          },
                        },
                        tooltip: {
                          backgroundColor: "#ffffff",
                          titleColor: "#111827",
                          bodyColor: "#111827",
                          borderColor: "#e5e7eb",
                          borderWidth: 1,
                          padding: 12,
                          displayColors: true,
                          usePointStyle: true,
                          boxPadding: 10,
                          titleFont: {
                            size: 14,
                            weight: "bold",
                          },
                          bodyFont: {
                            size: 12,
                            weight: "bold",
                          },
                          callbacks: {
                            title: (context: any) => `${context[0].label}`,
                            label: (context: any) => `${context.dataset.label} : ${context.parsed.y}`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            display: true,
                            color: "#f3f4f6",
                          },
                          ticks: {
                            color: "#9ca3af",
                            font: {
                              size: 12,
                            },
                          },
                        },
                        y: {
                          grid: {
                            display: true,
                            color: "#f3f4f6",
                          },
                          ticks: {
                            color: "#9ca3af",
                            font: {
                              size: 12,
                            },
                          },
                        },
                      },
                      interaction: {
                        intersect: false,
                        mode: "index",
                      },
                    }}
                  />
                </div>

                {/* Legend */}
                <div className="flex gap-6 text-sm mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Application Sent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Interviews</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Rejected</span>
                  </label>
                </div>

                {/* Stats Summary */}
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="font-semibold text-blue-600">37</span>
                    <span className="text-gray-600 ml-1">Application Sent</span>
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">2</span>
                    <span className="text-gray-600 ml-1">Interviews</span>
                  </div>
                </div>
              </div>

              {/* Recommended Jobs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Recommended Jobs</h3>
                  <a href="#" className="text-blue-600 text-sm font-semibold">View All ↗</a>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {recommendations.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer" onClick={() => navigate(`/job-details/${job.id}`)}>
                      <div className="flex gap-4">
                        <div className={`w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                          {job.initials}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{job.title}</h4>
                            <span className="text-xs text-gray-500">⏱️ {job.daysAgo}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-1">📍 {job.company}</p>
                          <p className="text-gray-900 font-semibold text-sm mb-2">{job.salary}</p>
                          <p className="text-gray-600 text-xs mb-3 line-clamp-2">{job.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <span className="text-xs text-gray-600">📍 {job.location}</span>
                              <span className="text-xs">👥 24</span>
                            </div>
                            <button className={`px-3 py-1 rounded-lg text-xs font-semibold text-white ${
                              job.type === "Remote" ? "bg-blue-600" :
                              job.type === "Hybrid" ? "bg-yellow-600" :
                              "bg-green-600"
                            }`}>
                              {job.type}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Companies */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">Featured Companies</h3>
                  <a href="#" className="text-blue-600 text-sm font-semibold">Explore All ↗</a>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {companies.map((company) => (
                    <div key={company.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center font-bold text-gray-700">
                        {company.abbreviation}
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2 text-center">{company.name}</h4>
                      <p className="text-green-600 text-xs font-semibold mb-2 text-center">📋 {company.vacancies}</p>
                      <p className="text-gray-600 text-xs text-center mb-2">👥 {company.employees}</p>
                      <p className="text-gray-600 text-xs text-center">📂 {company.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
