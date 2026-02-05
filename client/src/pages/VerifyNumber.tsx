import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import phonenumber from "../assets/phonenumber.png";

const ForgotPass1: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

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
          onClick={() => navigate("/phone-number")}
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
          Verify Phone number
        </h2>
        <p className="text-gray-600 mb-1">We've sent a 6-digit code to</p>


        <form onSubmit={handleNext} className="space-y-6">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600 mb-1"
            >
              +(63) 9155440267h
            </label>
            <div className="flex justify-center gap-3 mt-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/signin")}
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F2854] hover:to-blue-700 disabled:opacity-70 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : "Next"} <span>→</span>
          </button>
        </form>

        <p>
          Didn't receive the code?
          <button
            onClick={() => navigate("/signin")}
            className="text-blue-600 hover:text-blue-700 font-bold bg-none border-none cursor-pointer"
          >
            Resend Code (0:30)
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPass1;