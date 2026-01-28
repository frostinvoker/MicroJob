import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import lockIcon from "../assets/lockIcon.png";
import mailIcon from "../assets/mailIcon.png";
import shieilddIcon from "../assets/shielddIcon.png";
import peopleTransparent from "../assets/peopletransIcon.png";
import bagtransIcon from "../assets/bagtransIcon.png";
import peopletrans from "../assets/peopletransIcon1.png";
import { registerUser } from "../api/auth";
import check from "../assets/check.png";
import lock from "../assets/lock.png";
import star1 from "../assets/star1.png";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("both");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        username: fullName.trim(),
        email: email.trim(),
        password,
      });
      setSuccess("Account created! You can now sign in.");
      setTimeout(() => navigate("/signin"), 500);
    } catch (err: any) {
      setError(err?.message || "Unable to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F2854] flex items-center justify-center px-4">
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .form-animate {
          animation: slideInRight 0.5s ease-out;
        }
      `}</style>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding & Features */}
        <div className="text-white order-2 lg:order-1">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center justify-center">
              <img src={logo2} alt="logo" className="w-17 h-16" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Micro - Jobs</h1>
              <p className="text-white text-2xl">Professional Marketplace</p>
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Connect with Top Talent
            <br></br>& Amazing Opportunities
          </h2>

          {/* Description */}
          <p className="text-blue-100 text-lg mb-12">
            Join thousands of professionals growing their careers and businesses
            on our platform.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-blue-400 bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-300">
                <img src={check} alt="Verified" className="w-14 h-14" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  Verified Professionals
                </h3>
                <p className="text-blue-200">
                  All users are background-checked
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-blue-400 bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-300">
                <img src={lock} alt="lock" className="w-14 h-14" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Secure Payments</h3>
                <p className="text-blue-200">Protected with escrow system</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-blue-400 bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-300">
                <img src={star1} alt="star" className="w-14 h-14" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Rated 4.9/5</h3>
                <p className="text-blue-200">By 10,000+ satisfied users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 order-1 lg:order-2 form-animate">
          <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Get Started
          </h3>
          <p className="text-gray-600 mb-8 text-center">
            Create your account today
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  👤
                </span>
                <input
                  type="text"
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <img
                  src={mailIcon}
                  alt="Mail Icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <img
                  src={lockIcon}
                  alt="Lock Icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <img
                    src={lockIcon}
                    alt="Lock Icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  />
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* I want to section */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                I want to:
              </label>

              <div className="grid grid-cols-3 gap-4">
                {/* Hire */}
                <button
                  type="button"
                  onClick={() => setUserType("hire")}
                  className={`rounded-2xl border-2 p-5 flex flex-col items-center justify-center gap-2 transition
        ${
          userType === "hire"
            ? "border-[#0F2854] bg-blue-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
                >
                  <img src={bagtransIcon} alt="Hire" className="w-8 h-8" />
                  <span className="font-semibold text-gray-800">Hire</span>
                </button>

                {/* Work */}
                <button
                  type="button"
                  onClick={() => setUserType("work")}
                  className={`rounded-2xl border-2 p-5 flex flex-col items-center justify-center gap-2 transition
        ${
          userType === "work"
            ? "border-[#0F2854] bg-blue-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
                >
                  <img src={peopleTransparent} alt="Work" className="w-8 h-8" />
                  <span className="font-semibold text-gray-800">Work</span>
                </button>

                {/* Both */}
                <button
                  type="button"
                  onClick={() => setUserType("both")}
                  className={`rounded-2xl border-2 p-5 flex flex-col items-center justify-center gap-2 transition
        ${
          userType === "both"
            ? "border-[#0F2854] bg-blue-50 shadow-sm"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
                >
                  <img src={peopletrans} alt="Both" className="w-8 h-8" />
                  <span className="font-semibold text-gray-800">Both</span>
                </button>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F2854] hover:from-blue-600 hover:bg-[#2265A2] disabled:opacity-70 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 mt-8"
            >
              {loading ? "Creating..." : "Create Account"} <span>→</span>
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 hover:text-blue-700 font-bold bg-none border-none cursor-pointer"
            >
              Sign In
            </button>
          </p>

          {/* Security Message */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-xs">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </a>
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-green-600">
              <img src={shieilddIcon} alt="Shield Icon" className="w-5 h-5" />
              <p className="text-xs">
                Your information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
