import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { API_BASE } from '../../apiBase';

const JobApplicationModal = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    document: null
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const userStr = sessionStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setFormData(prev => ({
            ...prev,
            name: user.fullname || user.name || '',
            email: user.email || '',
            mobile: user.phone || user.mobile || ''
          }));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Try multiple token sources
      let token = sessionStorage.getItem('token') || sessionStorage.getItem('authToken');
      
      if (!token) {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          token = user?.token || user?.accessToken || user?.authToken;
        }
      }

      if (!token) {
        alert('Please login to apply for this job');
        setSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('job_id', job.id);
      formDataToSend.append('full_name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.mobile);
      if (formData.document) {
        formDataToSend.append('resume', formData.document);
      }

      const response = await fetch(`${API_BASE}/api/v_1/job-applications/apply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Application submitted successfully!');
        setFormData({
          name: '',
          email: '',
          mobile: '',
          document: null
        });
        onClose();
      } else {
        alert(result.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Applying Job for</h2>
            <p className="text-sm text-gray-600 mt-1">{job?.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your mobile number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume/CV *
            </label>
            <div className="relative">
              <input
                type="file"
                required
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="document-upload"
              />
              <label
                htmlFor="document-upload"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {formData.document ? formData.document.name : 'Choose file (PDF, DOC, DOCX)'}
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationModal;
