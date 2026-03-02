import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, Search, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE } from "../../apiBase";
const CareersMain = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [listPage, setListPage] = useState(1);
  const [totalListPages, setTotalListPages] = useState(1);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const [recommendedRes, allJobsRes] = await Promise.all([
          fetch(`${API_BASE}/api/v_1/linkedin-jobs/recommended`),
          fetch(`${API_BASE}/api/v_1/linkedin-jobs/list?page=${listPage}&limit=10`)
        ]);
        const recommendedData = await recommendedRes.json();
        const allJobsData = await allJobsRes.json();
        setRecommendedJobs(recommendedData.data || []);
        setAllJobs(allJobsData.data || []);
        setTotalListPages(allJobsData.totalPages || 1);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [listPage]);

  const locations = ["All", ...new Set((allJobs || []).map(j => j.location || j.company_address?.addressLocality).filter(Boolean))];
  const types = ["All", ...new Set((allJobs || []).map(j => j.experience_level).filter(Boolean))];

  const filteredJobs = (allJobs || []).filter(job => 
    (locationFilter === "All" || job.location === locationFilter || job.company_address?.addressLocality === locationFilter) &&
    (typeFilter === "All" || job.experience_level === typeFilter) &&
    (searchQuery === "" || job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.job_summary?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const JOBS_PER_PAGE = 4;
  const totalPages = Math.ceil((recommendedJobs || []).length / JOBS_PER_PAGE);

  useEffect(() => {
    if (recommendedJobs.length > 0) {
      const interval = setInterval(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [totalPages, recommendedJobs.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Career Opportunities
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join leading companies and take your career to the next level
            </p>
                   {/* Marketing Tools Image */}
            <div className="max-w-5xl mx-auto">
              <img 
                src="/Marketingtools.avif" 
                alt="Marketing Tools" 
                className="w-full h-[300px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="max-w-2xl mx-auto mt-10">
              
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by job title or keyword..."
                  className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Recommendations Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Recommended for You</h2>
              <p className="text-slate-600">Curated opportunities matching your profile</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)} className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)} className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="min-w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {(recommendedJobs || []).slice(pageIdx * JOBS_PER_PAGE, (pageIdx + 1) * JOBS_PER_PAGE).map((job) => (
                      <div key={job.id} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                        <div className="flex items-start gap-4 mb-5">
                          {job.company_logo ? (
                            <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 rounded-xl object-contain bg-slate-50 p-2 border border-slate-100" />
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                              <Briefcase className="w-8 h-8 text-white" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base line-clamp-2 mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                            <p className="text-sm text-slate-600 line-clamp-1 font-semibold">{job.company_name}</p>
                          </div>
                        </div>
                        <div className="space-y-3 mb-5 pb-5 border-b border-slate-100">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" />
                            <span className="line-clamp-1">{job.location || job.company_address?.addressLocality || 'Remote'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4 flex-shrink-0 text-slate-400" />
                            <span>{job.experience_level !== 'not-specified' ? job.experience_level : 'Full-time'}</span>
                          </div>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); window.open(job.apply_url || job.link, '_blank'); }} className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">Apply Now</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* All Jobs */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">All Openings</h2>
              <p className="text-slate-600">Explore all available positions</p>
            </div>
            <div className="flex gap-3">
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700">
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-700">
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4 mb-5">
                  {job.company_logo ? (
                    <img src={job.company_logo} alt={job.company_name} className="w-16 h-16 rounded-xl object-contain bg-slate-50 p-2 border border-slate-100" />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base line-clamp-2 mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-1 font-semibold">{job.company_name}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-5 pb-5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    <span className="line-clamp-1">{job.location || job.company_address?.addressLocality || 'Remote'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 flex-shrink-0 text-slate-400" />
                    <span>{job.experience_level !== 'not-specified' ? job.experience_level : 'Full-time'}</span>
                  </div>
                </div>
                <button onClick={() => window.open(job.apply_url || job.link, '_blank')} className="w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">Apply Now</button>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button 
              onClick={() => setListPage(p => Math.max(1, p - 1))} 
              disabled={listPage === 1}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-all"
            >
              Previous
            </button>
            <span className="px-5 py-2.5 text-sm font-semibold text-slate-700">Page {listPage} of {totalListPages}</span>
            <button 
              onClick={() => setListPage(p => Math.min(totalListPages, p + 1))} 
              disabled={listPage === totalListPages}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedJob(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-3">{selectedJob.title}</h2>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{selectedJob.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{selectedJob.type}</span>
              <span className="text-green-600 font-bold">{selectedJob.salary}</span>
            </div>
            <p className="text-gray-700 mb-4">{selectedJob.description}</p>
            <h3 className="font-bold mb-2">Requirements:</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-1">
              {selectedJob.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
            </ul>
            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Apply Now</button>
              <button className="px-6 py-3 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300" onClick={() => setSelectedJob(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersMain;
