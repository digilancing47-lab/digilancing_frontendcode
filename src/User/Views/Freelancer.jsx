import React, { useState } from "react";
import { CheckCircle } from "lucide-react"; 

const Freelancer = () => {
  const [activeTab, setActiveTab] = useState("benefits");

  const benefits = [
    { title: "Competitive Pay", desc: "Get paid per project with rates matching your skills. No hidden fees." },
    { title: "Remote Work", desc: "Work from anywhere, no daily commute required." },
    { title: "Skill Growth", desc: "Gain experience and learn new technologies while working." },
    { title: "Global Clients", desc: "Collaborate with companies and clients across the world." },
    { title: "Diverse Projects", desc: "Pick projects that suit your skills and passions." },
    { title: "Income Control", desc: "Choose how much you want to work and earn." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 mt-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Become a Freelancer</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Work on your own terms. Explore benefits, requirements, and apply in just a few steps.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-gray-100 rounded-lg p-1 shadow-sm">
          {["benefits", "requirements", "apply"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium capitalize transition-all
                ${activeTab === tab 
                  ? "bg-indigo-600 text-white shadow-md" 
                  : "text-gray-700 hover:text-indigo-600"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div className="grid md:grid-cols-3 gap-8 ">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="bg-white  rounded-xl shadow-lg p-6  hover:shadow-xl transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === "requirements" && (
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8 text-left">
            <h3 className="text-2xl font-semibold mb-6 text-center">Requirements</h3>
            <ul className="space-y-4 text-gray-700 text-lg">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={22} />
                Must be 18 years or older
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={22} />
                Reliable internet connection
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={22} />
                Basic communication skills
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={22} />
                Portfolio or proof of work (preferred)
              </li>
            </ul>
          </div>
        )}

        {/* Apply Tab */}
        {activeTab === "apply" && (
          <div className="text-center bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-12 shadow-inner">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Apply Now</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              Ready to start your freelancing journey? Submit your application today and join our growing community of professionals.
            </p>
            <button className="px-8 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition">
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Freelancer;
