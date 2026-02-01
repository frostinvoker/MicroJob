import { useState } from "react";
import { 
  Check,
  Bold,
  Italic,
  Underline,
  List,
  RotateCcw,
  Maximize2,
  X,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Responsibility {
  id: string;
  text: string;
}

export function JobPosting() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const [jobDescription, setJobDescription] = useState(
    "We are seeking a talented React Native Mobile Developer to join our dynamic and innovative development team. The ideal candidate will have a strong background in mobile application development, with a focus on building cross-platform applications using React Native. As a React Native Mobile Developer, you will collaborate with a..."
  );

  const [responsibilities, setResponsibilities] = useState<Responsibility[]>([
    { 
      id: "1", 
      text: "Innovation: Develop and test new IT solutions, products, and services through creative experimentation and prototyping." 
    },
    { 
      id: "2", 
      text: "Collaboration: Work closely with cross-functional teams providing technical expertise and insights." 
    },
    { 
      id: "3", 
      text: "Project Management: Manage R&D projects, ensuring they are completed on time and within budget." 
    }
  ]);

  const [skills, setSkills] = useState<string[]>([
    "Analytical Thinking",
    "Communication",
    "Data Analysis",
    "Project Management",
    "Innovation",
    "Organization"
  ]);

  const [newSkill, setNewSkill] = useState("");

  const steps = [
    { number: 1, label: "Job Details", completed: true },
    { number: 2, label: "Job Requirement", completed: false },
    { number: 3, label: "Hiring Stage", completed: false },
    { number: 4, label: "Score card", completed: false },
    { number: 5, label: "Application Form", completed: false },
  ];

  const addResponsibility = () => {
    const newId = String(responsibilities.length + 1);
    setResponsibilities([
      ...responsibilities,
      { id: newId, text: "" }
    ]);
  };

  const removeResponsibility = (id: string) => {
    setResponsibilities(responsibilities.filter(r => r.id !== id));
  };

  const updateResponsibility = (id: string, text: string) => {
    setResponsibilities(
      responsibilities.map(r => r.id === id ? { ...r, text } : r)
    );
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleGenerateAI = () => {
    toast.success("AI-generated job description added!");
  };

  const handleSave = () => {
    toast.success("Job posting saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-[14px] text-gray-600">Fill in the details to create a new job posting</p>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar - Steps */}
          <div className="w-[240px] flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.number}>
                    <button
                      onClick={() => setCurrentStep(step.number)}
                      className={`w-full flex items-center gap-3 text-left transition-colors ${
                        currentStep === step.number ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : currentStep === step.number
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {step.completed ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <span className="text-[13px] font-medium">{step.number}</span>
                        )}
                      </div>
                      <span className="text-[14px] font-medium">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className="ml-4 mt-2 mb-2 h-8 border-l-2 border-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Job Description Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-semibold text-gray-900">
                  Job Description and Responsibilities
                </h2>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] text-gray-700 mb-2">About the job</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Bold className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Italic className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Underline className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <List className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <RotateCcw className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Maximize2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  {/* Text Area */}
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full p-4 text-[14px] text-gray-700 leading-relaxed min-h-[120px] resize-none focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[13px] text-gray-700 mb-3">Responsibilities</label>
                <div className="space-y-3">
                  {responsibilities.map((responsibility) => (
                    <div key={responsibility.id} className="flex items-start gap-3">
                      <textarea
                        value={responsibility.text}
                        onChange={(e) => updateResponsibility(responsibility.id, e.target.value)}
                        placeholder="Enter responsibility..."
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                      <button
                        onClick={() => removeResponsibility(responsibility.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addResponsibility}
                  className="mt-3 text-[14px] text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  <span className="text-lg">+</span> Add Responsibilities
                </button>
              </div>
            </div>

            {/* Requirements and Skills Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-semibold text-gray-900">
                  Requirement and Skills
                </h2>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[13px] text-gray-700 mb-3">Skills</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-[13px] text-gray-700"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white text-[14px] font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[13px] text-gray-700 mb-2">Requirement</label>
                <textarea
                  placeholder="Enter job requirements..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[14px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 text-[14px] font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <div className="flex gap-3">
                <button
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 text-[14px] font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-blue-600 text-white text-[14px] font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI Assistant */}
          <div className="w-[320px] flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-gray-900 mb-1">
                    Generate your job description using AI
                  </h3>
                </div>
              </div>
              <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">
                Save your time creating job descriptions, choose certain keywords for your job and let AI arrange it afterwards.
              </p>
              <button
                onClick={handleGenerateAI}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-blue-200 text-blue-600 text-[14px] font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Generate
              </button>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-[15px] font-semibold text-gray-900 mb-3">Tips for a great job post</h3>
              <ul className="space-y-2 text-[13px] text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Be clear and specific about the role</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>List must-have vs nice-to-have skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Include salary range when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Mention company culture and benefits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
