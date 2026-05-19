import { FaBullhorn } from "react-icons/fa";

export default function QualificationMain() {
  return (
    <div className="flex-1 bg-white  rounded-3xl backdrop-blur-xl border border-white/10 p-3 relative">
      <div className="flex flex-col items-center">
           <div className="relative w-full cursor-default text-[#ffffff] text-center  h-[300px] rounded-3xl mb-3 overflow-hidden">
             <img src='/Qualification.avif' alt="Webinar Background" className="absolute inset-0 w-full h-full object-cover" />
             <div className="relative flex flex-col items-center justify-center h-full">
               <div className="w-20 h-20 mx-auto rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-4">
                  <FaBullhorn className="h-8 w-8 text-white" />
               </div>
               <h1 className="text-3xl font-bold text-white">Qualification</h1>
               <p className="text-white/70 mt-2 max-w-md text-sm">
                  Enhance your skills with our comprehensive qualification programs
               </p>
             </div>
           </div>
      </div>
    </div>
  );
}
