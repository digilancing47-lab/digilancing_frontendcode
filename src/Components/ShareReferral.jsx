import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ShareReferral = () => {
  const { referralCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const planId = queryParams.get("PlanId");

    // redirect with params in the URL
    navigate(`/Register?referralCode=${referralCode}&planId=${planId}`, { replace: true });
  }, [referralCode, location, navigate]);

  return null;
};

export default ShareReferral;
