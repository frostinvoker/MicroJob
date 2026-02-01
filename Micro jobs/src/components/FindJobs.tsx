import { useState } from "react";
import { Heart, Clock, ChevronDown, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  applicants: number;
  type: "Full-Time" | "Part-Time" | "Remote" | "Project Work";
  experienceLevel: "Entry Level" | "Intermediate" | "Expert";
  description: string;
  hourlyRate: number;
  postedDaysAgo: number;
  saved: boolean;
  category: string;
}

const jobsData: Job[] = [
  {
    id: "1",
    title: "Product designer",
    company: "MetaMask",
    companyLogo: "🔷",
    applicants: 25,
    type: "Full-Time",
    experienceLevel: "Entry Level",
    description: "Doing the right thing for investors is what we're all about at Vanguard, and that in...",
    hourlyRate: 250,
    postedDaysAgo: 12,
    saved: false,
    category: "Design",
  },
  {
    id: "2",
    title: "Sr. UX Designer",
    company: "Netflix",
    companyLogo: "N",
    applicants: 14,
    type: "Part-Time",
    experienceLevel: "Expert",
    description: "Netflix is one of the world's leading streaming entertainment service with o...",
    hourlyRate: 195,
    postedDaysAgo: 5,
    saved: false,
    category: "Design",
  },
  {
    id: "3",
    title: "Product designer",
    company: "Microsoft",
    companyLogo: "⊞",
    applicants: 58,
    type: "Full-Time",
    experienceLevel: "Intermediate",
    description: "Welcome to Lightspeed LA, the first U.S.- based, AAA game development studio f...",
    hourlyRate: 210,
    postedDaysAgo: 4,
    saved: false,
    category: "Design",
  },
  {
    id: "4",
    title: "Product designer",
    company: "Reddit",
    companyLogo: "🔴",
    applicants: 33,
    type: "Part-Time",
    experienceLevel: "Expert",
    description: "Prelim is how banks onboard their customers for business checking accou...",
    hourlyRate: 120,
    postedDaysAgo: 22,
    saved: false,
    category: "Design",
  },
  {
    id: "5",
    title: "Backend Dev.",
    company: "Google",
    companyLogo: "G",
    applicants: 21,
    type: "Full-Time",
    experienceLevel: "Intermediate",
    description: "Coalfire is on a mission to make the world a safer place by solving our client...",
    hourlyRate: 260,
    postedDaysAgo: 5,
    saved: false,
    category: "Development",
  },
  {
    id: "6",
    title: "SMM Manager",
    company: "Spotify",
    companyLogo: "🎵",
    applicants: 73,
    type: "Full-Time",
    experienceLevel: "Intermediate",
    description: "Join us as we increase access to banking and financial services, helping banks on...",
    hourlyRate: 170,
    postedDaysAgo: 8,
    saved: false,
    category: "Marketing",
  },
  {
    id: "7",
    title: "Frontend Developer",
    company: "Meta",
    companyLogo: "M",
    applicants: 45,
    type: "Full-Time",
    experienceLevel: "Intermediate",
    description: "Build the future of social technology and create immersive experiences...",
    hourlyRate: 280,
    postedDaysAgo: 3,
    saved: false,
    category: "Development",
  },
  {
    id: "8",
    title: "UI/UX Designer",
    company: "Apple",
    companyLogo: "",
    applicants: 67,
    type: "Full-Time",
    experienceLevel: "Expert",
    description: "Create innovative user experiences for millions of Apple users worldwide...",
    hourlyRate: 320,
    postedDaysAgo: 6,
    saved: false,
    category: "Design",
  },
  {
    id: "9",
    title: "DevOps Engineer",
    company: "Amazon",
    companyLogo: "a",
    applicants: 39,
    type: "Remote",
    experienceLevel: "Expert",
    description: "Manage and optimize cloud infrastructure at scale for Amazon Web Services...",
    hourlyRate: 290,
    postedDaysAgo: 7,
    saved: false,
    category: "Development",
  },
];

