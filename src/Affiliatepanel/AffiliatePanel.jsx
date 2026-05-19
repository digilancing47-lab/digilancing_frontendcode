import React from "react";
import { Outlet } from "react-router-dom";
import AfLeftNav from "./components/AfLeftNav";
import AfHeader from "./components/AfHeader";

const AffiliatePanel = () => {
  return (
    <div className="flex flex-col p-2 gap-5 min-h-screen lg:flex-row bg-linear-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4]">
      <div className="w-fit">
        <AfLeftNav />
      </div>
      <div className="flex-1 py-4 flex flex-col gap-2 min-w-0">
          <AfHeader />
          <Outlet />
      </div>
    </div>
  );
};

export default AffiliatePanel;
