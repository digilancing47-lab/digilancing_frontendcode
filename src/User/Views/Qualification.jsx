import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import QualificationMain from "../Components/QualificationMain"
const Qualification = () => {
  return (
    <div className="affiliate-panel flex flex-col lg:flex-row min-h-screen">
      <AfLeftNav />
      <div className="flex-1 p-4 ">
        <div className="lg:ml-64">
          <AfHeader />
        </div>
        <div className="mt-20 lg:mt-2 lg:ml-65 rounded-4xl bg-white ">
          <QualificationMain />
        </div>
      </div>
    </div>
  );
};

export default Qualification;
