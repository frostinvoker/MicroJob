import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Calendar,
  User,
  ChevronDown,
  MoreVertical,
  MapPin,
  CalendarDays,
  TrendingUp
} from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  date: string;
  status: "Open" | "Hold" | "Closed";
  matchPercentage: number;
  matchQuality: "Strong Match" | "Good Match" | "Fair Match";
  salary: string;
  candidatesApplied: number;
  completedInterviews: number;
  tags: {
    workLocation: string;
    workType: string;
    experience: string;
    positions: string;
  };
  createdBy: string;
}

const mockJobPostings: JobPosting[] = [
  {
    id: "1",
    title: "ReactJS Developer",
    department: "Development",
    location: "Surat",
    date: "Feb 24, 2025",
    status: "Open",
    matchPercentage: 90,
    matchQuality: "Strong Match",
    salary: "$25K-30K annually",
    candidatesApplied: 15,
    completedInterviews: 8,
    tags: {
      workLocation: "On Site",
      workType: "Full Time",
      experience: "3 Years exp.",
      positions: "2 Positions"
    },
    createdBy: "Brooklyn"
  },
  {
    id: "2",
    title: "iOS Developer",
    department: "Development",
    location: "Surat",
    date: "March 30, 2025",
    status: "Open",
    matchPercentage: 95,
    matchQuality: "Strong Match",
    salary: "$40K-60K annually",
    candidatesApplied: 14,
    completedInterviews: 10,
    tags: {
      workLocation: "On Site",
      workType: "Full Time",
      experience: "2-3 Years exp.",
      positions: "4 Positions"
    },
    createdBy: "Brooklyn"
  },
  {
    id: "3",
    title: "Intern UI/UX Designer",
    department: "Design",
    location: "Surat",
    date: "March 30, 2025",
    status: "Open",
    matchPercentage: 85,
    matchQuality: "Strong Match",
    salary: "$30K-40K annually",
    candidatesApplied: 12,
    completedInterviews: 8,
    tags: {
      workLocation: "On Site",
      workType: "Full Time",
      experience: "1-2 Years exp.",
      positions: "3 Positions"
    },
    createdBy: "Robert"
  },
  {
    id: "4",
    title: "3D Animation (Junior)",
    department: "Design",
    location: "Surat",
    date: "April 01, 2025",
    status: "Hold",
    matchPercentage: 36,
    matchQuality: "Fair Match",
    salary: "$15K-20K annually",
    candidatesApplied: 12,
    completedInterviews: 3,
    tags: {
      workLocation: "On Site",
      workType: "Full Time",
      experience: "1 Years exp.",
      positions: "5 positions"
    },
    createdBy: "Brooklyn"
  },
  {
    id: "5",
    title: "Python Developer",
    department: "Development",
    location: "Surat",
    date: "April 02, 2025",
    status: "Open",
    matchPercentage: 60,
    matchQuality: "Good Match",
    salary: "$25K-30K annually",
    candidatesApplied: 22,
    completedInterviews: 4,
    tags: {
      workLocation: "On Site",
      workType: "Full Time",
      experience: "2 Years exp.",
      positions: "2 Positions"
    },
    createdBy: "Samantha"
  },
  {
    id: "6",
    title: "Senior Front-End Developer",
    department: "Development",
    location: "Surat",
    date: "April 05, 2025",
    status: "Open",
    matchPercentage: 75,
    matchQuality: "Good Match",
    salary: "$50K-70K annually",
    candidatesApplied: 18,
    completedInterviews: 12,
    tags: {
      workLocation: "On Site",
      workType: "Full Time",
      experience: "5+ Years exp.",
      positions: "1 Position"
    },
    createdBy: "Robert"
  }
];

