import React from "react";

const EWallet: React.FC = () => {

  const quickActions = [
    { label: "Top Up", icon: "➕" },
    { label: "Withdraw", icon: "⬇️" },
    { label: "Send", icon: "✉️" },
  ];

  const stats = [
    { label: "This Month Income", value: "₱43,000", badge: "+24%", badgeColor: "bg-green-100 text-green-700" },
    { label: "Pending Payments", value: "₱18,500", badge: "8 Jobs", badgeColor: "bg-blue-100 text-blue-700" },
    { label: "Completed Jobs", value: "₱82,000", badge: "12 Total", badgeColor: "bg-yellow-100 text-yellow-700" },
  ];

  const transactions = [
    {
      id: 1,
      title: "Payment received from Tech Solutions Inc.",
      date: "Feb 1, 2026",
      type: "Job Payment",
      amount: "+₱25,000",
      status: "Completed",
      isCredit: true,
    },
    {
      id: 2,
      title: "Withdrawal to Bank Account",
      date: "Jan 30, 2026",
      type: "Withdrawal",
      amount: "-₱10,000",
      status: "Completed",
      isCredit: false,
    },
    {
      id: 3,
      title: "Payment received from Innovation Labs",
      date: "Jan 28, 2026",
      type: "Job Payment",
      amount: "+₱18,000",
      status: "Completed",
      isCredit: true,
    },
    {
      id: 4,
      title: "Platform Fee",
      date: "Jan 28, 2026",
      type: "Fee",
      amount: "-₱500",
      status: "Completed",
      isCredit: false,
    },
    {
      id: 5,
      title: "Bonus Payment",
      date: "Jan 25, 2026",
      type: "Bonus",
      amount: "+₱5,000",
      status: "Completed",
      isCredit: true,
    },
  ];

  return (
    <div>
      <div className="bg-white px-8 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">E-Wallet</h1>
          <div className="flex items-center gap-3">
            <button className="relative h-9 w-9 rounded-full border border-sky-200 flex items-center justify-center text-sky-600">
              🔔
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <div className="h-9 w-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
          <div className="bg-gradient-to-r from-sky-600 to-sky-400 rounded-2xl p-6 text-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sky-100 text-base">Total Balance</p>
                <h2 className="text-4xl font-extrabold mt-1">₱71,201</h2>
              </div>
              <button className="h-12 w-12 rounded-xl bg-white/30 text-white flex items-center justify-center text-xl">
                ➕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sky-100 text-sm">Total Income</p>
                <p className="text-2xl font-bold">₱82,000</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-sky-100 text-sm">Total Expenses</p>
                <p className="text-2xl font-bold">₱10,799</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  className="bg-white/25 hover:bg-white/35 transition rounded-xl py-3 font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <span className="text-lg">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 text-base">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
              <button className="text-sky-600 text-sm font-semibold hover:text-sky-700">
                View All →
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${tx.isCredit ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {tx.isCredit ? "➕" : "➖"}
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-base">{tx.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{tx.date}</span>
                        <span>•</span>
                        <span>{tx.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${tx.isCredit ? "text-green-600" : "text-red-500"}`}>{tx.amount}</p>
                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default EWallet;
