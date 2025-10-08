import React from "react";

export default function PayoutDetails() {
  const data = [
    { id: 1, status: "Paid", amount: "₹4,000", date: "2025-04-27 23:59:03" },
    { id: 2, status: "Pending", amount: "₹2,500", date: "2025-05-02 12:15:45" },
    { id: 3, status: "Failed", amount: "₹3,200", date: "2025-05-12 18:30:10" },
    { id: 4, status: "Paid", amount: "₹7,000", date: "2025-06-01 10:45:00" },
    { id: 5, status: "Pending", amount: "₹1,200", date: "2025-06-08 09:25:18" },
    { id: 6, status: "Paid", amount: "₹9,800", date: "2025-06-15 14:55:40" },
    { id: 7, status: "Failed", amount: "₹5,000", date: "2025-07-01 19:12:05" },
    { id: 8, status: "Paid", amount: "₹6,400", date: "2025-07-10 11:05:30" },
  ];

  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 rounded-4xl">
      {/* Header */}
      <div className=" bg-[#003366] text-white text-center  text-lg sm:text-3xl md:text-5xl font-medium h-56 sm:h-64 md:h-72 rounded-3xl w-full  flex items-center justify-center  mt-5 px-3 sm:px-4  lg:max-w-6xl lg:mx-auto">
        <h1 className="text-4xl font-bold tracking-wide">   PAYOUT DETAILS</h1>
      </div>

      {/* Search */}
      <div className="w-full max-w-6xl mx-auto flex justify-end mb-6 mt-5">
        <input
          type="text"
          placeholder="Search by Status or Amount"
          className="px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#003B73] bg-white border border-gray-300 shadow-sm text-gray-700"
        />
      </div>

      {/* Table */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-[#003B73] text-white uppercase text-xs tracking-wide">
            <tr>
              <th className="py-3 px-4">S.No</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Paid Amount</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {index + 1}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`${statusColors[item.status]} w-20 text-center px-3 py-1 rounded-full text-xs font-semibold inline-block`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-800">{item.amount}</td>
                <td className="py-3 px-4 text-gray-600">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between items-center px-4 py-4 text-sm text-gray-600 bg-gray-100 border-t">
          <span>
            Showing 1 to {data.length} of {data.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-200 transition">
              Previous
            </button>
            <span className="px-3 py-1 border rounded bg-[#003B73] text-white font-semibold">
              1
            </span>
            <button className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-200 transition">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
