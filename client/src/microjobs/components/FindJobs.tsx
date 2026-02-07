import { useEffect, useState } from "react";
import { Heart, Clock, SlidersHorizontal, CheckCircle2, Star } from "lucide-react";
import { toast } from "../lib/toast";
import { useSearchParams } from "react-router-dom";

interface CompanyInfo {
  founded: string;
  location: string;
  verified: boolean;
  rating: number;
  spend: string;
  services: string[];
}

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  applicants: number;
  type: "Full-Time" | "Part-Time" | "Project Work";
  workMode: "Remote" | "Hybrid" | "On-site";
  experienceLevel: "Entry Level" | "Intermediate" | "Expert";
  description: string;
  responsibilities: string[];
  hourlyRate: number;
  postedDaysAgo: number;
  saved: boolean;
  category: string;
  companyInfo: CompanyInfo;
}

const defaultCompanyInfo: CompanyInfo = {
  founded: "January 6, 1997",
  location: "San Francisco, USA",
  verified: true,
  rating: 4.8,
  spend: "$65k + Spend",
  services: ["Web & App Design", "Backend", "FedRAMP", "Compliance", "Frontend", "Offensive Security"],
};

const buildCompanyInfo = (overrides?: Partial<CompanyInfo>): CompanyInfo => ({
  ...defaultCompanyInfo,
  ...overrides,
});

const defaultResponsibilities = [
  "We want you to have a deep understanding of the tools and services that are offered through our platform.",
  "Partner with cross-functional teams to deliver high-quality work on time and at scale.",
  "Bring curiosity and a problem-solving mindset to every stage of the project lifecycle.",
];

const jobsData: Job[] = [
  {
    id: "1",
    title: "Product designer",
    company: "MetaMask",
    companyLogo: "🔷",
    applicants: 25,
    type: "Full-Time",
    workMode: "Hybrid",
    experienceLevel: "Entry Level",
    description: "Doing the right thing for investors is what we're all about at Vanguard, and that in...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 250,
    postedDaysAgo: 12,
    saved: false,
    category: "Design",
    companyInfo: buildCompanyInfo({ location: "New York, USA" }),
  },
  {
    id: "2",
    title: "Sr. UX Designer",
    company: "Netflix",
    companyLogo: "N",
    applicants: 14,
    type: "Part-Time",
    workMode: "Remote",
    experienceLevel: "Expert",
    description: "Netflix is one of the world's leading streaming entertainment service with o...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 195,
    postedDaysAgo: 5,
    saved: false,
    category: "Design",
    companyInfo: buildCompanyInfo({ location: "Los Angeles, USA" }),
  },
  {
    id: "3",
    title: "Product designer",
    company: "Microsoft",
    companyLogo: "⊞",
    applicants: 58,
    type: "Full-Time",
    workMode: "Remote",
    experienceLevel: "Intermediate",
    description: "Welcome to Lightspeed LA, the first U.S.- based, AAA game development studio f...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 210,
    postedDaysAgo: 4,
    saved: false,
    category: "Design",
    companyInfo: buildCompanyInfo({ location: "Seattle, USA" }),
  },
  {
    id: "4",
    title: "Product designer",
    company: "Reddit",
    companyLogo: "🔴",
    applicants: 33,
    type: "Part-Time",
    workMode: "Hybrid",
    experienceLevel: "Expert",
    description: "Prelim is how banks onboard their customers for business checking accou...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 120,
    postedDaysAgo: 22,
    saved: false,
    category: "Design",
    companyInfo: buildCompanyInfo({ location: "San Francisco, USA" }),
  },
  {
    id: "5",
    title: "Backend Dev.",
    company: "Google",
    companyLogo: "G",
    applicants: 21,
    type: "Full-Time",
    workMode: "On-site",
    experienceLevel: "Intermediate",
    description: "Coalfire is on a mission to make the world a safer place by solving our client...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 260,
    postedDaysAgo: 5,
    saved: false,
    category: "Development",
    companyInfo: buildCompanyInfo({ location: "Mountain View, USA" }),
  },
  {
    id: "6",
    title: "SMM Manager",
    company: "Spotify",
    companyLogo: "🎵",
    applicants: 73,
    type: "Full-Time",
    workMode: "Hybrid",
    experienceLevel: "Intermediate",
    description: "Join us as we increase access to banking and financial services, helping banks on...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 170,
    postedDaysAgo: 8,
    saved: false,
    category: "Marketing",
    companyInfo: buildCompanyInfo({ location: "Stockholm, Sweden" }),
  },
  {
    id: "7",
    title: "Frontend Developer",
    company: "Meta",
    companyLogo: "M",
    applicants: 45,
    type: "Full-Time",
    workMode: "Hybrid",
    experienceLevel: "Intermediate",
    description: "Build the future of social technology and create immersive experiences...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 280,
    postedDaysAgo: 3,
    saved: false,
    category: "Development",
    companyInfo: buildCompanyInfo({ location: "Menlo Park, USA" }),
  },
  {
    id: "8",
    title: "UI/UX Designer",
    company: "Apple",
    companyLogo: "",
    applicants: 67,
    type: "Full-Time",
    workMode: "On-site",
    experienceLevel: "Expert",
    description: "Create innovative user experiences for millions of Apple users worldwide...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 320,
    postedDaysAgo: 6,
    saved: false,
    category: "Design",
    companyInfo: buildCompanyInfo({ location: "Cupertino, USA" }),
  },
  {
    id: "9",
    title: "DevOps Engineer",
    company: "Amazon",
    companyLogo: "a",
    applicants: 39,
    type: "Full-Time",
    workMode: "Remote",
    experienceLevel: "Expert",
    description: "Manage and optimize cloud infrastructure at scale for Amazon Web Services...",
    responsibilities: defaultResponsibilities,
    hourlyRate: 290,
    postedDaysAgo: 7,
    saved: false,
    category: "Development",
    companyInfo: buildCompanyInfo({ location: "Seattle, USA" }),
  },
];

