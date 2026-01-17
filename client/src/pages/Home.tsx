import React from "react";
import starIcon from "../assets/star.png";
import Navbar from "../components/navbar";
import peopleIcon from "../assets/peopleIcon.png";
import moneyIcon from "../assets/moneyIcon.png";
import orangeBag from "../assets/orangebagIcon.png";
import analyticsIcon from "../assets/analyticsIcon.png";
import codeIcon from "../assets/codeIcon.png";
import artIcon from "../assets/artIcon.png";
import penIcon from "../assets/penIcon.png";
import videoIcon from "../assets/videoIcon.png";
import musicIcon from "../assets/musicIcon.png";
import baggyIcon from "../assets/baggyIcon.png";
import camIcon from "../assets/camIcon.png";
import wrenchIcon from "../assets/wrenchIcon.png";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16 px-4">
        {/* Rating Badge */}
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 mb-6 shadow-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <img src={starIcon} alt="Star" className="w-15 h-5"/>
          </div>
          <span className="ml-3 text-gray-700 text-sm">
            | Trusted by 10,000+ users worldwide
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Find the perfect{" "} <br></br>
          <span className="bg-gradient-to-b from-sky-400 to-indigo-600 bg-clip-text text-transparent">freelance services</span>{" "} <br></br>
          for your business
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl text-center mb-8">
          Work with talented freelancers from around the world. Post your project and get competitive proposals within minutes.
        </p>

        <form className="w-full lg:max-w-3xl mx-auto px-10">
          <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 pl-12 bg-white border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 shadow-sm placeholder:text-gray-500" placeholder="Try 'logo design' or 'web development'" required />
            <button type="button" className="absolute right-2 bottom-2.5 text-white bg-gray-900 hover:bg-black focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2 focus:outline-none flex items-center gap-2">Search <span>→</span></button>
          </div>
        </form>

        {/* Popular Categories & Stats Section */}
        <div className="w-full mt-16">
          <div className="max-w-6xl mx-auto">
            {/* Popular Categories */}
            <div className="mb-12">
              <p className="text-gray-600 text-center mb-4">Popular:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-gray-300 transition">Website Design</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-gray-300 transition">Logo Design</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-gray-300 transition">WordPress</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-gray-300 transition">AI Services</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 text-sm hover:border-gray-300 transition">Video Editing</button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div className="flex flex-col items-center text-center">
                <img src={peopleIcon} alt="Active Freelancers" className="w-16 h-16 mb-4" />
                <p className="text-2xl font-bold text-gray-900 mb-1">50K+</p>
                <p className="text-gray-600 text-sm">Active Freelancers</p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center text-center">
                <img src={moneyIcon} alt="Paid to Freelancers" className="w-16 h-16 mb-4" />
                <p className="text-2xl font-bold text-gray-900 mb-1">$2M+</p>
                <p className="text-gray-600 text-sm">Paid to Freelancers</p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center text-center">
                <img src={analyticsIcon} alt="Client Satisfaction" className="w-16 h-16 mb-4" />
                <p className="text-2xl font-bold text-gray-900 mb-1">98%</p>
                <p className="text-gray-600 text-sm">Client Satisfaction</p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center text-center">
                <img src={orangeBag} alt="Projects Completed" className="w-16 h-16 mb-4" />
                <p className="text-2xl font-bold text-gray-900 mb-1">15K+</p>
                <p className="text-gray-600 text-sm">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Explore by Category Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Explore by category</h2>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto mb-12">Get work done in over 8 different categories</p>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Programming & Tech */}
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={codeIcon} alt="Programming & Tech" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Programming & Tech</h3>
              <p className="text-gray-600 text-sm">1,523 services</p>
            </div>

            {/* Graphics & Design */}
            <div className="bg-pink-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={artIcon} alt="Graphics & Design" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Graphics & Design</h3>
              <p className="text-gray-600 text-sm">2,341 services</p>
            </div>

            {/* Writing & Translation */}
            <div className="bg-green-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={penIcon} alt="Writing & Translation" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Writing & Translation</h3>
              <p className="text-gray-600 text-sm">892 services</p>
            </div>

            {/* Video & Animation */}
            <div className="bg-orange-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={videoIcon} alt="Video & Animation" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Video & Animation</h3>
              <p className="text-gray-600 text-sm">1,056 services</p>
            </div>

            {/* Music & Audio */}
            <div className="bg-yellow-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={musicIcon} alt="Music & Audio" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Music & Audio</h3>
              <p className="text-gray-600 text-sm">634 services</p>
            </div>

            {/* Business Services */}
            <div className="bg-cyan-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={baggyIcon} alt="Business Services" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Services</h3>
              <p className="text-gray-600 text-sm">1,789 services</p>
            </div>

            {/* Photography */}
            <div className="bg-red-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={camIcon} alt="Photography" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Photography</h3>
              <p className="text-gray-600 text-sm">445 services</p>
            </div>

            {/* Home Services */}
            <div className="bg-amber-50 p-6 rounded-lg hover:shadow-md transition cursor-pointer">
              <img src={wrenchIcon} alt="Home Services" className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Home Services</h3>
              <p className="text-gray-600 text-sm">2,112 services</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
