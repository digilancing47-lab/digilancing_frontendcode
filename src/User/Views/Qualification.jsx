import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import QualificationMain from "../Components/QualificationMain"
const Qualification = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#002B54]">
      <AfLeftNav />
      <div className="flex-1 p-4 ">
        <div className="lg:ml-64">
          <AfHeader />
        </div>
        <div className="lg:ml-66 lg:mt-2 mt-20 py-0.5 rounded-3xl bg-white ">
          <QualificationMain />
        </div>
      </div>
    </div>
  );
};

export default Qualification;
