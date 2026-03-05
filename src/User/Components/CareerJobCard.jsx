import React from "react";
import { Briefcase, MapPin, Clock, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPortal } from "react-dom";
import JobApplicationModal from "./JobApplicationModal";
import JobDetailsModal from "./JobDetailsModal";

const CareerJobCard = ({ job }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const experience = job.experience_level || "Not Specified";
  const shift = job.shift || "Not Specified";

  const salary =
    job.salary && job.salary.trim() ? job.salary : "Not Specified";

  const location =
    job.location ||
    job.company_address?.addressLocality ||
    "Remote";

  const infoItems = [
    {
      icon: MapPin,
      title: "Location",
      value: location.split(",")[0],
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: Clock,
      title: "Experience",
      value: experience,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: Clock,
      title: "Shift",
      value: shift,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    },
    {
      icon: IndianRupee,
      title: "Expect Salary",
      value: salary,
     bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-full flex flex-col">

      {/* Top Section */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          {job.company_logo ? (
            <img
              src={job.company_logo}
              alt={job.company_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Briefcase className="w-7 h-7 text-gray-500" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition line-clamp-2">
            {job.title || "Unknown Title"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {job.company_name || "Company Name"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-gray-100" />

      {/* Info Tags */}
      <div className="flex flex-wrap gap-4 flex-1">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex flex-1 items-start gap-3">
              <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">{item.title}</h3>
                <p className="text-sm font-medium text-gray-900 truncate capitalize">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      {job.skills && (
        <>
          <div className="my-4 border-t border-gray-100" />
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(job.skills) ? job.skills : job.skills.split(',')).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-md">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">

        <span className="text-xs text-gray-400">
          {job.posted_at
            ? new Date(job.posted_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            : "Recently Posted"}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetailsModal(true);
            }}
            className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors whitespace-nowrap"
          >
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const user = sessionStorage.getItem('user');
              if (!user) {
                navigate('/login');
                return;
              }
              setShowModal(true);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            Apply Now
          </button>
        </div>

      </div>

      {showDetailsModal && createPortal(
        <JobDetailsModal 
          isOpen={showDetailsModal} 
          onClose={() => setShowDetailsModal(false)} 
          jobId={job.id}
          onApply={() => setShowModal(true)}
        />,
        document.body
      )}

      {showModal && createPortal(
        <JobApplicationModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          job={job}
        />,
        document.body
      )}
    </div>
  );
};

export default CareerJobCard;
