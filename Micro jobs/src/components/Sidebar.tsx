import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, ChevronDown, User, Shield } from "lucide-react";
import svgPaths from "../imports/svg-at917c2et3";
import imgBigShoesAvatar from "figma:asset/8b9f86452ff0e90495bf9daf1494dd6920ad538a.png";
import { useAuth } from "../contexts/AuthContext";

function Logo1() {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g clipPath="url(#clip0_1_887)">
          <path clipRule="evenodd" d={svgPaths.pb82c00} fill="#1C4D8D" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p9a9cd00} fill="#1C4D8D" fillRule="evenodd" />
        </g>
        <defs>
          <clipPath id="clip0_1_887">
            <rect fill="white" height="32" width="32" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

interface LogoProps {
  isCollapsed: boolean;
}

function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip relative shrink-0">
      <Logo1 />
      {!isCollapsed && (
        <p className="font-['Poppins:SemiBold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#081021] text-[20px] whitespace-nowrap">
          Micro Jobs
        </p>
      )}
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: boolean;
  isCollapsed: boolean;
}

function NavItem({ icon, label, to, badge, isCollapsed }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`h-[44px] relative rounded-[99px] shrink-0 w-full block ${isActive ? "bg-[#E8F2F8]" : ""} group`}
      title={isCollapsed ? label : undefined}
    >
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className={`content-stretch flex items-center ${isCollapsed ? "px-[12px] justify-center" : "px-[16px]"} py-[12px] relative size-full`}>
          <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
            <div className="content-stretch flex items-start relative shrink-0">
              {icon}
            </div>
            {!isCollapsed && (
              <>
                <div className={`flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[14px] ${isActive ? "text-[#1C4D8D]" : "text-[#64748b]"}`}>
                  <p className="leading-[20px] whitespace-pre-wrap">{label}</p>
                </div>
                {badge && (
                  <div className="bg-[#1C4D8D] rounded-[99px] size-[6px]">
                    <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
                  </div>
                )}
              </>
            )}
            {isCollapsed && badge && (
              <div className="absolute bg-[#1C4D8D] rounded-[99px] size-[6px] top-[8px] right-[8px]">
                <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ExpandableNavItemProps {
  icon: React.ReactNode;
  label: string;
  basePath: string;
  badge?: boolean;
  isCollapsed: boolean;
  children?: { label: string; to: string }[];
}

function ExpandableNavItem({ icon, label, basePath, badge, isCollapsed, children = [] }: ExpandableNavItemProps) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(basePath);
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div className="w-full">
      <button
        onClick={() => !isCollapsed && setIsExpanded(!isExpanded)}
        className={`h-[44px] relative rounded-[99px] shrink-0 w-full ${isActive ? "bg-[#E8F2F8]" : ""} group`}
        title={isCollapsed ? label : undefined}
      >
        <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
          <div className={`content-stretch flex items-center ${isCollapsed ? "px-[12px] justify-center" : "px-[16px]"} py-[12px] relative size-full`}>
            <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
              <div className="content-stretch flex items-start relative shrink-0">
                {icon}
              </div>
              {!isCollapsed && (
                <>
                  <div className={`flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch text-[14px] ${isActive ? "text-[#1C4D8D]" : "text-[#64748b]"}`}>
                    <p className="leading-[20px] whitespace-pre-wrap">{label}</p>
                  </div>
                  {badge && (
                    <div className="bg-[#1C4D8D] rounded-[99px] size-[6px]">
                      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-[#64748b] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </>
              )}
              {isCollapsed && badge && (
                <div className="absolute bg-[#1C4D8D] rounded-[99px] size-[6px] top-[8px] right-[8px]">
                  <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[100px]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
      
      {!isCollapsed && isExpanded && children.length > 0 && (
        <div className="mt-1 ml-[44px] space-y-1">
          {children.map((child) => {
            const isChildActive = location.pathname === child.to;
            return (
              <Link
                key={child.to}
                to={child.to}
                className={`block px-4 py-2 text-[13px] font-['Poppins:Medium',sans-serif] rounded-lg transition-colors ${
                  isChildActive 
                    ? "text-[#1C4D8D] bg-[#E8F2F8]" 
                    : "text-[#64748b] hover:bg-gray-50"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DashboardIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2fc4f200} stroke={isActive ? "#498BC9" : "#64748B"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function BriefcaseIcon({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <path d="M10 9V6.5M6.5 9V6.5M13.5 9V6.5M5.5 17.5H14.5C15.6046 17.5 16.5 16.6046 16.5 15.5V7C16.5 5.89543 15.6046 5 14.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7V15.5C3.5 16.6046 4.39543 17.5 5.5 17.5Z" stroke={isActive ? "#498BC9" : "#64748B"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 5V4C7 3.44772 7.44772 3 8 3H12C12.5523 3 13 3.44772 13 4V5" stroke={isActive ? "#498BC9" : "#64748B"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function InboxIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2d9a2480} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function TruckIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p1e38c0c0} stroke="#64748B" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function WalletIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.pa9e5380} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function BellIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2185fa00} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function SettingsIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p7eada00} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2d5fa000} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function SupportIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p26323f00} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2bff9300} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function MessagesIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p2bff9300} stroke="#64748B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  return (
    <div 
      className={`bg-white content-stretch flex flex-col gap-[24px] h-screen sticky top-0 isolate items-center shadow-[0px_0px_44px_0px_rgba(0,0,0,0.05)] border-r border-[#E5E7EB] transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[280px]"
      }`}
    >
      {/* Top */}
      <div className="relative shrink-0 w-full z-[4]">
        <div className="flex flex-row items-center size-full">
          <div className={`content-stretch flex gap-[12px] items-center ${isCollapsed ? "p-[16px] justify-center" : "p-[24px]"} relative w-full`}>
            <Logo isCollapsed={isCollapsed} />
          </div>
        </div>
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-white border border-[#E5E7EB] rounded-full p-1.5 hover:bg-gray-50 transition-colors shadow-sm z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#64748b]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#64748b]" />
          )}
        </button>
      </div>

      {/* Main Navigation */}
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center min-h-px min-w-px relative w-full z-[3] overflow-y-auto">
        <div className="relative shrink-0 w-full">
          <div className={`content-stretch flex flex-col gap-[4px] items-start ${isCollapsed ? "px-[12px]" : "px-[24px]"} relative w-full`}>
            <NavItem 
              icon={<DashboardIcon isActive={location.pathname === "/"} />} 
              label="Dashboard" 
              to="/" 
              isCollapsed={isCollapsed}
            />
            <ExpandableNavItem
              icon={<BriefcaseIcon isActive={location.pathname.startsWith("/employer")} />}
              label="Employer"
              basePath="/employer"
              isCollapsed={isCollapsed}
              children={[
                { label: "Dashboard", to: "/employer" },
                { label: "Applications", to: "/employer/applications" },
              ]}
            />
            <NavItem 
              icon={<InboxIcon />} 
              label="Find Jobs" 
              to="/find-jobs" 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              icon={<TruckIcon />} 
              label="Applied Jobs" 
              to="/applied-jobs" 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              icon={<CalendarIcon />} 
              label="Messages" 
              to="/messages" 
              badge={true}
              isCollapsed={isCollapsed}
            />
            <NavItem 
              icon={<TruckIcon />} 
              label="Saved Jobs" 
              to="/saved-jobs" 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              icon={<WalletIcon />} 
              label="E-Wallet" 
              to="/e-wallet" 
              isCollapsed={isCollapsed}
            />
            
            {/* Admin Dashboard - Only for admin users */}
            {user && user.role === "admin" && (
              <NavItem 
                icon={<Shield className="w-5 h-5 text-[#64748b]" />} 
                label="Admin Dashboard" 
                to="/admin-dashboard" 
                isCollapsed={isCollapsed}
              />
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-0 relative shrink-0 w-full">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 280 1">
              <line stroke="#E2E8F0" x2="280" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="relative shrink-0 w-full">
          <div className={`content-stretch flex flex-col gap-[4px] items-start ${isCollapsed ? "px-[12px]" : "px-[24px]"} relative w-full`}>
            <NavItem 
              icon={<BellIcon />} 
              label="Notifications" 
              to="/notifications" 
              badge={true}
              isCollapsed={isCollapsed}
            />
            <NavItem 
              icon={<SettingsIcon />} 
              label="Settings" 
              to="/settings" 
              isCollapsed={isCollapsed}
            />
            <NavItem 
              icon={<SupportIcon />} 
              label="Support" 
              to="/support" 
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <Link to="/profile" className="relative shrink-0 w-full z-[1] hover:bg-gray-50 transition-colors group cursor-pointer">
          <div aria-hidden="true" className="absolute border-[#e2e8f0] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[12px] items-center p-[24px] relative w-full">
              <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
                <div className="bg-[#ffb31f] overflow-clip relative rounded-[99px] shrink-0 size-[40px] group-hover:scale-105 transition-transform">
                  <div className="absolute inset-[-35%_-40%_-45%_-40%]">
                    <img alt="User avatar" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBigShoesAvatar} />
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col font-['Poppins:Medium',sans-serif] gap-[2px] items-start leading-[20px] min-h-px min-w-px not-italic relative whitespace-pre-wrap">
                  <p className="relative shrink-0 text-[#64748b] text-[12px] w-full">Welcome back 👋</p>
                  <p className="relative shrink-0 text-[#081021] text-[14px] w-full group-hover:text-[#1C4D8D] transition-colors">Jonas</p>
                </div>
              </div>
              <div className="relative shrink-0 size-[20px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d={svgPaths.p3efe8e00} fill="#081021" fillRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Footer - Collapsed State */}
      {isCollapsed && (
        <Link to="/profile" className="relative shrink-0 w-full z-[1] pb-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-[#ffb31f] overflow-clip relative rounded-[99px] shrink-0 size-[40px] hover:scale-105 transition-transform">
              <div className="absolute inset-[-35%_-40%_-45%_-40%]">
                <img alt="User avatar" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgBigShoesAvatar} />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}