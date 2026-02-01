import { useState, useRef, useEffect } from "react";
import { Bell, Settings, User, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  const handleProfile = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  const handleSettings = () => {
    navigate("/settings");
    setShowUserMenu(false);
  };

  const handleSignOut = () => {
    toast.success("Signing out...");
    setShowUserMenu(false);
    setTimeout(() => {
      navigate("/sign-in");
    }, 500);
  };

  return (
    <div className="flex items-center justify-end px-6 py-4 gap-4">
      {/* Notifications */}
      <div className="relative" ref={notificationsRef}>
        <button 
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowUserMenu(false);
          }}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
          <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-[12px] shadow-lg border border-[#E5E7EB] overflow-hidden z-50">
            <div className="py-2">
              <button
                onClick={handleProfile}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <User className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[16px] text-[#111827]">View Profile</span>
              </button>
              
              <button
                onClick={handleSettings}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <Settings className="w-4 h-4 text-[#6B7280]" />
                <span className="text-[16px] text-[#111827]">Settings</span>
              </button>
              
              <div className="border-t border-[#E5E7EB] mt-2 pt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[16px] text-[#EF4444]">Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}