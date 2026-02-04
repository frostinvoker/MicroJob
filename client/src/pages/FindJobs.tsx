import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";

const FindJobs: React.FC = () => {
  const navigate = useNavigate();
  const authUser = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const categories = ["All", "Development", "Design", "Writing", "Marketing", "Video & Animation"];
  const filterOptions = ["Fulltime", "Freelance", "Remote", "Part-time"];
  const sortOptions = ["Newest"];

  const jobs = [
    {
      id: 1,
      title: "Mobile Developer Designer",
      company: "Company Name",
      salary: "₱10,000 - ₱50,000",
      description: "lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am guys dada tapsib malang itee itme check 2x? am lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am",
      location: "Pangasinan, PHR",
      type: "Remote",
    },
    {
      id: 2,
      title: "Mobile Developer Designer",
      company: "Company Name",
      salary: "₱10,000 - ₱50,000",
      description: "lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am guys dada tapsib malang itee itme check 2x? am lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am",
      location: "Pangasinan, PHR",
      type: "Remote",
    },
    {
      id: 3,
      title: "Mobile Developer Designer",
      company: "Company Name",
      salary: "₱10,000 - ₱50,000",
      description: "lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am guys dada tapsib malang itee itme check 2x? am lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am",
      location: "Pangasinan, PHR",
      type: "Remote",
    },
    {
      id: 4,
      title: "Mobile Developer Designer",
      company: "Company Name",
      salary: "₱10,000 - ₱50,000",
      description: "lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am guys dada tapsib malang itee itme check 2x? am lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am",
      location: "Pangasinan, PHR",
      type: "Remote",
    },
    {
      id: 5,
      title: "Mobile Developer Designer",
      company: "Company Name",
      salary: "₱10,000 - ₱50,000",
      description: "lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am guys dada tapsib malang itee itme check 2x? am lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am",
      location: "Pangasinan, PHR",
      type: "Remote",
    },
    {
      id: 6,
      title: "Mobile Developer Designer",
      company: "Company Name",
      salary: "₱10,000 - ₱50,000",
      description: "lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am guys dada tapsib malang itee itme check 2x? am lorem lorem bahay kobo gusto ko na nag unalog nung dada tapsib malang itee itme check 2x? am",
      location: "Pangasinan, PHR",
      type: "Remote",
    },
  ];

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userName={authUser?.firstName || "Jonas"} userEmail={authUser?.email || "jonas@example.com"} balance="₱67.67" messageCount={2} userRole={authUser?.role || "work"} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">Find jobs</h1>
          <p className="text-blue-100">Discover and hire skilled professionals for your projects</p>
        </div>

        {/* Content */}
        <div className="px-8 pb-20">
          {/* Search and Filters Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by skills, name, or expertise..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                />
                <span className="absolute right-4 top-3.5 text-gray-400">🔍</span>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 flex items-center gap-2">
                ⚙️ Filters
              </button>
            </div>

            {/* Category Buttons */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Showing 10 Jobs Results</h2>
              <p className="text-gray-600 text-sm">Based your preferences</p>
            </div>
            <div className="flex gap-3 items-center">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                    selectedFilters.includes(filter)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter === "Fulltime" && "◯"}
                  {filter === "Freelance" && "◯"}
                  {filter === "Remote" && "◯"}
                  {filter === "Part-time" && "◯"}
                  {filter}
                </button>
              ))}
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700">
                {sortOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/job-details/${job.id}`)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{job.title}</h3>
                    <p className="text-gray-600 text-xs mb-1">{job.company}</p>
                    <p className="text-gray-700 font-semibold text-xs">{job.salary}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-xs">{job.location}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
                    {job.type}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
