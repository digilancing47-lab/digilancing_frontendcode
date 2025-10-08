import React, { useEffect, useState } from "react";
import walletIcon from "../Assets/wallet.png";
import upro from "../Assets/u_pro.png";
import { referrals as mockReferrals, leaderboard as mockLeaderboard } from "../Components/Mockdata";
import { API_BASE } from "../../apiBase";

// ---- Animated counter component (paste above MainDashboard) ----
function AnimatedAmount({ value = 0, duration = 900, formatter }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf;
    let startTimestamp = null;

    // if value is 0, just set immediately
    if (!value) {
      setDisplay(0);
      return;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1); // 0..1
      const current = Math.round(value * progress); // linear easing
      setDisplay(current);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <p className="text-white text-lg sm:text-3xl font-bold">{formatter ? formatter(display) : display}</p>;
}


function PackagePieChart({ dataObj = {}, size = 220, innerRadiusPct = 0.62, loading = false }) {
  const [data, setData] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: "" });

  useEffect(() => {
    let arr = [];
    if (Array.isArray(dataObj)) {
      arr = dataObj.map((d, i) => ({ id: d.id || d.label || `item-${i}`, pct: Number(d.pct ?? d.value ?? d.percentage ?? 0) }));
    } else if (dataObj && typeof dataObj === "object") {
      arr = Object.entries(dataObj).map(([k, v]) => ({ id: k, pct: Number(v) || 0 }));
    }
    const total = arr.reduce((s, x) => s + x.pct, 0);
    const normalized = total > 0 ? arr.map((x) => ({ ...x, pct: (x.pct / total) * 100 })) : arr.map((x) => ({ ...x, pct: 0 }));
    setData(normalized);
  }, [dataObj]);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 2;
  const innerR = radius * innerRadiusPct;

  function polarToCartesian(cx, cy, r, angleDeg) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
  }

  function describeDonutSlice(cx, cy, rOuter, rInner, startAngle, endAngle) {
    const startOuter = polarToCartesian(cx, cy, rOuter, endAngle);
    const endOuter = polarToCartesian(cx, cy, rOuter, startAngle);
    const startInner = polarToCartesian(cx, cy, rInner, startAngle);
    const endInner = polarToCartesian(cx, cy, rInner, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${startInner.x} ${startInner.y}`,
      `A ${rInner} ${rInner} 0 ${largeArcFlag} 1 ${endInner.x} ${endInner.y}`,
      "Z",
    ].join(" ");
  }

  const COLORS = ["#1E6FFF", "#4A90E2", "#00C49F", "#FFBB28", "#FF6B6B", "#7E57C2", "#E91E63", "#00A3FF"];

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const startAngle = (cumulative / 100) * 360;
    cumulative += d.pct;
    const endAngle = (cumulative / 100) * 360;
    return { ...d, startAngle, endAngle, color: COLORS[i % COLORS.length], index: i };
  });

  function handleMouseEnter(e, seg) {
    setHovered(seg.index);
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const packageName = packages.find((p) => p.id === seg.id)?.name || seg.id;

    setTooltip({
      show: true,
      x,
      y,
      text: `${packageName} : ${seg.pct.toFixed(2)}%`,
    });
  }
  function handleMouseMove(e) {
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTooltip((t) => ({ ...t, x, y }));
  }
  function handleMouseLeave() {
    setHovered(null);
    setTooltip({ show: false, x: 0, y: 0, text: "" });
  }

  const packages = [
    { id: "DIGI0001", name: "Basic Package" },
    { id: "DIGI0002", name: "Standard Package" },
    { id: "DIGI0003", name: "Advanced Package" },
    { id: "DIGI0004", name: "Premium Package" },
    { id: "DIGI0005", name: "Ultimate Package" },
  ];

  if (!segments.length) {
    return <div className="text-sm text-gray-500">No package data available</div>;
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="w-full cursor-pointer h-auto">
        <g>
          {segments.map((seg) => (
            <path
              key={seg.id}
              d={describeDonutSlice(cx, cy, radius, innerR, seg.startAngle, seg.endAngle)}
              fill={seg.color}
              opacity={hovered === null ? 1 : hovered === seg.index ? 1 : 0.45}
              stroke={hovered === seg.index ? "#222" : "transparent"}
              strokeWidth={hovered === seg.index ? 2 : 0}
              onMouseEnter={(e) => handleMouseEnter(e, seg)}
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={handleMouseLeave}
              style={{ transition: "opacity 120ms, transform 120ms" }}
            />
          ))}
          <circle cx={cx} cy={cy} r={innerR - 1} fill="#F9FAFB" />
        </g>
      </svg>

      {tooltip.show && (
        <div
          className="absolute z-20 text-sm bg-white border shadow-md px-3 py-1 rounded-md text-black"
          style={{ left: Math.min(size - 120, Math.max(8, tooltip.x + 8)), top: Math.min(size - 40, Math.max(8, tooltip.y + 8)), pointerEvents: "none" }}
        >
          {tooltip.text}
        </div>
      )}

      <div className="w-full mt-3 grid grid-cols-1 gap-2">
        {segments
          .slice()
          .sort((a, b) => b.pct - a.pct)
          .map((s) => {
            const pkgName = packages.find((p) => p.id === s.id)?.name || s.id;
            return (
              <div
                key={s.id}
                className="flex items-center justify-between text-sm"
                onMouseEnter={() => setHovered(s.index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-4 rounded-sm inline-block" style={{ background: s.color }} />
                  <span className="truncate text-sm">{pkgName}</span>
                </div>
                <div className="text-gray-600 text-lg font-bold">{s.pct.toFixed(2)}%</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

// -------------------------
// Main Dashboard (updated)
// -------------------------
export default function MainDashboard() {
  const packages = [
    { id: "DIGI0001", name: "Basic Package" },
    { id: "DIGI0002", name: "Standard Package" },
    { id: "DIGI0003", name: "Advanced Package" },
    { id: "DIGI0004", name: "Premium Package" },
    { id: "DIGI0005", name: "Ultimate Package" },
  ];

  // load mock lists into state (simulate)
  const [loading, setLoading] = useState(false);
  // parse user & enrollment from sessionStorage
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

  // api data + loading
  const [apiData, setApiData] = useState(null);
  const [Last6monthsearnings, setLast6monthsearnings] = useState([]);

  // Recent referreal and package enrolled - robust extraction
  const [recentreferrals, setrecentreferrals] = useState([]);
  const [packagePercentages, setpackagePercentages] = useState({}); // store as object by default
  const [packageCounts, setpackageCounts] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!guide_code) return;
      const cachedData = sessionStorage.getItem(`dashboard_${guide_code}`);
      if (cachedData) {
        setApiData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/v_1/Affiliate/${guide_code}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();

        setApiData(result?.data ?? null);
        sessionStorage.setItem(
          `dashboard`,
          JSON.stringify(result?.data ?? null)
        );
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [guide_code]);


  // fetch last 6 months earnings - robust extraction
  useEffect(() => {
    const fetchLast6 = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v_1/Affiliate/Last6monthsearnings/${guide_code}`);
        if (!res.ok) throw new Error("Failed to fetch last6 data");
        const result = await res.json();
        const payload = result?.data ?? result ?? {};
        const arr = Array.isArray(payload) ? payload : Array.isArray(payload.monthly6) ? payload.monthly6 : [];
        setLast6monthsearnings(arr);
      } catch (error) {
        console.error("Error fetching last6:", error);
        setLast6monthsearnings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLast6();
  }, [guide_code]);

  // fetch recent enrolls + package stats
  useEffect(() => {
    const fetchLast6 = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/v_1/Affiliate/lastRecentEnrolls/${guide_code}`);
        if (!res.ok) throw new Error("Failed to fetch last6 data");
        const result = await res.json();
        // defensive: ensure we store an object for packagePercentages
        setrecentreferrals(result.referrals || []);
        setpackagePercentages(result.packagePercentages || result.packagePercentagesObj || {});
        setpackageCounts(result.packageCounts || []);
      } catch (error) {
        console.error("Error fetching last6:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLast6();
  }, [guide_code]);

  // Rank
  const [LeaderBoard, setLeaderBoard] = useState([]);
  const [customerrank, setrank] = useState([]);
  useEffect(() => {
    const fetchDashboard = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/v_1/Affiliate/rankposition/${guide_code}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        setrank(result.data.target.rank);
        setLeaderBoard(result.data.window);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [guide_code]);

  const inrFormatter = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-[#002E5D]">Loading user profile...</div>
    );
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
  const fmtCurrency = (amtStr) => {
    const num = Number(amtStr || 0);
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);
  };




  const earningsData = apiData
    ? [
      {
        id: "today",
        label: "Today's Earning",
        amount: inrFormatter.format(Number(apiData.today?.total || 0)),
        amountNum: Number(apiData.today?.total || 0),
        count: apiData.today?.count,
      },
      {
        id: "last7",
        label: "Last 7 Days Earnings",
        amount: inrFormatter.format(Number(apiData.last7Days?.total || 0)),
        amountNum: Number(apiData.last7Days?.total || 0),
        count: apiData.last7Days?.count,
      },
      {
        id: "last30",
        label: "Last 30 Days Earnings",
        amount: inrFormatter.format(Number(apiData.last30Days?.total || 0)),
        amountNum: Number(apiData.last30Days?.total || 0),
        count: apiData.last30Days?.count,
      },
      {
        id: "allTime",
        label: "All Time Earning",
        amount: inrFormatter.format(Number(apiData.allTime?.total || 0)),
        amountNum: Number(apiData.allTime?.total || 0),
        count: apiData.allTime?.count,
      },
    ]
    : [];


  return (
    <main className="flex-1 p-0 bg-[#002E5D] relative">
      {/* Full-page translucent loader overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl px-6 py-4 flex items-center gap-4 shadow-lg">
            <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
            <div>
              <div className="text-sm font-medium">Fetching dashboard...</div>
              <div className="text-xs text-gray-500">Please wait</div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col text-[#000000] font-sans">
        {/* Top Section */}
        <div className="bg-[#EBF5EB] rounded-3xl p-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative w-full lg:w-[350px] h-[220px] rounded-4xl overflow-hidden shadow-md flex-shrink-0">
              {user.customer_image ? (
                <img src={user.customer_image} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="h-full w-full mx-auto flex items-center  justify-center bg-gradient-to-r from-indigo-500  to-indigo-300 text-white/60 font-bold text-[150px] uppercase">
                  {user.fullname?.slice(0, 2)}
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-2xl shadow-md px-4 py-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-sm sm:text-base uppercase font-semibold text-black">{user.fullname}</h2>
                  <p className="text-[11px] sm:text-xs text-gray-600 truncate">ID: {user.guide_code} | {enrolledPackageName} <span className="text-[#0088FF] font-medium">{user.role}</span></p>
                </div>
              </div>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 flex-1">
              {loading && earningsData.length === 0 ? (
                // skeletons while loading
                <>
                  <div className="bg-[#2264EC] rounded-2xl p-4 sm:p-6 flex flex-col justify-center shadow-md animate-pulse h-28" />
                  <div className="bg-[#2264EC] rounded-2xl p-4 sm:p-6 flex flex-col justify-center shadow-md animate-pulse h-28" />
                </>
              ) : (
                earningsData.map((earning) => (
                  <div key={earning.id} className="bg-[#2264EC] rounded-2xl p-4 sm:p-6 flex flex-col justify-center shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white rounded-full">
                        <img src="/money-bag.svg" alt="" className="w-6" />
                      </div>
                      <div className="">
                        <p className="text-gray-200 text-xs sm:text-[12px]">{earning.label}</p>

                        {/* Animated amount: uses numeric value; falls back to formatted string if you want */}
                        <AnimatedAmount
                          value={earning.amountNum || 0}
                          duration={900}
                          formatter={(n) => inrFormatter.format(n)}
                        />

                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-[#EBF5EB] rounded-3xl p-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-3">
            {/* LEFT big */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              {/* Earning Graph */}
              <div className="bg-[#F9FAFB] rounded-4xl p-4 sm:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h3 className="font-semibold text-xl">Earning Graph</h3>
                  <span className="text-sm bg-[#E6F7E9] text-[#1E6FFF] px-6 py-1 rounded-lg">Last 6 months</span>
                </div>
                <div className="flex items-end justify-between gap-3 sm:gap-2 h-[280px] px-2 sm:px-6 pb-2">
                  {loading && graph.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-sm text-gray-400">Loading graph...</div>
                  ) : graph.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center text-sm text-gray-400">No earnings data for the last 6 months</div>
                  ) : (
                    graph.map((bar, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 relative group">
                        <div className=" w-full max-w-[34px] cursor-pointer relative" style={{ height: `${bar.height}px`, background: "linear-gradient(180deg, #C9E7FF 0%, #5BBEFF 100%)", boxShadow: "0 4px 16px 0 rgba(30,111,255,0.07)" }}>
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap">{bar.value} {bar.count ? ` • ${bar.count}` : ""}</span>
                        </div>
                        <span className="text-xs mt-2 text-[#062F43]">{bar.month}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Referrals + Leaderboard */}
              <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                {/* Recent Referrals */}
                <div className="bg-[#F9FAFB] rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h3 className="font-semibold text-xl">Your Recent Referrals</h3>
                    <button className="text-xs bg-[#E6F7E9] text-[#1E6FFF] px-3 py-1 rounded-full">See all</button>
                  </div>
                  <div className="space-y-3">
                    {loading && recentreferrals.length === 0 ? (
                      // referral skeletons
                      <>
                        <div className="flex justify-between items-center animate-pulse">
                          <div className="flex items-center py-1 gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex flex-col gap-1">
                              <div className="w-36 h-4 bg-gray-200 rounded" />
                              <div className="w-20 h-3 bg-gray-200 rounded" />
                            </div>
                          </div>
                          <div className="w-16 h-5 bg-gray-200 rounded" />
                        </div>
                        <div className="flex justify-between items-center animate-pulse">
                          <div className="flex items-center py-1 gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="flex flex-col gap-1">
                              <div className="w-36 h-4 bg-gray-200 rounded" />
                              <div className="w-20 h-3 bg-gray-200 rounded" />
                            </div>
                          </div>
                          <div className="w-16 h-5 bg-gray-200 rounded" />
                        </div>
                      </>
                    ) : (
                      recentreferrals.map((ref, idx) => {
                        const pkg = packages.find((p) => p.id === ref.package_id)?.name || ref.package_id || "Unknown Package";
                        const img = ref.customer_image;
                        const earned = fmtCurrency(ref.amount);
                        return (
                          <div key={idx} className="flex justify-between items-center">
                            <div className="flex items-center py-1 gap-3">

                              {img ? (
                                <img
                                  src={img}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500  to-indigo-300 text-white font-bold text-lg uppercase">
                                  {ref.fullname?.slice(0, 2)}
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span className="text-[16px] font-semibold capitalize">{ref.fullname}</span>
                                <span className="text-[12px] text-gray-500">{pkg}</span>
                              </div>
                            </div>
                            <span className="text-[14px] font-medium">{earned}/-</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Leaderboard */}
                <div className="bg-[#F9FAFB] rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h3 className="font-semibold text-xl">Leaderboard</h3>
                    <p className="text-sm font-semibold text-gray-500">Position #{customerrank}</p>
                  </div>

                  <div className="space-y-3">
                    {loading && LeaderBoard.length === 0 ? (
                      <>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="w-28 h-4 bg-gray-200 rounded" />
                          </div>
                          <div className="w-20 h-4 bg-gray-200 rounded" />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-white animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200" />
                            <div className="w-28 h-4 bg-gray-200 rounded" />
                          </div>
                          <div className="w-20 h-4 bg-gray-200 rounded" />
                        </div>
                      </>
                    ) : (
                      LeaderBoard.map((u, i) => {
                        const image = u.customer_image; // fallback if null
                        const name = u.fullname;
                        const amount = `₹${parseFloat(u.total).toLocaleString("en-IN")}`;

                        return (
                          <div
                            key={i}
                            className="flex justify-between items-center p-3 rounded-lg bg-white"
                          >
                            <div className="flex items-center gap-3">
                              {image ? (
                                <img
                                  src={image}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500  to-indigo-300 text-white font-bold text-lg uppercase">
                                  {name?.slice(0, 2)}
                                </div>
                              )}

                              <span className="text-[16x] capitalize font-semibold">{name}</span>
                            </div>
                            <span className="text-lg font-bold text-black">{amount}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT small */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* Packages: show donut + legend */}
              <div className="bg-[#F9FAFB] rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Packages</h3>
                <PackagePieChart dataObj={packagePercentages} size={220} innerRadiusPct={0.6} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
