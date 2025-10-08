import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import OffersContainer from "../Components/OffersContainer";
import AfMain from "../Components/AfMain"
const AffiliatePanel = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#002B54]">
      <AfLeftNav />
      <div className="flex-1 p-4 ">
        <div className="lg:ml-64">
          <AfHeader />
        </div>
        <div className="lg:ml-65 lg:mt-2 mt-20">
          <AfMain />
        </div>

      </div>
    </div>
  );
};

export default AffiliatePanel;
