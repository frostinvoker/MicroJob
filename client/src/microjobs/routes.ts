import { createBrowserRouter } from "react-router-dom";
import { ProtectedDashboardLayout } from "./components/ProtectedDashboardLayout";
import { ApplicationsManagement } from "./components/ApplicationsManagement";
import { Dashboard } from "./components/Dashboard";
import { EmployerDashboard } from "./components/EmployerDashboard";
import { Messages } from "./components/Messages";
import { EWallet } from "./components/EWallet";
import { SavedJobs } from "./components/SavedJobs";
import { FindJobs } from "./components/FindJobs";
import { JobDetails } from "./components/JobDetails";
import { JobDetailsNew } from "./components/JobDetailsNew";
import { JobsManagement } from "./components/JobsManagement";
import { AppliedJobs } from "./components/AppliedJobs";
import { LandingPage } from "./components/LandingPage";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";
import { Settings } from "./components/Settings";
import { Profile } from "./components/Profile";
import { ProfileNew } from "./components/ProfileNew";
import { JobPosting } from "./components/JobPosting";
import { Notifications } from "./components/Notifications";
import { Support } from "./components/Support";
import { AdminDashboard } from "./components/AdminDashboard";
import { ComingSoon } from "./components/ComingSoon";
import { LogoShowcase } from "./components/LogoShowcase";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { CookiePolicy } from "./components/CookiePolicy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/logo-showcase",
    Component: LogoShowcase,
  },
  {
    path: "/sign-in",
    Component: SignIn,
  },
  {
    path: "/sign-up",
    Component: SignUp,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/terms",
    Component: TermsAndConditions,
  },
  {
    path: "/privacy",
    Component: PrivacyPolicy,
  },
  {
    path: "/cookie-policy",
    Component: CookiePolicy,
  },
  {
    path: "/dashboard",
    Component: ProtectedDashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { 
        path: "employer",
        children: [
          { index: true, Component: EmployerDashboard },
          { path: "applications", Component: ApplicationsManagement },
          { path: "jobs", Component: JobsManagement },
        ]
      },
      { 
        path: "profile", 
        Component: Profile
      },
      { 
        path: "profile-new", 
        Component: ProfileNew
      },
      { 
        path: "employer/post-job", 
        Component: JobPosting
      },
      { 
        path: "find-jobs", 
        Component: FindJobs
      },
      {
        path: "job-details/:jobId",
        Component: JobDetails
      },
      {
        path: "job-details-new/:jobId",
        Component: JobDetailsNew
      },
      {
        path: "applied-jobs",
        Component: AppliedJobs
      },
      { 
        path: "messages", 
        Component: Messages
      },
      { 
        path: "saved-jobs", 
        Component: SavedJobs
      },
      { 
        path: "e-wallet", 
        Component: EWallet
      },
      { 
        path: "notifications", 
        Component: Notifications
      },
      { 
        path: "settings", 
        Component: Settings
      },
      { 
        path: "support", 
        Component: Support
      },
      { 
        path: "admin-dashboard", 
        Component: AdminDashboard
      },
    ],
  },
]);
