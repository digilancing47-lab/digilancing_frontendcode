import React from "react";
import { FaBullhorn } from "react-icons/fa";
const TrainingPage = () => {

  return (
     <div className="flex-1 bg-white  rounded-3xl backdrop-blur-xl border border-white/10 p-3 relative">
        <div className="flex flex-col items-center">
            <div className="relative w-full cursor-default text-[#ffffff] text-center  h-[300px] rounded-3xl mb-3 overflow-hidden">
               <img src='/training.avif' alt="Webinar Background" className="absolute inset-0 w-full h-full object-cover" />
               <div className="relative flex flex-col items-center justify-center h-full">
                 <div className="w-20 h-20 mx-auto rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
                    <FaBullhorn className="h-8 w-8 text-white" />
                 </div>
                 <h1 className=" text-2xl lg:text-3xl font-bold text-white">Marketing Tools</h1>
                 <p className="text-white/70 mt-2 max-w-md text-sm">
                    Boost your reach with powerful marketing resources
                 </p>
               </div>
             </div>
        </div>
      </div>
  );
};

export default TrainingPage;
