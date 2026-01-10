import React from "react";
import AfLeftNav from "../Components/AfLeftNav";
import AfHeader from "../Components/AfHeader";
import OffersContainer from "../Components/OffersContainer";
import KycMain from "../Components/KycMain";


const Kyc = () => {
  return (
    <div className="affiliate-panel flex flex-col lg:flex-row min-h-screen">
      <AfLeftNav />
      <div className="flex-1 p-4 ">
        <div className="lg:ml-64">
          <AfHeader />
        </div>

        <div className="lg:ml-66 lg:mt-2 mt-20 py-0.5 rounded-3xl bg-white ">
          <OffersContainer />
          <KycMain />
        </div>
      </div>
    </div>
  );
};

export default Kyc;
