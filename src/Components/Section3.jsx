import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ useNavigate
import { useDispatch } from "react-redux";
import CardGrid from "./CardGrid";

import { setDefaultPackages } from "../redux/slices/registerSlice";

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

  useEffect(() => {
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

    let filteredPackages = defaults;

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

      filteredPackages = defaults.filter((pkg) =>
        allowedIds.includes(pkg.id)
      );
    }

    dispatch(setDefaultPackages(filteredPackages));
  }, [dispatch, isUpgradePage]);


const handleCardClick = (pkg) => {
  if (isRegisterPage) {
    if (onCardSelect) onCardSelect(pkg);
    navigate("/Register", { state: { selectedCard: pkg } });
  } else if (isUpgradePage) {
    
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
