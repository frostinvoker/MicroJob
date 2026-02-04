import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../hooks/useAuth";

interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  type: string[];
  appliedDate: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
}

const AppliedJobs: React.FC = () => {
  const navigate = useNavigate();
  const authUser = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const appliedJobs: Job[] = [
    {
      id: 1,
      title: "Front end Developer",
      company: "Spotify",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      location: "Pangasinan, PH",
      salary: "150k to 250k",
      type: ["UI/UX", "NodeJs", "Figma"],
      appliedDate: "Applied 2 days ago",
      status: "Pending",
    },
    {
      id: 2,
      title: "Front end Developer",
      company: "Spotify",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      location: "Pangasinan, PH",
      salary: "150k to 250k",
      type: ["UI/UX", "NodeJs", "Figma"],
      appliedDate: "Applied 5 days ago",
      status: "Reviewed",
    },
    {
      id: 3,
      title: "Front end Developer",
      company: "Spotify",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      location: "Pangasinan, PH",
      salary: "150k to 250k",
      type: ["UI/UX", "NodeJs", "Figma"],
      appliedDate: "Applied 1 week ago",
      status: "Pending",
    },
  ];

  const filterOptions = ["All", "Pending", "Reviewed", "Accepted", "Rejected"];

  const filteredJobs = selectedFilter === "All" 
    ? appliedJobs 
    : appliedJobs.filter(job => job.status === selectedFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Reviewed": return "bg-blue-100 text-blue-700";
      case "Accepted": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userName={authUser?.firstName + " " + authUser?.lastName || "Jonas Enriquez"} userEmail={authUser?.email || "jonas@example.com"} balance="₱67.67" messageCount={2} userRole={authUser?.role || "work"} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Applied Jobs</h1>
          <p className="text-blue-100">Track your job applications and their status</p>
        </div>

        {/* Content */}
        <div className="px-8 pb-20">
          {/* Filter Tabs */}
          <div className="flex gap-3 mb-8">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Jobs Count */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredJobs.length} Application{filteredJobs.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-gray-600 text-sm">Your recent job applications</p>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition cursor-pointer relative"
                onClick={() => navigate(`/job-details/${job.id}`)}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>

                {/* Company Logo */}
                <div className="bg-white rounded-2xl p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-12 h-12 object-contain" />
                  ) : (
                    <span className="text-2xl">🏢</span>
                  )}
                </div>

                {/* Job Title */}
                <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                <p className="text-blue-200 text-sm mb-3">{job.company}</p>
                <p className="text-blue-100 text-sm mb-4">{job.location}</p>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.type.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
                  <span className="text-sm text-blue-100">{job.appliedDate}</span>
                  <span className="text-lg font-bold">{job.salary}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-600 mb-6">
                You haven't applied to any jobs with this status yet.
              </p>
              <button
                onClick={() => navigate("/find-jobs")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Browse Jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