export function JobsManagement() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>("Jobs");
  const [jobsExpanded, setJobsExpanded] = useState(true);
  const [employeeExpanded, setEmployeeExpanded] = useState(false);

  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", hasSubmenu: false },
    { 
      icon: <Briefcase className="w-4 h-4" />, 
      label: "Jobs", 
      hasSubmenu: true,
      submenu: ["Dashboard", "Jobs", "Matches", "Candidates"]
    },
    { icon: <MessageSquare className="w-4 h-4" />, label: "Message", hasSubmenu: false, badge: true },
    { 
      icon: <Users className="w-4 h-4" />, 
      label: "Employee", 
      hasSubmenu: true,
      submenu: ["Overview", "Team Members"]
    },
    { icon: <Calendar className="w-4 h-4" />, label: "Schedule", hasSubmenu: false },
    { icon: <User className="w-4 h-4" />, label: "Profile", hasSubmenu: false },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "Hold":
        return "bg-gray-100 text-gray-700";
      case "Closed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 50) return "text-purple-600";
    return "text-orange-600";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-[200px] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider mb-1">MENU</h2>
        </div>

        <nav className="flex-1 px-3">
          {menuItems.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => {
                  setActiveMenu(item.label);
                  if (item.label === "Jobs") setJobsExpanded(!jobsExpanded);
                  if (item.label === "Employee") setEmployeeExpanded(!employeeExpanded);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-[14px] transition-colors mb-1 ${
                  activeMenu === item.label
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {item.badge && (
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                  {item.hasSubmenu && (
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        (item.label === "Jobs" && jobsExpanded) || 
                        (item.label === "Employee" && employeeExpanded) 
                          ? "rotate-180" 
                          : ""
                      }`} 
                    />
                  )}
                </div>
              </button>

              {/* Submenu */}
              {item.hasSubmenu && item.label === "Jobs" && jobsExpanded && (
                <div className="ml-6 mb-2">
                  {item.submenu?.map((subItem) => (
                    <button
                      key={subItem}
                      className="w-full text-left px-3 py-2 text-[13px] text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}

              {item.hasSubmenu && item.label === "Employee" && employeeExpanded && (
                <div className="ml-6 mb-2">
                  {item.submenu?.map((subItem) => (
                    <button
                      key={subItem}
                      className="w-full text-left px-3 py-2 text-[13px] text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6">
            {mockJobPostings.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${getStatusStyle(job.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {job.status}
                    </span>
                    <span className="text-[12px] text-gray-600">{job.department}</span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Job Title */}
                <div className="mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[18px]">⚛</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[16px] text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-3 text-[12px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {job.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Percentage */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#E5E7EB"
                        strokeWidth="6"
                        fill="none"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={job.matchPercentage >= 80 ? "#3B82F6" : job.matchPercentage >= 50 ? "#A855F7" : "#F59E0B"}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (1 - job.matchPercentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`font-bold text-[14px] ${getMatchColor(job.matchPercentage)}`}>
                        {job.matchPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-semibold text-gray-900">{job.matchQuality}</p>
                    <p className="text-[12px] text-gray-500">Candidates</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600 flex items-center gap-2">
                      <span className="w-4 h-4 text-gray-400">💰</span>
                      Salary
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">{job.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600 flex items-center gap-2">
                      <span className="w-4 h-4 text-gray-400">👥</span>
                      Candidates Applied
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">{job.candidatesApplied}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600 flex items-center gap-2">
                      <span className="w-4 h-4 text-gray-400">✅</span>
                      Completed Interview
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">{job.completedInterviews}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[11px] font-medium rounded">
                    {job.tags.workLocation}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[11px] font-medium rounded">
                    {job.tags.workType}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-[11px] font-medium rounded">
                    {job.tags.experience}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[11px] font-medium rounded">
                    {job.tags.positions}
                  </span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-gray-500">
                    Created by <span className="font-semibold text-gray-900">{job.createdBy}</span>
                  </span>
                  <button className="text-[13px] text-purple-600 hover:text-purple-700 font-semibold">
                    View details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
