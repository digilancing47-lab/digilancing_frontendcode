import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate
import { useDispatch } from "react-redux";
import CardGrid from "./CardGrid";

import { setDefaultPackages } from "../redux/slices/registerSlice";


import axios from "axios";

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

import { API_BASE } from "../apiBase";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Section3 = ({ onCardSelect }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate(); 

  const isRegisterPage = location.pathname === "/Register";
  const isUpgradePage = location.pathname === "/Upgrade";

  const [isUltimateUser, setIsUltimateUser] = useState(false);
  const [packages, setPackages] = useState([]);

  const getPackageConfig = (packageId) => {
    const configs = {
      "DIGI0001": { icon: Card1, iconImage: TickGreen, buttonGradient: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)" },
      "DIGI0002": { icon: Card2, iconImage: TickBlue, buttonGradient: "linear-gradient(135deg, #3384EC 0%, #108FBD 100%)" },
      "DIGI0003": { icon: Card3, iconImage: TickPurple, buttonGradient: "linear-gradient(135deg, #A054F5 0%, #5E49E8 100%)" },
      "DIGI0004": { icon: Card4, iconImage: TickRed, buttonGradient: "linear-gradient(135deg, #F03B63 0%, #DD2975 100%)" },
      "DIGI0005": { icon: Card5, iconImage: TickOrange, buttonGradient: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)" }
    };
    return configs[packageId] || configs["DIGI0001"];
  };

  const getPackageFeatures = (packageId) => {
    const features = {
      "DIGI0001": ["15+ Hours of Content", "Basic Project Templates", "Community Support", "3 Real-World Projects"],
      "DIGI0002": ["25+ Hours of Content", "Premium Project Templates", "1-on-1 Mentorship", "Priority Support", "5 Real-World Projects"],
      "DIGI0003": ["50+ Hours of Content", "Automation Tools", "Advanced Challenges", "Dedicated Community Group", "10 Live Projects"],
      "DIGI0004": ["100+ Hours of Content", "Lifetime Access", "Exclusive Webinars", "Direct Client Leads", "Unlimited Projects"],
      "DIGI0005": ["100+ Hours of Content", "Lifetime Access", "Exclusive Webinars", "Direct Client Leads", "Unlimited Projects"]
    };
    return features[packageId] || features["DIGI0001"];
  };

  const getPackageDescription = (packageId) => {
    const descriptions = {
      "DIGI0001": "Perfect for beginners starting their freelancing journey",
      "DIGI0002": "Perfect for advanced learners looking to specialize",
      "DIGI0003": "For freelancers scaling their business",
      "DIGI0004": "Become a top-tier freelancer with premium training",
      "DIGI0005": "Become a top-tier freelancer with premium training"
    };
    return descriptions[packageId] || descriptions["DIGI0001"];
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/v_1/packageplan/packages`);
        if (response.data.success) {
          const apiPackages = response.data.data.map(pkg => {
            const config = getPackageConfig(pkg.package_id);
            return {
              ...config,
              title: pkg.name,
              description: getPackageDescription(pkg.package_id),
              price: pkg.referral_amount,
              mrpPrice: pkg.mrp_amount,
              features: getPackageFeatures(pkg.package_id),
              id: pkg.package_id,
              dbId: pkg.id
            };
          });

          // Store package data in session
          sessionStorage.setItem('packageData', JSON.stringify(response.data.data));

          let filteredPackages = apiPackages.filter(pkg => pkg.id !== "DIGI0001");

          if (isUpgradePage) {
            const currentPackageId = sessionStorage.getItem("packageId");
            const upgradeMap = {
              DIGI0001: ["DIGI0002", "DIGI0003", "DIGI0004", "DIGI0005"],
              DIGI0002: ["DIGI0003", "DIGI0004", "DIGI0005"],
              DIGI0003: ["DIGI0004", "DIGI0005"],
              DIGI0004: ["DIGI0005"],
              DIGI0005: [],
            };

            const allowedIds = upgradeMap[currentPackageId] || [];

            if (currentPackageId === "DIGI0005") {
              setIsUltimateUser(true);
            }

            filteredPackages = apiPackages.filter((pkg) =>
              allowedIds.includes(pkg.id)
            );
          }

          setPackages(filteredPackages);
          dispatch(setDefaultPackages(filteredPackages));
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Fallback to static data if API fails
        const fallbackPackages = [
          {
            icon: Card1,
            title: "Basic Package",
            description: "Perfect for beginners starting their freelancing journey",
            price: "2500",
            mrpPrice: "3999",
            features: ["15+ Hours of Content", "Basic Project Templates", "Community Support", "3 Real-World Projects"],
            id: "DIGI0001",
            iconImage: TickGreen,
            buttonGradient: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
          },
          {
            icon: Card2,
            title: "Standard Package",
            description: "Perfect for advanced learners looking to specialize",
            price: "4000",
            mrpPrice: "6999",
            features: ["25+ Hours of Content", "Premium Project Templates", "1-on-1 Mentorship", "Priority Support", "5 Real-World Projects"],
            id: "DIGI0002",
            iconImage: TickBlue,
            buttonGradient: "linear-gradient(135deg, #3384EC 0%, #108FBD 100%)"
          },
          {
            icon: Card3,
            title: "Advanced Package",
            description: "For freelancers scaling their business",
            price: "7000",
            mrpPrice: "11999",
            features: ["50+ Hours of Content", "Automation Tools", "Advanced Challenges", "Dedicated Community Group", "10 Live Projects"],
            id: "DIGI0003",
            iconImage: TickPurple,
            buttonGradient: "linear-gradient(135deg, #A054F5 0%, #5E49E8 100%)"
          },
          {
            icon: Card4,
            title: "Premium Package",
            description: "Become a top-tier freelancer with premium training",
            price: "11000",
            mrpPrice: "16999",
            features: ["100+ Hours of Content", "Lifetime Access", "Exclusive Webinars", "Direct Client Leads", "Unlimited Projects"],
            id: "DIGI0004",
            iconImage: TickRed,
            buttonGradient: "linear-gradient(135deg, #F03B63 0%, #DD2975 100%)"
          },
          {
            icon: Card5,
            title: "Ultimate Package",
            description: "Become a top-tier freelancer with premium training",
            price: "15000",
            mrpPrice: "22999",
            features: ["100+ Hours of Content", "Lifetime Access", "Exclusive Webinars", "Direct Client Leads", "Unlimited Projects"],
            id: "DIGI0005",
            iconImage: TickOrange,
            buttonGradient: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)"
          }
        ];
        
        // Store fallback data in session if not already stored
        if (!sessionStorage.getItem('packageData')) {
          const fallbackApiData = [
            { id: 12, package_id: "DIGI0001", name: "Basic Package", mrp_amount: "3999", referral_amount: "2500" },
            { id: 13, package_id: "DIGI0002", name: "Standard Package", mrp_amount: "6999", referral_amount: "4000" },
            { id: 14, package_id: "DIGI0003", name: "Advanced Package", mrp_amount: "11999", referral_amount: "7000" },
            { id: 15, package_id: "DIGI0004", name: "Premium Package", mrp_amount: "16999", referral_amount: "11000" },
            { id: 16, package_id: "DIGI0005", name: "Ultimate Package", mrp_amount: "22999", referral_amount: "15000" }
          ];
          sessionStorage.setItem('packageData', JSON.stringify(fallbackApiData));
        }
        
        let filteredPackages = fallbackPackages.filter(pkg => pkg.id !== "DIGI0001");
        if (isUpgradePage) {
          const currentPackageId = sessionStorage.getItem("packageId");
          const upgradeMap = {
            DIGI0001: ["DIGI0002", "DIGI0003", "DIGI0004", "DIGI0005"],
            DIGI0002: ["DIGI0003", "DIGI0004", "DIGI0005"],
            DIGI0003: ["DIGI0004", "DIGI0005"],
            DIGI0004: ["DIGI0005"],
            DIGI0005: [],
          };
          const allowedIds = upgradeMap[currentPackageId] || [];
          if (currentPackageId === "DIGI0005") {
            setIsUltimateUser(true);
          }
          filteredPackages = fallbackPackages.filter((pkg) => allowedIds.includes(pkg.id));
        }
        
        setPackages(filteredPackages);
        dispatch(setDefaultPackages(filteredPackages));
      }
    };

    fetchPackages();
  }, [dispatch, isUpgradePage]);


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
  
      const [isProcessing, setIsProcessing] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");
          const [errorPopup, setErrorPopup] = useState(false);

  const handleCardClick = async(pkg) => {
    // Store package selection data in session
    const packageData = JSON.parse(sessionStorage.getItem('packageData') || '[]');
    const selectedPackage = packageData.find(p => p.package_id === pkg.id);
    
    if (selectedPackage) {
      sessionStorage.setItem('selectedPackageId', selectedPackage.id.toString());
      sessionStorage.setItem('selectedPackageCode', selectedPackage.package_id);
      sessionStorage.setItem('selectedMrpPrice', selectedPackage.mrp_amount);
      sessionStorage.setItem('selectedPromoPrice', selectedPackage.referral_amount);
    }

    if (isRegisterPage) {
      if (onCardSelect) onCardSelect(pkg);
      navigate("/Register", { state: { selectedCard: pkg } });
    } else if (isUpgradePage) {
      const data = sessionStorage.getItem("user");
      const user = data ? JSON.parse(data) : null;
      
      if (user) {

     const res = await axios.post(`${API_BASE}/api/v_1/users/upgradecreate`, {
       Guide_code: user.guide_code,
       PackageID: pkg.id
     });

         const response = res.data;

               if (response.ok) {
                 const options = {
                   key: "rzp_test_RTi6PhglOHM0AF",
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
                         if (res?.message == "Login successful") {
                           setIsProcessing(false);
                                 sessionStorage.setItem("authToken", res.token);
               if (res.user) sessionStorage.setItem("user", JSON.stringify(res.user));
               if (res.enrollment) {
                 sessionStorage.setItem("enrollment", JSON.stringify(res.enrollment));
                 if (res.enrollment.package_id)
                   sessionStorage.setItem("packageId", res.enrollment.package_id);
               }
         
               navigate("/DashBoard");
                         } else {
                           setIsProcessing(false);
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
                         setErrorMessage("Payment not completed. You can try again.");
                         setErrorPopup(true);
                       })();
                     },
                   },
                   prefill: {
                     name: data.full_name,
                     email: data.email,
                     contact: data.phone,
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
                   const reason = (response && response.error && response.error.description) || "Payment Failed";
                   setErrorMessage(reason);
                   setErrorPopup(true);
                 });
                 rzp1.open();
               } else {
                 setIsProcessing(false);
                 setErrorMessage("Error purchasing package. Please try again.");
                 setErrorPopup(true);
               }
      } else {
        console.log("No user data found in sessionStorage");
      }
      
    }
  };
  
  return (
    <motion.section
       className="bg-white py-8 md:py-16 font-outfit px-6 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {!isRegisterPage && !isUpgradePage && (
        <div className="text-center px-4">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-semibold font-['Outfit'] leading-snug bg-gradient-to-r from-[#5E4BDA] to-[#2C71A1] bg-clip-text text-transparent"
            variants={fadeUp}
          >
            Choose Your Path to Success
          </motion.h2>
          <motion.p
            className="mt-2 text-[#797979] text-[14px] sm:text-lg font-light max-w-2xl mx-auto"
            variants={fadeUp}
          >
            Transform your freelancing career with our comprehensive learning
            bundles, designed for every stage of your journey
          </motion.p>
        </div>
      )}

      {isUltimateUser && isUpgradePage ? (
        <div className="text-center mt-16 px-6">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            You already own the highest package!
          </h3>
          <p className="text-gray-600 mt-2 text-base sm:text-lg">
            You’ve unlocked all premium features and content. There’s nothing
            more to upgrade!
          </p>
        </div>
      ) : (
        <CardGrid onCardClick={handleCardClick} />
      )}
    </motion.section>
  );
};

export default Section3;
