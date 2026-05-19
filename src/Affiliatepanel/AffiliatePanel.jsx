import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AfLeftNav from "./components/AfLeftNav";
import AfHeader from "./components/AfHeader";

const AffiliatePanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:p-2 gap-5 min-h-screen lg:flex-row bg-linear-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4]">
      <div className="w-fit">
        <AfLeftNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div className="flex-1 lg:py-4 flex flex-col gap-2 min-w-0">
          <AfHeader onMenuToggle={() => setIsSidebarOpen(prev => !prev)} />
          <div className="pt-16 px-4 lg:pt-0">
            <Outlet />
          </div>
      </div>
    </div>
  );
};

export default AffiliatePanel;
