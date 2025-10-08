import React, { useEffect, useState } from "react";
import { API_BASE } from "../../apiBase";
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
    fetch(
      `${API_BASE}/api/v_1/Affiliate/Leaderboard/list`
    )
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
  const top3 = data?.allTimeTop10?.slice(0, 3) || [];
  const others = data?.allTimeTop10?.slice(3, 10) || [];

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
      amount: `₹${Number(data?.monthlyTop10?.total_amount || 0).toLocaleString(
        "en-IN"
      )}`,
      img: data?.monthlyTop10?.customer_image || "",
      bg: "bg-[#10B981]",
    },
    {
      type: "All Time Earning",
      name: data?.allTimeTopSingle?.fullname || "",
      amount: `₹${Number(
        data?.allTimeTopSingle?.earning_amount || 0
      ).toLocaleString("en-IN")}`,
      img: data?.allTimeTopSingle?.customer_image || "",
      bg: "bg-[#B8860B]",
    },
  ];

  return (
   <div className="min-h-screen rounded-4xl bg-[#ffffff] overflow-y-auto cursor-default flex flex-col items-center py-2 px-6">
      {/* Header */}
      <div className=" bg-[#003366] text-white text-center  text-lg sm:text-3xl md:text-5xl font-medium h-56 sm:h-64 md:h-72 rounded-3xl w-full  flex items-center justify-center  mt-5 px-3 sm:px-4  lg:max-w-6xl lg:mx-auto">
        <h1 className="text-white text-2xl font-bold tracking-wide">
          LEADER BOARD
        </h1>
      </div>

      {/* Loading overlay (full-screen) */}
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
        <h2 className="text-white text-lg font-semibold mb-8">
          Daily Top Achievers
        </h2>

        {/* Row 1: Top 3 Achievers */}
        <div className="flex justify-center gap-20 mb-12">
          {loading
            ? // Skeletons for top3 while loading
              [0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gray-400/40 animate-pulse" />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl opacity-60">
                      👑
                    </span>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-white bg-gray-500/70">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-5 w-[120px] h-5 rounded bg-gray-400/40 animate-pulse" />
                  <div className="mt-3 w-[140px] h-6 rounded bg-gray-400/40 animate-pulse" />
                </div>
              ))
            : top3.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative">
                    {person.customer_image ? (
                      <img
                        src={person.customer_image}
                        alt={person.fullname}
                        className={`w-28 h-28 rounded-full 
                          ${
                            person.rank == "1"
                              ? "border-2 border-yellow-500"
                              : person.rank === "2"
                              ? "border-2 border-gray-400"
                              : "border-2 border-orange-500"
                          }
                            object-cover`}
                      />
                    ) : (
                      <img
                        src="/user.svg"
                        alt=""
                        className={`w-28 h-28 rounded-full ${
                          person.rank == "1"
                            ? "border-2 border-yellow-500"
                            : person.rank === "2"
                            ? "border-2 border-gray-400"
                            : "border-2 border-orange-500"
                        }`}
                      />
                    )}

                    {/* Crown */}
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl">
                      👑
                    </span>
                    {/* Number Badge */}
                    <span
                      className={`absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold text-white
                        ${
                          person.rank === "1"
                            ? "bg-yellow-500"
                            : person.rank === "2"
                            ? "bg-gray-400"
                            : "bg-orange-500"
                        }`}
                    >
                      {person.rank}
                    </span>
                  </div>
                  <p className="text-white text-lg mt-5 font-semibold">
                    {person.fullname
                      ? person.fullname.charAt(0).toUpperCase() +
                        person.fullname.slice(1)
                      : ""}
                  </p>

                  <p className="text-yellow-400 text-2xl font-medium">
                    ₹{Number(person.total_amount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
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
                  <img
                    src={ach.img}
                    alt={ach.name}
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  <img
                    src="/user.svg"
                    alt="user"
                    className="w-14 h-14 rounded-full border-2 border-white"
                  />
                )}
                <div>
                  <p className="text-sm opacity-80">{ach.type}</p>
                  <h3 className="text-lg font-semibold">{ach.name}</h3>
                  <p className="text-2xl font-bold">{ach.amount}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
