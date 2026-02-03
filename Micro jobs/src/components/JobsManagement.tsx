import { useNavigate } from "react-router-dom";
import { 
  Users, 
  MessageSquare, 
  MoreVertical,
  MapPin,
  CalendarDays,
  TrendingUp,
  ChevronRight,
  ArrowRight
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
    <div className="max-w-[1341px] mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold text-[20px] text-[#111827]">Jobs Management</h2>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Track job postings, candidate matches, and hiring progress.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/employer/applications")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1F2937] font-medium text-[13px] rounded-[10px] hover:bg-gray-50 transition-all"
          >
            <Users className="w-4 h-4" />
            View Applications
          </button>
          <button
            onClick={() => navigate("/dashboard/employer/post-job")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1C4D8D] text-white font-semibold text-[13px] rounded-[10px] hover:bg-[#0F2954] transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
            Post New Job
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockJobPostings.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-lg transition-all"
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
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4988C4] to-[#1C4D8D] flex items-center justify-center flex-shrink-0">
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
                    <p className="text-[12px] text-gray-500">Match quality</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#9CA3AF]" />
                      Salary
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">{job.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#9CA3AF]" />
                      Candidates Applied
                    </span>
                    <span className="text-[13px] font-semibold text-gray-900">{job.candidatesApplied}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-gray-600 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#9CA3AF]" />
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
                  <button
                    onClick={() => navigate("/dashboard/employer/applications")}
                    className="text-[13px] text-[#1C4D8D] hover:text-[#0F2954] font-semibold inline-flex items-center gap-1"
                  >
                    View details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}
