import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import EarningMain from "../Components/EarningMain"
const Earning = () => {
  return (
    <div className="affiliate-panel flex flex-col lg:flex-row min-h-screen">
      <AfLeftNav />
      <div className="flex-1 p-4 ">
        <div className="lg:ml-64">
          <AfHeader />
        </div>
        <div className="lg:ml-65 mt-12 md:mt-2">
          <EarningMain />
        </div>
      </div>
    </div>
  );
};

export default Earning;
