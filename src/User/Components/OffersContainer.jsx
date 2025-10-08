import React from "react";
import { useLocation } from "react-router-dom";

const OffersContainer = () => {
    const location = useLocation();
    const isOffers = location.pathname === "/Offers";
    const isKyc = location.pathname === "/Kyc";
    const isAcheivements = location.pathname === "/Acheivements";
    const isAffiliatePanel = location.pathname === "/AffiliatePanel"

    return (
        <div className=" bg-[#003366] text-white text-center  text-lg sm:text-3xl md:text-5xl font-medium h-56 sm:h-64 md:h-72 rounded-3xl w-full  flex items-center justify-center  mt-5 px-3 sm:px-4  lg:max-w-6xl lg:mx-auto">
            {isOffers && "OFFERS"}
            {isKyc && "KYC"}
            {isAcheivements && "ACHEIVEMENTS"}
            {isAffiliatePanel && "AFFILIATE DASHBOARD"}
       
        </div>
    );
};

export default OffersContainer;
