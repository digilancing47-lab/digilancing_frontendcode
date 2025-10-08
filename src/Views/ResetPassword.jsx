import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.svg';
import { ArrowRight } from 'lucide-react';
import { API_BASE } from "../apiBase";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const otp = location.state?.otp || ''; // OTP is passed from VerifyOtp

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
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

    if (!email || !otp) {
      setError('Missing email or OTP. Please restart the reset flow.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/v_1/users/resetPassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to reset password. Please try again.');
      }

      console.log('Password reset successful:', data);
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
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
            alt="Reset Password Illustration"
            className="w-full h-full object-cover rounded-t-3xl md:rounded-tl-3xl sm:rounded-bl-none md:rounded-tr-none"
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
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Reset Your Password</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" aria-busy={loading}>
            <div>
              <label className="block mb-1 text-sm">New Password</label>
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
              <label className="block mb-1 text-sm">Confirm New Password</label>
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

                Reset Password <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
