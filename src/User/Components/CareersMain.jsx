import React, { useState, useEffect, useRef } from "react";
import { Briefcase, MapPin, Clock, Search, TrendingUp, Users, Award, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE } from "../../apiBase";
import JobCard from "./JobCard";
const CareersMain = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef(null);
  const [listPage, setListPage] = useState(1);
  const [totalListPages, setTotalListPages] = useState(1);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const allJobsRef = useRef(null);
  const jobsCache = useRef({});

  useEffect(() => {
    const fetchJobs = async () => {
      // Check if page data is already cached
      if (jobsCache.current[listPage]) {
        setAllJobs(jobsCache.current[listPage].data);
        setTotalListPages(jobsCache.current[listPage].totalPages);
        setPageLoading(false);
        return;
      }

      try {
        setPageLoading(true);
        setLoading(true);
        const [recommendedRes, allJobsRes] = await Promise.all([
          listPage === 1 ? fetch(`${API_BASE}/api/v_1/linkedin-jobs/recommended?force=true `) : Promise.resolve(null),
          fetch(`${API_BASE}/api/v_1/linkedin-jobs/list?page=${listPage}&limit=10`)
        ]);
        
        if (listPage === 1 && recommendedRes) {
          const recommendedData = await recommendedRes.json();
          setRecommendedJobs(recommendedData.data || []);
        }
        
        const allJobsData = await allJobsRes.json();
        
        // Cache the page data
        jobsCache.current[listPage] = {
          data: allJobsData.data || [],
          totalPages: allJobsData.totalPages || 1
        };
        
        setAllJobs(allJobsData.data || []);
        setTotalListPages(allJobsData.totalPages || 1);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
        setPageLoading(false);
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

  const pauseAutoScroll = (ms = 2000) => {
    pausedRef.current = true;
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  };

  const scrollBy = (distance) => {
    const container = scrollRef.current;
    if (!container) return;
    pauseAutoScroll();
    container.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / (recommendedJobs.length || 1);
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || recommendedJobs.length === 0) return;

    const scrollSpeed = 1;
    let animationId;
    const step = () => {
      if (!pausedRef.current) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [recommendedJobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative pt-56 pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute  inset-0">
          <img 
            src="https://storage.googleapis.com/digilancing_storage/Banners/Careers.avif" 
            alt="Career Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-3 tracking-tight">
              Career Opportunities
            </h1>
            <p className="text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join leading companies and take your career to the next level
            </p>
            
            <div className="max-w-2xl mx-auto mt-10">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
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
              <button
                onClick={() => scrollBy(-400)}
                onMouseEnter={() => pauseAutoScroll()}
                className="flex items-center justify-center w-10 h-10 bg-white border border-blue-600 rounded-lg hover:bg-blue-600 group transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() => scrollBy(400)}
                onMouseEnter={() => pauseAutoScroll()}
                className="flex items-center justify-center w-10 h-10 bg-white border border-blue-600 rounded-lg hover:bg-blue-600 group transition-all"
              >
                <ChevronRight className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
          
          <div className="relative">

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              onMouseEnter={() => pauseAutoScroll()}
              onTouchStart={() => pauseAutoScroll()}
              className="overflow-x-auto scroll-smooth hide-scrollbar"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="flex gap-5 items-stretch">
                {loading && recommendedJobs.length === 0 ? (
                  Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="w-[330px] md:w-[400px] flex-shrink-0">
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse h-full">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
                          <div className="flex-1">
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 my-4"></div>
                         <div className="space-y-4 flex flex-wrap">
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                            <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-between items-center">
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-9 bg-gray-200 rounded w-24"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  (recommendedJobs || []).map((job) => (
                    <div key={job.id} className="w-[330px] md:w-[400px] flex-shrink-0">
                      <JobCard job={job} />
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {(recommendedJobs || []).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* All Jobs */}
        <div ref={allJobsRef}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">All Openings</h2>
              <p className="text-slate-600">Explore all available positions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pageLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 my-4"></div>
                  <div className="space-y-4 flex flex-wrap">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-9 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))
            ) : (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button 
              onClick={() => {
                setListPage(p => Math.max(1, p - 1));
                allJobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              disabled={listPage === 1}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-all"
            >
              Previous
            </button>
            <span className="px-5 py-2.5 text-sm font-semibold text-slate-700">Page {listPage} of {totalListPages}</span>
            <button 
              onClick={() => {
                setListPage(p => Math.min(totalListPages, p + 1));
                allJobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
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
