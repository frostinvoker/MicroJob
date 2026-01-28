import React from "react";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-2">
            <img src={logo2} alt="Logo" className="w-12 h-12" />
            <h1 className="text-4xl font-bold text-[#0F2854]">MicroJob</h1>
          </div>
          <p className="text-black text-sm">Professional Marketplace</p>
        </div>

        {/* Menu on the right */}
        <ul className="flex items-center space-x-4">
          <li>
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signup")}
              className="text-gray-700 hover:text-white bg-[#0F2854] hover:bg-[#2265A2] text-white px-4 py-2 rounded-md cursor-pointer border-none"
            >
              Get Started
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
