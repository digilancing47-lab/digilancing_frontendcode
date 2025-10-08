import React, { useState } from 'react';
import icon from '../../User/Assets/icon.svg';

const UserCourses = () => {
  const [showAll, setShowAll] = useState(false);

  const courses = [
    {
      title: 'Cyber security',
      description: '3 hour workshop',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      instructorAvatar: icon
    },
    {
      title: 'Virtual Reality',
      description: '10 hour workshop',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      instructorAvatar: icon
    },
    {
      title: 'Digital Marketing',
      description: '1 hour workshop',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      instructorAvatar: icon
    },
    {
      title: 'Cyber security',
      description: '3 hour workshop',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      instructorAvatar: icon
    },
    {
      title: 'Virtual Reality',
      description: '10 hour workshop',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      instructorAvatar: icon
    },
    {
      title: 'Digital Marketing',
      description: '1 hour workshop',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
      instructorAvatar: icon
    }
  ];

  const displayedCourses = showAll ? courses : courses.slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-5">
      {/* Header with View All */}
      <div className="flex justify-between items-center ">
        <h3 className="text-xl font-semibold">Premium Courses</h3>
        {courses.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showAll ? 'View Less' : 'View All'}
          </button>
        )}
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course, idx) => (
          <div key={idx} className="border-black-700 rounded-lg overflow-hidden shadow-sm">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover p-2" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-sm">{course.title}</h4>
                <img
                  src={course.instructorAvatar}
                  alt="Instructor"
                  className="w-10 h-10 rounded-full ml-2"
                />
              </div>
              <p className="text-sm text-gray-600">{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCourses;
