import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.svg';
import { ArrowRight } from 'lucide-react';
import { API_BASE } from "../apiBase";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    // focus the first input on mount
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  const handleChange = (value, index) => {
    // allow only single digit numbers or empty
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
        // clear current on backspace (default behavior already does this via onChange)
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
    // focus next empty or last
    const firstEmpty = newOtp.findIndex((d) => d === '');
    const focusIndex = firstEmpty === -1 ? 5 : firstEmpty;
    inputRefs.current[focusIndex]?.focus();
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
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
        // prefer server message when available
        throw new Error(data?.message || 'OTP verification failed. Please try again.');
      }

      console.log('OTP verified successfully:', data);

      navigate('/ResetPassword', { state: { email, otp: fullOtp } });
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#003B73] p-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full rounded-3xl overflow-hidden mt-15 shadow-lg">
        {/* Left side - Image */}
        <div className="flex-1">
          <img
            src={loginImage}
            alt="Verification Illustration"
            className="w-full h-full object-cover rounded-t-3xl md:rounded-tl-3xl sm:rounded-bl-none md:rounded-tr-none"
          />
        </div>

        {/* Right side - OTP form */}
        <div
          className="
            flex-1 bg-[#003B73] text-white p-10 flex flex-col relative
            md:border md:border-[#1C7BD5]
            rounded-b-3xl md:rounded-tr-3xl md:rounded-br-3xl md:rounded-tl-none md:rounded-bl-none
          "
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Verify OTP</h2>
          <p className="mb-6 text-[#FDDB5D] text-lg max-w-lg">
            We’ve emailed you a 6-digit code at{' '}
            <span className="font-semibold">{email}</span>. Please enter it here to continue.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            aria-busy={loading}
            onPaste={handlePaste}
          >
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
                  className="w-12 h-12 text-center text-xl font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C7BD5] text-black bg-white"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex justify-end items-center gap-4">
              {/* Optional: show resend hint or button (no API call implemented here) */}
              <button
                type="button"
                onClick={() => alert('Resend OTP clicked — implement resend API call if available.')}
                className="text-sm underline hover:text-gray-200 disabled:opacity-50"
                disabled={loading}
              >
                Resend code
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
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
