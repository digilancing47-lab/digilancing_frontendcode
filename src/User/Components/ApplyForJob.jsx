import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE } from '../../apiBase'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import CareerJobCard from './CareerJobCard'

const ApplyForJob = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [listPage, setListPage] = useState(1)
  const [totalListPages, setTotalListPages] = useState(1)
  const [allJobs, setAllJobs] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  const allJobsRef = useRef(null)
  const jobsCache = useRef({})

  useEffect(() => {
    const fetchJobs = async () => {
      const cacheKey = `${listPage}-${searchQuery}`;
      if (jobsCache.current[cacheKey]) {
        setAllJobs(jobsCache.current[cacheKey].data)
        setTotalListPages(jobsCache.current[cacheKey].totalPages)
        setPageLoading(false)
        return
      }

      try {
        setPageLoading(true)
        const params = new URLSearchParams({
          page: listPage,
          limit: 10,
          ...(searchQuery && { search: searchQuery })
        })
        const allJobsRes = await fetch(`${API_BASE}/api/v_1/job-posts?${params}`)
        const allJobsData = await allJobsRes.json()
        const mappedJobs = (allJobsData.data || []).filter(job => job.status === 'active').map(job => ({
          id: job.id,
          title: job.job_title,
          company_name: job.company_name,
          company_logo: '/Logo_blue.svg',
          location: job.location || job.company_address,
          company_address: { addressLocality: job.location || job.company_address },
          experience_level: job.experience,
          shift: job.shift,
          salary: job.salary && job.salary !== 'null-null' ? `₹${job.salary}` : 'Not Specified',
          posted_at: job.created_at,
          apply_url: '',
          link: '',
          job_summary: job.job_description,
          skills: job.skills,
          key_responsibilities: job.key_responsibilities
        }))
        
        jobsCache.current[cacheKey] = {
          data: mappedJobs,
          totalPages: allJobsData.pagination?.totalPages || 1
        }
        
        setAllJobs(mappedJobs)
        setTotalListPages(allJobsData.pagination?.totalPages || 1)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setPageLoading(false)
      }
    }
    
    const debounceTimer = setTimeout(() => {
      fetchJobs()
    }, 300)
    
    return () => clearTimeout(debounceTimer)
  }, [listPage, searchQuery])

  const handleSearch = (value) => {
    setSearchQuery(value)
    setListPage(1)
  }

  const filteredJobs = allJobs || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative pt-56 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://storage.googleapis.com/digilancing_storage/Banners/Careers.avif" 
            alt="Career Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-3 tracking-tight">
              Career Opportunities
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white mb-3">
              "Choose a job you love, and you will never have to work a day in your life."
            </p>
            
            <div className="max-w-2xl mx-auto mt-10">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by job title or keyword..."
                  className="w-full pl-14 pr-6 py-4 bg-white/95 backdrop-blur rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
      

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
                  </div>
                  <div className="mt-5 flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-9 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))
            ) : (
              filteredJobs.map((job) => (
                <CareerJobCard key={job.id} job={job} />
              ))
            )}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button 
              onClick={() => {
                setListPage(p => Math.max(1, p - 1))
                allJobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              disabled={listPage === 1}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-all"
            >
              Previous
            </button>
            <span className="px-5 py-2.5 text-sm font-semibold text-slate-700">Page {listPage} of {totalListPages}</span>
            <button 
              onClick={() => {
                setListPage(p => Math.min(totalListPages, p + 1))
                allJobsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              disabled={listPage === totalListPages}
              className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyForJob
