import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import loginImage from '../assets/login.svg';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from "../apiBase";

const wrapperVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    stayLoggedIn: false,
  });

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) navigate("/DashBoard");
  }, [navigate]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/v_1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      // Try to parse JSON response safely
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        data = { message: await res.text() };
      }

      // Map status codes to user messages
      if (!res.ok) {
        // Treat 403 and 404 as "user not found" (per your requirement)
        if (res.status === 403 || res.status === 404) {
          setError("User not found. Please check your email or sign up.");
        } else if (res.status === 401) {
          // Unauthorized -> Invalid password (example)
          setError(data?.message || "Invalid password. Please try again.");
        } else if (res.status === 422) {
          setError(data?.message || "Validation error. Check inputs.");
        } else {
          setError(data?.message || `Login failed (status ${res.status}). Please try again.`);
        }
        console.error("Login failed:", res.status, data);
        return;
      }

      // Successful response: validate token before storing
      if (!data || !data.token) {
        setError("Login succeeded but server did not return a token.");
        console.error("No token in login response:", data);
        return;
      }

      // Store session only on success
      sessionStorage.setItem("authToken", data.token);
      if (data.user) sessionStorage.setItem("user", JSON.stringify(data.user));
      if (data.enrollment) {
        sessionStorage.setItem("enrollment", JSON.stringify(data.enrollment));
        if (data.enrollment.package_id) sessionStorage.setItem("packageId", data.enrollment.package_id);
      }

      // If the user chose persistent login, you might want to also save to localStorage
      if (formData.stayLoggedIn) {
        localStorage.setItem("authToken", data.token);
      }

      navigate("/DashBoard");
    } catch (networkErr) {
      console.error("Network or unexpected error:", networkErr);
      setError("Network error. Please check your connection and try again.");
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
        <div className="flex-1">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="w-full h-full object-cover md:rounded-t-3xl md:rounded-tl-3xl sm:rounded-bl-none md:rounded-tr-none"
          />
        </div>

        <div className="flex-1 bg-[#003B73] text-white py-10 md:p-10 flex flex-col relative md:border md:border-[#1C7BD5] md:rounded-tr-3xl md:rounded-br-3xl">
          <div className="absolute top-6 right-6 text-sm">
            No Account?{' '}
            <a href="/Register" className="underline hover:text-[#FDDB5D]">Sign up</a>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold  mt-3 mb-6">Log in to <br /><span className="font-bold">your account</span></h2>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-600/90 text-white">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-grow">
            <div>
              <label className="block mb-2 text-sm">Enter your username or email address</label>
              <input
                type="email"
                name="email"
                placeholder="@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none bg-white"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Enter your Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg text-black focus:outline-none bg-white"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="stayLoggedIn"
                  checked={formData.stayLoggedIn}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                Stay logged in
              </label>

              <a href="/ForgotPassword" className="hover:text-[#FDDB5D]">Forgot Password?</a>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 cursor-pointer bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Submit'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/30">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
