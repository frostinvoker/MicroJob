import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Briefcase,
  DollarSign,
  Search,
  UserCheck,
  UserX,
  Eye,
  Trash2,
  Shield,
  Layers,
  ClipboardList,
} from "lucide-react";
import { toast } from "../lib/toast";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { deleteUser, getCategories, getJobs, getUserList, updateUserStatus } from "../../services/api";

type ApiUser = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string | null;
  role?: "hire" | "work" | "both" | "admin" | "superadmin";
  status?: "active" | "pending" | "disabled";
};

type ApiJob = {
  _id: string;
  title: string;
  status?: "Available" | "In Progress" | "Completed" | "Cancelled";
  salary?: string;
  createdAt?: string;
  applicants?: string[];
  category?: { _id: string; name: string } | string | null;
  jobPoster?: { _id: string; firstName?: string; lastName?: string; email?: string } | string | null;
};

type ApiCategory = {
  _id: string;
  name: string;
};

type UserStatusFilter = "all" | "active" | "pending" | "disabled";
type UserRoleFilter = "all" | "hire" | "work" | "both" | "admin" | "superadmin";

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const isSuperAdmin = user?.role === "superadmin";
  const [redirectToSignIn, setRedirectToSignIn] = useState(false);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>("all");
  const [roleFilter, setRoleFilter] = useState<UserRoleFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  if (!user) {
    return <Navigate to="/admin-sign-in" replace />;
  }

  if (redirectToSignIn) {
    return <Navigate to="/admin-sign-in" replace />;
  }

  if (!isSuperAdmin) {
    return (
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 text-[14px] text-[#6B7280]">
        Redirecting to Super Admin sign-in...
      </div>
    );
  }

  useEffect(() => {
    if (!user) return;
    if (user.role !== "superadmin") {
      toast.error("Super Admin access required.");
      logout({ silent: true });
      setRedirectToSignIn(true);
    }
  }, [user, logout]);

  useEffect(() => {
    let isActive = true;
    const loadData = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const [userList, jobList, categoryList] = await Promise.all([
          getUserList(),
          getJobs(),
          getCategories(),
        ]);
        if (!isActive) return;
        setUsers(Array.isArray(userList) ? userList : []);
        setJobs(Array.isArray(jobList) ? jobList : []);
        setCategories(Array.isArray(categoryList) ? categoryList : []);
      } catch (error: any) {
        if (!isActive) return;
        const message = error?.message || "Failed to load admin data.";
        setLoadError(message);
        toast.error(message);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    if (isSuperAdmin) {
      loadData();
    }

    return () => {
      isActive = false;
    };
  }, [isSuperAdmin]);

  const jobsByUser = useMemo(() => {
    const map = new Map<string, number>();
    jobs.forEach((job) => {
      const posterId = typeof job.jobPoster === "string" ? job.jobPoster : job.jobPoster?._id;
      if (!posterId) return;
      map.set(posterId, (map.get(posterId) || 0) + 1);
    });
    return map;
  }, [jobs]);

  const categoriesById = useMemo(() => {
    const map = new Map<string, ApiCategory>();
    categories.forEach((category) => {
      map.set(category._id, category);
    });
    return map;
  }, [categories]);

  const jobsByCategory = useMemo(() => {
    const map = new Map<string, number>();
    jobs.forEach((job) => {
      const categoryId = typeof job.category === "string" ? job.category : job.category?._id;
      if (!categoryId) return;
      map.set(categoryId, (map.get(categoryId) || 0) + 1);
    });
    return map;
  }, [jobs]);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return users.filter((u) => {
      const name = `${u.firstName || ""} ${u.lastName || ""}`.trim().toLowerCase();
      const email = (u.email || "").toLowerCase();
      const phone = (u.phoneNumber || "").toLowerCase();
      const matchesSearch = !query || name.includes(query) || email.includes(query) || phone.includes(query);
      const matchesStatus = statusFilter === "all" || u.status === statusFilter;
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchQuery, statusFilter, roleFilter]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    pendingUsers: users.filter((u) => u.status === "pending").length,
    disabledUsers: users.filter((u) => u.status === "disabled").length,
    totalJobs: jobs.length,
    availableJobs: jobs.filter((j) => j.status === "Available").length,
    totalCategories: categories.length,
  };

  const topCategories = useMemo(() => {
    return categories
      .map((category) => ({
        id: category._id,
        name: category.name,
        count: jobsByCategory.get(category._id) || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [categories, jobsByCategory]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-[#D1FAE5] text-[#065F46]";
      case "disabled":
        return "bg-[#FEE2E2] text-[#991B1B]";
      case "pending":
        return "bg-[#FEF3C7] text-[#92400E]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "admin":
      case "superadmin":
        return "bg-[#E9D5FF] text-[#6B21A8]";
      case "hire":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "both":
        return "bg-[#FDE68A] text-[#92400E]";
      default:
        return "bg-[#D1FAE5] text-[#065F46]";
    }
  };

  const getJobStatusColor = (status?: string) => {
    switch (status) {
      case "Available":
        return "bg-[#D1FAE5] text-[#065F46]";
      case "In Progress":
        return "bg-[#DBEAFE] text-[#1E40AF]";
      case "Completed":
        return "bg-[#E9D5FF] text-[#6B21A8]";
      case "Cancelled":
        return "bg-[#FEE2E2] text-[#991B1B]";
      default:
        return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  const formatDateFromObjectId = (id?: string) => {
    if (!id || id.length < 8) return "—";
    const timestamp = parseInt(id.slice(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString();
  };

  const getUserDisplayName = (u: ApiUser) =>
    `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email;

  const handleApproveUser = async (u: ApiUser) => {
    try {
      await updateUserStatus(u._id, "active");
      setUsers((prev) => prev.map((item) => (item._id === u._id ? { ...item, status: "active" } : item)));
      toast.success(`User ${getUserDisplayName(u)} approved`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to approve user");
    }
  };

  const handleToggleUserStatus = async (u: ApiUser) => {
    const nextStatus = u.status === "disabled" ? "active" : "disabled";
    try {
      await updateUserStatus(u._id, nextStatus);
      setUsers((prev) => prev.map((item) => (item._id === u._id ? { ...item, status: nextStatus } : item)));
      toast.success(`User ${getUserDisplayName(u)} ${nextStatus === "disabled" ? "disabled" : "activated"}`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update user status");
    }
  };

  const handleDeleteUser = async (u: ApiUser) => {
    const label = getUserDisplayName(u);
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;
    try {
      await deleteUser(u._id);
      setUsers((prev) => prev.filter((item) => item._id !== u._id));
      toast.success(`User ${label} deleted`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete user");
    }
  };

  const recentActivity = useMemo(() => {
    const activities: Array<{ id: string; title: string; subtitle: string; date: Date; type: "user" | "job" }> = [];
    const sortedUsers = [...users].sort((a, b) => {
      const aTime = parseInt(a._id.slice(0, 8), 16) * 1000;
      const bTime = parseInt(b._id.slice(0, 8), 16) * 1000;
      return bTime - aTime;
    });
    sortedUsers.slice(0, 6).forEach((u) => {
      const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email;
      const date = new Date(parseInt(u._id.slice(0, 8), 16) * 1000);
      activities.push({
        id: `user-${u._id}`,
        title: "New user registered",
        subtitle: name,
        date,
        type: "user",
      });
    });

    const sortedJobs = [...jobs].sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
    sortedJobs.slice(0, 6).forEach((job) => {
      const date = job.createdAt ? new Date(job.createdAt) : new Date();
      activities.push({
        id: `job-${job._id}`,
        title: "New job posted",
        subtitle: job.title,
        date,
        type: "job",
      });
    });

    return activities.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 6);
  }, [users, jobs]);

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

      {loadError && (
        <div className="bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA] px-4 py-3 rounded-[12px] text-[13px]">
          {loadError}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
          <p className="text-[28px] font-bold text-[#111827]">{isLoading ? "—" : stats.totalUsers}</p>
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
          <p className="text-[28px] font-bold text-[#111827]">{isLoading ? "—" : stats.activeUsers}</p>
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
          <p className="text-[28px] font-bold text-[#111827]">{isLoading ? "—" : stats.totalJobs}</p>
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
          <p className="text-[13px] text-[#6B7280] mb-1">Available Jobs</p>
          <p className="text-[28px] font-bold text-[#111827]">{isLoading ? "—" : stats.availableJobs}</p>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#FDE68A] to-[#FCD34D] flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-[#B45309]" />
            </div>
            <span className="text-[12px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-full">
              +6%
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-1">Pending Users</p>
          <p className="text-[28px] font-bold text-[#111827]">{isLoading ? "—" : stats.pendingUsers}</p>
        </div>

        <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-[12px] bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center">
              <Layers className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <span className="text-[12px] text-[#10B981] font-semibold bg-[#D1FAE5] px-2 py-1 rounded-full">
              +4%
            </span>
          </div>
          <p className="text-[13px] text-[#6B7280] mb-1">Total Categories</p>
          <p className="text-[28px] font-bold text-[#111827]">{isLoading ? "—" : stats.totalCategories}</p>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#111827]">User Management</h2>
          <div className="flex items-center gap-3">
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

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatusFilter)}
              className="px-4 py-2 border border-[#E5E7EB] rounded-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disabled">Disabled</option>
            </select>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRoleFilter)}
              className="px-4 py-2 border border-[#E5E7EB] rounded-[10px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1C4D8D]"
            >
              <option value="all">All Roles</option>
              <option value="hire">Employer</option>
              <option value="work">Worker</option>
              <option value="both">Both</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">User</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Email</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Role</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Status</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Joined</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Phone</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Jobs</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((userData) => (
                <tr key={userData._id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4988C4] to-[#1C4D8D] flex items-center justify-center text-white font-semibold text-[14px]">
                        {(userData.firstName?.charAt(0) || userData.email.charAt(0)).toUpperCase()}
                      </div>
                      <span className="text-[14px] font-medium text-[#111827]">
                        {`${userData.firstName || ""} ${userData.lastName || ""}`.trim() || userData.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#6B7280]">{userData.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${getRoleColor(userData.role)}`}>
                      {(userData.role || "work").toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${getStatusColor(userData.status)}`}>
                      {userData.status ? userData.status.charAt(0).toUpperCase() + userData.status.slice(1) : "Unknown"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#6B7280]">{formatDateFromObjectId(userData._id)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#6B7280]">{userData.phoneNumber || "—"}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] font-medium text-[#111827]">{jobsByUser.get(userData._id) || 0}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {userData.status === "pending" && (
                        <button
                          onClick={() => handleApproveUser(userData)}
                          className="p-2 rounded-[8px] bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0] transition-colors"
                          title="Approve user"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleToggleUserStatus(userData)}
                        className={`p-2 rounded-[8px] transition-colors ${
                          userData.status === "disabled"
                            ? "bg-[#D1FAE5] text-[#065F46] hover:bg-[#A7F3D0]"
                            : "bg-[#FEE2E2] text-[#991B1B] hover:bg-[#FECACA]"
                        }`}
                        title={userData.status === "disabled" ? "Activate user" : "Disable user"}
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
                        onClick={() => handleDeleteUser(userData)}
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

          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3" />
              <p className="text-[14px] text-[#6B7280]">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Jobs Overview */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#111827]">Job Monitoring</h2>
          <div className="text-[13px] text-[#6B7280]">
            {isLoading ? "Loading jobs..." : `${jobs.length} total jobs`}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Job</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Category</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Status</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Applicants</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Posted</th>
                <th className="text-left py-4 px-4 text-[13px] font-semibold text-[#6B7280]">Salary</th>
              </tr>
            </thead>
            <tbody>
              {jobs.slice(0, 8).map((job) => (
                <tr key={job._id} className="border-b border-[#F3F4F6] hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4">
                    <div className="text-[14px] font-medium text-[#111827]">{job.title}</div>
                    <div className="text-[12px] text-[#6B7280]">
                      {typeof job.jobPoster === "string"
                        ? "Unknown poster"
                        : `${job.jobPoster?.firstName || ""} ${job.jobPoster?.lastName || ""}`.trim() ||
                          job.jobPoster?.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[13px] text-[#6B7280]">
                      {typeof job.category === "string"
                        ? categoriesById.get(job.category)?.name || "Uncategorized"
                        : job.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${getJobStatusColor(job.status)}`}>
                      {job.status || "Unknown"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] font-medium text-[#111827]">{job.applicants?.length || 0}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[13px] text-[#6B7280]">
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "—"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[14px] text-[#111827]">{job.salary || "—"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {jobs.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-[#D1D5DB] mx-auto mb-3" />
              <p className="text-[14px] text-[#6B7280]">No jobs found</p>
            </div>
          )}
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[20px] font-semibold text-[#111827]">Category Overview</h2>
          <div className="text-[13px] text-[#6B7280]">
            {isLoading ? "Loading categories..." : `${categories.length} categories`}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topCategories.map((category) => (
            <div key={category.id} className="border border-[#E5E7EB] rounded-[14px] p-4 bg-[#F9FAFB]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#111827]">{category.name}</p>
                  <p className="text-[12px] text-[#6B7280]">Jobs posted</p>
                </div>
                <div className="text-[20px] font-bold text-[#1C4D8D]">{category.count}</div>
              </div>
            </div>
          ))}
          {topCategories.length === 0 && !isLoading && (
            <div className="text-[14px] text-[#6B7280]">No categories available.</div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[16px] border border-[#E5E7EB] p-6">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-[#F9FAFB] rounded-[12px]">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  activity.type === "user" ? "bg-[#D1FAE5]" : "bg-[#DBEAFE]"
                }`}
              >
                {activity.type === "user" ? (
                  <UserCheck className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <Briefcase className="w-5 h-5 text-[#3B82F6]" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#111827] font-medium">{activity.title}</p>
                <p className="text-[13px] text-[#6B7280]">{activity.subtitle}</p>
                <p className="text-[12px] text-[#9CA3AF] mt-1">
                  {activity.date.toLocaleDateString()} · {activity.date.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {recentActivity.length === 0 && !isLoading && (
            <div className="text-[14px] text-[#6B7280]">No recent activity yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
