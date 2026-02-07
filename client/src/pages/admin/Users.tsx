import React, { useEffect, useMemo, useState } from "react";

type Role = "admin" | "user";

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: Role;
  applications: number;
  joined: string;
};

const initialUsers: UserRow[] = [
  {
    id: 1,
    name: "elijah vinluan",
    email: "vinluanelijah1@gmail.com",
    role: "admin",
    applications: 0,
    joined: "Feb 4, 2026",
  },
];

const roleStyles: Record<Role, string> = {
  admin: "bg-purple-100 text-purple-700",
  user: "bg-emerald-100 text-emerald-700",
};

const roleLabels: Record<Role, string> = {
  admin: "admin",
  user: "regular",
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
};

const Users: React.FC = () => {
  const [query, setQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialUsers;
    return initialUsers.filter((user) => user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q));
  }, [query]);

  const totalUsers = initialUsers.length;
  const adminUsers = initialUsers.filter((user) => user.role === "admin").length;
  const regularUsers = initialUsers.filter((user) => user.role !== "admin").length;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      tint: "bg-blue-100 text-blue-600",
    },
    {
      label: "Admins",
      value: adminUsers,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
          <path d="M9.5 12.5l2 2 4-4" />
        </svg>
      ),
      tint: "bg-purple-100 text-purple-600",
    },
    {
      label: "Regular Users",
      value: regularUsers,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      tint: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">View and manage all registered users</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.tint}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 leading-tight">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-gray-500">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search users by name or email..."
            className="w-full text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(140px,1fr)_80px] gap-4 px-6 py-4 text-sm font-semibold text-gray-500 border-b border-gray-100">
              <div>User</div>
              <div>Role</div>
              <div>Applications</div>
              <div>Joined</div>
              <div className="text-right">Actions</div>
            </div>

            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-sm text-gray-500">No users match your search.</div>
            ) : (
              filtered.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(140px,1fr)_80px] gap-4 px-6 py-5 items-center border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white flex items-center justify-center font-semibold">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${roleStyles[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">{user.applications}</div>
                  <div className="text-sm text-gray-500">{user.joined}</div>
                  <div className="flex justify-end">
                    <div className="relative">
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={openMenuId === user.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenMenuId((prev) => (prev === user.id ? null : user.id));
                        }}
                        className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                          <circle cx="12" cy="5" r="1.8" />
                          <circle cx="12" cy="12" r="1.8" />
                          <circle cx="12" cy="19" r="1.8" />
                        </svg>
                      </button>
                      {openMenuId === user.id && (
                        <div
                          role="menu"
                          onClick={(event) => event.stopPropagation()}
                          className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white shadow-lg py-2 z-10"
                        >
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => setOpenMenuId(null)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16v16H4z" />
                              <path d="M22 6L12 13 2 6" />
                            </svg>
                            Send Email
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => setOpenMenuId(null)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                              <path d="M9.5 12.5l2 2 4-4" />
                            </svg>
                            Change Role
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => setOpenMenuId(null)}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            Suspend User
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
