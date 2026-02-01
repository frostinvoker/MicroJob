import { useState } from "react";
import { Search, Filter, Calendar, FileText, User as UserIcon, Mail, ExternalLink } from "lucide-react";
import { toast } from "sonner";

type ApplicationStatus = "all" | "under-review" | "pending" | "reviewing" | "interviewed" | "accepted" | "rejected";

interface Application {
  id: string;
  name: string;
  email: string;
  position: string;
  company: string;
  coverLetter: string;
  appliedDate: string;
  status: Exclude<ApplicationStatus, "all">;
}

const mockApplications: Application[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    position: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    coverLetter: "I am excited to apply for the Senior Frontend Developer position. With over 6 years of experience in React and TypeScript, I have led multiple successful projects at top tech companies. I am passionate about creating accessible, performant user interfaces.",
    appliedDate: "about 1 year ago",
    status: "under-review",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    position: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    coverLetter: "As a frontend developer with expertise in modern JavaScript frameworks, I am eager to contribute to TechCorp's innovative projects. My background includes building design systems and component libraries.",
    appliedDate: "about 1 year ago",
    status: "pending",
  },
  {
    id: "3",
    name: "Jonas Enriquez",
    email: "enriquezjonas@gmail.com",
    position: "Backend Engineer",
    company: "CloudScale",
    coverLetter: "I am a backend engineer with 5 years of experience building scalable distributed systems. I have extensive experience with Node.js, Python, and cloud infrastructure.",
    appliedDate: "2 months ago",
    status: "accepted",
  },
  {
    id: "4",
    name: "Emily Watson",
    email: "e.watson@example.com",
    position: "Full Stack Developer",
    company: "StartupXYZ",
    coverLetter: "Full stack developer passionate about building end-to-end solutions. Experienced in React, Node.js, and PostgreSQL with a focus on clean code and scalable architecture.",
    appliedDate: "3 weeks ago",
    status: "interviewed",
  },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-[#93C5FD]",
    "bg-[#A5B4FC]",
    "bg-[#C4B5FD]",
    "bg-[#F9A8D4]",
    "bg-[#FCA5A5]",
    "bg-[#FDBA74]",
    "bg-[#FCD34D]",
    "bg-[#BEF264]",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

interface StatusBadgeProps {
  status: Exclude<ApplicationStatus, "all">;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "under-review":
        return {
          bg: "bg-[#DBEAFE]",
          text: "text-[#1E40AF]",
          label: "Under Review",
        };
      case "pending":
        return {
          bg: "bg-[#E0E7FF]",
          text: "text-[#5B21B6]",
          label: "Pending Review",
        };
      case "reviewing":
        return {
          bg: "bg-[#FEF3C7]",
          text: "text-[#92400E]",
          label: "Reviewing",
        };
      case "interviewed":
        return {
          bg: "bg-[#DBEAFE]",
          text: "text-[#1E40AF]",
          label: "Interviewed",
        };
      case "accepted":
        return {
          bg: "bg-[#D1FAE5]",
          text: "text-[#065F46]",
          label: "Accepted",
        };
      case "rejected":
        return {
          bg: "bg-[#FEE2E2]",
          text: "text-[#991B1B]",
          label: "Rejected",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span className={`${styles.bg} ${styles.text} px-3 py-1 rounded-full text-[12px] font-medium`}>
      {styles.label}
    </span>
  );
}

interface ApplicationCardProps {
  application: Application;
  onStatusChange: (id: string, status: Exclude<ApplicationStatus, "all">) => void;
}

function ApplicationCard({ application, onStatusChange }: ApplicationCardProps) {
  const initials = getInitials(application.name);
  const avatarColor = getAvatarColor(application.name);

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`${avatarColor} rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0`}>
          <span className="text-[#1F2937] font-semibold text-[16px]">{initials}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-semibold text-[16px] text-[#111827]">{application.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[14px] text-[#6B7280]">{application.email}</span>
              </div>
            </div>
            <StatusBadge status={application.status} />
          </div>

          {/* Position */}
          <p className="text-[14px] text-[#4B5563] mb-3">
            Applied for: <span className="font-semibold text-[#111827]">{application.position}</span> at {application.company}
          </p>

          {/* Cover Letter */}
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">
            {application.coverLetter}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#6B7280] text-[14px]">
                <Calendar className="w-4 h-4" />
                <span>{application.appliedDate}</span>
              </div>
              <button className="flex items-center gap-1 text-[#2563EB] text-[14px] font-medium hover:text-[#1D4ED8] transition-colors">
                <FileText className="w-4 h-4" />
                Resume
                <ExternalLink className="w-3 h-3" />
              </button>
              <button className="flex items-center gap-1 text-[#2563EB] text-[14px] font-medium hover:text-[#1D4ED8] transition-colors">
                <UserIcon className="w-4 h-4" />
                View Profile
              </button>
            </div>

            {/* Status Dropdown */}
            <select
              value={application.status}
              onChange={(e) => onStatusChange(application.id, e.target.value as Exclude<ApplicationStatus, "all">)}
              className="px-4 py-2 border border-[#D1D5DB] rounded-lg text-[14px] text-[#374151] bg-white hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            >
              <option value="under-review">Under Review</option>
              <option value="pending">Pending Review</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewed">Interviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ApplicationsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>("all");
  const [jobFilter, setJobFilter] = useState("all");
  const [applications, setApplications] = useState<Application[]>(mockApplications);

  const handleStatusChange = (id: string, newStatus: Exclude<ApplicationStatus, "all">) => {
    const oldStatus = applications.find(app => app.id === id)?.status;
    
    setApplications((apps) =>
      apps.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );

    const statusLabels: Record<Exclude<ApplicationStatus, "all">, string> = {
      "under-review": "Under Review",
      "pending": "Pending Review",
      "reviewing": "Reviewing",
      "interviewed": "Interviewed",
      "accepted": "Accepted",
      "rejected": "Rejected",
    };

    toast.success(`Application marked as ${statusLabels[newStatus].toLowerCase()}`, {
      description: "Candidate status has been updated.",
    });
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#D1D5DB] rounded-lg pl-12 pr-4 py-2.5 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[180px]">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus)}
              className="w-full bg-white border border-[#D1D5DB] rounded-lg pl-10 pr-10 py-2.5 text-[14px] text-[#111827] outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="under-review">Under Review</option>
              <option value="pending">Pending Review</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewed">Interviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Job Filter */}
          <div className="relative min-w-[180px]">
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 pr-10 py-2.5 text-[14px] text-[#111827] outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="all">All Jobs</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Engineer</option>
              <option value="fullstack">Full Stack Developer</option>
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-12 text-center">
            <p className="text-[#6B7280] text-[16px]">No applications found</p>
            <p className="text-[#9CA3AF] text-[14px] mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
