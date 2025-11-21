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
        const result = [];
        str.forEach(item => {
          if (typeof item === 'string') {
            let cleaned = item
              .replace(/\\?"/g, '"')
              .replace(/^\["/, '')
              .replace(/"\]$/, '')
              .trim();
            
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

  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const fixVimeoUrl = (html) => {
    if (!html) return html;
    const decoded = decodeHtml(html);
    return decoded.replace(/&amp;autoplay=1/g, '').replace(/autoplay=1&amp;/g, '').replace(/autoplay=1/g, '');
  };

  if (!courseData)
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        No course data available
      </p>
    );

  const { course, enrolled, instructor } = courseData;
  
  const parseCurriculum = (curriculumStr) => {
    if (!curriculumStr) return [];
    try {
      let decoded = decodeHtml(curriculumStr);
      const outerParsed = JSON.parse(decoded);
      
      // Extract all curriculum items from the keys
      const curriculumItems = [];
      Object.keys(outerParsed).forEach(key => {
        try {
          const lesson = JSON.parse(key);
          curriculumItems.push(lesson);
        } catch (e) {
          console.log('Error parsing lesson:', e);
        }
      });
      
      return curriculumItems;
    } catch (e) {
      console.log('Curriculum parse error:', e);
      return [];
    }
  };
  
  let curriculum = parseCurriculum(course.curriculum);
  
  console.log('Raw curriculum string:', course.curriculum);
  console.log('Parsed curriculum:', curriculum);
  
  // Fallback curriculum for testing
  if (curriculum.length === 0 && course.curriculum) {
    curriculum = [
      { class_title: "Introduction", duration: "18", class_url: course.playlist_url },
      { class_title: "Html", duration: "18", class_url: course.playlist_url },
      { class_title: "Css", duration: "14", class_url: course.playlist_url },
      { class_title: "Java Script", duration: "13", class_url: course.playlist_url },
      { class_title: "React Js", duration: "13", class_url: course.playlist_url },
      { class_title: "Error Handling", duration: "16", class_url: course.playlist_url },
      { class_title: "Backend", duration: "14", class_url: course.playlist_url },
      { class_title: "Authentication", duration: "14", class_url: course.playlist_url },
      { class_title: "RestFul Api", duration: "14", class_url: course.playlist_url }
    ];
  }
  
  const fixedPlaylistUrl = course.playlist_url;
  const defaultVideo = fixedPlaylistUrl || (curriculum[0]?.class_url);
  const [currentVideo, setCurrentVideo] = useState(defaultVideo);
  const [activeVideo, setActiveVideo] = useState('lesson-0'); // Track which video is playing

  const requirements = parseJsonString(course.requirements);
  const tags = parseJsonString(course.tags);
  const learningPoints = parseJsonString(course.learning_points);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative w-full rounded-2xl shadow-xl overflow-hidden bg-black aspect-video">
            {currentVideo ? (
              <>
                <div 
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: fixVimeoUrl(currentVideo) }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="text-center text-white pointer-events-auto">
                    <p className="text-sm mb-2">Video restricted for this domain</p>
                    <a 
                      href="https://vimeo.com/1139215395" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm inline-flex items-center gap-2"
                    >
                      <Play size={16} />
                      Watch on Vimeo
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <Play size={64} className="mx-auto mb-4" />
                  <p className="text-gray-300">No video available</p>
                </div>
              </div>
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

          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Curriculum</h2>
            
            <div className="space-y-3">
              {curriculum?.length ? (
                curriculum.map((lesson, idx) => (
                  <div
                    key={idx}
                    className={`border border-gray-200 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      activeVideo === `lesson-${idx}` 
                        ? 'bg-blue-100 border-blue-300' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Play size={20} className="text-blue-500" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{lesson.class_title || 'Untitled Lesson'}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentVideo(lesson.class_url);
                        setActiveVideo(`lesson-${idx}`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Play
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No curriculum available</p>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
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
          
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Requirements</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              {requirements?.length
                ? requirements.map((req, i) => <li key={i}>• {req}</li>)
                : <li className="text-gray-400">None</li>}
            </ul>
          </section>

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