import React from "react";
import { motion } from "framer-motion";

const LoginNotice = ({ message }) => {
  // Check if user is logged in
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  // Don't render anything if user is logged in
  if (user) return null;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 lg:px-12 py-7 mb-10 bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 18 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-m text-yellow-900 font-medium">
        <span className="font-semibold">Note:</span> {message}
      </p>
    </motion.div>
  );
};

export default LoginNotice;
