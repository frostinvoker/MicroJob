import { useState } from "react";
import { Users, Briefcase, DollarSign, TrendingUp, Search, Filter, UserCheck, UserX, MoreVertical, Eye, Trash2, Shield } from "lucide-react";
import { toast } from "../lib/toast";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended" | "pending";
  joinedDate: string;
  totalJobs: number;
  totalEarnings: number;
}

const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Jonas Developer",
    email: "jonas@example.com",
    role: "user",
    status: "active",
    joinedDate: "2024-01-15",
    totalJobs: 12,
    totalEarnings: 82000,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    joinedDate: "2024-02-20",
    totalJobs: 8,
    totalEarnings: 56000,
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    email: "michael@example.com",
    role: "user",
    status: "suspended",
    joinedDate: "2023-12-10",
    totalJobs: 15,
    totalEarnings: 95000,
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "user",
    status: "pending",
    joinedDate: "2024-02-25",
    totalJobs: 0,
    totalEarnings: 0,
  },
];

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended" | "pending">("all");

  // Redirect if not admin
  if (!user || user.role !== "admin") {
    navigate("/dashboard");
    return null;
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === "active").length,
    totalJobs: users.reduce((sum, u) => sum + u.totalJobs, 0),
    totalRevenue: users.reduce((sum, u) => sum + u.totalEarnings, 0),
  };

  const handleSuspendUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: u.status === "suspended" ? "active" : "suspended" } : u
    ));
    const user = users.find(u => u.id === userId);
    toast.success(`User ${user?.status === "suspended" ? "activated" : "suspended"}`);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
    toast.success("User deleted");
  };

  const handleApproveUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: "active" } : u
    ));
    toast.success("User approved");
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#D1FAE5] text-[#065F46]";
      case "suspended":
        return "bg-[#FEE2E2] text-[#991B1B]";
      case "pending":
        return "bg-[#FEF3C7] text-[#92400E]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  return (
    <div className="max-w-[1341px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-[28px] text-[#111827] flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#1C4D8D]" />
            Admin Dashboard
          </h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Manage users, monitor activity, and oversee platform operations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
              <Users className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <span className="text-[12px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-1">Total Users</p>
          <p className="text-[28px] font-bold text-[#111827]">{stats.totalUsers}</p>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-[#10B981]" />
            </div>
            <span className="text-[12px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-full">
              +8%
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-1">Active Users</p>
          <p className="text-[28px] font-bold text-[#111827]">{stats.activeUsers}</p>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <span className="text-[12px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-full">
              +24%
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-1">Total Jobs</p>
          <p className="text-[28px] font-bold text-[#111827]">{stats.totalJobs}</p>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#E9D5FF] to-[#DDD6FE] flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#8B5CF6]" />
            </div>
            <span className="text-[12px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-full">
              +18%
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-1">Total Revenue</p>
          <p className="text-[28px] font-bold text-[#111827]">₱{(stats.totalRevenue / 1000).toFixed(0)}k</p>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#111827]">User Management</h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-[280px] pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-[#E5E7EB] rounded-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">User</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Email</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Status</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Joined</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Jobs</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Earnings</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userData) => (
                <tr key={userData.id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4988C4] to-[#1C4D8D] flex items-center justify-center text-white font-semibold text-[14px]">
                        {userData.name.charAt(0)}
                      </div>
                      <span className="text-[14px] font-medium text-[#111827]">{userData.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#6B7280]">{userData.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${getStatusColor(userData.status)}`}>
                      {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#6B7280]">
                      {new Date(userData.joinedDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] font-medium text-[#111827]">{userData.totalJobs}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] font-semibold text-[#10B981]">
                      ₱{userData.totalEarnings.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {userData.status === "pending" && (
                        <button
                          onClick={() => handleApproveUser(userData.id)}
                          className="p-2 rounded-[8px] bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0] transition-colors"
                          title="Approve user"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspendUser(userData.id)}
                        className={`p-2 rounded-[8px] transition-colors ${
                          userData.status === "suspended"
                            ? "bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0]"
                            : "bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FECACA]"
                        }`}
                        title={userData.status === "suspended" ? "Activate user" : "Suspend user"}
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toast.info("Viewing user details...")}
                        className="p-2 rounded-[8px] bg-[#DBEAFE] text-[#1E40AF] hover:bg-[#BFDBFE] transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(userData.id)}
                        className="p-2 rounded-[8px] bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3" />
              <p className="text-[14px] text-[#6B7280]">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-[#F9FAFB] rounded-[12px]">
            <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-[#111827] font-medium">New user registered</p>
              <p className="text-[13px] text-[#6B7280]">Emma Wilson joined the platform</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1">5 minutes ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#F9FAFB] rounded-[12px]">
            <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-[#111827] font-medium">New job posted</p>
              <p className="text-[13px] text-[#6B7280]">Senior Frontend Developer position added</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-[#F9FAFB] rounded-[12px]">
            <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center shrink-0">
              <UserX className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] text-[#111827] font-medium">User suspended</p>
              <p className="text-[13px] text-[#6B7280]">Michael Rodriguez account suspended due to policy violation</p>
              <p className="text-[12px] text-[#9CA3AF] mt-1">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}