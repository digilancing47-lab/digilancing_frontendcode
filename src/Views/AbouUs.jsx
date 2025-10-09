import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Rocket } from "lucide-react";

import image_1 from '../assets/Adout_us_image_1.jpeg'
import image_2 from '../assets/Adout_us_image_2.jpeg'
import image_3 from '../assets/Adout_us_image_3.jpeg'
import image_4 from '../assets/Adout_us_image_4.jpeg'
import AkshayKumar from '../assets/AkshayKumar.jpg'
import ArunKumar from '../assets/ArunKumar.jpg'
import Footer from "../Components/Footer";

const AboutUs = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    return (
        <>
        <div className="min-h-screen cursor-default bg-[#002B54]">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-[#002B54] to-[#003E7F]">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={fadeIn.transition}
                    >
                        <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                            About
                            <br />
                            <motion.span
                                className="inline-block bg-gradient-to-r from-[#0078FF] to-[#ffffff] bg-clip-text text-transparent text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
                                animate={{ y: [0, 12, 0] }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "easeInOut",
                                }}
                            >
                                DIGI LANCING
                            </motion.span>
                        </h1>
                        <p className="text-lg text-gray-200 leading-relaxed">
                            Empowering individuals with real-world digital skills that
                            transform education into execution — creating financial freedom
                            for every learner.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <img
                            src={image_3}
                            alt="Founders"
                            className="rounded-2xl shadow-2xl mx-auto"
                            loading="lazy"
                        />
                    </motion.div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        className="w-full h-16"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#002B54"
                            fillOpacity="1"
                            d="M0,192L48,176C96,160,192,128,288,106.7C384,85,480,75,576,96C672,117,768,171,864,186.7C960,203,1056,181,1152,154.7C1248,128,1344,96,1392,80L1440,64V320H0Z"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Founders Section */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
                <h2 className="text-4xl font-bold text-center text-white mb-16">
                    Meet Our <span className="text-white">Founders</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Karthik */}
                    <motion.div
                        className="bg-white/5 rounded-2xl p-8 shadow-lg hover:bg-white/10 transition-all"
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={fadeIn.transition}
                    >
                        <img
                            src={ArunKumar}
                            alt=" "
                            className="rounded-xl mb-6"
                            loading="lazy"
                        />
                        <h3 className="text-2xl font-bold text-white mb-1">
                            Arun Kumar 
                        </h3>
                        <p className="text-white font-medium mb-4">Founder & CEO</p>
                        <p className="text-gray-300 text-justify leading-relaxed text-sm">
                            Arun Kumar is the visionary Founder & CEO behind DIGI LANCING.
                            With years of experience at IBM and expertise in Learning Management
                            Systems, he saw the gap between education and employability.
                            His mission is to shift education from theory to execution,
                            equipping learners with real skills for real income.
                        </p>
                    </motion.div>

                    {/* Pavan */}
                    <motion.div
                        className="bg-white/5 rounded-2xl p-8 shadow-lg hover:bg-white/10 transition-all"
                        initial={fadeIn.initial}
                        animate={fadeIn.animate}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <img
                            src={AkshayKumar}
                            alt="Pavan"
                            className="rounded-xl mb-6"
                            loading="lazy"
                        />
                        <h3 className="text-2xl font-bold text-white mb-1">Akshay Kumar</h3>
                        <p className="text-white font-medium mb-4">Co-Founder</p>
                        <p className="text-gray-300 text-justify leading-relaxed text-sm">
                            Akshay Kumar, with a background at IDBI Bank, brings financial expertise,
                            sales acumen, and administration to DIGI LANCING.
                            She believes education should not end with information,
                            but begin with action — skills that generate sustainable income.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* What Makes Us Different */}
            <div className="bg-black/30 py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-10">
                        What Makes <span className="bg-gradient-to-r from-[#0078FF] to-[#ffffff] bg-clip-text text-transparent">DIGI LANCING</span> Different?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Users className="w-10 h-10 text-[#ffffff] mx-auto mb-4" />,
                                title: "Direct Mentorship",
                                desc: "Learn from professionals who live what they teach, delivering insider knowledge you can apply instantly.",
                            },
                            {
                                icon: <Target className="w-10 h-10 text-[#ffffff] mx-auto mb-4" />,
                                title: "Life-Changing Skills",
                                desc: "Beyond technical knowledge — we prepare you with communication, freelancing, mindset, and entrepreneurship.",
                            },
                            {
                                icon: <Rocket className="w-10 h-10 text-[#ffffff] mx-auto mb-4" />,
                                title: "Support That Stays",
                                desc: "From quick resolutions to multilingual care — every student and affiliate is a priority, not a number.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all"
                            >
                                {item.icon}
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Offline Events Timeline */}
           
        </div>
        <Footer/>
        </>
    );
};

export default AboutUs;
