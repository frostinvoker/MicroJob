import React, { useMemo, useState } from "react";

type TransactionStatus = "completed" | "pending" | "flagged";

type Transaction = {
  id: string;
  user: string;
  email: string;
  type: "Deposit" | "Withdrawal" | "Payment" | "Transfer";
  amount: number;
  status: TransactionStatus;
  riskScore: number;
  date: string;
};

const transactions: Transaction[] = [
  {
    id: "TXN-2026-001",
    user: "John Doe",
    email: "john@example.com",
    type: "Withdrawal",
    amount: -12500,
    status: "flagged",
    riskScore: 85,
    date: "Feb 7, 00:14",
  },
  {
    id: "TXN-2026-002",
    user: "Jane Smith",
    email: "jane@example.com",
    type: "Deposit",
    amount: 500,
    status: "completed",
    riskScore: 5,
    date: "Feb 7, 00:14",
  },
  {
    id: "TXN-2026-003",
    user: "Henry Garcia",
    email: "henry@example.com",
    type: "Withdrawal",
    amount: -8200,
    status: "flagged",
    riskScore: 78,
    date: "Feb 6, 18:42",
  },
  {
    id: "TXN-2026-004",
    user: "Monica Lee",
    email: "monica@example.com",
    type: "Payment",
    amount: 260,
    status: "completed",
    riskScore: 12,
    date: "Feb 6, 09:10",
  },
  {
    id: "TXN-2026-005",
    user: "Rafael Cruz",
    email: "rafael@example.com",
    type: "Transfer",
    amount: -3200,
    status: "pending",
    riskScore: 58,
    date: "Feb 5, 22:41",
  },
  {
    id: "TXN-2026-006",
    user: "Lena Patel",
    email: "lena@example.com",
    type: "Withdrawal",
    amount: -9500,
    status: "flagged",
    riskScore: 92,
    date: "Feb 5, 21:22",
  },
  {
    id: "TXN-2026-007",
    user: "Owen Park",
    email: "owen@example.com",
    type: "Deposit",
    amount: 1200,
    status: "completed",
    riskScore: 18,
    date: "Feb 5, 12:02",
  },
];

