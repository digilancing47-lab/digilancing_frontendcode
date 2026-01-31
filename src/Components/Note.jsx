import React from "react";
import { motion } from "framer-motion";

const LoginNotice = ({ message }) => {
  // Check if user is logged in
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  // Don't render anything if user is logged in
  if (user) return null;

  return (
    <motion.div
      className="continer mx-auto px-6 lg:px-12 py-4 bg-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl p-4 shadow-sm overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl" />
        <div className="relative flex items-center gap-3 px-3 py-2">
          <p className="text-gray-700 text-[16px]">
            <span className="font-semibold text-gray-900">Note:</span> {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginNotice;
