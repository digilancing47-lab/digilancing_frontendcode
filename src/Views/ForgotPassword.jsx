import React, { useState, useRef, useEffect } from 'react';
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
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const inputRefs = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2) {
      if (inputRefs.current[0]) inputRefs.current[0].focus();
      startCountdown(59);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]);

  const startCountdown = (startSeconds = 59) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsLeft(startSeconds);
    setIsResendDisabled(true);

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = inputRefs.current[index + 1];
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          const prev = inputRefs.current[index - 1];
          if (prev) prev.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData('text');
    const digits = paste.replace(/\D/g, '').slice(0, 6).split('');
    if (digits.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || '';
    }
    setOtp(newOtp);
    const firstEmpty = newOtp.findIndex((d) => d === '');
    const focusIndex = firstEmpty === -1 ? 5 : firstEmpty;
    inputRefs.current[focusIndex]?.focus();
    e.preventDefault();
  };

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

      setStep(2);
    } catch (error) {
      console.error("Forgot Password Error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError('');
    const fullOtp = otp.join('').trim();

    if (fullOtp.length !== 6 || /\D/.test(fullOtp)) {
      setError('Please enter the 6-digit numeric code sent to your email.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/v_1/users/verifyOtp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'OTP verification failed. Please try again.');
      }

      setStep(3);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/v_1/users/resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, otp: otp.join('') }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to reset password. Please try again.');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
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
        throw new Error(data.message || "Something went wrong while resending OTP.");
      }

      startCountdown(59);
      alert(data.message || 'OTP resent. Please check your email.');
    } catch (err) {
      alert(err.message || 'Failed to resend OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getHeading = () => {
    if (step === 1) return 'Forgot Password?';
    if (step === 2) return 'Verify OTP';
    return 'Reset Your Password';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] p-4">
      <motion.div
        className="flex flex-col md:flex-row max-w-5xl w-full rounded-3xl overflow-hidden mt-15 shadow-lg"
        initial="hidden"
        animate="show"
        variants={wrapperVariants}
      >
        {/* Left side - Image */}
        <div className="flex-1">
          <img
            src={'https://storage.googleapis.com/digilancing_storage/login%202.avif'}
            alt="Login Illustration"
            className="w-full h-full object-cover md:rounded-t-3xl md:rounded-tl-3xl sm:rounded-bl-none md:rounded-tr-none"
          />
        </div>

        {/* Right side - Form */}
        <div className="flex-1 bg-white/10 backdrop-blur-xl text-white py-10 md:p-10 flex flex-col relative border border-white/20 md:rounded-tr-3xl md:rounded-br-3xl shadow-2xl">
          {/* Sign in link */}
          <div className="absolute top-6 right-6 text-sm">
            Having Account?{' '}
            <a href="/login" className="underline hover:text-[#FDDB5D]">
              Sign In
            </a>
          </div>

          {/* Heading */}
          <h2 className="text-2xl mt-3 sm:text-3xl font-semibold mb-8">
            {getHeading()}
          </h2>

          {step === 2 && (
            <p className="mb-6 text-yellow-300 text-sm max-w-lg">
              We've emailed you a 6-digit code at{' '}
              <span className="font-semibold">{email}</span>. Please enter it here to continue.
            </p>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
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

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`flex items-center cursor-pointer gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md transition
                    ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Submit'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifySubmit} className="flex flex-col gap-6" aria-busy={loading} onPaste={handlePaste}>
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value.trim(), index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    disabled={loading}
                    className="w-12 h-12 text-center text-xl font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm underline hover:text-gray-200 disabled:opacity-50"
                  disabled={loading || isResendDisabled}
                >
                  {isResendDisabled ? `Resend code (${secondsLeft}s)` : 'Resend code'}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Submit'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-6" aria-busy={loading}>
              <div>
                <label className="block mb-2 text-sm">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-lg text-black focus:outline-none bg-white"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 rounded-lg text-black focus:outline-none bg-white"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md transition
                    ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  disabled={loading}
                >
                  Reset Password <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}
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

export default ForgotPassword;
