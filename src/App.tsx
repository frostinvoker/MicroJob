import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/Dashboard";
import ForgotPass1 from "./pages/ForgotPass1";
import { Verify } from "crypto";
import VerifyEmail from "./pages/VerifyEmail";
import CreateNewPass from "./pages/CreateNewPass";
import CreateNewPass2 from "./pages/CreateNewPass2";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPass1 />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/confirm-password" element={<CreateNewPass />} />
        <Route path="/confirm-password2" element={<CreateNewPass2 />} />
      </Routes>
    </Router>
  );
};

export default App;
