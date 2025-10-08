// src/pages/Register.jsx (or wherever your file lives)
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../apiBase";
import {
  setStep,
  setReferral,
  setSelectedCard,
  setFormData,
  setDefaultPackages,
  verifyReferral,
  registerAndPay,
  resetRegister,
} from "../redux/slices/registerSlice";

import Card from "../Components/Card";
import RegisterHeader from "../Components/RegsiterHeader";

import TickBlue from "../assets/Tick_2.svg";
import TickPurple from "../assets/Tick_3.svg";
import TickRed from "../assets/Tick_4.svg";
import TickGreen from "../assets/Tick_1.svg";
import TickOrange from "../assets/Tick_5.svg";

import Card1 from "../assets/Card1.svg";
import Card2 from "../assets/Card2.svg";
import Card3 from "../assets/Card3.svg";
import Card4 from "../assets/Card4.svg";
import Card5 from "../assets/Card5.svg";
const Register = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    referral,
    selectedCard,
    packages,
    formData,
    paymentData,
    referralVerified,
  } = useSelector((state) => state.register);
  const step = useSelector((state) => state.register.step);
  const loading = useSelector((state) => state.register.loading);
  const [showPopup, setShowPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // NEW: error popup state
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState(null);
  const [isUpgradePage, setIsUpgradePage] = useState(false);
  const [isUltimateUser, setIsUltimateUser] = useState(false);

  const processedRef = useRef(false)

  const defaults = [
    {
      icon: Card1,
      title: "Basic Package",
      description: "Ideal for freelancers ready to expand their skills",
      price: "5999",
      features: [
        "10+ Hours of Content",
        "Basic Project Templates",
        "Community Access",
        "Email Support",
        "3 Practice Projects",
      ],
      id: "DIGI0001",
      iconImage: TickGreen,
      buttonGradient: "linear-gradient(135deg, #10B682 0%, #0D9887 100%)",
    },
    {
      icon: Card2,
      title: "Standard Package",
      description: "Perfect for advanced learners looking to specialize",
      price: "9999",
      features: [
        "25+ Hours of Content",
        "Premium Project Templates",
        "1-on-1 Mentorship",
        "Priority Support",
        "5 Real-World Projects",
      ],
      id: "DIGI0002",
      iconImage: TickBlue,
      buttonGradient: "linear-gradient(135deg, #3384EC 0%, #108FBD 100%)",
    },
    {
      icon: Card3,
      title: "Advanced Package",
      description: "For freelancers scaling their business",
      price: "16999",
      features: [
        "50+ Hours of Content",
        "Automation Tools",
        "Advanced Challenges",
        "Dedicated Community Group",
        "10 Live Projects",
      ],
      id: "DIGI0003",
      iconImage: TickPurple,
      buttonGradient: "linear-gradient(135deg, #A054F5 0%, #5E49E8 100%)",
    },
    {
      icon: Card4,
      title: "Premium Package",
      description: "Become a top-tier freelancer with premium training",
      price: "21999",
      features: [
        "100+ Hours of Content",
        "Lifetime Access",
        "Exclusive Webinars",
        "Direct Client Leads",
        "Unlimited Projects",
      ],
      id: "DIGI0004",
      iconImage: TickRed,
      buttonGradient: "linear-gradient(135deg, #F03B63 0%, #DD2975 100%)",
    },
    {
      icon: Card5,
      title: "Ultimate Package",
      description: "Become a top-tier freelancer with premium training",
      price: "29999",
      features: [
        "100+ Hours of Content",
        "Lifetime Access",
        "Exclusive Webinars",
        "Direct Client Leads",
        "Unlimited Projects",
      ],
      id: "DIGI0005",
      iconImage: TickOrange,
      buttonGradient: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)",
    },
  ];
  useEffect(() => {
    dispatch(setDefaultPackages(defaults));
  }, [dispatch]);

  useEffect(() => {
    const currentPackageId = sessionStorage.getItem("packageId");

    if (currentPackageId) {
      setIsUpgradePage(true);

      const upgradeMap = {
        DIGI0001: ["DIGI0002", "DIGI0003", "DIGI0004", "DIGI0005"],
        DIGI0002: ["DIGI0003", "DIGI0004", "DIGI0005"],
        DIGI0003: ["DIGI0004", "DIGI0005"],
        DIGI0004: ["DIGI0005"],
        DIGI0005: [],
      };

      const allowedIds = upgradeMap[currentPackageId] || [];

      if (currentPackageId === "DIGI0005") {
        setIsUltimateUser(true); // Already ultimate, no upgrades
        dispatch(setDefaultPackages([]));
        return;
      }

      const filteredPackages = defaults.filter(pkg => allowedIds.includes(pkg.id));
      dispatch(setDefaultPackages(filteredPackages));
    } else {
      // first-time registration
      setIsUpgradePage(false);
      dispatch(setDefaultPackages(defaults));
    }
  }, [dispatch]);


  useEffect(() => {
    if (location.state?.selectedCard) {
      dispatch(setSelectedCard(location.state.selectedCard));
      dispatch(setStep(2));
    }
  }, [location.state, dispatch]);
  const handleCardClick = (pkg) => {
    dispatch(setSelectedCard(pkg));
    if (!referral) {
      setShowPopup(true);
    } else {
      dispatch(setStep(2));
    }
  };

  useEffect(() => {
    // if already processed or no location object, skip
    if (processedRef.current) return;

    const query = new URLSearchParams(window.location.search);
    const referralCodeFromUrl = query.get("referralCode") || query.get("referral") || "";
    const planIdFromUrl = query.get("planId") || query.get("PlanId") || "";

    if (!referralCodeFromUrl && !planIdFromUrl) {
      // nothing to auto-handle
      return;
    }

    (async () => {
      try {
        // mark as processing so we don't run twice
        processedRef.current = true;

        // If referralCode present: set it in store and try verifying
        if (referralCodeFromUrl) {
          dispatch(setReferral(referralCodeFromUrl));

          // call your existing verifyReferral thunk (reuses your logic)
          // guard against dispatching when already verified
          if (!referralVerified) {
            // we call unwrap to let errors be caught here if needed
            try {
              await dispatch(verifyReferral(referralCodeFromUrl)).unwrap();
              // successful verification should set referralVerified in slice
            } catch (err) {
              // reuse your existing error popup behavior
              let msg = "Failed to verify referral. Please try again.";
              let status = null;
              if (typeof err === "string") msg = err;
              else if (err && typeof err === "object") {
                msg = err.message || err.msg || msg;
                status = err.status ?? err.statusCode ?? null;
                if (!msg && err.data && typeof err.data === "object") {
                  msg = err.data.message || msg;
                }
              } else if (err instanceof Error) msg = err.message;

              setErrorMessage(msg);
              setErrorStatus(status);
              setErrorPopup(true);
              // continue: even if verification failed we still can select package
            }
          }
        }

        // If packages are already available, select the matching package.
        // If not available yet, wait until packages populate (see next effect).
        if (planIdFromUrl) {
          const pkg = packages.find((p) => p.id === planIdFromUrl);
          if (pkg) {
            dispatch(setSelectedCard(pkg));
            // move to step 2 so the user sees the form/order summary
            dispatch(setStep(2));
          } else {
            // If packages not loaded yet, we'll handle selection in the next effect
            // (no-op here).
          }
        }
      } catch (e) {
        // fallback generic error handling
        console.error("Auto referral/plan handling error:", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // VERIFY REFERRAL handler
  const handleVerify = async () => {
    // do nothing if already verifying or no referral
    if (!referral || loading) return;

    // reset any previous error
    setErrorMessage("");
    setErrorStatus(null);

    try {
      const res = await dispatch(verifyReferral(referral)).unwrap();
      const message = (res && (res.message || res.msg || res.error)) || "";

      const normalized = ("" + message).toLowerCase();

      if (normalized.includes("invalid referral") || normalized.includes("invalid referral code")) {
        // Show invalid referral popup
        setErrorMessage("Invalid referral code. Prices will be shown at MRP.");
        setErrorStatus(400);
        setErrorPopup(true);

        return;
      }
    } catch (err) {
      // err can be a rejectWithValue payload or Error
      let msg = "Failed to verify referral. Please try again.";
      let status = null;
      if (typeof err === "string") msg = err;
      else if (err && typeof err === "object") {
        msg = err.message || err.msg || msg;
        status = err.status ?? err.statusCode ?? null;
        // also check nested data.message if present
        if (!msg && err.data && typeof err.data === "object") {
          msg = err.data.message || msg;
        }
      } else if (err instanceof Error) msg = err.message;

      setErrorMessage(msg);
      setErrorStatus(status);
      setErrorPopup(true);
    }
  };

  useEffect(() => {

    if (!processedRef.current) return;
    const query = new URLSearchParams(window.location.search);
    const planIdFromUrl = query.get("planId") || query.get("PlanId");

    if (planIdFromUrl && packages && packages.length) {
      const pkg = packages.find((p) => p.id === planIdFromUrl);
      if (pkg) {
        dispatch(setSelectedCard(pkg));
        dispatch(setStep(2));
      }
    }
  }, [packages]);


  const handleSubmit = () => {
    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setErrorStatus(null);

    dispatch(
      registerAndPay({
        full_name: formData.full_name,
        state: formData.state,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        referred_by: referral || null,
        package_id: selectedCard.id,
      })
    )
      .unwrap()
      .then((res) => {
        setIsProcessing(false);

        // If backend resolved but returned success:false or message, show it.
        if (res && (res.error || res.success === false || res.message)) {
          const msg =
            res.message ||
            res.error ||
            (typeof res === "string" ? res : "Registration failed");
          setErrorMessage(msg);
          // if thunk returned status in resolved payload (rare), capture it
          if (res.status) setErrorStatus(res.status);
          setErrorPopup(true);
        } else {
          // success -> go to payment
          dispatch(setStep(3));
        }
      })
      .catch((err) => {
        setIsProcessing(false);

        // err can be a string, Error object, or an object returned from rejectWithValue
        // Normalize to { status, message }
        let status = null;
        let message = "Registration failed. Please try again.";

        if (typeof err === "string") {
          message = err;
        } else if (err && typeof err === "object") {
          message = err.message || err.msg || message;
          status = err.status ?? err?.statusCode ?? null;
          if (!message && err.data && typeof err.data === "object") {
            message = err.data.message || message;
          }
        } else if (err instanceof Error) {
          message = err.message;
        }

        setErrorMessage(message);
        setErrorStatus(status);
        setErrorPopup(true);
      });
  };

  const verifyPayment = async (data) => {
    try {
      const response = await fetch(`${API_BASE}/api/v_1/payment/Verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return { success: true, message: text };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Network error. Please try again later.");
    }
  };

  const startRazorpayPayment = async (packagedata) => {
    try {
      setIsProcessing(true);
      const response = packagedata;
      if (response.ok) {
        const options = {
          key: "rzp_test_RHsIWDG0e3uqin",
          amount: response?.amount,
          currency: "INR",
          name: "Digilancing Private Limited",
          description: `${response?.orderId} OrderID Transaction`,
          image: "",
          order_id: response?.razorpayOrderId,
          handler: function () {
            verifyPayment({
              razorpay_order_id: response.razorpayOrderId,
              status: "completed",
            })
              .then((res) => {
                if (res?.success) {
                  setIsProcessing(false);
                  alert("Please Login to process");
                  navigate("/DashBoard");
                } else {
                  setIsProcessing(false);
                  // show error popup instead of alert
                  setErrorMessage(
                    res?.message || "Payment verification failed. Please contact support."
                  );
                  setErrorPopup(true);
                }
              })
              .catch((err) => {
                setIsProcessing(false);
                setErrorMessage(err?.message || "Payment verification network error.");
                setErrorPopup(true);
              });
          },
          modal: {
            ondismiss: () => {
              (async () => {
                if (response?.razorpayOrderId) {
                  try {
                    await verifyPayment({
                      razorpay_order_id: response.razorpayOrderId,
                      status: "failed",
                    });
                  } catch (err) {
                    console.error("Failed to mark payment as failed:", err);
                  }
                }
                setIsProcessing(false);
                dispatch(resetRegister());
                setErrorMessage("Payment not completed. You can try again.");
                setErrorPopup(true);
              })();
            },
          },
          prefill: {
            name: "Karthi",
            email: "amariyappan.karthi@gmail.com",
            contact: "6301457870",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        var rzp1 = new window.Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          // show failed reason if available
          const reason = (response && response.error && response.error.description) || "Payment Failed";
          setErrorMessage(reason);
          setErrorPopup(true);
        });
        rzp1.open();
      } else {
        setIsProcessing(false);
        console.error("Error purchasing package:", response.data);
        setErrorMessage("Error purchasing package. Please try again.");
        setErrorPopup(true);
      }
    } catch (error) {
      setIsProcessing(false);
      console.error("Error purchasing package:", error);
      setErrorMessage(error?.message || "Error purchasing package. Please try again.");
      setErrorPopup(true);
    }
  };

  const gstRate = 18;
  const total = Number(selectedCard?.price);
  const gstAmount = (total * 0.18).toFixed(2);
  const basePrice = (total - gstAmount).toFixed(2);


  return (
    <div className="mx-auto px-4 cursor-default sm:px-6 lg:px-32 pt-16 lg:pt-20 gap-10 pb-10 bg-[#002B54] min-h-screen">
      <RegisterHeader step={step} setStep={(s) => dispatch(setStep(s))} />
      <AnimatePresence mode="wait">
        {/* Step 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Enter referral code"
                  value={referral}
                  onChange={(e) => dispatch(setReferral(e.target.value))}
                  className={`w-full max-w-sm px-3 py-2 rounded-lg border ${referralVerified ? "border-green-500 bg-gray-100" : "border-gray-300 bg-white"
                    } text-black`}
                  aria-label="Referral code"
                  disabled={referralVerified} // disable input after verified
                />

                {/* Verify button shown when not verified */}
                {!referralVerified ? (
                  <button
                    onClick={handleVerify}
                    className="px-4 py-2 bg-blue-600 text-white  cursor-pointer rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={loading || !referral.trim()}
                    aria-disabled={loading || !referral.trim()}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                ) : (
                  // Verified state: green tick + label
                  <div
                    className="flex items-center gap-2 text-green-600 font-medium"
                    role="status"
                    aria-live="polite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586
                           6.707 9.293a1 1 0 00-1.414 1.414l3
                           3a1 1 0 001.414 0l7-7a1 1 0
                           000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={i}
                  onClick={() => handleCardClick(pkg)}
                  animate={{
                    scale: selectedCard === pkg ? 1.05 : 1,
                    boxShadow:
                      selectedCard === pkg
                        ? "0 0 20px rgba(0, 198, 255, 0.6)"
                        : "0 0 10px rgba(0,0,0,0.1)",
                    border: selectedCard === pkg ? "2px solid #00C6FF" : "2px solid transparent",
                  }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer relative rounded-2xl"
                >
                  <Card {...pkg} />
                  {selectedCard === pkg && (
                    <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full z-10">
                      Selected
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedCard && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row gap-6 items-start"
          >
            {/* Form */}
            <div className="bg-[#003B73] p-6 rounded-xl space-y-4 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 max-w-3xl mx-auto lg:mx-0">
              <div className="flex flex-col">
                <label className="text-gray-200 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white"
                  value={formData.full_name}
                  onChange={(e) =>
                    dispatch(setFormData({ full_name: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-gray-200 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white"
                    value={formData.email}
                    onChange={(e) =>
                      dispatch(setFormData({ email: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-gray-200 mb-1">Confirm Email Address</label>
                  <input
                    type="email"
                    placeholder="Confirm Email Address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white"
                    value={formData.confirmEmail}
                    onChange={(e) =>
                      dispatch(setFormData({ confirmEmail: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-gray-200 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white"
                    value={formData.phone}
                    onChange={(e) =>
                      dispatch(setFormData({ phone: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-gray-200 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white"
                    value={formData.password}
                    onChange={(e) =>
                      dispatch(setFormData({ password: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
  <label className="text-gray-200 mb-1">State</label>
  <select
    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800"
    value={formData.state}
    onChange={(e) => dispatch(setFormData({ state: e.target.value }))}
  >
    <option value="">Select your State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>

              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 bg-white p-6 rounded-xl shadow-lg border border-gray-300 mx-auto lg:mx-0">
              <h3 className="text-lg font-semibold mb-4">Your Order</h3>
              <div className="flex items-center gap-3 mb-4 p-4 border border-gray-300 rounded-lg">
                <img
                  src={selectedCard.icon}
                  alt={selectedCard.title}
                  className="w-10 h-10"
                />
                <div>
                  <p className="font-semibold">{selectedCard.title}</p>
                  <p className="text-gray-500 text-sm">{selectedCard.description}</p>
                </div>
              </div>
              <div className="mb-2 flex justify-between text-gray-600">
                <span>Product Price:</span>
                <span>₹{Number(basePrice).toLocaleString("en-IN")}</span>
              </div>

              <div className="mb-2 flex justify-between text-gray-600">
                <span>GST ({gstRate}%):</span>
                <span>₹{Number(gstAmount).toLocaleString("en-IN")}</span>
              </div>

              <div className="mb-4 flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{Math.round(total).toLocaleString("en-IN")}</span>
              </div>

              <button
                className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place an Order"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-xl shadow text-center max-w-md mx-auto"
          >
            <h3 className="text-xl font-semibold mb-4">Payment</h3>
            <p className="text-gray-600 mb-6">
              Proceed with payment for <strong>{selectedCard.title}</strong>.
            </p>
            <button
              onClick={() => startRazorpayPayment(paymentData)}
              className="px-6 py-2 cursor-pointer bg-green-600 text-white rounded-xl hover:bg-green-700"
            >
              Confirm Payment
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup if no referral */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">No Offer Applicable</h2>
              <p className="text-gray-600 mb-6">No referral code entered. Do you want to proceed anyway?</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  className="px-4 cursor-pointer py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 cursor-pointer  rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    setShowPopup(false);
                    dispatch(setStep(2));
                  }}
                >
                  Proceed
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ERROR POPUP */}
      <AnimatePresence>
        {errorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4"
            onClick={() => setErrorPopup(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 text-red-600">
                {errorStatus === 409
                  ? "Already Registered"
                  : errorStatus === 400
                    ? "Invalid Referral Code"
                    : "Something went wrong"}
              </h2>

              <p className="text-gray-700 mb-6 break-words">{errorMessage}</p>

              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-400"
                  onClick={() => {
                    setErrorPopup(false);
                  }}
                >
                  Close
                </button>

                {errorStatus === 409 ? (
                  <button
                    className="px-4 py-2 rounded-lg cursor-pointer bg-green-600 text-white hover:bg-green-700"
                    onClick={() => {
                      setErrorPopup(false);
                      // navigate to login so user can access the course
                      navigate("/login");
                    }}
                  >
                    Go to Login
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded-lg cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => {
                      setErrorPopup(false);
                      // keeps form data as-is for retry
                    }}
                  >
                    Retry
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/30">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {isProcessing && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Register;
