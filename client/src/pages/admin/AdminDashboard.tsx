import React from "react";

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: "Total Jobs",
      value: "5",
      change: "12%",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
      badge: "bg-blue-100 text-blue-700",
    },
    {
      label: "Active Jobs",
      value: "4",
      change: "8%",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 17l6-6 4 4 7-7" />
          <path d="M14 8h7v7" />
        </svg>
      ),
      badge: "bg-green-100 text-green-700",
    },
    {
      label: "Applications",
      value: "5",
      change: "24%",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-purple-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      badge: "bg-purple-100 text-purple-700",
    },
    {
      label: "Total Views",
      value: "944",
      change: "18%",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-orange-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      badge: "bg-orange-100 text-orange-700",
    },
    {
      label: "Total Budget",
      value: "$1,850",
      change: "15%",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-pink-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      badge: "bg-pink-100 text-pink-700",
    },
    {
      label: "Pending Review",
      value: "2",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      badge: "bg-blue-100 text-blue-700",
    },
  ];

  const recentJobs = [
    {
      title: "React Developer Needed",
      views: 245,
      applications: 12,
      budget: "$500",
      date: "Feb 4, 2026",
      tags: ["active", "featured"],
    },
    {
      title: "Logo Design for Startup",
      views: 180,
      applications: 7,
      budget: "$250",
      date: "Feb 4, 2026",
      tags: ["active"],
    },
  ];

  const quickActions = [
    { label: "Post New Job", color: "bg-blue-600 hover:bg-blue-700", icon: "+" },
    { label: "Manage Jobs", color: "bg-purple-600 hover:bg-purple-700", icon: "📄" },
    { label: "View Applicants", color: "bg-emerald-600 hover:bg-emerald-700", icon: "👥" },
    { label: "Export Data", color: "bg-orange-500 hover:bg-orange-600", icon: "⬇" },
  ];

  const categories = [
    { label: "Development", color: "#3b82f6" },
    { label: "Design", color: "#8b5cf6" },
    { label: "Writing", color: "#10b981" },
    { label: "Marketing", color: "#f59e0b" },
    { label: "Data Entry", color: "#ec4899" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your job posting platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</p>
              {stat.change && (
                <div className="flex items-center gap-2 text-sm">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${stat.badge}`}>
                    ↑ {stat.change}
                  </span>
                  <span className="text-gray-400">vs last month</span>
                </div>
              )}
            </div>
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.badge}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs & Applications Overview</h2>
          <div className="h-64 w-full">
            <svg viewBox="0 0 640 240" className="w-full h-full">
              <defs>
                <linearGradient id="jobsGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="appsGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g stroke="#e5e7eb" strokeDasharray="4 6">
                <line x1="40" y1="20" x2="620" y2="20" />
                <line x1="40" y1="70" x2="620" y2="70" />
                <line x1="40" y1="120" x2="620" y2="120" />
                <line x1="40" y1="170" x2="620" y2="170" />
              </g>

              <g fill="#94a3b8" fontSize="12" fontFamily="sans-serif">
                <text x="10" y="175">80</text>
                <text x="10" y="125">160</text>
                <text x="10" y="75">240</text>
                <text x="10" y="25">320</text>
              </g>

              <path
                d="M40 160 L120 145 L200 120 L280 130 L360 95 L440 70 L520 45 L620 35 L620 200 L40 200 Z"
                fill="url(#jobsGradient)"
              />
              <path
                d="M40 160 L120 145 L200 120 L280 130 L360 95 L440 70 L520 45 L620 35"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
              />

              <path
                d="M40 190 L120 185 L200 178 L280 180 L360 170 L440 162 L520 155 L620 150 L620 210 L40 210 Z"
                fill="url(#appsGradient)"
              />
              <path
                d="M40 190 L120 185 L200 178 L280 180 L360 170 L440 162 L520 155 L620 150"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
              />

              <g fill="#94a3b8" fontSize="12" fontFamily="sans-serif">
                <text x="40" y="220">Jan</text>
                <text x="130" y="220">Feb</text>
                <text x="220" y="220">Mar</text>
                <text x="310" y="220">Apr</text>
                <text x="400" y="220">May</text>
                <text x="490" y="220">Jun</text>
                <text x="580" y="220">Jul</text>
              </g>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Jobs by Category</h2>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-48 w-48">
              <g transform="translate(100 100) rotate(-90)">
                <circle r="60" fill="none" stroke="#3b82f6" strokeWidth="22" strokeDasharray="113 265" strokeDashoffset="0" />
                <circle r="60" fill="none" stroke="#8b5cf6" strokeWidth="22" strokeDasharray="80 265" strokeDashoffset="-113" />
                <circle r="60" fill="none" stroke="#10b981" strokeWidth="22" strokeDasharray="60 265" strokeDashoffset="-193" />
                <circle r="60" fill="none" stroke="#f59e0b" strokeWidth="22" strokeDasharray="40 265" strokeDashoffset="-253" />
                <circle r="60" fill="none" stroke="#ec4899" strokeWidth="22" strokeDasharray="32 265" strokeDashoffset="-293" />
              </g>
            </svg>
          </div>
          <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-600">
            {categories.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Job Postings</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">View All</button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.title} className="border border-gray-100 rounded-2xl p-4 hover:shadow-sm transition">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-gray-900">{job.title}</h3>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tag === "featured"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-2">👁 {job.views} views</span>
                  <span className="flex items-center gap-2">👤 {job.applications} applications</span>
                  <span className="flex items-center gap-2">$ {job.budget}</span>
                  <span className="ml-auto text-gray-400">{job.date}</span>
                  <button className="text-gray-400 hover:text-gray-600">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={`${action.color} text-white rounded-2xl px-4 py-6 font-semibold flex flex-col items-center gap-3 transition`}
              >
                <span className="text-2xl">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
