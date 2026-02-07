import { useState } from "react";
import { Bell, CheckCheck, Trash2, Filter, Briefcase, DollarSign, AlertCircle, MessageSquare, Star } from "lucide-react";
import { toast } from "../lib/toast";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: string;
  type: "application" | "payment" | "message" | "alert" | "achievement";
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

const notificationsData: Notification[] = [
  {
    id: "1",
    type: "application",
    title: "New Application Received",
    message: "Sarah Chen applied for Senior Frontend Developer position",
    time: "5 minutes ago",
    read: false,
    actionable: true,
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    message: "You received ₱25,000 from Tech Solutions Inc.",
    time: "1 hour ago",
    read: false,
    actionable: false,
  },
  {
    id: "3",
    type: "application",
    title: "Application Status Updated",
    message: "Michael Rodriguez has been moved to interview stage",
    time: "2 hours ago",
    read: false,
    actionable: true,
  },
  {
    id: "4",
    type: "message",
    title: "New Message",
    message: "You have a new message from Innovation Labs",
    time: "3 hours ago",
    read: true,
    actionable: true,
  },
  {
    id: "5",
    type: "alert",
    title: "Job Posting Approved",
    message: "Your Backend Engineer job posting is now live",
    time: "5 hours ago",
    read: true,
    actionable: false,
  },
  {
    id: "6",
    type: "achievement",
    title: "Milestone Reached!",
    message: "Congratulations! You've completed 50 jobs",
    time: "1 day ago",
    read: true,
    actionable: false,
  },
  {
    id: "7",
    type: "payment",
    title: "Withdrawal Completed",
    message: "₱10,000 has been transferred to your bank account",
    time: "1 day ago",
    read: true,
    actionable: false,
  },
  {
    id: "8",
    type: "application",
    title: "Candidate Applied",
    message: "John Doe applied for UI/UX Designer position",
    time: "2 days ago",
    read: true,
    actionable: true,
  },
  {
    id: "9",
    type: "alert",
    title: "Profile Verification Complete",
    message: "Your profile has been successfully verified",
    time: "3 days ago",
    read: true,
    actionable: false,
  },
  {
    id: "10",
    type: "message",
    title: "New Chat Message",
    message: "Digital Ventures sent you a message about the project",
    time: "3 days ago",
    read: true,
    actionable: true,
  },
];

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread" | "application" | "payment" | "message">("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string, options?: { silent?: boolean }) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
    if (!options?.silent) {
      toast.success("Marked as read");
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast.success("Notification deleted");
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(n => !n.read));
    toast.success("All read notifications deleted");
  };

  const handleViewDetails = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id, { silent: true });
    }
    switch (notification.type) {
      case "application":
        navigate("/dashboard/applied-jobs");
        return;
      case "message":
        navigate("/dashboard/messages");
        return;
      case "payment":
        navigate("/dashboard/e-wallet");
        return;
      case "achievement":
        navigate("/dashboard/profile");
        return;
      case "alert":
        navigate("/dashboard/notifications");
        return;
      default:
        navigate("/dashboard");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="w-5 h-5" />;
      case "payment":
        return <DollarSign className="w-5 h-5" />;
      case "message":
        return <MessageSquare className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      case "achievement":
        return <Star className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "application":
        return "bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] text-[#3B82F6]";
      case "payment":
        return "bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] text-[#10B981]";
      case "message":
        return "bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#F59E0B]";
      case "alert":
        return "bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] text-[#EF4444]";
      case "achievement":
        return "bg-gradient-to-br from-[#E9D5FF] to-[#DDD6FE] text-[#8B5CF6]";
      default:
        return "bg-gradient-to-br from-[#E5E7EB] to-[#D1D5DB] text-[#6B7280]";
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  return (
    <div className="max-w-[1341px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[14px] text-[#6B7280]">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-[#1C4D8D] text-white rounded-[12px] hover:bg-[#0F2954] transition-all font-medium text-[14px]"
            >
              <CheckCheck className="w-4 h-4" />
              Mark all as read
            </button>
          )}
          <button
            onClick={deleteAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] text-[#6B7280] rounded-[12px] hover:bg-gray-50 transition-all font-medium text-[14px]"
          >
            <Trash2 className="w-4 h-4" />
            Clear read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-2 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-[8px] font-medium text-[14px] whitespace-nowrap transition-all ${
            filter === "all"
              ? "bg-[#1C4D8D] text-white"
              : "bg-transparent text-[#6B7280] hover:bg-gray-50"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 rounded-[8px] font-medium text-[14px] whitespace-nowrap transition-all ${
            filter === "unread"
              ? "bg-[#1C4D8D] text-white"
              : "bg-transparent text-[#6B7280] hover:bg-gray-50"
          }`}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
        <button
          onClick={() => setFilter("application")}
          className={`px-4 py-2 rounded-[8px] font-medium text-[14px] whitespace-nowrap transition-all ${
            filter === "application"
              ? "bg-[#1C4D8D] text-white"
              : "bg-transparent text-[#6B7280] hover:bg-gray-50"
          }`}
        >
          Applications
        </button>
        <button
          onClick={() => setFilter("payment")}
          className={`px-4 py-2 rounded-[8px] font-medium text-[14px] whitespace-nowrap transition-all ${
            filter === "payment"
              ? "bg-[#1C4D8D] text-white"
              : "bg-transparent text-[#6B7280] hover:bg-gray-50"
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setFilter("message")}
          className={`px-4 py-2 rounded-[8px] font-medium text-[14px] whitespace-nowrap transition-all ${
            filter === "message"
              ? "bg-[#1C4D8D] text-white"
              : "bg-transparent text-[#6B7280] hover:bg-gray-50"
          }`}
        >
          Messages
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-[16px] border border-[#E5E7EB] p-5 transition-all hover:shadow-md ${
                !notification.read ? "bg-[#EEF2FF] border-[#C7D2FE]" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${getIconColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[16px] text-[#111827]">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
                      )}
                    </div>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[14px] text-[#6B7280] mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] text-[#9CA3AF]">{notification.time}</p>
                    <div className="flex items-center gap-2">
                      {notification.actionable && (
                        <button
                          onClick={() => handleViewDetails(notification)}
                          className={`px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all ${
                            notification.read
                              ? "bg-[#E2E8F0] text-[#475569] hover:bg-[#CBD5F5]"
                              : "bg-[#1C4D8D] text-white hover:bg-[#0F2954]"
                          }`}
                        >
                          {notification.read ? "Viewed" : "View Details"}
                        </button>
                      )}
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="px-3 py-1.5 bg-white border border-[#E5E7EB] text-[#6B7280] text-[12px] font-medium rounded-[8px] hover:bg-gray-50 transition-all"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-12 text-center">
            <Bell className="w-16 h-16 text-[#D1D5DB] mx-auto mb-4" />
            <h3 className="text-[18px] font-semibold text-[#111827] mb-2">No notifications</h3>
            <p className="text-[14px] text-[#6B7280]">
              {filter === "all" 
                ? "You're all caught up!"
                : `No ${filter} notifications to show`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
