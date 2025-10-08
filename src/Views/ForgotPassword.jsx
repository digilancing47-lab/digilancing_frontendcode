import React, { useState } from 'react';
import { motion } from 'framer-motion';
import loginImage from '../assets/login.svg';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from "../apiBase";

const wrapperVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/v_1/users/Change-password/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      navigate("/VerifyOtp", { state: { email } });
    } catch (error) {
      console.error("Forgot Password Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003B73] p-4">
      <motion.div
        className="flex flex-col md:flex-row max-w-4xl w-full rounded-3xl overflow-hidden mt-15 shadow-lg"
        initial="hidden"
        animate="show"
        variants={wrapperVariants}
      >
        {/* Left side - Image */}
        <div className="flex-1">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="
              w-full h-full object-cover
              rounded-t-3xl md:rounded-tl-3xl sm:rounded-bl-none md:rounded-tr-none
            "
          />
        </div>

        {/* Right side - Form */}
        <div
          className="
            flex-1 bg-[#003B73] text-white py-10 md:p-10 flex flex-col relative
            md:border md:border-[#1C7BD5]
            rounded-b-3xl md:rounded-tr-3xl md:rounded-br-3xl md:rounded-tl-none md:rounded-bl-none
          "
        >
          {/* Sign up link */}
          <div className="absolute top-6 right-6 text-sm">
            Having Account?{' '}
            <a href="/login" className="underline hover:text-[#FDDB5D]">
              Sign In
            </a>
          </div>

          {/* Heading */}
          <h2 className="text-2xl mt-3 sm:text-3xl font-semibold mb-8">
            Forgot Password?
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-busy={loading}>
            <div>
              <label className="block text-sm mb-2">Enter your email address</label>
              <input
                type="email"
                name="email"
                placeholder="@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none bg-white"
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className={`flex items-center cursor-pointer gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md transition
                  ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                disabled={loading}
              >
                {/* Spinner shown when loading */}
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}

                {loading ? 'Sending...' : 'Submit'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
