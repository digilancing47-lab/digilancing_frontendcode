import React, { useEffect, useState, useRef } from "react";
import img1 from "../../User/Assets/pro-ref.png"; // fallback photo
import { API_BASE } from "../../apiBase";
import referal from '/referal.avif'

export default function ReferralDetails() {
  // read user from sessionStorage
  let parsedUser = null;
  try {
    parsedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  } catch (e) {
    parsedUser = sessionStorage.getItem("user") || null;
  }
  const user = parsedUser;
  const guide_code = user?.guide_code || "";


  const packages = [
    { id: "DIGI0001", name: "Basic Package" },
    { id: "DIGI0002", name: "Standard Package" },
    { id: "DIGI0003", name: "Advanced Package" },
    { id: "DIGI0004", name: "Premium Package" },
    { id: "DIGI0005", name: "Ultimate Package" },
  ];

  // UI state
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [packageFilter, setPackageFilter] = useState("");

  // debounce search
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setPage(1);
      fetchData(1, limit, search, packageFilter);
    }, 400);
    return () => clearTimeout(searchRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, packageFilter]);

  useEffect(() => {
    fetchData(page, limit, search, packageFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  async function fetchData(p = 1, lim = 10, q = "", pkg = "") {
    if (!guide_code) {
      setError("Guide code not available in sessionStorage (user.guide_code)");
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = new URL(`${API_BASE}/api/v_1/Affiliate/refferallist/${guide_code}`);
      url.searchParams.set("page", p);
      url.searchParams.set("limit", lim);
      if (q) url.searchParams.set("search", q);
      if (pkg) url.searchParams.set("package", pkg);

      const res = await fetch(url.toString(), { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      if (!json.success) throw new Error(json.message || "API returned success: false");

      setData(Array.isArray(json.data) ? json.data : []);
      setPage(json.page || p);
      setTotalPages(json.totalPages || Math.max(1, Math.ceil((json.total || 0) / lim)));
      setTotal(json.total ?? (json.count || (json.data || []).length));
    } catch (err) {
      console.error("fetchData error:", err);
      setError(err.message || "Failed to fetch");
      setData([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  function gotoPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  function handleLimitChange(e) {
    const newLimit = parseInt(e.target.value, 10) || 10;
    setLimit(newLimit);
    setPage(1);
    fetchData(1, newLimit, search, packageFilter);
  }

  function displayPackageName(pkgId) {
    return packages.find((p) => p.id === pkgId)?.name || pkgId || "-";
  }

  return (
    <div className="flex-1 bg-white  rounded-3xl backdrop-blur-xl border border-white/10 p-3 relative">
      {/* Header */}
      <div className="relative w-full cursor-default text-white text-center h-[250px] rounded-4xl mb-3 overflow-hidden">
        <img src={referal} alt="Referral Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/70 via-[#3b82f6]/50 to-[#06b6d4]/60" />
        <div className="relative flex flex-col items-center justify-center h-full">
         <h1 className=" text-2xl lg:text-3xl font-bold text-white">REFERRAL DETAILS</h1>
          <p className="text-white/80 text-sm mt-2">Track and manage your referral network</p>
        </div>
      </div>


      {/* Filters */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap gap-4 justify-between items-center mb-6 mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name / email / phone"
          className="px-4 py-3 rounded-lg w-full sm:w-96 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-gray-300 shadow-sm text-gray-700"
        />
        <div className="ml-auto flex items-center gap-2">
          <label className="text-gray-700 text-sm">Rows:</label>
          <div className="relative">
            <select
              value={limit}
              onChange={handleLimitChange}
              className="appearance-none px-3 py-1 pr-8 rounded border border-gray-300 shadow-sm bg-white text-gray-700"
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full  mx-auto bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-[900px]">
          <thead className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white uppercase text-xs tracking-wide">
            <tr>
              <th className="py-3 px-4">S.no</th>
              <th className="py-3 px-4">Photo</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: limit }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3 px-4"><div className="h-4 w-6 bg-gray-200 rounded"></div></td>
                  <td className="py-3 px-4"><div className="h-10 w-10 bg-gray-200 rounded-full"></div></td>
                  <td className="py-3 px-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                  <td className="py-3 px-4"><div className="h-4 w-28 bg-gray-200 rounded"></div></td>
                  <td className="py-3 px-4"><div className="h-4 w-36 bg-gray-200 rounded"></div></td>
                  <td className="py-3 px-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                  <td className="py-3 px-4"><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-red-500 font-medium">
                  {error}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No referrals found.
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.order_id || index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={item.customer_image || img1}
                      onError={(e) => (e.currentTarget.src = img1)}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  </td>
                  <td className="py-3 px-4 text-gray-800">{item.name}</td>
                  <td className="py-3 px-4 text-gray-800">{displayPackageName(item.package_id)}</td>
                  <td className="py-3 px-4 text-gray-600">{item.email}</td>
                  <td className="py-3 px-4 text-gray-600">{item.phone}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(item.enrolled_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center px-4 py-4 text-sm text-gray-600 bg-gray-100 border-t gap-3">
          <span>
            Showing {Math.min((page - 1) * limit + 1, total || 0)} to{" "}
            {Math.min(page * limit, total || data.length)} of {total} entries
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => gotoPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                const start = Math.max(1, Math.min(page - 3, Math.max(1, totalPages - 6)));
                const pageNum = start + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => gotoPage(pageNum)}
                    className={`px-3 py-1 border rounded ${page === pageNum
                      ? "bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white font-semibold"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => gotoPage(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
