import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Headset, Package, Award, Network, X, Users, Link2,
    BarChart2, Monitor, BookOpen, CreditCard, UserCheck
} from 'lucide-react';

const AfLeftNav = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: "/AffiliatePanel", key: "DashBoard", label: "Overview", icon: <LayoutDashboard className="w-5 h-5 mr-2" /> },
        { path: "/Offers", key: "Offers", label: "Offers", icon: <Package className="w-5 h-5 mr-2" /> },
        { path: "/Acheivements", key: "acheivements", label: "Acheivements", icon: <Award className="w-5 h-5 mr-2" /> },
        { path: "/Marketingtools", key: "marketingtools", label: "Marketing Tools", icon: <Network className="w-5 h-5 mr-2" /> },
        { path: "/Training", key: "training", label: "Training", icon: <Monitor className="w-5 h-5 mr-2" /> },
        { path: "/Webinar", key: "webinar", label: "Webinar", icon: <Headset className="w-5 h-5 mr-2" /> },
        { path: "/LinkGenerator", key: "linkgenerator", label: "Link Generator", icon: <Link2 className="w-5 h-5 mr-2" /> },
        { path: "/ReferalDetails", key: "referaldetails", label: "Referal Details", icon: <Users className="w-5 h-5 mr-2" /> },
        { path: "/Qualification", key: "qualification", label: "Qualification", icon: <BookOpen className="w-5 h-5 mr-2" /> },
        { path: "/Earning", key: "earning", label: "Earning", icon: <BarChart2 className="w-5 h-5 mr-2" /> },
        { path: "/LeaderBoard", key: "leaderboard", label: "LeaderBoard", icon: <Award className="w-5 h-5 mr-2" /> },
    ];

//  { path: "/Kyc", key: "kyc", label: "Kyc", icon: <UserCheck className="w-5 h-5 mr-2" /> },
//      { path: "/PayoutDetails", key: "payoutdetails", label: "Payout Details", icon: <CreditCard className="w-5 h-5 mr-2" /> },
    const getActiveMenu = () => {
        const found = menuItems.find(item => item.path === location.pathname);
        return found ? found.key : null;
    };

    const [activeMenu, setActiveMenu] = React.useState(getActiveMenu);

    useEffect(() => {
        setActiveMenu(getActiveMenu());
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen, location]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Sidebar */}
            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-60 h-screen transform transition-transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:top-[2vh] lg:left-2 lg:w-64 lg:h-[96vh] lg:translate-x-0
          w-64 max-w-xs lg:max-w-none
          bg-[#003B73] text-white shadow-xl rounded-none lg:rounded-3xl
          flex flex-col
        `}
            >
                <div className="flex flex-col h-full overflow-y-auto p-2">
                    {/* Logo */}
                    <div className="flex items-center justify-between h-16 px-2">
                        <span className="text-xl font-semibold">DIGI LANCING</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-gray-100 lg:hidden"
                        >
                            <X className="w-5 h-5 mt-1" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <ul className="flex flex-col flex-grow mt-2">
                        {menuItems.map(({ path, key, label, icon }) => (
                            <li key={key} className="mb-2">
                                <Link
                                    to={path}
                                    className={`flex items-center text-sm md:text-base font-medium py-2 px-3 rounded-md
                                            ${activeMenu === key
                                            ? 'bg-white text-black'
                                            : 'hover:bg-white hover:text-black'}`}>
                                    {icon}{label}
                                </Link>

                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Overlay */}
            {isOpen && (
                <div
                    id="overlay"
                    className="fixed inset-0 z-30 bg-black opacity-50"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default AfLeftNav;
