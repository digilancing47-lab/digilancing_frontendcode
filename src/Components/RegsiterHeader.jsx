import React from 'react';
import { FaCheck, FaGraduationCap, FaUserCircle, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// White connector line
const WhiteConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#fff',   // White line
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

// Custom step icon component
const StepIconComponent = ({ active, completed, icon }) => {
  const icons = {
    1: <FaGraduationCap className="text-lg sm:text-xl" />,
    2: <FaUserCircle className="text-lg sm:text-xl" />,
    3: <FaCreditCard className="text-lg sm:text-xl" />,
  };

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-lg transition
        ${completed || active
          ? 'bg-white text-[#002B54]' // Active/completed step
          : 'bg-transparent border-2 border-white text-white' // Pending step
        }`}
    >
      {completed ? <FaCheck className="text-[#002B54] text-lg sm:text-xl" /> : icons[icon]}
    </div>
  );
};

const RegisterHeader = ({ step, setStep }) => {
  const navigate = useNavigate();
  const authToken = sessionStorage.getItem('authToken');

  const steps = ['Course Selection', 'Sign up to Account', 'Payment'];

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

      {/* Stepper aligned left on large screens */}
      <div className="flex justify-center lg:justify-start lg:ml-[-90px]">
        <Stepper
          alternativeLabel
          activeStep={step - 1}
          connector={<WhiteConnector />}
          className="text-white w-full max-w-4xl"
        >
          {steps.map((label, index) => (
              <Step key={label} onClick={() => handleStepClick(index + 1)}>
              <StepLabel
                StepIconComponent={(props) => <StepIconComponent {...props} icon={index + 1} />}
              >
                <span className="text-xs sm:text-sm text-white">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};

export default RegisterHeader;
