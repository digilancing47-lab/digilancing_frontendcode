import React, { useState } from "react";
import { Briefcase, MapPin, Clock, ChevronRight, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../apiBase";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const experienceMap = {
    internship: "Fresher",
    entry: "1 year",
    junior: "2-3 years",
    mid: "4-6 years",
    senior: "7-9 years",
    lead: "10+ years",
    "not-specified": "Not Specified"
  };

  const experience =
    experienceMap[job.experience_level?.toLowerCase()] || "Not Specified";

  const salary =
    job.salary && job.salary.trim() ? job.salary : "Not Disclosed";

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
      icon: IndianRupee,
      title: "Expect Salary",
      value: salary,
     bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600"
    }
  ];

  const [imgError, setImgError] = useState(false);

  const isLinkedInImage = job.company_logo?.includes('licdn.com');
  const logoSrc = isLinkedInImage
    ? `${API_BASE}/api/v_1/proxy-image?url=${encodeURIComponent(job.company_logo)}`
    : job.company_logo;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer h-full flex flex-col">

      {/* Top Section */}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-indigo-50 flex items-center justify-center flex-shrink-0">
          {!imgError && job.company_logo ? (
            <img
              src={logoSrc}
              alt={job.company_name}
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-indigo-600 font-bold text-lg">
              {(job.company_name || 'C').charAt(0).toUpperCase()}
            </span>
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
              const user = sessionStorage.getItem('user');
              if (!user) {
                navigate('/login');
                return;
              }
              window.open(job.apply_url || job.link, "_blank");
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            Apply Now
          </button>
        </div>

      </div>

    </div>
  );
};

export default JobCard;