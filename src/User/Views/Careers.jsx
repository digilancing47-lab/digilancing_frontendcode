import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import CareersMain from "../Components/CareersMain";

const Careers = () => {
  return (
    <div className="affiliate-panel flex flex-col lg:flex-row min-h-screen">
      <AfLeftNav />
      <div className="flex-1 p-4">
        <div className="lg:ml-64">
          <AfHeader />
        </div>
        <div className="lg:ml-65 lg:mt-2 mt-20">
          <CareersMain />
        </div>
      </div>
    </div>
  );
};

export default Careers;
