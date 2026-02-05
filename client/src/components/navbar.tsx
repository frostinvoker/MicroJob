import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/MicroIcon.png";

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
            <img src={logo} alt="MicroJob Logo" className="h-10 w-10" />
            <h1 className="text-4xl font-bold text-black">MicroJob</h1>
          </div>
          <p className="text-black text-sm">Professional Marketplace</p>
        </div>

        {/* Menu on the right */}
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-700 hover:text-[#1a4e7c] px-4 py-2 rounded-md cursor-pointer border-none transition-all duration-300 transform hover:scale-105 hover:bg-gray-100"
            >
              Sign In
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/signin")}
              className="text-gray-700 hover:text-blue-600 bg-[#2265A2] hover:bg-[#1a4e7c] text-white px-4 py-2 rounded-md cursor-pointer border-none transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
