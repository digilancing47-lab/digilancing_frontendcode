import React, { useEffect, useState } from "react";
import train from "../Assets/training.png";

const TrainingPage = () => {
  const [trainings, setTrainings] = useState([]);
  useEffect(() => {
    setTrainings([
      { id: 1, title: "Cyber Security", duration: "3 Hour Workshop" },
      { id: 2, title: "Cloud Computing", duration: "2 Day Bootcamp" },
      { id: 3, title: "AI & ML Basics", duration: "5 Hour Workshop" },
      { id: 4, title: "Blockchain Essentials", duration: "1 Day Workshop" },
      { id: 5, title: "Web Development", duration: "Full Day Training" },
      { id: 6, title: "Data Science Intro", duration: "3 Hour Workshop" },
    ]);
  }, []);

  return (
    <div className="w-full min-h-screen rounded-3xl bg-[#ffffff] p-6">
      <div className=" bg-[#003366] text-white text-center  text-lg sm:text-3xl md:text-5xl font-medium h-56 sm:h-64 md:h-72 rounded-3xl w-full  flex items-center justify-center  px-3 sm:px-4  lg:max-w-6xl lg:mx-auto">
          DIGILANCING TRAINING
      </div>

      {/* Trainings Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden"
          >
            
            <img
              src={train}
              alt={item.title}
              className="w-full h-76 object-cover object-center rounded-2xl px-2 py-2"
            />

          
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{item.duration}</p>
              <button className="mt-4 px-4 py-2 bg-[#0b3b70] text-white text-sm rounded-lg hover:bg-[#12467f] transition-colors self-start">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TrainingPage;
