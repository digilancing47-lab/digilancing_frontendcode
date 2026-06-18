import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { API_BASE } from '../apiBase';
import JobCard from '../User/Components/JobCard';

const RecommendedJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const pauseTimerRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v_1/linkedin-jobs/recommended?force=true `);
        const result = await res.json();
        setJobs(result.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

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
    const cardWidth = container.scrollWidth / (jobs.length || 1);
    const index = Math.round(container.scrollLeft / cardWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || jobs.length === 0) return;

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
  }, [jobs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Latest Jobs</h2>
          <p className="text-slate-600">Explore the newest job opportunities</p>
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
            {loading ? (
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
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-9 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="w-[330px] md:w-[400px] flex-shrink-0">
                  <JobCard job={job} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {jobs.map((_, idx) => (
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
  );
};

export default RecommendedJobs;
