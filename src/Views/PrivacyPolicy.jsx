import React from "react";
import Footer from "../Components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
     <div className="min-h-screen  mt-24 bg-gradient-to-br from-[#003B73] to-[#001F3F] py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Header */}
        <header className="text-right sm:mb-12">
          <h1 className="text-lg sm:text-xl md:text-5xl font-bold uppercase mb-2 text-gray-700">
            PRIVACY POLICY
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-normal uppercase  text-gray-500">
            Digilancing Private Limited
          </h2>
        </header>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10 text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
          {[
            {
              title: "1. Introduction",
              content: (
                <>
                  <p>
                    Welcome to Digilancing Private Limited. These Terms of Service
                    and our Privacy Policy collectively govern your access to and
                    use of our website, platform, and associated services
                    (collectively referred to as the “Service”).
                  </p>
                  <p>
                    By accessing or using the Service, you acknowledge that you
                    have read, understood, and agreed to be bound by both these
                    Terms and our Privacy Policy (collectively, the “Agreements”).
                    If you do not agree with, or cannot comply with, the terms of
                    these Agreements, you must not use or access the Service.
                  </p>
                  <p>
                    These Terms apply to all users, including but not limited to
                    visitors, registered users, affiliates, and others who access
                    or use the Service in any capacity.
                  </p>
                </>
              ),
            },
            {
              title: "2. Affiliate Policy",
              content: (
                <>
                  <p>
                    Digilancing Private Limited has established the following terms
                    to govern the ethical conduct and responsibilities of all
                    affiliates participating in its affiliate marketing program. By
                    becoming an affiliate of Digilancing, you agree to adhere
                    strictly to the following conditions:
                  </p>
                  <h4 className="text-lg font-semibold mt-4">
                    2.1 Eligibility Restrictions
                  </h4>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>
                      You shall not be eligible to receive passive income from
                      Digilancing if you are found to be associated with or working
                      for another company that operates under the same or similar
                      concept, business model, or format as Digilancing.
                    </li>
                    <li>
                      If you are found poaching, soliciting, or attempting to
                      induce Digilancing affiliates to join competing affiliate
                      marketing companies, your affiliate privileges will be
                      terminated. However, you will retain access to any courses
                      you have purchased.
                    </li>
                    <li>
                      If you are found harassing or misbehaving with any
                      Digilancing affiliate, employee, or member of the management,
                      your eligibility to participate in the affiliate marketing
                      program will be revoked, though course access will be
                      maintained.
                    </li>
                  </ul>
                  <h4 className="text-lg font-semibold mt-4">
                    2.2 Passive Income Rights
                  </h4>
                  <p>
                    Passive income rights are conditional privileges granted only
                    to those affiliates who uphold the integrity of the program and
                    comply with all terms herein. Any violation of the above-stated
                    rules will result in termination of passive income rights
                    without affecting previously purchased course access.
                  </p>
                </>
              ),
            },
            {
              title: "3. Purchases",
              content: (
                <>
                  <p>
                    When making any purchase of products, courses, or services
                    through the Digilancing platform, you may be required to supply
                    certain information, including payment details, billing
                    address, and personal identification information, which must be
                    accurate and complete.
                  </p>
                  <p>
                    By making a purchase, you represent and warrant that: (a) you
                    have the legal right to use any payment method provided; and
                    (b) the information supplied is true, correct, and complete.
                  </p>
                  <p>
                    We reserve the right to refuse or cancel orders at any time for
                    reasons including, but not limited to: suspected fraud,
                    unauthorized or illegal transactions, or violations of these
                    Terms.
                  </p>
                </>
              ),
            },
            {
              title: "4. Refunds",
              content: (
                <p>
                  All purchases of digital products, including online courses and
                  affiliate memberships, are non-refundable. By completing a
                  purchase, you acknowledge and agree that Digilancing does not
                  provide refunds or exchanges, except where required by applicable
                  law.
                </p>
              ),
            },
            {
              title: "5. Content",
              content: (
                <>
                  <p>
                    The Service may allow you to post, upload, or share content,
                    including but not limited to text, images, videos, or other
                    materials (“User Content”). You retain ownership of any
                    intellectual property rights in the User Content you submit.
                  </p>
                  <p>
                    By submitting User Content to the Service, you grant Digilancing a
                    worldwide, non-exclusive, royalty-free license to use,
                    reproduce, distribute, display, and perform the content in
                    connection with the Service.
                  </p>
                  <p>
                    You are solely responsible for ensuring that your User Content:
                    (a) does not infringe upon the rights of others; (b) is not
                    illegal, defamatory, obscene, or otherwise objectionable; and
                    (c) complies with these Terms and applicable laws.
                  </p>
                </>
              ),
            },
            {
              title: "6. Prohibited Uses",
              content: (
                <>
                  <p>You agree not to use the Service for:</p>
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Engaging in unlawful or fraudulent activities.</li>
                    <li>
                      Impersonating any person, entity, or misrepresenting your
                      affiliation.
                    </li>
                    <li>Distributing viruses, malware, or any harmful code.</li>
                    <li>Violating the intellectual property or privacy rights of others.</li>
                    <li>Harassing, abusing, or harming any individual or group.</li>
                  </ul>
                </>
              ),
            },
            {
              title: "7. Intellectual Property",
              content: (
                <>
                  <p>
                    All materials, trademarks, logos, designs, text, graphics, and
                    software, provided through the Service are the exclusive
                    property of Digilancing Private Limited and are protected under
                    copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    You may not use, reproduce, or distribute any content from the
                    Service without obtaining express prior written consent from
                    Digilancing.
                  </p>
                </>
              ),
            },
            {
              title: "8. Termination",
              content: (
                <p>
                  We reserve the right to terminate or suspend your account,
                  access, or affiliate privileges at our discretion, without prior
                  notice, if you are found to be in violation of these Terms or
                  engaged in conduct that harms Digilancing or its affiliates.
                </p>
              ),
            },
            {
              title: "9. Limitation of Liability",
              content: (
                <p>
                  To the fullest extent permitted by applicable law, Digilancing
                  and its directors, employees, partners, and affiliates shall not
                  be liable for any indirect, incidental, special, or consequential
                  damages arising from your use of the Service, including but not
                  limited to loss of profits, data, goodwill, or business
                  opportunities.
                </p>
              ),
            },
            {
              title: "10. Indemnification",
              content: (
                <p>
                  You agree to indemnify and hold harmless Digilancing Private
                  Limited, its employees, directors, and affiliates, from any
                  claims, damages, liabilities, or expenses (including legal fees)
                  arising out of your violation of these Terms, your misuse of the
                  Service, or your violation of any law or rights of a third party.
                </p>
              ),
            },
            {
              title: "11. Privacy Policy",
              content: (
                <p>
                  Our Privacy Policy explains how we collect, use, and protect your
                  personal data. By using the Service, you agree to the collection
                  and use of information as described in the Privacy Policy.
                </p>
              ),
            },
            {
              title: "12. Governing Law",
              content: (
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of India, without regard to conflict of law principles.
                </p>
              ),
            },
            {
              title: "13. Dispute Resolution",
              content: (
                <p>
                  Any dispute arising from or related to these Terms shall be
                  resolved exclusively through arbitration in accordance with the
                  Arbitration and Conciliation Act, 1996. The seat of arbitration
                  shall be in [insert location], India, and the proceedings shall
                  be conducted in English.
                </p>
              ),
            },
            {
              title: "14. Changes to Service",
              content: (
                <p>
                  Digilancing reserves the right to modify, suspend, or discontinue
                  the Service, in whole or in part, at any time, with or without
                  notice. We shall not be liable to you or any third party for such
                  modifications or discontinuance.
                </p>
              ),
            },
            {
              title: "15. Changes to Terms",
              content: (
                <p>
                  We may update these Terms at our discretion. Changes will be
                  effective immediately upon posting on our website. Your continued
                  use of the Service after any changes constitutes acceptance of
                  the revised Terms.
                </p>
              ),
            },
            {
              title: "16. Communications",
              content: (
                <p>
                  By creating an account or providing your contact details, you
                  consent to receive communications, including promotional emails,
                  newsletters, and updates. You may opt-out of receiving
                  non-essential communications by following the unsubscribe link in
                  such emails.
                </p>
              ),
            },
            {
              title: "17. Third-Party Links",
              content: (
                <p>
                  Our Service may contain links to third-party websites or services
                  not owned or controlled by Digilancing. We assume no
                  responsibility for the content, privacy policies, or practices of
                  such third-party sites.
                </p>
              ),
            },
            {
              title: "18. Force Majeure",
              content: (
                <p>
                  Digilancing shall not be held liable or responsible for any
                  failure or delay in performance resulting from circumstances
                  beyond our reasonable control, including but not limited to acts
                  of God, natural disasters, government actions, labor disputes,
                  internet outages, or cyberattacks.
                </p>
              ),
            },
            {
              title: "19. Entire Agreement",
              content: (
                <p>
                  These Terms, together with our Privacy Policy, constitute the
                  entire agreement between you and Digilancing with respect to the
                  Service and supersede any prior agreements, understandings, or
                  communications.
                </p>
              ),
            },
            {
              title: "20. Severability",
              content: (
                <p>
                  If any provision of these Terms is found to be invalid or
                  unenforceable, the remaining provisions shall remain in full
                  force and effect.
                </p>
              ),
            },
            {
              title: "21. Waiver",
              content: (
                <p>
                  No waiver of any term or condition of these Terms shall be deemed
                  a further or continuing waiver of such term or any other term,
                  and Digilancing’s failure to assert any right under these Terms
                  shall not constitute a waiver of such right.
                </p>
              ),
            },
            {
              title: "22. Assignment",
              content: (
                <p>
                  You may not assign or transfer your rights or obligations under
                  these Terms without prior written consent from Digilancing. Any
                  attempted assignment without consent shall be null and void.
                </p>
              ),
            },
            {
              title: "23. Headings",
              content: (
                <p>
                  The section headings used in these Terms are included for
                  convenience only and shall not limit or otherwise affect the
                  interpretation of any provision herein.
                </p>
              ),
            },
            {
              title: "24. Contact Information",
              content: (
                <>
                  <p>
                    For any questions about these Terms or the Service, please
                    contact us at:
                  </p>
                  <p>
                    <strong>Email:</strong> support@digilancing.com
                  </p>
                </>
              ),
            },
            {
              title: "25. Language",
              content: (
                <p>
                  These Terms and all related documents shall be written and
                  interpreted in the English language. Any translations are
                  provided for convenience only, and the English version shall
                  prevail in case of any discrepancies.
                </p>
              ),
            },
            {
              title: "26. Acknowledgment",
              content: (
                <p>
                  By using the Service, you acknowledge that you have read these
                  Terms of Service and agree to be bound by them.
                </p>
              ),
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

export default PrivacyPolicy;
