import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mailIcon from "../assets/mailIcon.png";
import  phonenumber from "../assets/phonenumber.png";
import Dashboard from "./Dashboard";

const ForgotPass1: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to next forgot-password step (OTP)
      navigate("/forgot-password-otp", { state: { email } });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F2854] px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center flex flex-col items-center ">
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-6 left-6 text-[#0F2854] hover:opacity-70 text-3xl"
        >
          ←
        </button>

        <img
          src={phonenumber}
          alt="Projects Completed"
          className="w-16 h-16 mb-4"
          jusrify-center
          item-center
        />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Phone Number
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your phone number
        </p>

        <form onSubmit={handleNext} className="space-y-6">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900 mb-2"
            >
              (+63)
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

          <button
            onClick={() => navigate("/verify-phone")}
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F2854] hover:to-blue-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : "Next"} <span>→</span>
          </button>
        </form>

        <button
          onClick={() => navigate("/signin")}
          className="text-blue-600 hover:text-blue-700 font-bold bg-none border-none cursor-pointer"
        >
          Back to Log In
        </button>
      </div>
    </div>
  );
};

export default ForgotPass1;