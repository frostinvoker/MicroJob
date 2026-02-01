import { useState } from "react";
import { User, Lock, Briefcase, FileText, Upload, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type TabType = "personal" | "experience" | "resume" | "security";

interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Jonas",
    lastName: "Dela Cruz",
    city: "Manila",
    country: "Philippines",
    phone: "+63 912 345 6789",
    email: "jonas.delacruz@email.com",
    linkedin: "linkedin.com/in/jonasdelacruz",
    photo: null as File | null,
  });

  // Experience State
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      position: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      startDate: "2022-01",
      endDate: "2024-01",
      current: false,
      description: "Led development of React-based applications",
    },
  ]);

  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  // Security State
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Resume State
  const [resume, setResume] = useState<File | null>(null);

  // Personal Information Handlers
  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo({ ...personalInfo, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPersonalInfo({ ...personalInfo, photo: file });
      toast.success("Photo uploaded successfully!");
    }
  };

  const handleSavePersonalInfo = () => {
    toast.success("Personal information saved successfully!");
  };

  // Experience Handlers
  const handleAddExperience = () => {
    if (!newExperience.position || !newExperience.company || !newExperience.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const experience: Experience = {
      id: Date.now().toString(),
      ...newExperience,
    };

    setExperiences([...experiences, experience]);
    setNewExperience({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    toast.success("Experience added successfully!");
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
    toast.success("Experience deleted");
  };

  // Resume Handlers
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
      toast.success("Resume uploaded successfully!");
    }
  };

  const handleDeleteResume = () => {
    setResume(null);
    toast.success("Resume deleted");
  };

  // Security Handlers
  const handleChangePassword = () => {
    if (!securityData.currentPassword || !securityData.newPassword || !securityData.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    toast.success("Password changed successfully!");
    setSecurityData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="max-w-[1100px] mx-auto space-y-6">
      <h1 className="font-semibold text-[28px] text-[#1e293b]">Settings</h1>

      {/* Tabs */}
      <div className="bg-white rounded-[16px] border border-[#e2e8f0] shadow-sm">
        <div className="flex border-b border-[#e2e8f0]">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-2 px-6 py-4 text-[15px] font-medium transition-all ${
              activeTab === "personal"
                ? "text-[#2563eb] border-b-2 border-[#2563eb]"
                : "text-[#64748b] hover:text-[#1e293b]"
            }`}
          >
            <User className="w-4 h-4" />
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-6 py-4 text-[15px] font-medium transition-all ${
              activeTab === "experience"
                ? "text-[#2563eb] border-b-2 border-[#2563eb]"
                : "text-[#64748b] hover:text-[#1e293b]"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Experience
          </button>
          <button
            onClick={() => setActiveTab("resume")}
            className={`flex items-center gap-2 px-6 py-4 text-[15px] font-medium transition-all ${
              activeTab === "resume"
                ? "text-[#2563eb] border-b-2 border-[#2563eb]"
                : "text-[#64748b] hover:text-[#1e293b]"
            }`}
          >
            <FileText className="w-4 h-4" />
            CV/Resume
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-6 py-4 text-[15px] font-medium transition-all ${
              activeTab === "security"
                ? "text-[#2563eb] border-b-2 border-[#2563eb]"
                : "text-[#64748b] hover:text-[#1e293b]"
            }`}
          >
            <Lock className="w-4 h-4" />
            Security
          </button>
        </div>

        <div className="p-8">
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h2 className="text-[20px] font-semibold text-[#1e293b] mb-6">Basic details</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    First name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    City
                  </label>
                  <input
                    type="text"
                    value={personalInfo.city}
                    onChange={(e) => handlePersonalInfoChange("city", e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    Country
                  </label>
                  <input
                    type="text"
                    value={personalInfo.country}
                    onChange={(e) => handlePersonalInfoChange("country", e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                  LinkedIn
                </label>
                <input
                  type="text"
                  value={personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                  className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                  Profile Photo
                </label>
                <div className="flex items-center gap-4">
                  <label className="bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-[10px] hover:bg-[#1d4ed8] transition-all cursor-pointer flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload your photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[13px] text-[#64748b]">(jpg/png format)</span>
                </div>
              </div>

              <button
                onClick={handleSavePersonalInfo}
                className="bg-[#2563eb] text-white font-semibold px-8 py-3 rounded-[10px] hover:bg-[#1d4ed8] transition-all"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-6">
              <h2 className="text-[20px] font-semibold text-[#1e293b] mb-6">Experience</h2>

              {/* Existing Experiences */}
              {experiences.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-[16px] font-semibold text-[#1e293b]">Your Experience</h3>
                  {experiences.map((exp) => (
                    <div key={exp.id} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-[16px] font-semibold text-[#1e293b] mb-1">{exp.position}</h4>
                          <p className="text-[14px] text-[#64748b] mb-2">{exp.company}</p>
                          <p className="text-[13px] text-[#64748b] mb-2">
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </p>
                          {exp.description && (
                            <p className="text-[13px] text-[#475569] mt-2">{exp.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="text-[#ef4444] hover:bg-[#fee2e2] p-2 rounded-[8px] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Experience */}
              <div className="border-t border-[#e2e8f0] pt-6">
                <h3 className="text-[16px] font-semibold text-[#1e293b] mb-4">Add New Experience</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                      Job position
                    </label>
                    <input
                      type="text"
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                      Company name
                    </label>
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                      Start date
                    </label>
                    <input
                      type="month"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                      className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                      End date
                    </label>
                    <input
                      type="month"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                      disabled={newExperience.current}
                      className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all disabled:bg-[#f8fafc] disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newExperience.current}
                      onChange={(e) => setNewExperience({ ...newExperience, current: e.target.checked, endDate: e.target.checked ? "" : newExperience.endDate })}
                      className="w-4 h-4 rounded border-[#e2e8f0] text-[#2563eb] focus:ring-2 focus:ring-[#2563eb] cursor-pointer"
                    />
                    <span className="text-[14px] text-[#475569]">I currently work here</span>
                  </label>
                </div>

                <div className="mt-6">
                  <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                    Description (optional)
                  </label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    rows={4}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all resize-none"
                    placeholder="Describe your role and responsibilities..."
                  />
                </div>

                <button
                  onClick={handleAddExperience}
                  className="mt-6 bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-[10px] hover:bg-[#1d4ed8] transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
            </div>
          )}

          {/* CV/Resume Tab */}
          {activeTab === "resume" && (
            <div className="space-y-6">
              <h2 className="text-[20px] font-semibold text-[#1e293b] mb-6">CV/Resume</h2>

              {resume ? (
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[10px] bg-[#dbeafe] flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#2563eb]" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-semibold text-[#1e293b]">{resume.name}</h4>
                        <p className="text-[13px] text-[#64748b]">
                          {(resume.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleDeleteResume}
                      className="text-[#ef4444] hover:bg-[#fee2e2] p-2 rounded-[8px] transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#cbd5e1] rounded-[12px] p-12 text-center">
                  <FileText className="w-16 h-16 text-[#cbd5e1] mx-auto mb-4" />
                  <h3 className="text-[16px] font-semibold text-[#1e293b] mb-2">Upload Your Resume</h3>
                  <p className="text-[14px] text-[#64748b] mb-6">
                    PDF, DOC, or DOCX format (Max 5MB)
                  </p>
                  <label className="bg-[#2563eb] text-white font-semibold px-6 py-3 rounded-[10px] hover:bg-[#1d4ed8] transition-all cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Choose File
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[12px] p-4">
                <h4 className="text-[14px] font-semibold text-[#1e40af] mb-2">Tips for a great resume:</h4>
                <ul className="space-y-1 text-[13px] text-[#1e40af]">
                  <li>• Keep it concise (1-2 pages)</li>
                  <li>• Highlight your relevant skills and experience</li>
                  <li>• Use clear, professional formatting</li>
                  <li>• Include measurable achievements</li>
                </ul>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-[20px] font-semibold text-[#1e293b] mb-6">Change Password</h2>

              <div>
                <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 pr-12 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#64748b] hover:text-[#475569]"
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                    className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 pr-12 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#64748b] hover:text-[#475569]"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[14px] font-medium text-[#475569] mb-2 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={securityData.confirmPassword}
                  onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                  className="w-full bg-white border border-[#e2e8f0] rounded-[10px] px-4 py-3 text-[14px] text-[#1e293b] outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                />
              </div>

              <button
                onClick={handleChangePassword}
                className="bg-[#2563eb] text-white font-semibold px-8 py-3 rounded-[10px] hover:bg-[#1d4ed8] transition-all"
              >
                Update Password
              </button>

              <div className="bg-[#fef3c7] border border-[#fde68a] rounded-[12px] p-4 mt-6">
                <h4 className="text-[14px] font-semibold text-[#92400e] mb-2">Password Requirements:</h4>
                <ul className="space-y-1 text-[13px] text-[#92400e]">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Includes at least one number</li>
                  <li>• Has at least one special character</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
