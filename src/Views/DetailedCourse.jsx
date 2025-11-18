import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, Play, Clock } from "lucide-react";

const DetailedCourse = () => {
  const location = useLocation();
  const { courseData } = location.state || {};

  // Utility functions
  const parseJsonString = (str) => {
    if (!str) return [];
    
    try {
      if (Array.isArray(str)) {
        // Handle array of malformed JSON strings
        const result = [];
        str.forEach(item => {
          if (typeof item === 'string') {
            // Clean up the malformed JSON string
            let cleaned = item
              .replace(/\\?"/g, '"')  // Fix escaped quotes
              .replace(/^\["/, '')     // Remove opening [" 
              .replace(/"\]$/, '')     // Remove closing "]
              .trim();
            
            // Split by comma and clean each item
            if (cleaned.includes(',')) {
              cleaned.split(',').forEach(subItem => {
                const cleanItem = subItem.trim().replace(/^"|"$/g, '');
                if (cleanItem) result.push(cleanItem);
              });
            } else {
              const cleanItem = cleaned.replace(/^"|"$/g, '');
              if (cleanItem) result.push(cleanItem);
            }
          } else {
            result.push(item);
          }
        });
        return result;
      }
      
      // Handle single string
      if (typeof str === 'string') {
        let cleaned = str.replace(/\\?"/g, '"');
        return JSON.parse(cleaned);
      }
      
      return str;
    } catch (e) {
      console.log('Parse error:', e, 'for string:', str);
      return Array.isArray(str) ? str : [];
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    
    // Extract video ID from various YouTube URL formats
    let videoId = null;
    
    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([^&\n?#]+)/);
    if (watchMatch) {
      videoId = watchMatch[1];
    }
    
    // YouTube Shorts URL: youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/(?:youtube\.com\/shorts\/)([^&\n?#]+)/);
    if (shortsMatch) {
      videoId = shortsMatch[1];
    }
    
    // Short URL: youtu.be/VIDEO_ID
    const shortMatch = url.match(/(?:youtu\.be\/)([^&\n?#]+)/);
    if (shortMatch) {
      videoId = shortMatch[1];
    }
    
    // Embed URL: youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/(?:youtube\.com\/embed\/)([^&\n?#]+)/);
    if (embedMatch) {
      videoId = embedMatch[1];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!courseData)
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        No course data available
      </p>
    );

  const { course, enrolled, instructor, playlist_url } = courseData;
  
  // Parse course data first to get curriculum
  const curriculum = course.curriculum ? parseJsonString(course.curriculum) : [];
  
  // Fix playlist_url format (add https if missing)
  const fixedPlaylistUrl = playlist_url && !playlist_url.startsWith('http') 
    ? `https://${playlist_url}` 
    : playlist_url;
  
  // Use playlist_url if available, otherwise use first curriculum video
  const defaultVideo = fixedPlaylistUrl || (curriculum[0]?.class_url);
  const [currentVideo, setCurrentVideo] = useState(defaultVideo);

  // Parse other course data
  const requirements = parseJsonString(course.requirements);
  const tags = parseJsonString(course.tags);
  const learningPoints = parseJsonString(course.learning_points);
  const embedUrl = getEmbedUrl(currentVideo);
  
 
  console.log('Playlist URL:', playlist_url);
  console.log('Fixed Playlist URL:', fixedPlaylistUrl);
  console.log('Current Video:', currentVideo);
  console.log('Embed URL:', embedUrl);
  console.log('Is Shorts?', currentVideo?.includes('/shorts/'));
  console.log('Curriculum:', curriculum);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative w-full rounded-2xl shadow-xl overflow-hidden bg-black aspect-video">
            {currentVideo?.includes('/shorts/') ? (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <Play size={64} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">YouTube Short</h3>
                  <p className="mb-6 text-gray-300">Shorts cannot be embedded</p>
                  <a 
                    href={currentVideo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg text-white font-medium inline-flex items-center gap-3 text-lg transition-colors"
                  >
                    <Play size={24} />
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ) : (
              <iframe
                className="w-full h-full"
                src={embedUrl || `https://www.youtube.com/embed/${currentVideo?.match(/[?&]v=([^&]+)/)?.[1] || currentVideo?.match(/\/shorts\/([^?&]+)/)?.[1] || ''}`}
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => console.log('Iframe error')}
                onLoad={() => console.log('Iframe loaded:', embedUrl)}
              ></iframe>
            )}
          </div>
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Course</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {course.about_course || "No description available"}
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-base">
              {learningPoints?.length
                ? learningPoints.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      {item}
                    </li>
                  ))
                : <li className="text-gray-400">No learning outcomes</li>}
            </ul>
          </section>

          {/* Curriculum */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Curriculum</h2>
            
            {/* Course Intro */}
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-all duration-200 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Play size={20} className="text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">Course Introduction</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Course Overview</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  console.log('Setting playlist_url:', fixedPlaylistUrl);
                  setCurrentVideo(fixedPlaylistUrl);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Play
              </button>
            </div>
            
            <div className="space-y-3">
              {curriculum?.length ? (
                curriculum.map((lesson, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all duration-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Play size={20} className="text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{lesson.class_title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>{lesson.duration} min</span>
                        </div>
                      </div>
                    </div>
                    {lesson.class_url && (
                      <button
                        onClick={() => setCurrentVideo(lesson.class_url)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                      >
                        Play
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No curriculum available</p>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE (Sticky) */}
        <div className="space-y-6 lg:sticky lg:top-24">
          {/* Course Info */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Course Info</h3>
            <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
              <li><span className="font-semibold">Title:</span> {course.title}</li>
              <li><span className="font-semibold">Level:</span> Beginner</li>
              <li><span className="font-semibold">Enrollment:</span> {enrolled ? "Enrolled" : "Not enrolled"}</li>
              <li><span className="font-semibold">Duration:</span> {course.duration || "N/A"}</li>
              <li>Certificate of completion available</li>
            </ul>
          </section>

          {/* Instructor */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Instructor</h3>
            {instructor ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={instructor.profile_url?.startsWith('http') 
                      ? instructor.profile_url 
                      : `https://storage.googleapis.com/digilancing_storage/${instructor.profile_url}`
                    }
                    alt={instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/64x64';
                    }}
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{instructor.name}</p>
                    <p className="text-sm text-gray-500">{instructor.instructor_code}</p>
                  </div>
                </div>
                
                {instructor.bio && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">About</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{instructor.bio}</p>
                  </div>
                )}
                
                {instructor.expertise && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.expertise.split(',').map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-400">Instructor info not available</p>
            )}
          </section>
          
          {/* Requirements */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Requirements</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              {requirements?.length
                ? requirements.map((req, i) => <li key={i}>• {req}</li>)
                : <li className="text-gray-400">None</li>}
            </ul>
          </section>

          {/* Tags */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags?.length
                ? tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1 text-sm font-medium border rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 transition"
                    >
                      {tag}
                    </span>
                  ))
                : <span className="text-gray-400">No tags</span>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailedCourse;
