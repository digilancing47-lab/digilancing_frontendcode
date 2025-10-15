
export default function QualificationMain() {
  return (
    <main className="flex-1 rounded-4xl bg-[#ffffff] overflow-y-auto p-6">
      <div className="min-h-screen flex flex-col items-center">
        <div className="relative w-full cursor-default text-[#ffffff] text-center  h-[300px] rounded-4xl mb-3 overflow-hidden">
             <img src='/Qualification.avif' alt="Webinar Background" className="absolute inset-0 w-full h-full object-cover" />
             <div className="relative flex flex-col items-center justify-center h-full">
               <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">Qualification</h1>
             </div>
           </div>
      </div>
    </main>
  );
}