export function FindJobs() {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const [jobs, setJobs] = useState<Job[]>(jobsData);
  const [sortBy, setSortBy] = useState<"recent" | "salary" | "applicants">("recent");
  const [selectedJobId, setSelectedJobId] = useState(jobsData[0]?.id ?? "");

  const sortLabels = {
    recent: "Most recent",
    salary: "Highest salary",
    applicants: "Most applicants",
  } as const;

  const handleSortChange = () => {
    setSortBy((prev) => (prev === "recent" ? "salary" : prev === "salary" ? "applicants" : "recent"));
  };

  const handleSaveJob = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
    const job = jobs.find(j => j.id === jobId);
    toast.success(job?.saved ? "Job removed from saved" : "Job saved!");
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
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const getWorkModeColor = (mode: Job["workMode"]) => {
    switch (mode) {
      case "Remote":
        return "bg-[#FEF3C7] text-[#92400E]";
      case "Hybrid":
        return "bg-[#EDE9FE] text-[#5B21B6]";
      case "On-site":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) {
      return true;
    }
    const combined = `${job.title} ${job.company} ${job.category}`.toLowerCase();
    return combined.includes(searchQuery);
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

  useEffect(() => {
    if (!sortedJobs.length) return;
    if (!sortedJobs.find((job) => job.id === selectedJobId)) {
      setSelectedJobId(sortedJobs[0].id);
    }
  }, [selectedJobId, sortedJobs]);

  const selectedJob = sortedJobs.find((job) => job.id === selectedJobId) ?? sortedJobs[0];

  return (
    <div className="max-w-[1341px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)_320px] gap-6">
        {/* Left Sidebar - Job List */}
        <aside className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#111827]">Find Jobs</h2>
            <button
              onClick={handleSortChange}
              className="flex items-center gap-2 px-3 py-2 border border-[#E5E7EB] rounded-[12px] bg-white hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#6B7280]" />
              <span className="text-[13px] text-[#111827]">{sortLabels[sortBy]}</span>
            </button>
          </div>

          <div className="space-y-4">
            {sortedJobs.map((job) => {
              const isActive = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedJobId(job.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedJobId(job.id);
                    }
                  }}
                  className={`bg-white rounded-[16px] border p-4 transition-all cursor-pointer ${
                    isActive ? "border-[#2563EB] shadow-[0_0_0_1px_#2563EB]" : "border-[#E5E7EB] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[12px] bg-[#F3F4F6] flex items-center justify-center text-[16px] font-semibold text-[#111827]">
                        {job.companyLogo || job.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[15px] text-[#111827]">{job.title}</h3>
                        <p className="text-[12px] text-[#9CA3AF]">
                          {job.company} • {job.applicants} Applicants
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSaveJob(job.id);
                      }}
                      className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${job.saved ? "fill-[#EF4444] text-[#EF4444]" : ""}`} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${getExperienceLevelColor(job.experienceLevel)}`}>
                      {job.experienceLevel}
                    </span>
                    <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${getJobTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                    <span className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${getWorkModeColor(job.workMode)}`}>
                      {job.workMode}
                    </span>
                  </div>

                  <p className="text-[13px] text-[#6B7280] leading-relaxed mt-3 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E5E7EB]">
                    <div>
                      <span className="text-[16px] font-semibold text-[#111827]">${job.hourlyRate}</span>
                      <span className="text-[12px] text-[#9CA3AF]">/hr</span>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-[#9CA3AF]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Posted {job.postedDaysAgo} days ago</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {sortedJobs.length === 0 && (
              <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 text-center text-[#6B7280]">
                No jobs found. Try another search.
              </div>
            )}
          </div>
        </aside>

        {/* Middle Content - Job Details */}
        <section className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 min-h-[640px]">
          {selectedJob ? (
            <div className="space-y-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-[26px] font-semibold text-[#111827]">{selectedJob.title}</h1>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className={`px-3 py-1 rounded-[8px] text-[12px] font-semibold ${getExperienceLevelColor(selectedJob.experienceLevel)}`}>
                      {selectedJob.experienceLevel}
                    </span>
                    <span className={`px-3 py-1 rounded-[8px] text-[12px] font-semibold ${getJobTypeColor(selectedJob.type)}`}>
                      {selectedJob.type}
                    </span>
                    <span className={`px-3 py-1 rounded-[8px] text-[12px] font-semibold ${getWorkModeColor(selectedJob.workMode)}`}>
                      {selectedJob.workMode}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleSaveJob(selectedJob.id)}
                  className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                >
                  <Heart className={`w-6 h-6 ${selectedJob.saved ? "fill-[#EF4444] text-[#EF4444]" : ""}`} />
                </button>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-[#111827] mb-3">About the role</h3>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">
                  {selectedJob.description} We are looking for someone who can own the experience end-to-end,
                  collaborate with the team, and ship work that delights users.
                </p>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-[#111827] mb-3">Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#6B7280]">
                  {selectedJob.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[#6B7280]">
              Select a job to view details.
            </div>
          )}
        </section>

        {/* Right Sidebar - Company Info */}
        <aside className="space-y-4">
          <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6">
            {selectedJob ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[12px] bg-[#F3F4F6] flex items-center justify-center text-[18px] font-semibold text-[#111827]">
                    {selectedJob.companyLogo || selectedJob.company.charAt(0)}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[16px] font-semibold text-[#111827]">{selectedJob.company}</h3>
                    {selectedJob.companyInfo.verified && <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />}
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-4">
                  <div>
                    <p className="text-[12px] text-[#94A3B8] uppercase tracking-wide">Founded</p>
                    <p className="text-[14px] text-[#111827]">{selectedJob.companyInfo.founded}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-[#94A3B8] uppercase tracking-wide">Location</p>
                    <p className="text-[14px] text-[#111827]">{selectedJob.companyInfo.location}</p>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4 space-y-3">
                  <h4 className="text-[14px] font-semibold text-[#111827]">Other Information</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.round(selectedJob.companyInfo.rating)
                            ? "text-[#FBBF24] fill-[#FBBF24]"
                            : "text-[#E5E7EB]"
                        }`}
                      />
                    ))}
                    <span className="text-[12px] text-[#6B7280] ml-2">
                      {selectedJob.companyInfo.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#6B7280]">Payment verified</p>
                  <div>
                    <p className="text-[14px] font-semibold text-[#111827]">{selectedJob.companyInfo.spend}</p>
                    <p className="text-[12px] text-[#6B7280]">Payment verified</p>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <h4 className="text-[14px] font-semibold text-[#111827] mb-3">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.companyInfo.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-[10px] bg-[#F3F4F6] text-[12px] text-[#475569]"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-[#6B7280] text-[14px]">Select a job to view company info.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
