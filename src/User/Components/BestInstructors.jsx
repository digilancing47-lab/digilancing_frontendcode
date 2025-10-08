import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BestInstructors = ({ topInstructors = [] }) => {
  const Navigate = useNavigate()
  const [showAll, setShowAll] = useState(false);
  const instructorsToShow = showAll ? topInstructors : topInstructors.slice(0, 3);

  return (
    <div className=" max-w-screen-xl ml-0 mt-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Best Instructors</h2>
        {topInstructors.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-black hover:underline"
          >
            {showAll ? 'View Less' : 'View All'}
          </button>
        )}
      </div>

      {/* Instructor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {instructorsToShow.map((instructor) => (
          <div
            key={instructor.id}
            className="flex items-center justify-between p-2 border border-[#D9D9D9] rounded-xl shadow-sm bg-white"
          >
            {/* Profile Info */}
            <div className="flex items-center">
              <img
                src={instructor.profile_url || '/default-avatar.png'}
                alt={instructor.name}
                className="w-14 h-14 rounded-xl object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-lg">{instructor.name}</h3>
                <p className="text-sm text-gray-500">
                  {instructor.total_courses} {instructor.total_courses > 1 ? 'Courses' : 'Course'}
                </p>
              </div>
            </div>

            {/* Course Button */}
            <button onClick={()=>{Navigate('/courses')}} className=" text-blue-400 scale-105 cursor-pointer underline underline-offset-4 text-sm font-semibold py-2 px-6 rounded-lg ">
              View Courses
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestInstructors;
