import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/Dashboard";
import PhoneVerification from "./pages/phoneVerification";
import FindJobs from "./pages/FindJobs";
import JobDetails from "./pages/JobDetails";
import Settings from "./pages/Settings";
// Worker pages
import { AppliedJobs, SavedJobs } from "./pages/worker";
// Employer pages
import { PostJob } from "./pages/employer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Shared Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/job-details/:jobId" element={<JobDetails />} />
        <Route path="/settings" element={<Settings />} />

        {/* Worker Routes */}
        <Route path="/worker/applied-jobs" element={<AppliedJobs />} />
        <Route path="/worker/saved-jobs" element={<SavedJobs />} />

        {/* Employer Routes */}
        <Route path="/employer/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
};

export default App;
