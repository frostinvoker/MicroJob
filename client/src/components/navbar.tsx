import React from "react";
import bagIcon from "../assets/bagIcon.png"; 

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <img src={bagIcon} alt="Bag Icon" className="w-12 h-12"/>
            <h1 className="text-4xl font-bold text-blue-600">MicroJob</h1>
          </div>
          <p className="text-black text-sm">Professional Marketplace</p>
        </div>

        {/* Menu on the right */}
        <ul className="flex space-x-4">
          <li><a href="#" className="text-gray-700 hover:text-blue-600">Sign In</a></li>
          <li><a href="#" className="text-gray-700 hover:text-blue-600 bg-[#111827] text-white px-4 py-2 rounded-md">Get Started</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
