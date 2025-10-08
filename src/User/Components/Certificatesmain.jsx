import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../apiBase";

const Loader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/30">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Certificatesmain = () => {
  const [activeTab, setActiveTab] = useState("yet"); 
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(sessionStorage.getItem("user") || "null");
  const guideCode = user?.guide_code;
  const name = user?.fullname || "User";
  const userId = user?.guide_code;

  const fetchMCQShortlist = async (status = "") => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_BASE}/api/admin/mcq/getmcqshortlist`, {
        params: {
          guideCode,
          status,
          limit: 1000,
        },
      });

      if (response.data.success) {
        let allItems = response.data.items || [];

        const currentPackageId = sessionStorage.getItem("packageId");

        const getAllowedPackages = (pkgId) => {
          const packages = ["DIGI0001", "DIGI0002", "DIGI0003", "DIGI0004", "DIGI0005"];
          const index = packages.indexOf(pkgId);
          if (index === -1 || index >= packages.length - 1) return packages;
          return packages.slice(0, index + 1);
        };

        const allowedPackages = getAllowedPackages(currentPackageId);

        let filteredItems = allItems.filter(item =>
          allowedPackages.includes(item.packageId)
        );

        if (activeTab === "completed") {
          filteredItems = filteredItems.filter(item => item.passed === true);
        } else if (activeTab === "yet") {
          filteredItems = filteredItems.filter(item => item.passed === false);
        }

        // Pagination
        const itemsPerPage = 8;
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

        setItems(paginatedItems);
        setTotalPages(Math.ceil(filteredItems.length / itemsPerPage) || 1);
      } else {
        setItems([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Failed to fetch MCQ shortlist:", error);
      setItems([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.tab === "completed") {
      setActiveTab("completed");
    }
  }, [location.state]);

  useEffect(() => {
    setItems([]);
    setPage(1);
  }, [activeTab]);

  useEffect(() => {
    fetchMCQShortlist("");
  }, [activeTab, page]);

  return (
    <div className="px-4 md:px-6 py-8 relative">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("yet")}
          disabled={loading}
          className={`px-6 py-2 rounded-full font-medium transition ${activeTab === "yet"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Yet to take
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          disabled={loading}
          className={`px-6 py-2 rounded-full font-medium transition ${activeTab === "completed"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Completed
        </button>
      </div>

      {/* Loading / No Records */}
      {loading ? (
        <Loader />
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No records found.</p>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((cert, index) => (
              <div
                key={index}
                className="relative font-outfit cursor-default bg-white shadow-md border border-[#e0e0e0] rounded-2xl p-4 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="mb-3 overflow-hidden rounded-lg">
                  {cert.thumbnailUrl ? (
                    <img
                      src={cert.thumbnailUrl}
                      alt={cert.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Title & Info */}
                <h3 className="text-base font-semibold mb-1 text-left text-gray-800">
                  {cert.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 text-left">
                  {cert.courseCode} | {cert.packageId}
                </p>

                {/* Spacer */}
                <div className="flex-1"></div>

                {/* Button */}
                {activeTab === "completed" ? (
                  <button
                    className="mt-3 text-white px-4 py-2 cursor-pointer rounded-xl font-medium w-full transition hover:scale-105 bg-green-500 hover:bg-green-600 text-sm"
                    onClick={() =>
                      navigate("/ViewCertificate", {
                        state: {
                          courseName: cert.title,
                          fullName: name,
                          
                        },
                      })
                    }
                  >
                    Download Certificate
                  </button>
                ) : (
                  <button
                    disabled={cert.availableQuestionsCount === 0}
                    className={`mt-3 text-white px-4 py-2 cursor-pointer rounded-xl font-medium w-full transition hover:scale-105 text-sm ${cert.availableQuestionsCount === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#0162D9] hover:bg-[#0150b2]"
                      }`}
                    onClick={() =>
                      navigate("/Test", {
                        state: {
                          ...cert,
                          userId,
                          courseCode: cert.courseCode || cert.packageId,
                        },
                      })
                    }
                  >
                    {cert.availableQuestionsCount === 0 ? "No Questions" : "Start Now"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Certificatesmain;
