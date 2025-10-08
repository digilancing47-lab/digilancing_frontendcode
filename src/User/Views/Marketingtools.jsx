import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import MarketingMain from "../Components/MarketingMain"
const Marketingtools = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#002B54]">
      <AfLeftNav />
      <div className="flex-1 p-4 ">
        <div className="lg:ml-64">
          <AfHeader />
        </div>
         <div className="mt-20 lg:mt-2 lg:ml-65">
          <MarketingMain />
        </div>
      </div>
    </div>
  );
};

export default Marketingtools;
