import { useState, useRef, useEffect } from "react";
import { Bell, User, Search } from "lucide-react";
import { toast } from "../lib/toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Application Received",
    message: "Sarah Chen applied for Senior Frontend Developer position",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Application Status Updated",
    message: "Michael Rodriguez has been moved to interview stage",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Job Posting Approved",
    message: "Your Backend Engineer job posting is now live",
    time: "2 hours ago",
    read: false,
  },
];

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { logout, user, switchAccountType } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [dashboardSearch, setDashboardSearch] = useState("");
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const path = location.pathname;

  const pageMeta = (() => {
    if (path === "/dashboard") {
      return {
        title: "Dashboard",
        search: {
          placeholder: "Search by skills, name, or expertise...",
          mode: "redirect" as const,
          redirectTo: "/dashboard/find-jobs",
        },
      };
    }
    if (path.startsWith("/dashboard/find-jobs")) {
      return { title: "Find Jobs", search: { placeholder: "Search jobs...", mode: "query" as const } };
    }
    if (path.startsWith("/dashboard/applied-jobs")) {
      return { title: "Applied Jobs", search: { placeholder: "Search applications...", mode: "query" as const } };
    }
    if (path.startsWith("/dashboard/messages")) {
      return { title: "Messages" };
    }
    if (path.startsWith("/dashboard/support")) {
      return { title: "Support", search: { placeholder: "Search help...", mode: "query" as const } };
    }
    if (path.startsWith("/dashboard/saved-jobs")) {
      return { title: "Saved Jobs", search: { placeholder: "Search saved jobs...", mode: "query" as const } };
    }
    if (path.startsWith("/dashboard/e-wallet")) {
      return { title: "E-Wallet" };
    }
    if (path.startsWith("/dashboard/notifications")) {
      return { title: "Notifications" };
    }
    if (path.startsWith("/dashboard/settings")) {
      return { title: "Settings" };
    }
    if (path.startsWith("/dashboard/profile")) {
      return { title: "Profile" };
    }
    if (path.startsWith("/dashboard/employer/applications")) {
      return { title: "Applications" };
    }
    if (path.startsWith("/dashboard/employer/jobs")) {
      return { title: "Jobs Management" };
    }
    if (path.startsWith("/dashboard/employer")) {
      return { title: "Employer Dashboard" };
    }
    if (path.startsWith("/dashboard/admin-dashboard")) {
      return { title: "Admin Dashboard" };
    }
    if (path.startsWith("/dashboard/job-details")) {
      return { title: "Job Details" };
    }
    return { title: "" };
  })();

  const searchValue =
    pageMeta.search?.mode === "query" ? searchParams.get("q") ?? "" : dashboardSearch;

  const handleSearchChange = (value: string) => {
    if (pageMeta.search?.mode === "query") {
      setSearchParams(value ? { q: value } : {});
    } else {
      setDashboardSearch(value);
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    if (pageMeta.search?.mode === "redirect") {
      const trimmed = dashboardSearch.trim();
      navigate(
        trimmed
          ? `${pageMeta.search.redirectTo}?q=${encodeURIComponent(trimmed)}`
          : pageMeta.search.redirectTo,
      );
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleSignOut = () => {
    logout();
    setShowUserMenu(false);
    setShowNotifications(false);
    navigate("/");
  };

  const handleSwitchAccount = () => {
    if (!user) return;
    const nextType = user.accountType === "employer" ? "worker" : "employer";
    switchAccountType(nextType);
    setShowUserMenu(false);
  };

  return (
    <div className="w-full sticky top-0 z-40 bg-[#f8f8f8]">
      <div className="max-w-[1341px] mx-auto flex items-center gap-6 px-6 py-4 min-h-[56px] flex-nowrap">
        <div className="min-w-0 h-10 flex items-center shrink-0">
          {pageMeta.title && (
            <h1 className="font-semibold text-[28px] leading-[1.15] text-[#111827] whitespace-nowrap">
              {pageMeta.title}
            </h1>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          {pageMeta.search && (
            <div className="relative w-full max-w-[460px] min-w-[320px] h-10">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={pageMeta.search.placeholder}
                className="w-full h-full bg-white border border-[#E5E7EB] rounded-[10px] pl-12 pr-4 text-[14px] text-[#111827] placeholder-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#1C4D8D] focus:border-transparent shadow-sm"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 shrink-0">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            >
            <Bell className="w-5 h-5 text-[#6B7280]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#EF4444] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-[12px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
              <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                <h3 className="font-semibold text-[16px] text-[#111827]">
                  Notifications {unreadCount > 0 && `(${unreadCount})`}
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[12px] text-[#4F46E5] hover:text-[#4338CA] font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-[#E5E7EB] last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-[#EEF2FF]" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-[14px] text-[#111827]">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-[#4F46E5]"></div>
                            )}
                          </div>
                          <p className="text-[13px] text-[#6B7280] mb-1">
                            {notification.message}
                          </p>
                          <p className="text-[11px] text-[#9CA3AF]">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3" />
                    <p className="text-[14px] text-[#6B7280]">No notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}
          </div>

          {/* User Avatar */}
          <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center">
              <span className="text-[#3B82F6] font-semibold text-[16px]">JD</span>
            </div>
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-[14px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
              <div className="p-4 border-b border-[#E5E7EB]">
                <p className="text-[18px] font-semibold text-[#111827]">
                  {user?.name ?? "User"}
                </p>
                <p className="text-[14px] text-[#6B7280]">
                  {user?.accountType === "employer" ? "Employer Account" : "Worker Account"}
                </p>
              </div>

              <div className="p-4 border-b border-[#E5E7EB]">
                <button
                  onClick={handleSwitchAccount}
                  className="w-full rounded-[12px] bg-[#1EC19A] text-white text-[15px] font-semibold py-3 hover:bg-[#18a882] transition-colors"
                >
                  {user?.accountType === "employer" ? "Switch to Worker" : "Switch to Hiring"}
                </button>
              </div>

              <div className="p-4">
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-[#EF4444] font-semibold"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
