import React from "react";
import { useNavigate } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  type: string[];
  savedDate: string;
  workMode: "Remote" | "Hybrid" | "On-site";
  description: string;
  applicants: string;
  deadline: string;
}

const SavedJobs: React.FC = () => {
  const navigate = useNavigate();

  const savedJobs: Job[] = [
    {
      id: 1,
      title: "Senior React Developer",
      location: "Pangasinan, PH",
      salary: "₱80,000 - ₱120,000",
      type: ["React", "TypeScript", "GraphQL"],
      savedDate: "2 days ago",
      workMode: "Remote",
      description:
        "We're looking for an experienced React developer to join our growing team. Work on cutting-edge projects with modern tech stack including React, TypeScript, and GraphQL.",
      applicants: "24 applicants",
      deadline: "Feb 15, 2026",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      location: "Cebu, PH",
      salary: "₱70,000 - ₱100,000",
      type: ["React", "Node.js", "AWS"],
      savedDate: "5 days ago",
      workMode: "Hybrid",
      description:
        "Join our dynamic team building next-generation SaaS products. Experience with React, Node.js, and AWS required. Great benefits and work-life balance.",
      applicants: "18 applicants",
      deadline: "Feb 20, 2026",
    },
    {
      id: 3,
      title: "Mobile Developer",
      location: "Makati, PH",
      salary: "₱75,000 - ₱110,000",
      type: ["React Native", "TypeScript", "Mobile"],
      savedDate: "1 week ago",
      workMode: "On-site",
      description:
        "Build modern mobile experiences using React Native. Collaborate with product and design teams to deliver high quality features.",
      applicants: "12 applicants",
      deadline: "Feb 28, 2026",
    },
  ];

  return (
    <div>
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
              <p className="text-gray-500 text-sm">You have {savedJobs.length} saved jobs</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search saved jobs..."
                className="w-72 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <button className="relative h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
              🔔
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
              JD
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          {[
            { label: "All Jobs", active: true },
            { label: "Remote" },
            { label: "Hybrid" },
            { label: "On-site" },
          ].map((pill) => (
            <button
              key={pill.label}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                pill.active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {savedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer border border-gray-200"
                onClick={() => navigate(`/job-details/${job.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    {job.title.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {job.workMode}
                      </span>
                      <span className="text-green-600 font-semibold text-sm">{job.salary}</span>
                      <span className="text-gray-500 text-sm">/ month</span>
                    </div>

                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {job.description}
                    </p>

                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.type.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🕒 {job.savedDate}</span>
                        <span>👥 {job.applicants}</span>
                        <span>📅 Deadline: {job.deadline}</span>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

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
  );
};

export default SavedJobs;
