import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Headset, Package, Award, Network, X, Users, Link2,
    BarChart2, Monitor, BookOpen, CreditCard, UserCheck
} from 'lucide-react';

const AfLeftNav = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: "/AffiliatePanel", key: "DashBoard", label: "Overview", icon: LayoutDashboard },
        { path: "/AffiliatePanel/Offer", key: "Offers", label: "Offers", icon: Package },
        { path: "/AffiliatePanel/Acheivements", key: "acheivements", label: "Acheivements", icon: Award },
        { path: "/AffiliatePanel/Marketingtools", key: "marketingtools", label: "Marketing Tools", icon: Network },
        { path: "/AffiliatePanel/Training", key: "training", label: "Training", icon: Monitor },
        { path: "/AffiliatePanel/Webinar", key: "webinar", label: "Webinar", icon: Headset },
        { path: "/AffiliatePanel/LinkGenerator", key: "linkgenerator", label: "Link Generator", icon: Link2 },
        { path: "/AffiliatePanel/KYC", key: "kyc", label: "Kyc", icon: UserCheck },
        { path: "/AffiliatePanel/ReferalDetails", key: "referaldetails", label: "Referal Details", icon: Users },
        { path: "/AffiliatePanel/Qualification", key: "qualification", label: "Qualification", icon: BookOpen },
        { path: "/AffiliatePanel/Earnings", key: "earning", label: "Earning", icon: BarChart2 },
    ];

    const getActiveMenu = () => {
        const found = menuItems.find(item => item.path === location.pathname);
        return found ? found.key : null;
    };

    const [activeMenu, setActiveMenu] = React.useState(getActiveMenu);

    useEffect(() => {
        setActiveMenu(getActiveMenu());
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen, location]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Sidebar */}
            <aside id="sidebar" className={`fixed lg:sticky top-0 left-0 z-40 lg:z-30 h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:top-[2vh] lg:left-2 lg:w-64 lg:h-[96vh] lg:translate-x-0 ${isOpen ? 'rounded-none' : 'lg:rounded-3xl'} lg:rounded-3xl w-[50vw] max-w-sm`} aria-label="Sidebar">
                <div className="h-full bg-white/1 backdrop-blur-xl border border-white/10 flex flex-col p-2 lg:rounded-3xl rounded-none lg:h-full lg:relative lg:flex-shrink-0 transition-all duration-300 ease-in-out overflow-auto">
                    {/* Logo Section */}
                    <div className="flex items-center justify-between pr-3 pt-3 h-16">
                        <span className="text-xl font-bold text-[#2B3FF5] flex items-center gap-2"
                            style={{ fontFamily: "Finance" }}
                        >
                            <img
                                src="/white.svg"
                                alt="Digilancing Logo"
                                className="w-34 ml-2 h-7 object-contain"
                            />
                        </span>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white lg:hidden"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-grow mt-4">
                        <ul>
                            {menuItems.map(({ path, key, label, icon: Icon }) => (
                                <li key={key} className="md-1 md:mb-2">
                                    <Link
                                        to={path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center text-[15px] py-3 px-3 font-semibold border rounded-xl transition-colors duration-300 ${activeMenu === key
                                            ? 'bg-white/5 backdrop-blur-sm border-white/10 text-white'
                                            : 'border-transparent text-white hover:bg-white/5'}`}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    id="overlay"
                    className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default AfLeftNav;
