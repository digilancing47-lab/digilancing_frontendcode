import React, { useEffect, useState } from "react";
import { API_BASE } from "../../apiBase";

import Gold from "/Gold.svg";
import Sliver from "/Sliver.svg";
import Bronze from "/Bronze.svg";

export default function LeaderBoard() {
  // Default values with 0
  const defaultData = {
    allTimeTop10: [],
    weeklyTop10: { fullname: "", total_amount: 0, customer_image: "" },
    monthlyTop10: { fullname: "", total_amount: 0, customer_image: "" },
    allTimeTopSingle: { fullname: "", earning_amount: 0, customer_image: "" },
  };

  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/v_1/Affiliate/Leaderboard/list`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json.data);
        } else {
          console.error("API returned success=false, using defaults");
          setData(defaultData);
        }
      })
      .catch((err) => {
        console.error("Leaderboard fetch error:", err);
        setData(defaultData); // fallback
      })
      .finally(() => setLoading(false));
  }, []);

  // Fallbacks if no data
  const rawTop3 = data?.allTimeTop10?.slice(0, 3) || [];
  const others = data?.allTimeTop10?.slice(3, 10) || [];

  /**
   * normalize top3 so each item has a numeric rank.
   * If API didn't provide rank, we fallback to the index+1.
   */
  const top3 = rawTop3.map((p, i) => ({
    ...p,
    rank:
      p && (p.rank === 0 || p.rank)
        ? Number(p.rank)
        : // fallback to index+1 (1-based)
          i + 1,
  }));

  const achievements = [
    {
      type: "Weekly",
      name: data?.weeklyTop10?.fullname || "",
      amount: `₹${Number(data?.weeklyTop10?.total_amount || 0).toLocaleString(
        "en-IN"
      )}`,
      img: data?.weeklyTop10?.customer_image || "",
      bg: "bg-[#2563EB]",
    },
    {
      type: "Monthly",
      name: data?.monthlyTop10?.fullname || "",
      amount: `₹${Number(
        data?.monthlyTop10?.total_amount || 0
      ).toLocaleString("en-IN")}`,
      img: data?.monthlyTop10?.customer_image || "",
      bg: "bg-[#14B8A6]",
    },
    {
      type: "All Time Earning",
      name: data?.allTimeTopSingle?.fullname || "",
      amount: `₹${Number(
        data?.allTimeTopSingle?.earning_amount || 0
      ).toLocaleString("en-IN")}`,
      img: data?.allTimeTopSingle?.customer_image || "",
      bg: "bg-[#F97316]",
    },
  ];

  /**
   * Helper to render a single top person card.
   */
  const TopPerson = ({ person }) => {
    const rank = person?.rank ?? "";
    return (
      <div
        className={`flex flex-col items-center transition-transform duration-200 ${
          rank === 1 ? "scale-110 -mt-8" : ""
        }`}
      >
        <div className="relative">
          {person?.customer_image ? (
            <img
              src={person.customer_image}
              alt={person.fullname}
              className={`w-28 h-28 rounded-full object-cover border-2 ${
                rank === 1
                  ? "border-yellow-500"
                  : rank === 2
                  ? "border-gray-400"
                  : "border-orange-500"
              }`}
            />
          ) : (
            <div className="w-18 h-18 md:w-28 md:h-28 rounded-full flex items-center border-4 border-[#374151] justify-center bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-bold text-3xl uppercase">
              {person?.fullname?.slice(0, 2) || ""}
            </div>
          )}

          {/* Crown */}
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">
            {rank === 1 ? (
              <img src={Gold} alt="gold"/>
            ) : rank === 2 ? (
              <img src={Sliver} alt="silver" />
            ) : (
              <img src={Bronze} alt="bronze" />
            )}
          </span>

          {/* Number Badge */}
          <span
            className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-black ${
              rank === 1
                ? "bg-[#FFD700]"
                : rank === 2
                ? "bg-[#C0C0C0]"
                : "bg-[#CD7F32]"
            }`}
          >
            {rank}
          </span>
        </div>

        <p className="text-white text-[10px] lg:text-xl mt-5 capitalize font-semibold">
          {person?.fullname
            ? person.fullname.charAt(0).toUpperCase() + person.fullname.slice(1)
            : ""}
        </p>

        <p className="text-yellow-400 text-sm md:text-2xl font-medium">
          ₹{Number(person?.total_amount || 0).toLocaleString("en-IN")}
        </p>
      </div>
    );
  };

  /**
   * We want display order: [2nd, 1st, 3rd] so 1st is centered.
   * If top3 length < 3 we'll just render them in natural order but still center #1 if present.
   */
  const arrangedTop3 = (() => {
    if (top3.length === 0) return [];
    if (top3.length < 3) {
      // ensure rank 1 is visually centered if present: sort by rank then map
      return [...top3].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
    }
    // ensure we have items at indices 0..2 safely
    const sorted = [...top3].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
    // want left = rank2, center = rank1, right = rank3
    return [sorted[1], sorted[0], sorted[2]];
  })();

  return (
    <div className="min-h-screen rounded-4xl bg-[#1A1F2E] pb-10 overflow-y-auto cursor-default flex flex-col items-center py-2 px-6">
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 z-40"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Spinner */}
            <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin" />
            <div className="text-white">Loading leaderboard...</div>
          </div>
        </div>
      )}

      {/* Daily Top Achievers */}
      <div className="w-full max-w-6xl mt-10">
        <h2 className="text-white text-3xl font-semibold mb-8">
          Daily Top
          <br /> <span className="text-[#FACC15]">Achievers</span>
        </h2>

        {/* Row 1: Top 3 Achievers (gold centered) */}
        <div className="flex justify-center items-end  gap-10 lg:gap-20 mb-6 pt-10 lg:mb-12">
          {loading
            ? // Skeletons for top3 while loading
              [0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gray-400/40 animate-pulse" />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl opacity-60">
                      <img src={Gold} alt="" />
                    </span>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-white bg-gray-500/70">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-5 w-[120px] h-5 rounded bg-gray-400/40 animate-pulse" />
                  <div className="mt-3 w-[140px] h-6 rounded bg-gray-400/40 animate-pulse" />
                </div>
              ))
            : arrangedTop3.map(
                (person, idx) =>
                  person && <TopPerson key={idx} person={person} />
              )}
        </div>

        {/* Row 2: Other Leaders */}
        <div className="flex justify-center gap-6 flex-wrap">
          {loading
            ? // skeletons for others
              [0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-700 text-white rounded-xl px-5 py-3 flex items-center gap-3 min-w-[200px]"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-400/40 animate-pulse" />
                  <div className="flex flex-col gap-2">
                    <div className="w-28 h-4 rounded bg-gray-400/40 animate-pulse" />
                    <div className="w-20 h-3 rounded bg-gray-400/40 animate-pulse" />
                  </div>
                </div>
              ))
            : others.map((person, index) => (
                <div
                  key={index}
                  className="bg-gray-700 text-white rounded-xl px-5 py-3 flex items-center gap-3 min-w-[200px]"
                >
                  {person.customer_image ? (
                    <img
                      src={person.customer_image}
                      alt={person.fullname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">
                      {person.fullname?.charAt(0) || ""}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{person.fullname}</p>
                    <p className="text-gray-300 text-sm">
                      ₹{Number(person.total_amount || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Row 3: Achievements Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 w-full max-w-6xl">
        {loading
          ? // skeleton achievement cards
            [0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-xl p-6 text-white flex items-center gap-4 bg-gray-600/40"
              >
                <div className="w-14 h-14 rounded-full bg-gray-400/40 animate-pulse" />
                <div className="flex-1">
                  <div className="w-20 h-3 rounded bg-gray-400/40 animate-pulse mb-3" />
                  <div className="w-36 h-5 rounded bg-gray-400/40 animate-pulse mb-2" />
                  <div className="w-28 h-7 rounded bg-gray-400/40 animate-pulse" />
                </div>
              </div>
            ))
          : achievements.map((ach, idx) => (
              <div
                key={idx}
                className={`${ach.bg} rounded-xl p-6 text-white flex items-center gap-4`}
              >
                {ach.img ? (
                  <img src={ach.img} alt={ach.name} className="w-14 h-14 rounded-full" />
                ) : (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500  to-indigo-300 text-white font-bold text-lg uppercase">
                    {ach.name?.slice(0, 2)}
                  </div>
                )}

                <div>
                  <p className="text-sm opacity-80">{ach.type}</p>
                  <h3 className="text-lg font-semibold capitalize">{ach.name}</h3>
                  <p className="text-2xl font-bold">{ach.amount}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
