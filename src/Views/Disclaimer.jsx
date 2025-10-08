import React from "react";

import Footer from "../Components/Footer";

const Disclaimer = () => {
  return (
    <>
    <div className="min-h-screen mt-24 bg-gradient-to-br from-[#003B73] to-[#001F3F] py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-screen-xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Header */}
        <header className="text-right sm:mb-12">
          <h1 className="text-lg sm:text-xl md:text-5xl font-bold uppercase mb-2 text-gray-700">
            DISCLAIMER
          </h1>
           <h2 className="text-lg sm:text-xl md:text-2xl font-normal uppercase  text-gray-500">
            Digilancing Private Limited
          </h2>
        </header>

        {/* Company Name */}
        <div className="text-right mb-8 sm:mb-10">
         
        </div>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10 text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
          <p>
            Welcome to Digilancing Private Limited. By accessing our website,
            enrolling in our programs, or using any of our services, you
            acknowledge and agree to the terms set forth in this Disclaimer.
          </p>

          {/* Section Template */}
          {[
            {
              title: "1. Educational Content Only",
              content:
                "All courses and materials offered by Digilancing are intended solely for educational and informational purposes. The content is curated from various publicly available sources including books, digital media, and online platforms. While efforts are made to ensure accuracy, we do not guarantee the completeness, reliability, or correctness of the information provided.",
            },
            {
              title: "2. No Professional Advice",
              content:
                "Our content does not constitute professional advice of any kind, including but not limited to legal, medical, financial, or educational counseling. Users are strongly advised to consult qualified professionals for specific guidance related to their individual circumstances.",
            },
            {
              title: "3. Limitation of Liability",
              content:
                "Digilancing Private Limited, including its directors, employees, affiliates, and service partners, shall not be held liable for any loss or damage—whether direct, indirect, incidental, consequential, or special—arising from your use of our services, content, or reliance thereon. This includes, but is not limited to, loss of income, profits, business opportunities, or data.",
            },
            {
              title: "4. No Guarantees or Warranties",
              content: (
                <>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Our content is free from errors or omissions;</li>
                    <li>The platform will function without interruption or issues;</li>
                    <li>The website or server is free from harmful elements;</li>
                    <li>Any defects will be corrected promptly.</li>
                  </ul>
                  <p className="mt-3">
                    All services are provided “as is” without any express or implied warranties.
                  </p>
                </>
              ),
            },
            {
              title: "5. User Responsibility",
              content:
                "By using our services, you acknowledge that any outcomes—educational, personal, or financial—are your sole responsibility. Digilancing does not promise guaranteed results, and any success achieved is dependent on your individual effort, background, and consistency.",
            },
            {
              title: "6. Content Views and Opinions",
              content:
                "The views expressed in our materials are those of the respective authors or contributors. They do not reflect the official stance of Digilancing Private Limited. We do not intend to harm or discredit any individual, community, group, or belief.",
            },
            {
              title: "7. No Earning Claims",
              content:
                "Digilancing is not a scheme for fast income generation. The content aims to equip users with knowledge and skills. Financial outcomes, if any, depend entirely on the user's application and diligence. We make no promises of income or success.",
            },
            {
              title: "8. Indemnification",
              content:
                "By using our services, you agree to indemnify and hold harmless Digilancing Private Limited, its directors, employees, and affiliates from any claims, liabilities, damages, or expenses arising from your use of the platform or breach of these terms.",
            },
            {
              title: "9. Acceptance of Terms",
              content:
                "Your use of our website or services constitutes your acceptance of this Disclaimer. If you do not agree with any part of this notice, you must refrain from using our platform or purchasing our offerings.",
            },
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-lg sm:text-xl font-semibold text-[#003B73] border-l-4 border-[#003B73] pl-3 mb-2">
                {section.title}
              </h3>
              <div>{section.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/></>
    
  );
};

export default Disclaimer;
