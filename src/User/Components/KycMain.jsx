import React, { useState, useEffect, useMemo } from "react";
import { Check, AlertTriangle, X } from "lucide-react";
import { API_BASE } from "../../apiBase";

const KYCForm = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [warningField, setWarningField] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);
  const [kycLoading, setKycLoading] = useState(true);
  
  // Get user data from sessionStorage and memoize it
  const user = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, []);
  
  const [formData, setFormData] = useState({
    // Stage 1 - Personal Details
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pinCode: "",
    // Stage 2 - Bank Details
    accountNumber: "",
    accountType: "",
    ifsc: "",
    aadharNumber: "",
    panNumber: "",
  });

  // Fetch KYC status and populate form data on component mount
  useEffect(() => {
    const fetchKycStatus = async () => {
      if (!user?.guide_code) return;
      
      setKycLoading(true);
      try {
        const response = await fetch(`${API_BASE}/api/v_1/fund-account/kyc-status/${user.guide_code}`);
        if (response.ok) {
          const kycData = await response.json();
          
          // Determine initial stage based on KYC status
          if (kycData.kyc_completed) {
            setCurrentStage(3);
          } else if (kycData.contact_created && !kycData.fund_account_created) {
            setCurrentStage(2);
          } else {
            setCurrentStage(1);
          }
          
          // Populate form data from API response
          setFormData({
            // Personal details
            fullName: kycData.personal_details?.full_name || "",
            email: kycData.personal_details?.email || "",
            phone: kycData.personal_details?.phone || "",
            city: kycData.personal_details?.city || "",
            state: kycData.personal_details?.state || "",
            pinCode: kycData.personal_details?.pin_code || "",
            // Bank details
            accountNumber: kycData.bank_details?.account_number || "",
            accountType: kycData.bank_details?.account_type || "",
            ifsc: kycData.bank_details?.ifsc_code || "",
            aadharNumber: kycData.bank_details?.aadhar_number || "",
            panNumber: kycData.bank_details?.pan_number || "",
          });
          
          // Update user email verification status
          if (kycData.personal_details?.email_verified !== user.is_email_verified) {
            const updatedUser = { ...user, is_email_verified: kycData.personal_details?.email_verified };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
          }
        }
      } catch (error) {
        console.error('Error fetching KYC status:', error);
        // Fallback to user data if API fails
        setFormData(prev => ({
          ...prev,
          fullName: user.fullname || "",
          email: user.email || "",
          phone: user.phone || "",
          state: user.state || "",
        }));
      } finally {
        setKycLoading(false);
      }
    };
    
    fetchKycStatus();
  }, [user]);

  const [errors, setErrors] = useState({});

  const validateStage1 = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter 10 digit number";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pinCode.trim()) newErrors.pinCode = "Pin Code is required";
    else if (!/^\d{6}$/.test(formData.pinCode))
      newErrors.pinCode = "Enter 6 digit pin code";
    return newErrors;
  };

  const validateStage2 = () => {
    let newErrors = {};
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
    if (!formData.accountType.trim()) newErrors.accountType = "Account type is required";
    if (!formData.ifsc.trim()) newErrors.ifsc = "IFSC code is required";
    if (!formData.aadharNumber.trim()) newErrors.aadharNumber = "Aadhar number is required";
    else if (!/^\d{12}$/.test(formData.aadharNumber))
      newErrors.aadharNumber = "Enter 12 digit Aadhar number";
    if (!formData.panNumber.trim()) newErrors.panNumber = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber))
      newErrors.panNumber = "Enter valid PAN number";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if field is restricted (name, email, phone)
    if (['fullName', 'email', 'phone'].includes(name)) {
      setWarningField(name);
      setShowWarning(true);
      return;
    }
    
    let processedValue = value;
    
    // Handle pincode - only numbers and max 6 digits
    if (name === 'pinCode') {
      processedValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    }
    
    setFormData({ ...formData, [name]: processedValue });
    
    // Clear errors for city, state, and pinCode when user starts typing
    if (['city', 'state', 'pinCode'].includes(name) && errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleNext = async () => {
    if (currentStage === 1) {
      const validationErrors = validateStage1();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        // Check if email is verified
        if (!user?.is_email_verified) {
          setWarningField('emailVerification');
          setShowWarning(true);
          return;
        }
        
        // Call create contact API
        setNextLoading(true);
        try {
          const response = await fetch(`${API_BASE}/api/v_1/fund-account/create-contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              guidecode: user?.guide_code,
              pincode: formData.pinCode,
              state: formData.state,
              city: formData.city
            })
          });
          
          if (response.ok) {
            setCurrentStage(2);
          } else {
            alert('Failed to create contact. Please try again.');
          }
        } catch (error) {
          alert('Error creating contact. Please try again.');
        } finally {
          setNextLoading(false);
        }
      }
    } else if (currentStage === 2) {
      const validationErrors = validateStage2();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        // Call create fund account API
        setNextLoading(true);
        try {
          const response = await fetch(`${API_BASE}/api/v_1/fund-account/create-fund-account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              guidecode: user?.guide_code,
              account_type: "bank_account",
              account_number: formData.accountNumber,
              ifsc: formData.ifsc,
              aadhaar_number: formData.aadharNumber,
              pan_code: formData.panNumber
            })
          });
          
          if (response.ok) {
            setCurrentStage(3);
          } else {
            alert('Failed to create fund account. Please try again.');
          }
        } catch (error) {
          alert('Error creating fund account. Please try again.');
        } finally {
          setNextLoading(false);
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      setErrors({});
    }
  };

  const renderStage1 = () => {
    const fields = [
      { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter full name" },
      { label: "Email Address", name: "email", type: "email", placeholder: "Enter email address" },
      { label: "Phone Number", name: "phone", type: "text", placeholder: "Enter phone number" },
      { label: "City", name: "city", type: "text", placeholder: "Enter city" },
      { label: "State", name: "state", type: "text", placeholder: "Enter state" },
      { label: "Pin Code", name: "pinCode", type: "text", placeholder: "Enter pin code" },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {fields.map((field) => (
          <div key={field.name} className="w-full">
            <label className="block mb-2 text-sm font-medium">{field.label}</label>
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                onClick={() => {
                  if (['fullName', 'email', 'phone'].includes(field.name)) {
                    setWarningField(field.name);
                    setShowWarning(true);
                  }
                }}
                readOnly={['fullName', 'email', 'phone'].includes(field.name)}
                className={`w-full border rounded-2xl p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  ['fullName', 'email', 'phone'].includes(field.name) 
                    ? 'bg-gray-100 cursor-pointer' 
                    : 'bg-white'
                } ${field.name === 'email' ? 'pr-12' : ''}`}
              />
              {field.name === 'email' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {user?.is_email_verified ? (
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Verified
                    </span>
                  ) : (
                    <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                      Not Verified
                    </span>
                  )}
                  {!user?.is_email_verified && (
                    <div className="mt-2">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        setOtpLoading(true);
                        try {
                          const response = await fetch(`${API_BASE}/api/v_1/customer-verification/send-otp`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ guide_code: user?.guide_code })
                          });
                          if (response.ok) {
                            setShowOtpModal(true);
                          } else {
                            alert('Failed to send OTP. Please try again.');
                          }
                        } catch (error) {
                          alert('Error sending OTP. Please try again.');
                        } finally {
                          setOtpLoading(false);
                        }
                      }}
                      disabled={otpLoading}
                      className={`text-sm px-4 py-2 rounded-lg font-medium ${
                        otpLoading 
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {otpLoading ? 'Sending...' : 'Verify'}
                    </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {errors[field.name] && (
              <p className="text-red-300 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStage2 = () => {
    const fields = [
      { label: "Account Number", name: "accountNumber", type: "text", placeholder: "Enter account number" },
      { label: "Account Type", name: "accountType", type: "select", options: ["Savings", "Current"] },
      { label: "IFSC Code", name: "ifsc", type: "text", placeholder: "Enter IFSC code" },
      { label: "Aadhar Card Number", name: "aadharNumber", type: "text", placeholder: "Enter 12 digit Aadhar number" },
      { label: "PAN Card Number", name: "panNumber", type: "text", placeholder: "Enter PAN number" },
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {fields.map((field) => (
          <div key={field.name} className="w-full">
            <label className="block mb-2 text-sm font-medium">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border rounded-2xl p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border rounded-2xl p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            )}
            {errors[field.name] && (
              <p className="text-red-300 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStage3 = () => {
    return (
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 flex items-center justify-center rounded-full">
            <Check className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6">KYC Verification Complete!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left bg-white/10 rounded-2xl p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-xl mb-4 text-green-400">Personal Details</h3>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Name</p>
              <p className="text-white text-lg font-medium">{formData.fullName}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Email</p>
              <div className="flex items-center gap-2">
                <p className="text-white text-lg font-medium">{formData.email}</p>
              </div>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Phone</p>
              <p className="text-white text-lg font-medium">{formData.phone}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">City</p>
              <p className="text-white text-lg font-medium">{formData.city}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">State</p>
              <p className="text-white text-lg font-medium">{formData.state}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Pin Code</p>
              <p className="text-white text-lg font-medium">{formData.pinCode}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-xl mb-4 text-green-400">Bank Details</h3>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Account Number</p>
              <p className="text-white text-lg font-medium">{formData.accountNumber}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Account Type</p>
              <p className="text-white text-lg font-medium">{formData.accountType}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">IFSC Code</p>
              <p className="text-white text-lg font-medium">{formData.ifsc}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">Aadhar Number</p>
              <p className="text-white text-lg font-medium">****-****-{formData.aadharNumber.slice(-4)}</p>
            </div>
            
            <div>
              <p className="text-gray-300 text-sm mb-1">PAN Number</p>
              <p className="text-white text-lg font-medium">{formData.panNumber}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (kycLoading) {
    return (
      <div className="w-full p-4 sm:p-6 md:p-8 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading KYC Status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-4xl bg-[#0b3b70] cursor-default rounded-2xl shadow-lg p-6 sm:p-8 text-white">
        {/* Step Progress */}
        {currentStage < 3 && (
        <div className="flex overflow-x-auto items-center justify-start sm:justify-center space-x-4 sm:space-x-8 mb-8">
          {[
            { stage: 1, title: "Personal Details" },
            { stage: 2, title: "Bank Details" },
            { stage: 3, title: "Verification" },
          ].map((item, idx) => (
            <React.Fragment key={item.stage}>
              <div className="flex flex-col items-center min-w-[70px] flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    currentStage > item.stage
                      ? "bg-green-500 border-green-500"
                      : currentStage === item.stage
                      ? "bg-white border-white text-[#0b3b70]"
                      : "bg-transparent border-gray-400"
                  }`}
                >
                  {currentStage > item.stage ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm font-bold">{item.stage}</span>
                  )}
                </div>
                <p className="text-xs mt-1 text-center">{`Stage ${item.stage}`}</p>
                <span className="text-sm font-semibold text-center">{item.title}</span>
              </div>
              {idx < 2 && (
                <div className={`flex-1 h-0.5 ${
                  currentStage > item.stage + 1 ? "bg-green-500" : "bg-gray-400"
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        )}

        {/* Stage Content */}
        <div className="mb-8">
          {currentStage === 1 && renderStage1()}
          {currentStage === 2 && renderStage2()}
          {currentStage === 3 && renderStage3()}
        </div>

        {/* Navigation Buttons */}
        {currentStage < 3 && (
          <div className="flex justify-end">

            <button
              onClick={handleNext}
              disabled={nextLoading}
              className={`px-6 py-2 rounded-full transition-colors ${
                nextLoading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-white text-[#0b3b70] cursor-pointer hover:bg-gray-200'
              }`}
            >
              {nextLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-t-transparent border-[#0b3b70] rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                currentStage === 2 ? "Complete" : "Next"
              )}
            </button>
          </div>
        )}

        {/* OTP Verification Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => {
                  setShowOtpModal(false);
                  setOtp(["", "", "", ""]);
                }}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Email Verification
                </h3>
                
                <p className="text-gray-600 mb-4">
                  We have sent a 4-digit OTP to your email address.
                </p>
                
                <p className="text-sm text-gray-500 mb-6">
                  Please enter the OTP below to verify your email.
                </p>
                
                <div className="flex gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="tel"
                      value={digit}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value.length <= 1) {
                          const newOtp = [...otp];
                          newOtp[index] = value;
                          setOtp(newOtp);
                          
                          // Auto-focus next input
                          if (value && index < 3) {
                            const nextInput = document.getElementById(`otp-${index + 1}`);
                            nextInput?.focus();
                          }
                        }
                      }}
                      onKeyDown={(e) => {
                        // Handle backspace to go to previous input
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      id={`otp-${index}`}
                      className="w-16 h-16 text-black text-center text-2xl font-bold rounded-lg bg-gray-200 focus:outline-none focus:border-blue-600 "
                      maxLength={1}
                    />
                  ))}
                </div>
                
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowOtpModal(false);
                      setOtp("");
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const otpString = otp.join('');
                      if (otpString.length === 4) {
                        setOtpLoading(true);
                        try {
                          const response = await fetch(`${API_BASE}/api/v_1/customer-verification/verify-otp`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              guide_code: user?.guide_code,
                              otp: otpString 
                            })
                          });
                          
                          if (response.ok) {
                            // Update session storage
                            const updatedUser = { ...user, is_email_verified: true };
                            sessionStorage.setItem('user', JSON.stringify(updatedUser));
                            
                            setShowOtpModal(false);
                            setShowSuccess(true);
                            setOtp(["", "", "", ""]);
                          } else {
                            alert('Invalid OTP. Please try again.');
                          }
                        } catch (error) {
                          alert('Error verifying OTP. Please try again.');
                        } finally {
                          setOtpLoading(false);
                        }
                      }
                    }}
                    disabled={otp.join('').length !== 4 || otpLoading}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      otp.join('').length === 4 && !otpLoading
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {otpLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-12 h-12 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Email Verified!
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Your email OTP has been successfully verified.
                </p>

                  <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowSuccess(false);
                    }}
                    className="flex-1 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Okey
                  </button>
                </div>

              
              </div>
            </div>
          </div>
        )}

        {/* Warning Modal */}
        {showWarning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
              <button
                onClick={() => setShowWarning(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {warningField === 'emailVerification' ? 'Email Verification Required' : 'Field Cannot Be Edited'}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {warningField === 'emailVerification' 
                    ? 'Please verify your email address before proceeding to the next step.'
                    : `The ${warningField === 'fullName' ? 'Name' : warningField === 'email' ? 'Email' : 'Phone'} field cannot be modified.`
                  }
                </p>
                
                <p className="text-sm text-gray-500 mb-6">
                  {warningField === 'emailVerification'
                    ? 'Click the "Verify" button next to your email address to complete verification.'
                    : 'Please contact customer support to make changes to this information.'
                  }
                </p>
                
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => {
                      setShowWarning(false);
                      // You can add contact support logic here
                    }}
                    className="flex-1 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Okey
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYCForm;