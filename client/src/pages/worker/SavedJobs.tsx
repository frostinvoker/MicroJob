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
  savedDate: string;
}

const SavedJobs: React.FC = () => {
  const navigate = useNavigate();
  const authUser = useAuth();

  const savedJobs: Job[] = [
    {
      id: 1,
      title: "Front end Developer",
      company: "Spotify",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      location: "Pangasinan, PH",
      salary: "150k to 250k",
      type: ["UI/UX", "NodeJs", "Figma"],
      savedDate: "Saved 2 days ago",
    },
    {
      id: 2,
      title: "Front end Developer",
      company: "Spotify",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      location: "Pangasinan, PH",
      salary: "150k to 250k",
      type: ["UI/UX", "NodeJs", "Figma"],
      savedDate: "Saved 5 days ago",
    },
    {
      id: 3,
      title: "Front end Developer",
      company: "Spotify",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png",
      location: "Pangasinan, PH",
      salary: "150k to 250k",
      type: ["UI/UX", "NodeJs", "Figma"],
      savedDate: "Saved 1 week ago",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userName={authUser?.firstName + " " + authUser?.lastName || "Jonas Enriquez"} userEmail={authUser?.email || "jonas@example.com"} balance="₱67.67" messageCount={2} userRole={authUser?.role || "work"} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-white hover:text-blue-200 transition"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-4xl font-bold mb-2">Saved Jobs</h1>
          <p className="text-blue-100">{savedJobs.length} jobs saved for later</p>
        </div>

        {/* Content */}
        <div className="px-8 pb-20">
          {/* Job Cards */}
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-br from-blue-0 to-blue-0 rounded-2xl p-6 text-black shadow-lg hover:shadow-xl transition cursor-pointer relative"
                onClick={() => navigate(`/job-details/${job.id}`)}
              >
                <div className="flex items-start gap-6">
                  {/* Company Logo */}
                  <div className="bg-black rounded-2xl p-3 w-20 h-20 flex items-center justify-center flex-shrink-0">
                    {job.companyLogo ? (
                      <img src={job.companyLogo} alt={job.company} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="text-3xl">🏢</span>
                    )}
                  </div>

                  {/* Job Details */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{job.title}</h3>
                    <p className="text-blue-200 text-lg mb-2">{job.company}</p>
                    <p className="text-blue-100 mb-4">{job.location}</p>

                    {/* Skills/Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.type.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-blue-100 text-sm">{job.savedDate}</span>
                      <span className="text-xl font-bold">{job.salary}</span>
                    </div>
                  </div>

                  {/* Bookmark Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle unsave
                    }}
                    className="text-yellow-400 hover:text-yellow-300 transition text-2xl"
                  >
                    🔖
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {savedJobs.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Saved Jobs</h3>
              <p className="text-gray-600 mb-6">
                You haven't saved any jobs yet. Start browsing and save jobs you're interested in!
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

export default SavedJobs;
