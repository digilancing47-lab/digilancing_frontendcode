import React from "react";

const Section6 = () => {
  return (
    <div className="bg-[#F4FAFF] w-full font-outfit">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row  gap-12 px-6 lg:px-16 py-16 lg:py-32">

        {/* Left Side - Founders Desk */}
        <div className="flex-1 h-full">
          <h2 className="text-2xl  sm:text-3xl lg:text-4xl font-bold mb-3">
            From the Founders' Desk 🚀
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Uncover the Purpose, Passion, and Vision that Drives Edulancing Forward
          </p>

          <blockquote className="text-gray-800 italic font-semibold text-base sm:text-lg border-l-4 border-[#3384EC] pl-4 mb-6">
            “Edulancing is more than a learning platform — it’s a movement to
            equip every learner with future-ready skills that open doors to
            opportunities.”
          </blockquote>

          <p className="text-gray-900 text-base sm:text-lg mb-4">
            — The Founders, Edulancing
          </p>

          <div className="flex gap-3 mt-2">
            <img
              src="https://randomuser.me/api/portraits/men/31.jpg"
              alt="Founder 1"
              className="w-14 h-14 rounded-full object-cover"
            />
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Founder 2"
              className="w-14 h-14 rounded-full object-cover"
            />
            <img
              src="https://randomuser.me/api/portraits/men/33.jpg"
              alt="Founder 3"
              className="w-14 h-14 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="flex-1 w-full">
          <div className="bg-[#D3E9FF] p-8 sm:p-10 rounded-2xl shadow-md w-full mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">Contact us</h3>
            <form className="space-y-5">
              <div>
                <label className="block text-base text-gray-700 font-semibold mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#3384EC]"
                />
              </div>
              <div>
                <label className="block text-base text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#3384EC]"
                />
              </div>
              <div>
                <label className="block text-base text-gray-700 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your Phone Number"
                  className="w-full px-5 py-3 rounded-lg border border-gray-300 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#3384EC]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#3384EC] text-white py-3 mt-4 rounded-lg cursor-pointer text-lg hover:bg-blue-600 transition"
              >
                Contact us
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section6;
