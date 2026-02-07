import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/layout/SidebarLayout";
import AdminSidebarLayout from "./components/layout/AdminSidebarLayout";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/Dashboard";
import PhoneVerification from "./pages/phoneVerification";
import FindJobs from "./pages/FindJobs";
import JobDetails from "./pages/JobDetails";
import Settings from "./pages/Settings";
import EWallet from "./pages/EWallet";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobPostingMonitoring from "./pages/admin/JobPostingMonitoring";
import EWalletMonitoring from "./pages/admin/EWalletMonitoring";
import Users from "./pages/admin/Users";
import Administrator from "./pages/admin/Administrator";
import SystemAdmin from "./pages/admin/SystemAdmin";
// Worker pages
import { AppliedJobs, SavedJobs } from "./pages/worker";
// Employer pages
import { PostJob, Applications, JobPosts } from "./pages/employer";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/phone-verification" element={<PhoneVerification />} />

        {/* Routes with Sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/job-details/:jobId" element={<JobDetails />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/e-wallet" element={<EWallet />} />

          {/* Worker Routes */}
          <Route path="/worker/applied-jobs" element={<AppliedJobs />} />
          <Route path="/worker/saved-jobs" element={<SavedJobs />} />

          {/* Employer Routes */}
          <Route path="/employer/post-job" element={<PostJob />} />
          <Route path="/employer/applications" element={<Applications />} />
          <Route path="/employer/job-posts" element={<JobPosts />} />
        </Route>

        {/* Admin Routes with Sidebar */}
        <Route element={<AdminSidebarLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/job-posting-monitoring" element={<JobPostingMonitoring />} />
          <Route path="/admin/e-wallet-monitoring" element={<EWalletMonitoring />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/administrator" element={<Administrator />} />
          <Route path="/admin/system-admin" element={<SystemAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
