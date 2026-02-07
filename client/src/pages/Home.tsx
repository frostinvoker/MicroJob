import React from "react";
import { useNavigate } from "react-router-dom";
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
import peopleNumberIcon from "../assets/peoplenumIcon.png";
import docuIcon from "../assets/docuIcon.png";
import energyIcon from "../assets/energyIcon.png";
import shieldIcon from "../assets/shieldIcon.png";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="page-transition">
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
          Connect with Your{" "} <br></br>
          <span className="bg-gradient-to-b from-sky-400 to-indigo-600 bg-clip-text text-transparent">Community's Skilled Workers</span>{" "} <br></br>
          for Micro-Jobs
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl text-center mb-8">
          Join our community marketplace to post micro-jobs, connect with skilled workers, and manage payments securely with our integrated e-wallet system.
        </p>

        <form className="w-full lg:max-w-3xl mx-auto px-10">
          <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 pl-12 bg-white border border-gray-200 text-gray-900 text-base rounded-xl focus:ring-2 focus:ring-gray-800 focus:border-gray-800 shadow-sm placeholder:text-gray-500" placeholder="Try 'Vacumm Cleaner'" required />
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
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Explore Micro-Job Categories</h2>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto mb-12">Find the perfect micro-job across 8+ categories in your community</p>
          
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

      {/* how it works part */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">How Our Community Marketplace Works</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12 text-center">Post jobs, connect with workers, and pay securely in 4 simple steps</p>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition text-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-25 h-25   items-center justify-center">
                  <img src={docuIcon} alt="Post Your Job" className="w-15 h-15" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Post Your Job</h3>
              <p className="text-gray-600 text-sm">Describe your project needs and budget. Get matched with qualified professionals.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition text-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20  flex items-center justify-center">
                  <img src={peopleNumberIcon} alt="Review Proposals" className="w-15 h-15" />
                </div>
                
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Review Proposals</h3>
              <p className="text-gray-600 text-sm">Receive proposals from talented freelancers. Compare profiles, portfolios, and rates.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8  hover:shadow-lg transition text-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20  flex items-center justify-center">
                  <img src={energyIcon} alt="Hire & Collaborate" className="w-15 h-15" />
                </div>
                
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Hire & Collaborate</h3>
              <p className="text-gray-600 text-sm">Choose the perfect freelancer and start working together with built-in tools.</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-2xl hover:shadow-lg transition text-center">
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20 b flex items-center justify-center">
                  <img src={shieldIcon} alt="Pay Securely" className="w-15 h-15" />
                </div>
                
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Pay Securely with E-Wallet</h3>
              <p className="text-gray-600 text-sm">Release payments safely using our integrated e-wallet system. Rate and review when complete.</p>
            </div>
          </div>
        </div>
        
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Loved by professionals</h2>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto mb-12">See what our users have to say</p>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                <img src= {starIcon} alt="Star" className="w-25 h-5"/>
              </div>
              <p className="text-gray-700 text-sm mb-6">
                "The level of talent on this platform made hiring so easy and secure for our startup."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">SJ</div>
                <div>
                  <p className="font-bold text-gray-900">Sarah Johnson</p>
                  <p className="text-gray-600 text-sm">CEO, TechStart Inc.</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                <img src= {starIcon} alt="Star" className="w-25 h-5"/>
              </div>
              <p className="text-gray-700 text-sm mb-6">
                "We've found amazing designers through this platform for listing quality clients consistently."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">MC</div>
                <div>
                  <p className="font-bold text-gray-900">Michael Chen</p>
                  <p className="text-gray-600 text-sm">Lead Designer, Creative Studio</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                <img src= {starIcon} alt="Star" className="w-25 h-5"/>
              </div>
              <p className="text-gray-700 text-sm mb-6">
                "Using this we managed the projects with multiple freelancers monthly. Absolutely key to success."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">EW</div>
                <div>
                  <p className="font-bold text-gray-900">Emma Williams</p>
                  <p className="text-gray-600 text-sm">Marketing Director, Global Marketing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Ready to Join the Community?</h2>
          <p className="text-gray-300 text-lg mb-12">Post micro-jobs or find work in your community with secure payments today</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-slate-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition flex items-center justify-center gap-2"
              onClick={() => navigate("/signup")}
            >
              Get Started Free <span>→</span>
            </button>
            <button className="bg-transparent border-2 border-gray-400 text-white hover:border-white hover:bg-gray-800 font-bold py-3 px-8 rounded-full transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-bold">JC</div>
                <span className="text-xl font-bold text-gray-900">MicroJobs</span>
              </div>
              <p className="text-gray-600 text-sm">
                The Local marketplace for services.
              </p>
            </div>

            {/* For Clients */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">For Clients</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">How to Hire</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Talent Marketplace</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Project Catalog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Enterprise</a></li>
              </ul>
            </div>

            {/* For Talent */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">For Talent</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">How to Find Work</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Direct Contracts</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Find Jobs</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Trust & Safety</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/admin-dashboard")}
                    className="text-gray-600 hover:text-gray-900 text-sm bg-transparent border-0 p-0"
                  >
                    Admin Dashboard
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © 2026 MicroJobs. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default Home;
