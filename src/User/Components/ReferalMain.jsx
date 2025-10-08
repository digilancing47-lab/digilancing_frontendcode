import React, { useEffect, useState, useRef } from "react";
import img1 from "../Assets/pro-ref.png"; // fallback photo
import { API_BASE } from "../../apiBase";
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 rounded-4xl">
      {/* Header */}
      <div className=" bg-[#003366] text-white text-center  text-lg sm:text-3xl md:text-5xl font-medium h-56 sm:h-64 md:h-72 rounded-3xl w-full  flex items-center justify-center px-3 sm:px-4  lg:max-w-6xl lg:mx-auto">
        <h1 className="text-4xl font-bold tracking-wide">REFERAL DETAILS</h1>
      </div>


      {/* Filters */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap gap-4 justify-between items-center mb-6 mt-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name / email / phone"
          className="px-4 py-2 rounded-lg w-full sm:w-96 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border border-gray-300 shadow-sm text-gray-700"
        />
        <div className="ml-auto flex items-center gap-2">
          <label className="text-gray-700 text-sm">Rows:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="px-3 py-2 rounded border border-gray-300 shadow-sm bg-white text-gray-700"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm text-left border-collapse min-w-[900px]">
          <thead className="bg-[#003B73] text-white uppercase text-xs tracking-wide">
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
              <tr>
                <td colSpan={7} className="py-6 text-center">
                  Loading...
                </td>
              </tr>
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
                      ? "bg-[#003B73] text-white font-semibold"
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
