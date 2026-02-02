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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/job-details/:jobId" element={<JobDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
