import React, { useEffect, useState } from "react";
import { API_BASE } from "../../apiBase";
import { useNavigate } from "react-router-dom";

function AnimatedAmount({ value = 0, duration = 900, formatter }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf;
    let startTimestamp = null;
    if (!value) { setDisplay(0); return; }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [value, duration]);

  return <p className="text-2xl sm:text-3xl font-bold text-gray-900">{formatter ? formatter(display) : display}</p>;
}

function PackagePieChart({ dataObj = {}, loading = false }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let arr = [];
    if (Array.isArray(dataObj)) {
      arr = dataObj.map((d, i) => ({ id: d.id || d.label || `item-${i}`, pct: Number(d.pct ?? d.value ?? d.percentage ?? 0) }));
    } else if (dataObj && typeof dataObj === "object") {
      arr = Object.entries(dataObj).map(([k, v]) => ({ id: k, pct: Number(v) || 0 }));
    }

    if (arr.length === 0 || arr.every(x => x.pct === 0)) {
      arr = [
        { id: "DIGI0001", pct: 20 }, { id: "DIGI0002", pct: 15 },
        { id: "DIGI0003", pct: 25 }, { id: "DIGI0004", pct: 30 },
        { id: "DIGI0005", pct: 10 }
      ];
    }

    const total = arr.reduce((s, x) => s + x.pct, 0);
    setData(total > 0 ? arr.map((x) => ({ ...x, pct: (x.pct / total) * 100 })) : arr.map((x) => ({ ...x, pct: 0 })));
  }, [dataObj]);

  const packages = [
    { id: "DIGI0001", name: "Basic" }, { id: "DIGI0002", name: "Standard" },
    { id: "DIGI0003", name: "Advanced" }, { id: "DIGI0004", name: "Premium" },
    { id: "DIGI0005", name: "Ultimate" },
  ];

  const COLORS = ["#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444"];

  if (!data.length) return <div className="flex items-center justify-center h-48 text-sm text-gray-400">Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4" style={{
        background: `conic-gradient(${data.map((item, index) => {
          const start = data.slice(0, index).reduce((sum, d) => sum + (d.pct * 3.6), 0);
          return `${COLORS[index % COLORS.length]} ${start}deg ${start + (item.pct * 3.6)}deg`;
        }).join(', ')})`
      }}>
        <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-500">Packages</span>
        </div>
      </div>
      <div className="w-full space-y-2">
        {data.sort((a, b) => b.pct - a.pct).map((s) => {
          const pkgName = packages.find((p) => p.id === s.id)?.name || s.id;
          return (
            <div key={s.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: COLORS[data.findIndex(d => d.id === s.id) % COLORS.length] }} />
                <span className="text-gray-700">{pkgName}</span>
              </div>
              <span className="text-gray-900 font-semibold">{s.pct.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MainDashboard() {
  const packages = [
    { id: "DIGI0001", name: "Basic Package" }, { id: "DIGI0002", name: "Standard Package" },
    { id: "DIGI0003", name: "Advanced Package" }, { id: "DIGI0004", name: "Premium Package" },
    { id: "DIGI0005", name: "Ultimate Package" },
  ];

  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  let parsedUser = null;
  let enrolledid = null;
  try {
    parsedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    enrolledid = JSON.parse(sessionStorage.getItem("enrollment") || "null");
  } catch (e) {
    parsedUser = sessionStorage.getItem("user") || null;
    enrolledid = sessionStorage.getItem("enrollment") || null;
  }

  const user = parsedUser;
  const [guide_code] = useState(user?.guide_code || "");
  const [apiData, setApiData] = useState(null);
  const [Last6monthsearnings, setLast6monthsearnings] = useState([]);
  const [recentreferrals, setrecentreferrals] = useState([]);
  const [packagePercentages, setpackagePercentages] = useState({});
  const [packageCounts, setpackageCounts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!guide_code) return;
      const cachedData = sessionStorage.getItem(`dashboard_${guide_code}`);
      if (cachedData) { setApiData(JSON.parse(cachedData)); setLoading(false); return; }
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v_1/Affiliate/${guide_code}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setApiData(result?.data ?? null);
        sessionStorage.setItem(`dashboard`, JSON.stringify(result?.data ?? null));
      } catch (error) { setApiData(null); } finally { setLoading(false); }
    };
    fetchDashboard();
  }, [guide_code]);

  useEffect(() => {
    const fetchLast6 = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v_1/Affiliate/Last6monthsearnings/${guide_code}`);
        if (!res.ok) throw new Error("Failed");
        const result = await res.json();
        const payload = result?.data ?? result ?? {};
        setLast6monthsearnings(Array.isArray(payload) ? payload : Array.isArray(payload.monthly6) ? payload.monthly6 : []);
      } catch (error) { setLast6monthsearnings([]); } finally { setLoading(false); }
    };
    fetchLast6();
  }, [guide_code]);

  useEffect(() => {
    const fetchPackageData = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v_1/Affiliate/lastRecentEnrolls/${guide_code}`);
        if (!res.ok) throw new Error("Failed");
        const result = await res.json();
        setrecentreferrals(result.referrals || result.data?.referrals || []);
        let packagePerc = result.packagePercentages || result.data?.packagePercentages || {};
        if (Object.keys(packagePerc).length === 0) {
          packagePerc = { "DIGI0001": 20, "DIGI0002": 15, "DIGI0003": 25, "DIGI0004": 30, "DIGI0005": 10 };
        }
        setpackagePercentages(packagePerc);
        setpackageCounts(result.packageCounts || result.data?.packageCounts || []);
      } catch (error) {
        setpackagePercentages({ "DIGI0001": 20, "DIGI0002": 15, "DIGI0003": 25, "DIGI0004": 30, "DIGI0005": 10 });
      } finally { setLoading(false); }
    };
    fetchPackageData();
  }, [guide_code]);

  const [LeaderBoard, setLeaderBoard] = useState([]);
  const [customerrank, setrank] = useState([]);
  useEffect(() => {
    const fetchRank = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v_1/Affiliate/rankposition/${guide_code}`);
        if (!res.ok) throw new Error("Failed");
        const result = await res.json();
        setrank(result.data.target.rank);
        setLeaderBoard(result.data.window);
      } catch (error) {} finally { setLoading(false); }
    };
    fetchRank();
  }, [guide_code]);

  const inrFormatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading user profile...</div>;
  }

  const last6 = Array.isArray(Last6monthsearnings) ? Last6monthsearnings : [];
  const maxTotal = last6.length ? Math.max(...last6.map((m) => Number(m.total || 0))) : 1;
  const graph = last6.map((item) => {
    const monthLabel = (item.label || item.month || "").split(" ")[0] || "-";
    const total = Number(item.total || 0);
    const height = maxTotal > 0 ? (total / maxTotal) * 200 : 0;
    return { month: monthLabel, value: `₹${total.toLocaleString()}`, height, count: item.count || 0 };
  });

  const enrolledPackageName = packages.find((pkg) => pkg.id === enrolledid?.package_id)?.name || "Unknown Package";
  const fmtCurrency = (amtStr) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(amtStr || 0));

  const earningsData = apiData ? [
    { id: "today", label: "Today's Earning", amountNum: Number(apiData.today?.total || 0), count: apiData.today?.count },
    { id: "last7", label: "Last 7 Days", amountNum: Number(apiData.last7Days?.total || 0), count: apiData.last7Days?.count },
    { id: "last30", label: "Last 30 Days", amountNum: Number(apiData.last30Days?.total || 0), count: apiData.last30Days?.count },
    { id: "allTime", label: "All Time", amountNum: Number(apiData.allTime?.total || 0), count: apiData.allTime?.count },
  ] : [];

  const earningColors = [
    "from-[#3b82f6] to-[#1e3a8a]",
    "from-[#06b6d4] to-[#0891b2]",
    "from-[#8b5cf6] to-[#6d28d9]",
    "from-[#f59e0b] to-[#d97706]",
  ];

  return (
    <main className="flex-1 p-2 md:p-6 bg-white relative affiliate-panel">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
          <div className="bg-white rounded-xl px-6 py-4 flex items-center gap-4 shadow-lg">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <div>
              <div className="text-sm font-medium text-gray-700">Fetching dashboard...</div>
              <div className="text-xs text-gray-400">Please wait</div>
            </div>
          </div>
        </div>
      )}

      {/* Greeting Banner */}
      <div className="rounded-3xl p-6 md:p-8 mb-6 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4]">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left - Big Profile Image */}
          <div className="relative w-full lg:w-[400px] flex-shrink-0">
          <div className="relative h-[260px] rounded-3xl overflow-hidden shadow-lg">
            {user.customer_image ? (
              <img src={user.customer_image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] text-white/60 font-bold text-[120px] uppercase">
                {user.fullname?.slice(0, 2)}
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3">
              <h2 className="text-sm sm:text-base uppercase font-semibold text-gray-900">{user.fullname}</h2>
              <p className="text-[11px] sm:text-xs text-gray-600 truncate">ID: {user.guide_code} • {enrolledPackageName}</p>
            </div>
          </div>
          </div>

          {/* Right - 2x2 Earnings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {loading && earningsData.length === 0 ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="rounded-2xl p-3 bg-white/30 animate-pulse h-auto" />
              ))
            ) : (
              earningsData.map((earning, i) => (
                <div key={earning.id} className={`bg-gradient-to-br ${earningColors[i]} rounded-2xl px-3 py-2 sm:p-5 sm:h-[130px] flex flex-col justify-center shadow-md`}>
                  <p className="text-white/80 text-[10px] sm:text-xs font-medium">{earning.label}</p>
                  <div>
                    <AnimatedAmount
                      value={earning.amountNum || 0}
                      duration={900}
                      formatter={(n) => <span className="text-white text-sm sm:text-2xl font-bold">{inrFormatter.format(n)}</span>}
                    />
                  </div>
                  {earning.count !== undefined && (
                    <p className="text-white/60 text-xs mt-1">{earning.count} referrals</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Graph + Packages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Earning Graph */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900">Earning Graph</h3>
            <span className="text-xs bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-medium">Last 6 months</span>
          </div>
          <div className="flex items-end justify-between gap-2 h-[220px] px-2">
            {loading && graph.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-400">Loading graph...</div>
            ) : graph.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-sm text-gray-400">No earnings data</div>
            ) : (
              graph.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1 relative group">
                  <div className="w-full max-w-[40px] rounded-t-lg cursor-pointer relative transition-all hover:opacity-80"
                    style={{ height: `${bar.height}px`, background: "linear-gradient(180deg, #06b6d4 0%, #1e3a8a 100%)" }}>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                      {bar.value}{bar.count ? ` • ${bar.count}` : ""}
                    </span>
                  </div>
                  <span className="text-xs mt-2 text-gray-500 font-medium">{bar.month}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Packages Pie */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg text-gray-900 mb-4">Packages</h3>
          <PackagePieChart dataObj={packagePercentages} loading={loading} />
        </div>
      </div>

      {/* Recent Referrals - Full Width */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Your Recent Referrals</h3>
          <button onClick={() => Navigate('/ReferalDetails')} className="text-xs cursor-pointer bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full font-medium hover:bg-blue-100 transition">
            See all
          </button>
        </div>
        <div className="space-y-3">
          {loading && recentreferrals.length === 0 ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex justify-between items-center animate-pulse py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex flex-col gap-1">
                    <div className="w-36 h-4 bg-gray-200 rounded" />
                    <div className="w-20 h-3 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="w-16 h-5 bg-gray-200 rounded" />
              </div>
            ))
          ) : recentreferrals.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No referrals yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentreferrals.map((ref, idx) => {
                const pkg = packages.find((p) => p.id === ref.package_id)?.name || ref.package_id || "Unknown Package";
                const img = ref.customer_image;
                const earned = fmtCurrency(ref.amount);
                return (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3">
                      {img ? (
                        <img src={img} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] text-white font-bold text-sm uppercase">
                          {ref.fullname?.slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold text-gray-900 capitalize">{ref.fullname}</span>
                        <p className="text-xs text-gray-500">{pkg}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{earned}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
