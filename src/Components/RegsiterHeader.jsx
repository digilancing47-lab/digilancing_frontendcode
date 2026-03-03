import React from 'react';
import { FaCheck, FaGraduationCap, FaUserCircle, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RegisterHeader = ({ step, setStep }) => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');

  const steps = [
    { label: 'Course Selection', icon: FaGraduationCap },
    { label: 'Sign up to Account', icon: FaUserCircle }
  ];

  const handleStepClick = (targetStep) => {
  if (targetStep === 1) {
    setStep(1);
    return;
  }

  if (!authToken) {
    return;
  }
  setStep(targetStep);
};

  return (
    <div className="mb-8 mt-5">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
        <div className="text-center lg:text-left mb-4 lg:mb-0">
          <h5 className="text-md font-bold text-white">Create Account</h5>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome to DigiLancing!
          </h1>
        </div>

        {!authToken && (
          <div className="text-white text-sm text-center lg:text-right">
            <div>Have an Account?</div>
            <div
              className="font-semibold underline cursor-pointer"
              onClick={() => navigate('/login')}
            >
              SignIn
            </div>
          </div>
        )}
      </div>

      {/* Stepper - Circular Glassy Design */}
      <div className="flex justify-center lg:justify-start items-start gap-4 flex-wrap">
        {steps.map((stepItem, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;
          const Icon = stepItem.icon;

          return (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-start gap-4 ${isActive ? 'block' : 'hidden sm:flex'}`}>
                <div
                  onClick={() => handleStepClick(stepNumber)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-white/20 backdrop-blur-md border-2 border-white shadow-lg'
                        : isActive
                        ? 'bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] border-2 border-white shadow-xl scale-110'
                        : 'bg-white/10 backdrop-blur-sm border-2 border-white/50'
                    } group-hover:scale-105`}
                  >
                    {isCompleted ? (
                      <FaCheck className="text-white text-sm sm:text-base" />
                    ) : (
                      <Icon className={`text-sm sm:text-base ${isActive ? 'text-white' : 'text-white/70'}`} />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span
                    className={`text-xs sm:text-sm text-center max-w-[100px] min-h-[32px] flex items-center justify-center transition-all ${
                      isActive ? 'text-white font-semibold' : 'text-white/80'
                    }`}
                  >
                    {stepItem.label}
                  </span>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:flex items-center pt-5">
                    <div
                      className={`h-0.5 w-12 lg:w-20 transition-all duration-300 ${
                        step > stepNumber ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterHeader;