const EWalletMonitoring: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "flagged" | "high">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | TransactionStatus>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | Transaction["type"]>("all");

  const totals = useMemo(() => {
    const totalVolume = transactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
    const completed = transactions.filter((txn) => txn.status === "completed").length;
    const flagged = transactions.filter((txn) => txn.status === "flagged").length;
    const highRisk = transactions.filter((txn) => txn.riskScore >= 70).length;
    return { totalVolume, completed, flagged, highRisk };
  }, []);

  const filtered = useMemo(() => {
    let data = transactions;

    if (activeTab === "flagged") {
      data = data.filter((txn) => txn.status === "flagged");
    }

    if (activeTab === "high") {
      data = data.filter((txn) => txn.riskScore >= 70);
    }

    if (statusFilter !== "all") {
      data = data.filter((txn) => txn.status === statusFilter);
    }

    if (typeFilter !== "all") {
      data = data.filter((txn) => txn.type === typeFilter);
    }

    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (txn) =>
        txn.user.toLowerCase().includes(q) ||
        txn.email.toLowerCase().includes(q) ||
        txn.id.toLowerCase().includes(q)
    );
  }, [activeTab, query, statusFilter, typeFilter]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const formatAmount = (amount: number) => {
    const sign = amount < 0 ? "-" : "+";
    return `${sign}${currencyFormatter.format(Math.abs(amount))}`;
  };

  const riskStyles = (score: number) => {
    if (score >= 70) {
      return {
        bar: "bg-red-500",
        pill: "bg-red-100 text-red-600",
      };
    }
    if (score >= 40) {
      return {
        bar: "bg-amber-500",
        pill: "bg-amber-100 text-amber-600",
      };
    }
    return {
      bar: "bg-emerald-500",
      pill: "bg-emerald-100 text-emerald-600",
    };
  };

  const statusStyles: Record<TransactionStatus, string> = {
    completed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    flagged: "bg-red-100 text-red-700",
  };

  const amountColor = (amount: number) => (amount < 0 ? "text-red-600" : "text-emerald-600");

  const typeIcon = (type: Transaction["type"]) => {
    if (type === "Withdrawal") {
      return (
        <span className="text-red-500" aria-hidden="true">
          ↗
        </span>
      );
    }
    if (type === "Deposit") {
      return (
        <span className="text-emerald-600" aria-hidden="true">
          ↙
        </span>
      );
    }
    return (
      <span className="text-blue-600" aria-hidden="true">
        $
      </span>
    );
  };

  const stats = [
    {
      label: "Total Volume",
      value: currencyFormatter.format(totals.totalVolume),
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      bg: "bg-blue-100",
    },
    {
      label: "Completed",
      value: totals.completed,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-emerald-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-6.3-9.2" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      bg: "bg-emerald-100",
    },
    {
      label: "Flagged",
      value: totals.flagged,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
          <path d="M12 8v4" />
          <circle cx="12" cy="15.5" r="1" />
        </svg>
      ),
      bg: "bg-red-100",
      accent: "border-l-4 border-red-500",
    },
    {
      label: "High Risk",
      value: totals.highRisk,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-amber-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-2.4 3.6c-1.8.8-2.6 1.8-2.6 3.4" />
          <path d="M12 16v2" />
          <path d="M9 20h6" />
        </svg>
      ),
      bg: "bg-amber-100",
      accent: "border-l-4 border-amber-500",
    },
  ];

  const tabs = [
    { key: "all" as const, label: "All Transactions" },
    { key: "flagged" as const, label: `Flagged (${totals.flagged})` },
    { key: "high" as const, label: `High Risk (${totals.highRisk})` },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Wallet Monitoring</h1>
        <p className="text-gray-600">AI-powered fraud detection and transaction monitoring</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
              <path d="M12 8v4" />
              <circle cx="12" cy="15.5" r="1" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-red-700">Attention Required</p>
            <p className="text-sm text-red-600">{totals.flagged} flagged transactions awaiting review</p>
          </div>
        </div>
        <button className="bg-red-500 text-white font-semibold px-5 py-2 rounded-xl shadow-sm hover:bg-red-600">
          Review Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4 ${stat.accent ?? ""}`}
          >
            <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center`}>{stat.icon}</div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 leading-tight">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeTab === tab.key
                ? "bg-white shadow-sm border border-gray-200 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-xl bg-white">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-gray-400"
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
              placeholder="Search by user, email, or transaction ID..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="min-w-[180px]">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "all" | TransactionStatus)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
            <div className="min-w-[180px]">
              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as "all" | Transaction["type"])}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Payment">Payment</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[minmax(180px,1.2fr)_minmax(200px,1.4fr)_minmax(140px,0.8fr)_minmax(180px,1fr)_minmax(140px,0.8fr)_minmax(140px,0.8fr)_minmax(120px,0.6fr)] gap-4 px-6 py-4 text-sm font-semibold text-gray-600 bg-gray-50">
              <div>Transaction</div>
              <div>User</div>
              <div>Amount</div>
              <div>Risk Score</div>
              <div>Status</div>
              <div>Date</div>
              <div className="text-center">Actions</div>
            </div>

            {filtered.length === 0 ? (
              <div className="px-6 py-12 text-sm text-gray-500">No transactions match your filters.</div>
            ) : (
              filtered.map((txn) => {
                const risk = riskStyles(txn.riskScore);
                return (
                  <div
                    key={txn.id}
                    className={`grid grid-cols-[minmax(180px,1.2fr)_minmax(200px,1.4fr)_minmax(140px,0.8fr)_minmax(180px,1fr)_minmax(140px,0.8fr)_minmax(140px,0.8fr)_minmax(120px,0.6fr)] gap-4 px-6 py-5 items-center border-t border-gray-100 ${
                      txn.status === "flagged" ? "bg-red-50/60" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-base">
                        {typeIcon(txn.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{txn.id}</p>
                        <p className="text-sm text-gray-500">{txn.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{txn.user}</p>
                      <p className="text-sm text-gray-500">{txn.email}</p>
                    </div>
                    <div className={`text-lg font-semibold ${amountColor(txn.amount)}`}>
                      {formatAmount(txn.amount)}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full ${risk.bar}`} style={{ width: `${txn.riskScore}%` }} />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${risk.pill}`}>
                        {txn.riskScore}%
                      </span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[txn.status]}`}>
                        {txn.status === "flagged" && (
                          <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
                            <path d="M12 8v4" />
                            <circle cx="12" cy="15.5" r="1" />
                          </svg>
                        )}
                        {txn.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{txn.date}</div>
                    <div className="flex items-center justify-center gap-3 text-gray-400">
                      <button
                        className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-purple-500 hover:bg-purple-50"
                        aria-label="AI review"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 3v6" />
                          <path d="M12 15v6" />
                          <path d="M6 9h6" />
                          <path d="M12 9h6" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        aria-label="View transaction"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                        aria-label="More actions"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                          <circle cx="12" cy="5" r="1.8" />
                          <circle cx="12" cy="12" r="1.8" />
                          <circle cx="12" cy="19" r="1.8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EWalletMonitoring;
