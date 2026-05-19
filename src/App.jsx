import React, { useState, useEffect } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './Components/Header'
import Login from './Views/Login'
import Register from './Views/Register'
import Home from './Views/Home'
import Courses from './Views/Courses'
import BasicPackages from './Views/BasicPackages'
import StandardPackages from './Views/StandardPackages'
import AdvancedPackages from './Views/AdvancedPackages'
import PremiumPackages from './Views/PremiumPackages'
import UltimatePackages from './Views/UltimatePackages'
import Contact from './Views/Contact'
import ScrollToTop from './Components/ScrollToTop'
import AboutUs from './Views/AbouUs'
import ForgotPassword from './Views/ForgotPassword'
import DashBoard from './User/Views/DashBoard'
import AffiliatePanel from './Affiliatepanel/AffiliatePanel'
import AfMain from './Affiliatepanel/components/AfMain'
import Offers from './Affiliatepanel/components/Offers'
import AchievementPage from './Affiliatepanel/components/AcheiveMain'
import MarketingTools from './Affiliatepanel/components/MarketingMain'
import TrainingPage from './Affiliatepanel/components/TrainingMain'

import WebinarCalendar from './Affiliatepanel/components/WebinarMain'
import LinkGenerator from './Affiliatepanel/components/LinkMain'
import KYCForm from './Affiliatepanel/components/KycMain'
import QualificationMain from './Affiliatepanel/components/QualificationMain'
import EarningsDashboard from './Affiliatepanel/components/EarningMain'

import ReferralDetails from './Affiliatepanel/components/ReferalMain'
import Payout from './User/Views/Payout'
import Leader from './User/Views/Leaderboard'
import Profile from './User/Views/Profile'
import DetailedCourse from './Views/DetailedCourse'
import Certificates from './User/Views/Certificates'
import Disclaimer from './Views/Disclaimer'
import PrivacyPolicy from './Views/PrivacyPolicy'
import TermsAndConditions from './Views/TermsAndCondition'
import Upgrade from './User/Views/Upgrade'
import ShareReferral from './Components/ShareReferral'
import Test from './User/Components/Test'
import ViewCertificate from "./User/Views/ViewCertificate"
import Freelancer from './User/Views/Freelancer'
import Careers from './Views/Careers'
import ApplyForJob from './User/Components/ApplyForJob'

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login', { replace: true });
    } else {
      setLoading(false);
    }
  }, [navigate]);
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }
  return children;
};


function App() {

  return (
    <div className="app-container min-h-screen">
      <Router>
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<><Header /><Home /></>} />
        <Route path="/login" element={<><Header /><Login /></>} />
        <Route path="/Courses" element={<><Header isDarkMode={true} /><Courses /></>} />
        <Route path="/Register" element={<><Header /><Register /></>} />
        <Route path="/BasicPackages" element={<><Header isDarkMode={true} /><BasicPackages /></>} />
        <Route path="/StandardPackages" element={<><Header isDarkMode={true} /><StandardPackages /></>} />
        <Route path="/AdvancedPackages" element={<><Header isDarkMode={true} /><AdvancedPackages /></>} />
        <Route path="/PremiumPackages" element={<><Header isDarkMode={true} /><PremiumPackages /></>} />
        <Route path="/UltimatePackages" element={<><Header isDarkMode={true} /><UltimatePackages /></>} />
        <Route path="/AboutUs" element={<><Header /><AboutUs /></>} />
        <Route path="/Contact" element={<><Header /><Contact /></>} />
        <Route path="/ForgotPassword" element={<><Header /><ForgotPassword /></>} />

        <Route path="/ShareReferral/:referralCode" element={<ShareReferral />} />

        <Route path="/DashBoard" element={<><AuthGuard><DashBoard /></AuthGuard></>} />
        <Route path="/Certificates" element={<><AuthGuard><Header isDarkMode={true} /><Certificates /></AuthGuard></>} />
        <Route path="/AffiliatePanel" element={<><AuthGuard><AffiliatePanel /></AuthGuard></>}>
          <Route index element={<AfMain />} />
          <Route path="offer" element={<Offers />} />
          <Route path="Acheivements" element={<AchievementPage />} />
          <Route path="Marketingtools" element={<MarketingTools />} />
          <Route path="Training" element={<TrainingPage />} />
          <Route path="Webinar" element={<WebinarCalendar />} />
          <Route path="ReferalDetails" element={<ReferralDetails />} />
          <Route path="LinkGenerator" element={<LinkGenerator />} />
          <Route path="KYC" element={<KYCForm />} />
          <Route path="Qualification" element={<QualificationMain />} />
          <Route path="Earnings" element={<EarningsDashboard />} />
        </Route>       
        <Route path="/PayoutDetails" element={<><AuthGuard><Payout /></AuthGuard></>} />
        <Route path="/LeaderBoard" element={<><AuthGuard><Leader /></AuthGuard></>} />
        <Route path="/Profile" element={<><AuthGuard><Profile /></AuthGuard></>} />
        <Route path="/Careers" element={<><Header isDarkMode={true} /><Careers /></>} />
        <Route path="/ApplyForJob" element={<><AuthGuard><Header isDarkMode={true} /><ApplyForJob /></AuthGuard></>} />
        {/* <Route path="/DetailedCourse" element={<><AuthGuard><DetailedCourse /></AuthGuard></>} /> */}
        <Route path="/DetailedCourse" element={<><Header isDarkMode={true} /><DetailedCourse /></>} />
        <Route path="/Upgrade" element={<><Header isDarkMode={true} /><Upgrade /></>} />
         <Route path="/Test" element={<><Header isDarkMode={true} /><Test /></>} />
          <Route path="/ViewCertificate" element={<><Header isDarkMode={true} /><ViewCertificate /></>} />
  <Route path="/Freelancer" element={<><Header isDarkMode={true} /><Freelancer /></>} />
        <Route path="/Disclaimer" element={<><Header isDarkMode={true} /><Disclaimer /></>} />
        <Route path="/PrivacyPolicy" element={<><Header isDarkMode={true} /><PrivacyPolicy /></>} />
        <Route path="/TermsAndConditions" element={<><Header isDarkMode={true} /><TermsAndConditions /></>} />

      </Routes>
      </Router>
    </div>
  );
}

export default App
