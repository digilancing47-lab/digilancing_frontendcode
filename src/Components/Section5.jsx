import React from "react";
import { useNavigate } from "react-router-dom";

/* =======================
   TESTIMONIAL DATA
======================= */
const testimonials = [
  {
    id: 1,
    type: "text",
    text: "Before I joined this bundle, I had no idea where to start with freelancing. I had skills but didn't know how to turn them into income.",
    name: "Radhika Sharma",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    verified: true,
  },
  {
    id: 2,
    type: "text",
    text: "I used to think freelancing meant working late nights. Now I don't feel like I'm just hustling.",
    name: "Rishav Verma",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
  },
  {
    id: 3,
    type: "text",
    text: "Most courses just teach. This one got me to take action from day one.",
    name: "Shivali Chauhan",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    verified: true,
  },
  {
    id: 4,
    type: "video",
    name: "Nitesh",
    rating: 4,
    thumbnail: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg",
    verified: true,
  },
  {
    id: 5,
    type: "text",
    text: "I was stuck in the learning loop. This bundle helped me break that cycle.",
    name: "Gargi Sandhu",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    verified: true,
  },
  {
    id: 6,
    type: "video",
    name: "Kritika",
    rating: 4,
    thumbnail: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg",
    verified: true,
  },
];

/* =======================
   CARD COMPONENTS
======================= */

const TextCard = ({ t, index }) => (
  <div 
    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg p-7 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 overflow-hidden"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* Gradient Accent */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
    
    {/* Quote Icon */}
    <div className="absolute top-4 left-4 text-6xl text-orange-500/10 font-serif leading-none">"</div>
    
    <div className="relative z-10">
      <p className="text-gray-700 text-[15px] leading-relaxed mb-6 italic">
        {t.text}
      </p>

      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={t.image}
            alt={t.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-400/30 group-hover:ring-orange-400 transition-all"
          />
          {t.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">
              ✓
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="font-semibold text-sm text-gray-900">{t.name}</p>
          <div className="flex text-orange-400 text-sm leading-none mt-1">
            {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const VideoCard = ({ t, index }) => (
  <div 
    className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="relative overflow-hidden">
      <img
        src={t.thumbnail}
        alt={t.name}
        className="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-700"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
            <span className="ml-1">▶</span>
          </div>
        </div>
      </div>
      
      {/* Duration Badge */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
        2:34
      </div>
    </div>

    <div className="p-5 flex items-center gap-3 bg-gradient-to-br from-white to-gray-50">
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{t.name}</p>
        <div className="flex text-orange-400 text-sm leading-none mt-1">
          {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
        </div>
      </div>
      {t.verified && (
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
          ✓
        </div>
      )}
    </div>
  </div>
);

/* =======================
   MAIN SECTION
======================= */

const Section5 = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-20 px-6 lg:px-20 font-outfit overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              ⭐ 500+ Success Stories
            </span>
          </div>
          <h2 className="text-4xl pt-6 lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            What Our Freelancers Say
          </h2>
          <p className="text-gray-600 text-lg">
            Real stories. Real results. From freelancers who turned learning into income.
          </p>
        </div>

        {/* Testimonial Grid - Bento Style */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) =>
            t.type === "video" ? (
              <VideoCard key={t.id} t={t} index={index} />
            ) : (
              <TextCard key={t.id} t={t} index={index} />
            )
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">Join 500+ freelancers building their dream careers</p>
          <button 
            onClick={() => navigate('/Register')}
            className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Start Your Journey Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section5;
