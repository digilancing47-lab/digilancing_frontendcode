import React, { useState } from "react";

const KYCForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) setIsSubmitted(true);
  };

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-[#0b3b70] rounded-2xl shadow-lg p-6 sm:p-8 text-white">

        {/* Step Progress */}
        <div className="flex overflow-x-auto items-center justify-start sm:justify-center space-x-4 sm:space-x-8 mb-8">
          {[
            { stage: 1, title: "Personal Details" },
            { stage: 2, title: "Bank Details" },
            { stage: 3, title: "Verification" },
          ].map((item, idx) => (
            <React.Fragment key={item.stage}>
              <div className="flex flex-col items-center min-w-[70px] flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border ${
                    idx === 0
                      ? "bg-white border-gray-200"
                      : "bg-transparent border-gray-200"
                  }`}
                ></div>
                <p className="text-xs mt-1 text-center">{`Stage ${item.stage}`}</p>
                <span className="text-sm font-semibold text-center">
                  {item.title}
                </span>
              </div>
              {idx < 2 && <div className="flex-1 h-0.5 bg-gray-200"></div>}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {[
            {
              label: "Full Name",
              name: "fullName",
              type: "text",
              placeholder: "Enter full name",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "Enter email address",
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "text",
              placeholder: "Enter phone number",
            },
            { label: "City", name: "city", type: "text", placeholder: "Enter city" },
            { label: "State", name: "state", type: "text", placeholder: "Enter state" },
            {
              label: "Pin Code",
              name: "pinCode",
              type: "text",
              placeholder: "Enter pin code",
            },
          ].map((field) => (
            <div key={field.name} className="w-full">
              <label className="block mb-2 text-sm font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border rounded-2xl p-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors[field.name] && (
                <p className="text-red-300 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Next Button inside form */}
          <div className="md:col-span-2 flex justify-end mt-4 md:mt-6">
            <button
              type="submit"
              className="flex items-center bg-white text-[#0b3b70] px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center w-full max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-full text-green-600 text-xl font-bold">
                ✅
              </div>
            </div>
            <h2 className="text-lg font-semibold mb-2 text-black">
              Your KYC has been Verified.
            </h2>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-blue-600 text-sm underline mt-2"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KYCForm;
