import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const JobDetails: React.FC = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleApplyClick = () => {
    setShowApplyModal(true);
  };

  const handleApplySubmit = () => {
    alert("Application submitted!");
    setShowApplyModal(false);
    setResumeFile(null);
    setCoverLetter("");
  };

  const jobData = {
    id: jobId || "1",
    title: "Senior UX Designer",
    company: "at Facebook",
    badges: ["FULL-TIME", "FEATURED"],
    salary: "$100,000 - $150,000",
    salaryFreq: "Yearly salary",
    jobLocation: "Chiang, Bangladesh",
    jobLocationType: "Chiang, Bangladesh",
    jobPosted: "14 Jan, 2021",
    jobDeadline: "14 Aug, 2021",
    experienceLevel: "5+ Sharenom",
    educationLevel: "Graduation",
    description: `Vatetial is a Shopify Plus agency, and we partner with brands to help them grow, we also do the shopping cart part one! 

Here at Vatetial, we don't just make websites, we create exceptional digital experiences that consumers love. Our team of designers, developers, strategists, and analysts work together with a focus on data, UX & Digital Marketing. In here a proven track record of delivering ambitious web projects for our clients.

The role will involve translating project specifications into clean, well-written, easily maintainable code. You will collaborate with the Project and Development team as well as with the rest of the Product team to create new and improving existing code.

Want to work with us? You're in good company!`,
    requirements: [
      "5+ years understanding and analytical skills combined with the desire to tackle challenges",
      "3+ years of experience in back-end development working either with multiple smaller projects simultaneously or large-scale applications",
      "Working regularly with APIs and Web Services (REST, GraphQL, SOAP, etc)",
      "Have experience/awareness in Agile application development, continuous integration software, middleware, servers and storage, and database management",
      "Familiarity with version control and project management systems (i.e., GitHub, Jira)",
      "Ambitious and hungry to grow your career in a fast-growing agency",
    ],
    desirables: [
      "Working knowledge of eCommerce platforms, usually Shopify but also others e.g. Magento, BigCommerce, Visualsoft to enable seamless migrations",
      "Working knowledge of payment gateways",
      "API integrations with payment and shipping platforms",
    ],
    benefits: [
      "Early Fridays (finish at 4:30 every Friday during the UK working hours)",
      "28 days holiday (including bank holidays) (paid by 1 day per PLUS as an additional day off",
      "Generous annual bonus",
      "Healthcare package",
      "Paid community days to volunteer for a charity of your choice",
      "£500 contribution for your own personal learning and development",
      "Flexible working policies to suit your needs",
      "Access to Perkbox with numerous discounts plus free points from the company to spend as you wish",
      "Free fruit in the office to keep it healthy",
      "Brand new MacBook Pro",
      "Joining an agency on the cusp of exponential growth and being part of the exciting story",
    ],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar userName="Jonas" userEmail="jonas@example.com" balance="₱67.67" messageCount={2} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-64">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="text-blue-200 hover:text-white mb-4 flex items-center gap-2"
              >
                ← Back
              </button>
              <h1 className="text-4xl font-bold mb-2">{jobData.title}</h1>
              <p className="text-blue-100">{jobData.company}</p>
            </div>
            <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">🔖</button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-20">
          {/* Top Section with Badges and Apply Button */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8 flex items-start justify-between">
            <div className="flex gap-3">
              {jobData.badges.map((badge) => (
                <span
                  key={badge}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    badge === "FULL-TIME"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <button
              onClick={handleApplyClick}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
            >
              Apply Now →
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{jobData.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {jobData.requirements.map((req, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Desirables */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Desirables:</h2>
                <ul className="space-y-2">
                  {jobData.desirables.map((des, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{des}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                <ul className="space-y-2">
                  {jobData.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Share this job:</h3>
                <div className="flex gap-4">
                  <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                    🔗 Copy Links
                  </button>
                  <button className="text-blue-600 hover:text-blue-700">in</button>
                  <button className="text-blue-600 hover:text-blue-700">𝕏</button>
                  <button className="text-blue-600 hover:text-blue-700">f</button>
                  <button className="text-blue-600 hover:text-blue-700">✉️</button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Salary Info */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Salary (USD)</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{jobData.salary}</p>
                <p className="text-gray-600 text-sm">{jobData.salaryFreq}</p>
              </div>

              {/* Job Location */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Job Location</h3>
                <p className="text-gray-700">{jobData.jobLocation}</p>
              </div>

              {/* Job Overview */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm">📋 Posted In</p>
                    <p className="font-semibold text-gray-900">{jobData.jobPosted}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">📅 Deadline</p>
                    <p className="font-semibold text-gray-900">{jobData.jobDeadline}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">💼 Experience</p>
                    <p className="font-semibold text-gray-900">{jobData.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">🎓 Education</p>
                    <p className="font-semibold text-gray-900">{jobData.educationLevel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ml-64">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Apply Job: {jobData.title}</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Resume Upload */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-3">Choose resume</label>
              <div
                onClick={() => document.getElementById("resume-input")?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-gray-50 transition"
              >
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <p className="text-gray-600 font-semibold">
                  {resumeFile ? resumeFile.name : "Select pdf"}
                </p>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="mb-6">
              <label className="block text-gray-900 font-semibold mb-3">Cover letter</label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell us why you're interested in this position..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                rows={5}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleApplySubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Apply now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
