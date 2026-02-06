import React, { useState } from "react";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    phoneNumber: "",
    email: "",
    linkedin: "",
    profilePhoto: null as File | null,
  });

  const [experience, setExperience] = useState({
    jobPosition: "",
    companyName: "",
    startDate: "",
    endDate: "",
    logo: null as File | null,
  });

  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: e.target.files?.[0] || null,
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience((prev) => ({
      ...prev,
      logo: e.target.files?.[0] || null,
    }));
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvFile(e.target.files?.[0] || null);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute top-5 right-32 text-4xl">✦ ✦ ✦</div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-blue-100">Manage your profile and account settings</p>
          </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-20">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("personal")}
                className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                  activeTab === "personal"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                  activeTab === "experience"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab("cv")}
                className={`flex-1 py-4 px-6 text-center font-semibold transition ${
                  activeTab === "cv"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                CV/Resume
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Personal Information Tab */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic details</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">First name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Enter your country"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="Enter your LinkedIn profile URL"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={() => document.getElementById("photo-input")?.click()}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
                    >
                      ➕ Upload your photo
                    </button>
                    <input
                      id="photo-input"
                      type="file"
                      accept=".jpg,.png,.jpeg"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <span className="text-gray-600 text-sm">(jpg/png format)</span>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Job position</label>
                      <input
                        type="text"
                        name="jobPosition"
                        value={experience.jobPosition}
                        onChange={handleExperienceChange}
                        placeholder="Enter job position"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Company name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={experience.companyName}
                        onChange={handleExperienceChange}
                        placeholder="Enter company name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Start date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={experience.startDate}
                        onChange={handleExperienceChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">End date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={experience.endDate}
                        onChange={handleExperienceChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-8 pt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => document.getElementById("logo-input")?.click()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
                      >
                        ➕ Upload your logo
                      </button>
                      <input
                        id="logo-input"
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <span className="text-gray-600 text-sm">(jpg/png format/ optional)</span>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                      Add Experience
                    </button>
                  </div>
                </div>
              )}

              {/* CV/Resume Tab */}
              {activeTab === "cv" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">CV/Resume</h2>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Upload your CV/Resume</label>
                    <div
                      onClick={() => document.getElementById("cv-input")?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                    >
                      <input
                        id="cv-input"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCvUpload}
                        className="hidden"
                      />
                      <p className="text-gray-600 font-semibold">
                        {cvFile ? cvFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-gray-500 text-sm mt-2">PDF, DOC, or DOCX (max. 5MB)</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                      Save CV/Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
