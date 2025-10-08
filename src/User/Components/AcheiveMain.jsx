// AchievementPage.jsx
import React from 'react';
import f1 from "../Assets/cup.png";
import m1 from "../Assets/star.png";
import m2 from "../Assets/thunder.png";
import m3 from "../Assets/d_q.png";
import m4 from "../Assets/l_q.png";
import b1 from "../Assets/b_1.png";
import b2 from "../Assets/b_2.png";
import b3 from "../Assets/b_3.png";

const achievements = [
  { 
    title: '10 Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m1,
    progressColor: "bg-gray-300" // locked → always gray
  },
  { 
    title: '20 Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m2,
    progressColor: "bg-gray-300"
  },
  { 
    title: '? Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m4, 
    progressColor: "bg-gray-300" 
  },
  { 
    title: '? Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m4, 
    progressColor: "bg-gray-300" 
  },
  { 
    title: '? Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m4, 
    progressColor: "bg-gray-300" 
  },
  { 
    title: '? Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m4, 
    progressColor: "bg-gray-300" 
  },
  { 
    title: '? Lakhs', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m4, 
    progressColor: "bg-gray-300" 
  },
  { 
    title: '? Crore', 
    subtitle: 'Locked Achievement', 
    description: 'Complete previous levels to unlock',
    unlocked: false, 
    details: '', 
    icon: m3, 
    progressColor: "bg-gray-300" 
  },
];

const stats = [
  { value: '0', label: 'Achievements Unlocked', icon: b1 },
  { value: '8', label: 'Goals Remaining', icon: b2 }, 
  { value: '0%', label: 'Progress Completion', icon: b3 },
];

const AchievementPage = () => {
  return (
    <div className="bg-[#032B55] min-h-screen flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full bg-white rounded-3xl py-10 flex flex-col items-center px-4 text-center">
        <img src={f1} alt="Trophy" className="h-20 w-20" />
        <h1 className="text-3xl font-bold text-black mb-1">Your Achievements</h1>
        <p className="text-md text-gray-400 mt-1 max-w-lg">
          Track your progress through our exclusive achievement system and unlock powerful rewards
        </p>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 max-w-5xl w-full px-6">
        {achievements.map((achievement, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-left">
            
            {/* Icon */}
            <img src={achievement.icon} alt="Achievement Icon" className="h-12 w-12 mb-4" />
            
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900">{achievement.title}</h2>
            
            {/* Subtitle (bold) */}
            <h3 className="text-sm font-bold text-gray-800 mt-1">{achievement.subtitle}</h3>
            
            {/* Description */}
            <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
            
            {/* Progress Line */}
            <div className="w-full h-1 mt-3 rounded-full bg-gray-200">
              <div 
                className={`h-1 rounded-full ${achievement.progressColor}`} 
                style={{ width: "0%" }} // locked → no progress
              />
            </div>

            {/* Always Locked */}
            <button
              disabled
              className="mt-4 w-full text-center bg-gray-200 text-gray-500 text-sm font-medium py-2 rounded-lg cursor-not-allowed"
            >
              Locked
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full px-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
            <img src={stat.icon} alt={stat.label} className="h-10 w-10 mb-3" />
            <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPage;
