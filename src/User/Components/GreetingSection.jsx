import React from 'react';
import { useNavigate } from 'react-router-dom';
import play from "../../User/Assets/play.svg"
import like from "../../User/Assets/like.svg"
import greeting from "../../User/Assets/greeting.svg"
const GreetingSection = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));

    const now = new Date();
    // IST offset is +5:30 hours from UTC
    const istOffset = 5.5 * 60; // minutes
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utc + istOffset * 60000);
    const hours = istTime.getHours();

    // Determine greeting
    let greetingText = "Good Evening";
    if (hours >= 5 && hours < 12) {
        greetingText = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
        greetingText = "Good Afternoon";
    }

    return (
        <div
            className="relative rounded-4xl p-6  cursor-default text-white flex flex-col lg:flex-row justify-between items-start overflow-visible min-h-[24rem]"
            style={{ background: 'linear-gradient(to bottom right, #4852F4 0%, #6A50FF 100%)' }}
        >
            {/* Left Content */}
            <div className=" md:p-5">
                <h2 className=" text-2xl md:text-4xl font-semibold leading-tight" style={{ fontFamily: "'Roboto', sans-serif" }}>
                    <span className='font-light text-2xl'>{greetingText},</span> <br />
                    <span className="text-white text-3xl md:text-5xl font-bold" >{user?.fullname}</span>
                </h2>
                <p className="text-lg mt-1 opacity-80">{user?.email}</p>

                <button
                    onClick={() => navigate("/Courses")}
                    className="mt-6 absolute bottom-10  hover:scale-105 cursor-pointer bg-white text-black flex items-center justify-center gap-2 w-fit  md:px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                    <div className='px-3 border-r border-gray-500'><img src={play} alt="Play" className="h-5 w-5" /></div>
                    <span className='px-1'>Start Learning</span>
                </button>


            </div>

            {/* Right Card */}
            <div
                className="w-full max-w-[330px] h-[360px] bg-white text-black p-4 rounded-3xl mt-6
    md:absolute md:top-[18%] md:right-6 md:mt-0"
            >

                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-4 py-1 rounded-md">
                    Design
                </span>
                <h3 className="text-[14px] font-bold mt-2">Create 3D Illustration from Basic Shape</h3>

                <img
                    src={greeting}
                    alt="Course"
                    className="w-full object-cover rounded-lg mt-3"
                />

                <p className="text-xs text-gray-600 mt-2">
                    Most 3D modeling software provides primitive shapes...
                </p>

                <div className="flex pt-2.5 justify-between text-xs text-gray-500 mt-3">
                    <span className="flex items-center text-sm gap-2">
                        <img src={play} alt="Play" className="w-5 h-5" />
                        12 Lessons
                    </span>

                    <span className="flex items-center text-sm gap-2">
                        <img src={like} alt="Play" className="w-5 h-5" />
                        20k Likes</span>
                </div>
            </div>


        </div>
    );
};

export default GreetingSection;
