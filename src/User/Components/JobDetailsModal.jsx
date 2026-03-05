import React, { useState, useEffect } from 'react';
import { API_BASE } from '../../apiBase';

const JobDetailsModal = ({ isOpen, onClose, jobId, onApply }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && jobId) {
      fetchJobDetails();
    }
  }, [isOpen, jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/v_1/job-posts/${jobId}`);
      const data = await res.json();
      setJob(data.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-xl p-4 sm:p-6 z-10 overflow-auto max-h-[85vh]">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-[#9532E5] rounded-full animate-spin"></div>
          </div>
        ) : job ? (
          <>
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {job.job_title || "Job Details"}
                </h2>
                <p className="text-xs sm:text-sm text-[#827E7E] mt-1">
                  {job.company_name}
                </p>
                {job.created_at && (
                  <p className="text-xs text-gray-500 mt-1">
                    Posted on: {new Date(job.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg border text-sm sm:text-base hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onApply();
                  }}
                  className="px-4 py-2 bg-[#9532E5] text-white rounded-lg hover:opacity-95 transition-colors text-sm sm:text-base font-medium"
                >
                  Apply Now
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <div className="font-semibold">Employment Type</div>
                <div>{job.employment_type || "-"}</div>
              </div>
              <div>
                <div className="font-semibold">Shift</div>
                <div>{job.shift || "-"}</div>
              </div>
              <div>
                <div className="font-semibold">Openings</div>
                <div>{job.openings ?? "-"}</div>
              </div>
              <div>
                <div className="font-semibold">Salary Range</div>
                <div>
                  {job.min_salary ?? "-"} - {job.max_salary ?? "-"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Location / Address</div>
                <div>{job.company_address || "-"}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Education</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.education?.length ? (
                    job.education.map((e, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full border text-xs"
                      >
                        {e}
                      </span>
                    ))
                  ) : (
                    <div>-</div>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Skills</div>
                <div className="mt-2">
                  {job.skills?.length ? (
                    <ul className="list-disc pl-5">
                      {job.skills.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <div>-</div>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Job Description</div>
                <div className="mt-2 whitespace-pre-wrap">
                  {job.job_description || "-"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Key Responsibilities</div>
                <div className="mt-2 whitespace-pre-wrap">
                  {job.key_responsibilities || "-"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Skills & Experience</div>
                <div className="mt-2 whitespace-pre-wrap">
                  {job.skills_and_experience || "-"}
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="font-semibold">Contact</div>
                <div className="mt-1 space-y-1">
                  <div>
                    {job.contact_person_name || "-"}
                  </div>
                  <div>{job.contact_phone || "-"}</div>
                  <div>{job.company_email || "-"}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Job not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsModal;
