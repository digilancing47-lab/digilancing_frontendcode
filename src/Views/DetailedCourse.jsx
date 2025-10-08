import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const DetailedCourse = () => {
  const location = useLocation();
  const { courseData } = location.state || {};

  if (!courseData)
    return (
      <p className="text-center mt-24 text-gray-500 text-lg">
        No course data available
      </p>
    );

  const { course, enrolled, instructor, playlist_summary, playlist_intro } = courseData;

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Video */}
          <div className="relative w-full rounded-2xl shadow-xl overflow-hidden bg-black aspect-video">
            <iframe
              className="w-full h-full"
              src={playlist_intro || "https://www.youtube.com/embed/ePOglweqy7o"}
              title="Course Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* About Course */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Course</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {course.description || "No description available"}
            </p>
          </section>

          {/* What Will I Learn */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-700 text-base">
              {course.outcome?.length
                ? course.outcome.map((item, i) => (
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
            <div className="space-y-3">
              {playlist_summary?.length ? (
                playlist_summary.map((section, idx) => (
                  <details
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all duration-200"
                  >
                    <summary className="cursor-pointer font-semibold text-gray-800 text-lg">
                      {section.title}
                    </summary>
                    {section.items?.length ? (
                      <ul className="pl-5 mt-2 space-y-1 text-gray-600">
                        {section.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 mt-1">No items in this section</p>
                    )}
                  </details>
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
              <div className="flex items-center gap-4">
                <img
                  src={instructor.profile_url || "https://placehold.co/50x50"}
                  alt={instructor.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-800 font-semibold">{instructor.name}</p>
                  {instructor.bio && <p className="text-gray-500 text-sm">{instructor.bio}</p>}
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Instructor info not available</p>
            )}
          </section>

          {/* Requirements */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Requirements</h3>
            <ul className="text-gray-700 text-sm space-y-2">
              {course.requirements?.length
                ? course.requirements.map((req, i) => <li key={i}>• {req}</li>)
                : <li className="text-gray-400">None</li>}
            </ul>
          </section>

          {/* Tags */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags?.length
                ? course.tags.map((tag, i) => (
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
