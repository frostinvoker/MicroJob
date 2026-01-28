import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import passWord from "../assets/password1.png";
import passWord2 from "../assets/password2.png";

const CreateNewPass2: React.FC = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password checks
  const hasLength = newPassword.length >= 8;
  const hasUpperLower = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[@$!%*?&#]/.test(newPassword);
  const passwordsMatch = newPassword === confirmPassword;
  type StrengthLevel = 0 | 1 | 2 | 3 | 4;

  const strengthScore = (Number(hasLength) +
    Number(hasUpperLower) +
    Number(hasNumber) +
    Number(hasSpecial)) as StrengthLevel;

  const strengthMap: Record<StrengthLevel, { label: string; color: string }> = {
    0: { label: "Weak", color: "text-red-500" },
    1: { label: "Weak", color: "text-red-500" },
    2: { label: "Medium", color: "text-yellow-500" },
    3: { label: "Strong", color: "text-blue-500" },
    4: { label: "Very Strong", color: "text-green-600" },
  };

  const passwordStrength = strengthMap[strengthScore];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      hasLength &&
      hasUpperLower &&
      hasNumber &&
      hasSpecial &&
      passwordsMatch
    ) {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F2854] px-4">
      <div className="relative bg-white rounded-3xl shadow-2xl p-5 w-full max-w-md text-center flex flex-col items-center">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-[#0F2854] text-2xl"
        >
          ←
        </button>

        {/* Icon */}
        <img src={passWord} alt="Lock" className="w-16 h-16 mx-auto mb-4" />

        <h2 className="text-2xl font-bold mb-2">Create New Password</h2>
        <p className="text-gray-500 mb-6">
          Your new password must be different from previous ones
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* New Password */}
          <div className="relative">
            <img
              src={passWord2}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            />
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            ></button>
          </div>

          {/* Password Strength */}
          <div className="text-sm">
            <p className="mb-2 font-semibold">
              Password Strength{" "}
              <span
                className={`float-right font-semibold ${passwordStrength.color}`}
              >
                {passwordStrength.label}
              </span>
            </p>
            <ul className="space-y-1 text-gray-500">
              <li className={hasLength ? "text-green-600" : ""}>
                ✓ At least 8 characters
              </li>
              <li className={hasUpperLower ? "text-green-600" : ""}>
                ✓ Uppercase & lowercase letters
              </li>
              <li className={hasNumber ? "text-green-600" : ""}>
                ✓ At least one number
              </li>
              <li className={hasSpecial ? "text-green-600" : ""}>
                ✓ Special character (@#$%&*)
              </li>
            </ul>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <img
              src={passWord2}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className={`w-full pl-12 pr-12 py-3 rounded-xl bg-gray-100 focus:outline-none ${
                confirmPassword && !passwordsMatch
                  ? "border border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            ></button>
          </div>

          {!passwordsMatch && confirmPassword && (
            <p className="text-red-500 text-sm">Passwords do not match</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#0F2854] text-white font-bold py-3 rounded-xl mt-4"
          >
            Reset Password
          </button>
        </form>

        <button
          onClick={() => navigate("/signin")}
          className="text-blue-600 font-semibold mt-4"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default CreateNewPass2;
