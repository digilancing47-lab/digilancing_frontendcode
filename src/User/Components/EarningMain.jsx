import React, { useEffect, useState } from "react";
import { Calendar, X, Sparkles, Upload, FileImage, FileVideo } from "lucide-react";
import { motion } from "framer-motion";
import "./EarningsCards.css";

import { API_BASE } from "../../apiBase";
import { useNavigate } from "react-router-dom";

// Animated Counter Component
function AnimatedCounter({ targetAmount, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const target = Number(targetAmount) || 0;

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(target * easeOut);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);

  const formatAmount = (amount) => {
    const formatted = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
    return formatted.replace('₹', '₹ ');
  };

  return formatAmount(count);
}

// Success Modal
function SuccessModal({ modalOpen, setModalOpen }) {
  if (!modalOpen) return null;

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
        className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative bg-gradient-to-b from-white/95 to-zinc-50/90 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-100 mb-4">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Request Submitted!</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Your industry earning request has been submitted successfully. Please wait for admin approval.
            </p>
            
            <button
              onClick={() => setModalOpen(false)}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Great!
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Pending Request Modal
function PendingRequestModal({ modalOpen, setModalOpen }) {
  if (!modalOpen) return null;

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
        className="relative z-10 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative bg-gradient-to-b from-white/95 to-zinc-50/90 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-orange-100 mb-4">
              <Upload className="h-8 w-8 text-orange-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">Request Pending</h3>
            <p className="text-sm text-zinc-600 mb-6">
              You have a pending request. Please wait for admin approval.
            </p>
            
            <button
              onClick={() => setModalOpen(false)}
              className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Industry Earning Upload Modal
function IndustryEarningModal({
  modalOpen,
  setModalOpen,
  guide_code,
  onSuccess
}) {
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };

  const isImageFile = (file) => {
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    return imageTypes.includes(getFileExtension(file.name));
  };

  const isVideoFile = (file) => {
    const videoTypes = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];
    return videoTypes.includes(getFileExtension(file.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || !file || !guide_code) {
      setError('Please fill all required fields');
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Step 1: Get signed URL
      const fileExtension = getFileExtension(file.name);
      const signedUrlResponse = await fetch(
        `${API_BASE}/api/v_1/industry-earning/signed-url?guide_code=${guide_code}&file_extension=${fileExtension}`
      );

      if (!signedUrlResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, objectName } = await signedUrlResponse.json();

      // Step 2: Upload file to signed URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      // Step 3: Raise industry earning request
      const requestResponse = await fetch(
        `${API_BASE}/api/v_1/industry-earning/raise-request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            guide_code: guide_code,
            amount: Number(amount),
            uploaded_url: `https://storage.googleapis.com/digilancing_storage/${objectName}`,
          }),
        }
      );

      if (!requestResponse.ok) {
        throw new Error('Failed to submit earning request');
      }

      const result = await requestResponse.json();
      
      // Reset form
      setAmount('');
      setFile(null);
      setModalOpen(false);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }
      
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to submit request');
    } finally {
      setUploading(false);
    }
  };

  const resetModal = () => {
    setAmount('');
    setFile(null);
    setError(null);
    setDragActive(false);
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-indigo-900/40 backdrop-blur-sm"
        onClick={() => {
          setModalOpen(false);
          resetModal();
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="relative bg-gradient-to-b from-white/95 to-zinc-50/90 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-900">Industry Earning</h3>
                <p className="text-sm text-zinc-500">Upload your industry earning proof</p>
              </div>
            </div>

            <button
              onClick={() => {
                setModalOpen(false);
                resetModal();
              }}
              aria-label="Close"
              className="-mr-2 cursor-pointer rounded-lg p-2 hover:bg-zinc-100"
            >
              <X className="h-5 w-5 text-zinc-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Amount Input */}
            <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
              <label className="flex w-full flex-col">
                <span className="text-sm font-medium text-zinc-700 mb-2">Total Amount *</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter earning amount"
                  className="w-full rounded-lg border px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300"
                  required
                  min="0"
                  step="0.01"
                />
              </label>
            </div>

            {/* File Upload */}
            <div className="rounded-xl border border-zinc-100 bg-white p-4 shadow-sm">
              <label className="text-sm font-medium text-zinc-700 mb-2 block">
                Upload Proof (Image or Video) *
              </label>
              
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : file
                    ? 'border-green-400 bg-green-50'
                    : 'border-zinc-300 hover:border-zinc-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    {isImageFile(file) ? (
                      <FileImage className="h-8 w-8 text-green-600" />
                    ) : isVideoFile(file) ? (
                      <FileVideo className="h-8 w-8 text-green-600" />
                    ) : (
                      <Upload className="h-8 w-8 text-green-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-green-700">{file.name}</p>
                      <p className="text-xs text-green-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 text-zinc-400 mx-auto mb-3" />
                    <p className="text-sm text-zinc-600 mb-1">
                      <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-500">
                      Images: JPG, PNG, GIF, WebP | Videos: MP4, AVI, MOV, WebM
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  resetModal();
                }}
                className="px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={uploading || !amount || !file}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

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
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">Select Date Range</h3>
                <p className="text-sm text-zinc-500">Choose a custom range </p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close"
              className="-mr-2 cursor-pointer rounded-lg p-2 hover:bg-zinc-100"
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
                  className="rounded-md px-3 cursor-pointer py-2 text-sm bg-zinc-100"
                >
                  Clear
                </button>

                <button
                  onClick={() => {
                    applyDateRange?.({ start: startDate, end: endDate });
                    setModalOpen(false);
                  }}
                  className="rounded-md px-3 cursor-pointer py-2 text-sm bg-[#003D80] text-white shadow"
                >
                  Apply
                </button>
              </div>
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
  const name = user?.fullname;
  const image = user?.customer_image;

  const navigate = useNavigate()

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

  // industry earning upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [checkingPending, setCheckingPending] = useState(false);

  const inrFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const formatAmount = (amount) => {
    return inrFormatter.format(amount).replace('₹', '₹ ');
  };

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

  // Check if user can upload (no pending requests)
  const checkUploadPermission = async () => {
    if (!guide_code) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/v_1/industry-earning/check-pending/${guide_code}`);
      if (!res.ok) throw new Error('Failed to check upload permission');
      
      const result = await res.json();
      setCanUpload(result.can_upload);
      
      if (!result.can_upload) {
        setPendingMessage('You have a pending request. Please wait for admin approval.');
      }
    } catch (error) {
      console.error('Error checking upload permission:', error);
      // Allow upload on error to not block users
      setCanUpload(true);
    }
  };

  const handleUploadClick = async () => {
    if (!guide_code) return;
    
    setCheckingPending(true);
    
    try {
      const res = await fetch(`${API_BASE}/api/v_1/industry-earning/check-pending/${guide_code}`);
      if (!res.ok) throw new Error('Failed to check upload permission');
      
      const result = await res.json();
      
      if (result.can_upload) {
        setUploadModalOpen(true);
      } else {
        setPendingModalOpen(true);
      }
    } catch (error) {
      console.error('Error checking upload permission:', error);
      // Allow upload on error to not block users
      setUploadModalOpen(true);
    } finally {
      setCheckingPending(false);
    }
  };

  const earningsCards = apiData
    ? [
        {
          id: "today",
          label: "Today's Earning",
          rawAmount: Number(apiData.today?.total || 0),
          count: apiData.today?.count,
          gradient: "from-[#277AFF] via-[#2375F8] to-[#2375F8]",
        },
        {
          id: "last7",
          label: "Last 7 Days Earnings",
          rawAmount: Number(apiData.last7Days?.total || 0),
          count: apiData.last7Days?.count,
          gradient: "from-[#307CF7] via-[#307CF7] to-[#20D1F7]",
        },
        {
          id: "last30",
          label: "Last 30 Days Earnings",
          rawAmount: Number(apiData.last30Days?.total || 0),
          count: apiData.last30Days?.count,
          gradient: "from-[#0CA746] via-[#0CA746] to-[#0CBFA9]",
        },
        {
          id: "allTime",
          label: "All Time Earning",
          rawAmount: Number(apiData.allTime?.total || 0),
          count: apiData.allTime?.count,
          gradient: "from-[#047CFF] via-[#047CFF] to-[#00B4F8]",
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
    <div className="min-h-screen rounded-4xl bg-[#ffffff] overflow-y-auto cursor-default flex flex-col items-center px-4 md:px-6">
      {/* Profile Card */}
     <div className=" text-center py-2 md:py-10 rounded-3xl w-full  flex items-center justify-center lg:max-w-6xl lg:mx-auto relative">
        <div className="flex flex-col items-center">
          {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-26 h-26 md:w-34 md:h-34 border-4 sm:border-6 border-[#20D5E8] rounded-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 sm:w-28 sm:h-28 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-300 text-white font-bold text-3xl sm:text-4xl uppercase" 
               onClick={() => navigate("/Profile")}
                style={{cursor:"pointer"}}>
                {name?.slice(0, 2)}
              </div>
            )}
          <h2 className="text-black text-lg sm:text-xl md:text-3xl lg:text-3xl font-bold mt-3 md:mt-4 capitalize">{user?.fullname || "Unknown"}</h2>
          <p className="text-black text-[16px] sm:text-base md:text-lg lg:text-3xl mt-0.5">{user?.email || ""}</p>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleUploadClick}
            disabled={checkingPending}
            className="cursor-pointer hover:scale-105 bg-white p-2 rounded-full shadow disabled:opacity-50 disabled:cursor-not-allowed"
            title="Upload Industry Earning"
          >
            {checkingPending ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            ) : (
              <Upload className="w-5 h-5 text-gray-700" />
            )}
          </button>
          <button
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
            className="cursor-pointer hover:scale-105 bg-white p-2 rounded-full shadow"
            title="Select Date Range"
          >
            <Calendar className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-6 pt-3 md:pt-5 w-full">
        {loading && <div className="col-span-full text-center text-white">Loading...</div>}

        {!loading && earningsCards.length === 0 && (
          <div className="col-span-full text-center text-gray-300">No earnings data found.</div>
        )}
        {customRangeResult && (
          <div className="col-span-full sm:col-span-2">
            <div
              className="earnings-card earnings-card-custom cursor-pointer"
              onClick={() => setShowCustomDetails((s) => !s)}
            >
              <div className="earnings-card-content">
                <div className="flex items-center justify-between">
                  <p className="earnings-card-label">
                    Custom Range
                    <span className="ml-2 text-xs text-white/80">
                      {customRangeResult.startingdata} → {customRangeResult.endingdata}
                    </span>
                  </p>
                  <div className="text-sm font-semibold text-white/90">{customRangeResult.total_records} Referrals</div>
                </div>
                <h3 className="earnings-card-amount">
                  {formatAmount(Number(customRangeResult.total_earning || 0))}
                </h3>
              </div>
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
                          {formatAmount(Number(c.amount || c.earning_amount || c.total || 0))}
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
            className={`rounded-xl px-4 sm:px-5 h-[95px] md:h-[120px] text-white shadow-lg bg-gradient-to-r ${item.gradient} text-left`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[16px] sm:text-lg leading-tight">{item.label}</p>
            </div>
            <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2">
              <AnimatedCounter targetAmount={item.rawAmount} /> /-
            </h3>
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

      {/* Success Modal */}
      <SuccessModal
        modalOpen={successModalOpen}
        setModalOpen={setSuccessModalOpen}
      />

      {/* Pending Request Modal */}
      <PendingRequestModal
        modalOpen={pendingModalOpen}
        setModalOpen={setPendingModalOpen}
      />

      {/* Industry Earning Upload Modal */}
      <IndustryEarningModal
        modalOpen={uploadModalOpen}
        setModalOpen={setUploadModalOpen}
        guide_code={guide_code}
        onSuccess={(result) => {
          console.log('Industry earning submitted:', result);
          setSuccessModalOpen(true);
        }}
      />

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