export function FindJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [sortBy, setSortBy] = useState<"recent" | "salary" | "applicants">("recent");
  
  // Filter states
  const [jobTypeFilters, setJobTypeFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    projectWork: false,
    volunteering: false,
  });
  
  const [salaryRange, setSalaryRange] = useState([50, 120]);
  
  const [experienceLevelFilters, setExperienceLevelFilters] = useState({
    entryLevel: false,
    intermediate: false,
    expert: false,
  });

  const handleSaveJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
    const job = jobs.find(j => j.id === jobId);
    toast.success(job?.saved ? "Job removed from saved" : "Job saved!");
  };

  const handleViewJob = (jobId: string) => {
    navigate(`/job-details-new/${jobId}`);
  };

  const clearAllFilters = () => {
    setJobTypeFilters({
      fullTime: false,
      partTime: false,
      internship: false,
      projectWork: false,
      volunteering: false,
    });
    setExperienceLevelFilters({
      entryLevel: false,
      intermediate: false,
      expert: false,
    });
    setSalaryRange([50, 120]);
    toast.info("All filters cleared");
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case "Entry Level":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "Intermediate":
        return "bg-[#E9D5FF] text-[#7C3AED]";
      case "Expert":
        return "bg-[#FEE2E2] text-[#DC2626]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "Full-Time":
        return "bg-[#D1FAE5] text-[#065F46]";
      case "Part-Time":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "Remote":
        return "bg-[#FEF3C7] text-[#92400E]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    // Job type filter
    const jobTypeActive = Object.values(jobTypeFilters).some(v => v);
    if (jobTypeActive) {
      const typeMap = {
        fullTime: "Full-Time",
        partTime: "Part-Time",
        internship: "Internship",
        projectWork: "Project Work",
        volunteering: "Volunteering",
      };
      
      const matchesType = Object.entries(jobTypeFilters).some(([key, value]) => {
        return value && job.type === typeMap[key as keyof typeof typeMap];
      });
      
      if (!matchesType) return false;
    }

    // Experience level filter
    const experienceActive = Object.values(experienceLevelFilters).some(v => v);
    if (experienceActive) {
      const levelMap = {
        entryLevel: "Entry Level",
        intermediate: "Intermediate",
        expert: "Expert",
      };
      
      const matchesLevel = Object.entries(experienceLevelFilters).some(([key, value]) => {
        return value && job.experienceLevel === levelMap[key as keyof typeof levelMap];
      });
      
      if (!matchesLevel) return false;
    }

    // Salary range filter (hourly rate in thousands)
    const hourlyInThousands = job.hourlyRate / 1000;
    if (hourlyInThousands < salaryRange[0] || hourlyInThousands > salaryRange[1]) {
      return false;
    }

    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return a.postedDaysAgo - b.postedDaysAgo;
      case "salary":
        return b.hourlyRate - a.hourlyRate;
      case "applicants":
        return a.applicants - b.applicants;
      default:
        return 0;
    }
  });

  const experienceCounts = {
    entryLevel: jobs.filter(j => j.experienceLevel === "Entry Level").length,
    intermediate: jobs.filter(j => j.experienceLevel === "Intermediate").length,
    expert: jobs.filter(j => j.experienceLevel === "Expert").length,
  };

  return (
    <div className="max-w-[1341px] mx-auto">
      <div className="flex gap-6">
        {/* Left Sidebar - Filters */}
        <div className="w-[240px] shrink-0 space-y-6">
          {/* Job Type */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[16px] text-[#111827]">Job Type</h3>
              <button
                onClick={clearAllFilters}
                className="text-[12px] text-[#EF4444] hover:text-[#DC2626] font-medium"
              >
                Clear all
              </button>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={jobTypeFilters.fullTime}
                  onChange={(e) => setJobTypeFilters({ ...jobTypeFilters, fullTime: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                />
                <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Full time</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={jobTypeFilters.partTime}
                  onChange={(e) => setJobTypeFilters({ ...jobTypeFilters, partTime: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                />
                <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Part time</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={jobTypeFilters.internship}
                  onChange={(e) => setJobTypeFilters({ ...jobTypeFilters, internship: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                />
                <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Internship</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={jobTypeFilters.projectWork}
                  onChange={(e) => setJobTypeFilters({ ...jobTypeFilters, projectWork: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                />
                <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Project work</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={jobTypeFilters.volunteering}
                  onChange={(e) => setJobTypeFilters({ ...jobTypeFilters, volunteering: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                />
                <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Volunteering</span>
              </label>
            </div>
          </div>

          {/* Salary Range */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5">
            <h3 className="font-semibold text-[16px] text-[#111827] mb-4">Salary Range</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[14px] text-[#6B7280]">
                <span>${salaryRange[0]}k</span>
                <span>${salaryRange[1]}k</span>
              </div>
              <input
                type="range"
                min="50"
                max="120"
                step="10"
                value={salaryRange[1]}
                onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#1C4D8D]"
              />
            </div>
          </div>

          {/* Experience Level */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5">
            <h3 className="font-semibold text-[16px] text-[#111827] mb-4">Experience Level</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={experienceLevelFilters.entryLevel}
                    onChange={(e) => setExperienceLevelFilters({ ...experienceLevelFilters, entryLevel: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                  />
                  <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Entry level</span>
                </div>
                <span className="text-[13px] text-[#9CA3AF]">{experienceCounts.entryLevel}</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={experienceLevelFilters.intermediate}
                    onChange={(e) => setExperienceLevelFilters({ ...experienceLevelFilters, intermediate: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                  />
                  <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Intermediate</span>
                </div>
                <span className="text-[13px] text-[#9CA3AF]">{experienceCounts.intermediate}</span>
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={experienceLevelFilters.expert}
                    onChange={(e) => setExperienceLevelFilters({ ...experienceLevelFilters, expert: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-[#D1D5DB] text-[#1C4D8D] focus:ring-2 focus:ring-[#1C4D8D] cursor-pointer"
                  />
                  <span className="text-[14px] text-[#111827] group-hover:text-[#1C4D8D]">Expert</span>
                </div>
                <span className="text-[13px] text-[#9CA3AF]">{experienceCounts.expert}</span>
              </label>
            </div>
          </div>

          {/* Job Categories */}
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-5">
            <h3 className="font-semibold text-[16px] text-[#111827] mb-4">Job categories</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-[14px] text-[#6B7280] hover:text-[#1C4D8D] py-1">
                Design
              </button>
              <button className="w-full text-left text-[14px] text-[#6B7280] hover:text-[#1C4D8D] py-1">
                Development
              </button>
              <button className="w-full text-left text-[14px] text-[#6B7280] hover:text-[#1C4D8D] py-1">
                Marketing
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-[24px] font-semibold text-[#111827]">Recommended jobs</h1>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-[12px] bg-white hover:bg-gray-50 transition-colors">
                <SlidersHorizontal className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[14px] text-[#111827]">Most recent</span>
              </button>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-3 gap-4">
            {sortedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-[16px] border border-[#E5E7EB] p-5 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handleViewJob(job.id)}
              >
                {/* Company Logo & Save Button */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-[#4988C4] to-[#1C4D8D] flex items-center justify-center text-white text-[18px] font-bold">
                      {job.companyLogo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[16px] text-[#111827] group-hover:text-[#1C4D8D]">
                        {job.title}
                      </h3>
                      <p className="text-[12px] text-[#9CA3AF]">
                        {job.company} • {job.applicants} Applicants
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveJob(job.id);
                    }}
                    className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${job.saved ? "fill-[#EF4444] text-[#EF4444]" : ""}`} />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${getExperienceLevelColor(job.experienceLevel)}`}>
                    {job.experienceLevel}
                  </span>
                  <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  {job.type === "Remote" && (
                    <span className="px-2.5 py-1 rounded-[6px] text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E]">
                      Remote
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <div>
                    <span className="text-[18px] font-bold text-[#111827]">
                      ${job.hourlyRate}
                    </span>
                    <span className="text-[13px] text-[#9CA3AF]">/hr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#9CA3AF]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Posted {job.postedDaysAgo} days ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedJobs.length === 0 && (
            <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-8 h-8 text-[#9CA3AF]" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#111827] mb-2">No jobs found</h3>
              <p className="text-[14px] text-[#6B7280] mb-4">
                Try adjusting your filters to see more results
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-[#1C4D8D] text-white font-semibold px-6 py-3 rounded-[12px] hover:bg-[#0F2954] transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
