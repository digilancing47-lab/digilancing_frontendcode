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
          fetch('http://localhost:8080/api/v_1/linkedin-jobs/recommended'),
          fetch(`http://localhost:8080/api/v_1/linkedin-jobs/list?page=${listPage}&limit=10`)
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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join Our Team
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover exciting career opportunities and grow with us
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Recommendations Carousel */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Jobs</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)} className="p-2 rounded-lg bg-white shadow hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)} className="p-2 rounded-lg bg-white shadow hover:bg-gray-50">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentPage * 100}%)` }}>
              {Array.from({ length: totalPages }).map((_, pageIdx) => (
                <div key={pageIdx} className="min-w-full flex-shrink-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {(recommendedJobs || []).slice(pageIdx * JOBS_PER_PAGE, (pageIdx + 1) * JOBS_PER_PAGE).map((job) => (
                      <div key={job.id} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                          </div>
                          <h3 className="font-semibold text-sm line-clamp-1">{job.title}</h3>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location || job.company_address?.addressLocality || 'Remote'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{job.experience_level || 'Full-time'}</span>
                          </div>
                        </div>
                        <p className="text-green-600 font-semibold text-sm mb-3">{job.salary || 'Competitive'}</p>
              <button onClick={(e) => { e.stopPropagation(); window.open(job.apply_url || job.link, '_blank'); }} className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700">Apply Now</button>
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Openings</h2>
            <div className="flex gap-3">
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="px-4 py-2 bg-white rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 bg-white rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                {types.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-1">{job.title}</h3>
                </div>
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location || job.company_address?.addressLocality || 'Remote'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{job.experience_level || 'Full-time'}</span>
                  </div>
                </div>
                <p className="text-green-600 font-semibold text-sm mb-3">{job.salary || 'Competitive'}</p>
                <button onClick={() => window.open(job.apply_url || job.link, '_blank')} className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700">Apply Now</button>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button 
              onClick={() => setListPage(p => Math.max(1, p - 1))} 
              disabled={listPage === 1}
              className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm font-medium">Page {listPage} of {totalListPages}</span>
            <button 
              onClick={() => setListPage(p => Math.min(totalListPages, p + 1))} 
              disabled={listPage === totalListPages}
              className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
