import React, { useEffect, useState } from "react";
import { Calendar, X, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { API_BASE } from "../../apiBase";

// Premium modal (kept in the same file for convenience)
function PremiumDateRangeModal({
  modalOpen,
  setModalOpen,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  applyDateRange,
}) {
  if (!modalOpen) return null;

  const presets = [
    {
      id: "7d",
      label: "Last 7 days",
      calc: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 6);
        return { start, end };
      },
    },
    {
      id: "30d",
      label: "Last 30 days",
      calc: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 29);
        return { start, end };
      },
    },
    {
      id: "month",
      label: "This month",
      calc: () => {
        const end = new Date();
        const start = new Date(end.getFullYear(), end.getMonth(), 1);
        return { start, end };
      },
    },
  ];

  const applyPreset = (preset) => {
    const { start, end } = preset.calc();
    const s = start.toISOString().slice(0, 10);
    const e = end.toISOString().slice(0, 10);
    setStartDate(s);
    setEndDate(e);
    applyDateRange?.({ start: s, end: e });
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-indigo-900/40 backdrop-blur-sm"
        onClick={() => setModalOpen(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="relative z-10 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative bg-gradient-to-b from-white/95 to-zinc-50/90 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100/70 p-2 ring-1 ring-amber-200">
                <Sparkles className="h-5 w-5 text-amber-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-zinc-900">Select Date Range</h3>
                <p className="text-sm text-zinc-500">Choose a custom range </p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="-mr-2 rounded-lg p-2 hover:bg-zinc-100"
            >
              <X className="h-5 w-5 text-zinc-600" />
            </button>
          </div>

          <div className="rounded-xl border mt-5 border-zinc-100 bg-white p-4 shadow-sm">
            <label className="flex w-full flex-col">
              <span className="text-xs text-zinc-600 mb-2">Start date</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
            </label>

            <label className="mt-4 flex w-full flex-col">
              <span className="text-xs text-zinc-600 mb-2">End date</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
            </label>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-zinc-500">
                Selected:{" "}
                <span className="font-medium text-zinc-700">{startDate || "—"}</span> →{" "}
                <span className="font-medium text-zinc-700">{endDate || "—"}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="rounded-md px-3 py-2 text-sm bg-zinc-100"
                >
                  Clear
                </button>

                <button
                  onClick={() => {
                    applyDateRange?.({ start: startDate, end: endDate });
                    setModalOpen(false);
                  }}
                  className="rounded-md px-3 py-2 text-sm bg-[#003D80] text-white shadow"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className="text-xs rounded-md px-3 py-2 bg-zinc-50"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function EarningsDashboard() {
  let parsedUser = null;
  try {
    parsedUser = JSON.parse(sessionStorage.getItem("user") || "null");
  } catch (e) {
    parsedUser = sessionStorage.getItem("user") || null;
  }
  const user = parsedUser;
  const [guide_code] = useState(user?.guide_code || "");
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);

  // modal & date-range state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState(null); // which card opened it (today, last7, ...)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // custom range API result
  const [customRangeResult, setCustomRangeResult] = useState(null);
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState(null);
  const [showCustomDetails, setShowCustomDetails] = useState(false);

  const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  useEffect(() => {
    const sessionKeysToTry = [
      "dashboard",
      "affiliateDashboard",
      "earningsDashboard",
      "apiData",
      "affiliateData",
    ];

    const tryLoadFromSession = () => {
      for (const key of sessionKeysToTry) {
        const raw = sessionStorage.getItem(key);
        if (!raw) continue;
        try {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            (parsed.today || parsed.last7Days || parsed.allTime || parsed.last30Days)
          ) {
            return parsed;
          }
        } catch (e) {
          continue;
        }
      }
      return null;
    };

    const fetchDashboard = async () => {
      if (!guide_code) return;
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/v_1/Affiliate/${guide_code}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        const data = result.data ?? null;
        setApiData(data);
        try {
          sessionStorage.setItem("affiliateDashboard", JSON.stringify(data));
        } catch (e) {
          // ignore
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };

    const fromSession = tryLoadFromSession();
    if (fromSession) {
      setApiData(fromSession);
      return;
    }

    fetchDashboard();
  }, [guide_code]);

  const earningsCards = apiData
    ? [
        {
          id: "today",
          label: "Today's Earning",
          amount: inrFormatter.format(Number(apiData.today?.total || 0)),
          count: apiData.today?.count,
          gradient: "from-purple-600 via-pink-500 to-red-500",
        },
        {
          id: "last7",
          label: "Last 7 Days Earnings",
          amount: inrFormatter.format(Number(apiData.last7Days?.total || 0)),
          count: apiData.last7Days?.count,
          gradient: "from-indigo-600 via-blue-500 to-purple-600",
        },
        {
          id: "last30",
          label: "Last 30 Days Earnings",
          amount: inrFormatter.format(Number(apiData.last30Days?.total || 0)),
          count: apiData.last30Days?.count,
          gradient: "from-red-500 via-pink-500 to-purple-500",
        },
        {
          id: "allTime",
          label: "All Time Earning",
          amount: inrFormatter.format(Number(apiData.allTime?.total || 0)),
          count: apiData.allTime?.count,
          gradient: "from-purple-600 via-indigo-500 to-green-400",
        },
      ]
    : [];

  // helper: set default date range when opening modal
  const openDateModal = (cardId) => {
    setModalFor(cardId);
    const today = new Date();
    const isoToday = today.toISOString().slice(0, 10); // YYYY-MM-DD

    // sensible defaults per card
    let defaultStart = "";
    if (cardId === "today") {
      defaultStart = isoToday;
    } else if (cardId === "last7") {
      const d = new Date();
      d.setDate(d.getDate() - 6); // include today => 7 days
      defaultStart = d.toISOString().slice(0, 10);
    } else if (cardId === "last30") {
      const d = new Date();
      d.setDate(d.getDate() - 29);
      defaultStart = d.toISOString().slice(0, 10);
    } else if (cardId === "allTime") {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      defaultStart = d.toISOString().slice(0, 10);
    }

    setStartDate(defaultStart);
    setEndDate(isoToday);
    setModalOpen(true);
  };

  const applyDateRange = async ({ start, end } = {}) => {
    const s = start ?? startDate;
    const e = end ?? endDate;
    console.log("Applying date range for", modalFor, s, e);

    // persist selection to session so it survives refresh:
    try {
      sessionStorage.setItem(
        `earnings_range_${modalFor}`,
        JSON.stringify({ start: s, end: e })
      );
    } catch (e) {
      // ignore
    }

    // CALL custom range endpoint and set result
    if (!guide_code) {
      console.warn("No guide_code available to call custom range API");
      return setModalOpen(false);
    }

    setCustomLoading(true);
    setCustomError(null);
    setCustomRangeResult(null);
    setShowCustomDetails(false);

    try {
      const payload = {
        guidecode: guide_code,
        startingdata: s,
        endingdata: e,
      };

      const res = await fetch(
        `${API_BASE}/api/v_1/Affiliate/Leaderboard/customerrange`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${text}`);
      }

      const json = await res.json();

      // Expected shape (example you provided):
      // { success: true, guidecode, startingdata, endingdata, total_earning, total_records, data: [...] }
      const result = {
        guidecode: json.guidecode ?? guide_code,
        startingdata: json.startingdata ?? s,
        endingdata: json.endingdata ?? e,
        total_earning: json.total_earning ?? json.total_earning_amount ?? "0",
        total_records: json.total_records ?? (json.data ? String(json.data.length) : "0"),
        customers: Array.isArray(json.data) ? json.data : json.customers ?? [],
        raw: json,
      };

      setCustomRangeResult(result);
    } catch (err) {
      console.error("custom range error:", err);
      setCustomError(err.message || "Failed to fetch custom range");
    } finally {
      setCustomLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen rounded-4xl bg-[#ffffff] overflow-y-auto cursor-default flex flex-col items-center py-2 px-6">
      {/* Profile Card */}
     <div className=" bg-[#003366] text-white text-center text-lg sm:text-2xl md:text-2xl h-56 sm:h-64 md:h-72 rounded-3xl w-full  flex items-center justify-center  mt-5 px-3 sm:px-4  lg:max-w-6xl lg:mx-auto relative">
        <div className="flex flex-col items-center">
          <img
            src={user?.customer_image || "/user.svg"}
            alt={user?.name || "User"}
            className="w-20 h-20 rounded-full object-cover"
          />
          <h2 className="text-white text-lg font-bold mt-3">{user?.fullname || "Unknown"}</h2>
          <p className="text-gray-200">{user?.email || ""}</p>
        </div>
        <button
          onClick={() => {
            setModalOpen(!modalOpen);
          }}
          className="absolute cursor-pointer hover:scale-105 top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <Calendar className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 w-full max-w-4xl">
        {loading && <div className="col-span-full text-center text-white">Loading...</div>}

        {!loading && earningsCards.length === 0 && (
          <div className="col-span-full text-center text-gray-300">No earnings data found.</div>
        )}
        {customRangeResult && (
          <div className="col-span-full sm:col-span-2">
            <div
              className="rounded-xl p-5 text-white shadow-lg bg-gradient-to-r from-green-500 via-cyan-500 to-indigo-600 text-left cursor-pointer"
              onClick={() => setShowCustomDetails((s) => !s)}
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">
                  Custom Range
                  <span className="ml-2 text-xs text-white/80">
                    {customRangeResult.startingdata} → {customRangeResult.endingdata}
                  </span>
                </p>
                <div className="text-sm font-semibold text-white/90">{customRangeResult.total_records} Referrals</div>
              </div>
              <h3 className="text-3xl font-bold mt-2">
                {inrFormatter.format(Number(customRangeResult.total_earning || 0))}
              </h3>
            </div>

            {/* details list if available */}
            {showCustomDetails && (
              <div className="mt-3 rounded-lg bg-white/5 p-3 text-white/90">
                {Array.isArray(customRangeResult.customers) &&
                customRangeResult.customers.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-auto">
                    {customRangeResult.customers.map((c, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.customer_image || "/user.svg"}
                            alt={c.name || c.fullname || `cust-${idx}`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="text-sm">
                            <div className="font-medium">{c.name || c.fullname || "Unknown"}</div>
                            <div className="text-xs text-white/60">{c.order_id ? `Order: ${c.order_id}` : ""}</div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          {/* choose likely property names */}
                          {inrFormatter.format(Number(c.amount || c.earning_amount || c.total || 0))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-white/70">No detailed customer rows returned for this range.</div>
                )}
              </div>
            )}
          </div>
        )}

{earningsCards.map((item) => (
          <button
            key={item.id}
            onClick={() => openDateModal(item.id)}
            className={`rounded-xl p-5 text-white shadow-lg bg-gradient-to-r ${item.gradient} text-left`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm">{item.label}</p>
            </div>
            <h3 className="text-2xl font-bold mt-2">{item.amount}</h3>
          </button>
        ))}

        {/* Custom Range Result Card */}
        {customLoading && (
          <div className="col-span-full text-center text-white">Loading custom range...</div>
        )}

        {customError && (
          <div className="col-span-full text-center text-red-300">Error: {customError}</div>
        )}

      </div>

      {/* Premium modal used here */}
      <PremiumDateRangeModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        applyDateRange={applyDateRange}
      />
    </div>
  );
}
