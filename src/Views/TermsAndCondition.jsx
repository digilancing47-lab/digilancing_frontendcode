import React from "react";
import Footer from "../Components/Footer";

const TermsAndConditions = () => {
  const effectiveDate = "30/09/2025";

  const sections = [
    {
      id: "overview",
      title: "Overview",
      content: [
        "This document sets forth the terms and conditions (\"Terms\") governing your access to and use of the services provided by Digilancing Private Limited (\"Company\", \"Digilancing\", \"we\", \"our\", or \"us\"). It outlines user obligations, payment terms, intellectual property rights, limitations of liability, and other key policies.",
        "By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy, which together constitute a legally binding agreement."
      ]
    },
    {
      id: "1",
      title: "1. Agreement",
      content: [
        "1.1 These Terms of Service govern your use of the Digilancing website and any services offered thereon.",
        "1.2 The Privacy Policy is incorporated herein and explains how your personal data is collected, used, and disclosed.",
        "1.3 By using the Service, you confirm you have read, understood, and agree to comply with both these Terms and the Privacy Policy.",
        "1.4 If you do not agree with these Terms, you must immediately discontinue use of the Service. For concerns, email support@Digilancing.com."
      ]
    },
    {
      id: "2",
      title: "2. Communications",
      content: [
        "2.1 By accessing our services, you consent to receive communications including newsletters, promotions, and service updates.",
        "2.2 You may opt out of such communications by using the “unsubscribe” link or by contacting support@Digilancing.com."
      ]
    },
    {
      id: "3",
      title: "3. Purchases",
      content: [
        "3.1 To make a purchase, you must provide accurate payment information, including credit/debit card details and billing/shipping addresses.",
        "3.2 You represent that you have the legal authority to use the chosen payment method and that all information provided is correct.",
        "3.3 Digilancing may use third-party payment gateways to process transactions and may share necessary data with them in accordance with our Privacy Policy.",
        "3.4 Digilancing reserves the right to cancel orders due to availability, pricing errors, or suspected fraud."
      ]
    },
    {
      id: "4",
      title: "4. Subscriptions",
      content: [
        "4.1 Subscription services are billed on a recurring basis depending on the selected plan (“Billing Cycle”).",
        "4.2 Subscriptions renew automatically unless canceled prior to renewal.",
        "4.3 Users may cancel subscriptions via the account portal or by contacting support.",
        "4.4 If automatic billing fails, the subscription may be suspended or terminated immediately."
      ]
    },
    {
      id: "5",
      title: "5. Fee Changes",
      content: [
        "5.1 We reserve the right to revise subscription fees at our discretion.",
        "5.2 Fee changes will take effect after the current Billing Cycle, with prior notice provided.",
        "5.3 Continued use after such changes constitutes acceptance of the new fee structure."
      ]
    },
    {
      id: "6",
      title: "6. Refund Policy",
      content: [
        "6.1 Timeframe:",
        "• Refund requests must be made within 24 hours of purchase.",
        "• Eligible refunds will be processed within 7 working days.",
        "• Requests made after 24 hours will not be considered.",
        "",
        "6.2 Non-Refundable Items:",
        "• Upgraded packages are strictly non-refundable under any circumstances.",
        "",
        "6.3 Deductions:",
        "• Approved refunds will be subject to deductions:",
        "  o 2% payment gateway fee",
        "  o 5% processing fee"
      ]
    },
    {
      id: "7",
      title: "7. Limitation of Liability",
      content: [
        "7.1 Digilancing shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use or inability to use the Service.",
        "7.2 The Service is provided “as is”, with no warranties, either express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose."
      ]
    },
    {
      id: "8",
      title: "8. Governing Law and Jurisdiction",
      content: [
        "8.1 These Terms shall be governed in accordance with the laws of India.",
        "8.2 Any disputes shall be subject to the exclusive jurisdiction of the competent courts located in Karnataka."
      ]
    },
    {
      id: "9",
      title: "9. Prohibited Uses",
      points: [
        "Violating any applicable laws or regulations;",
        "Harassing, exploiting, or harming others, especially minors;",
        "Transmitting unauthorized advertisements or spam;",
        "Impersonating Digilancing or its personnel;",
        "Infringing upon intellectual property rights;",
        "Introducing viruses, malware, or disruptive software;",
        "Gaining unauthorized access to the platform or its data."
      ]
    },
    {
      id: "10",
      title: "10. Referral Code Policy",
      content: [
        "Referral codes may be used only as permitted by Digilancing and must not be misrepresented or abused. Violations may lead to suspension of referral privileges."
      ]
    },
    {
      id: "11",
      title: "11. Internet Use Policy: Legal Overview and Applicability",
      content: [
        "Users agree not to misuse, tamper with, or attempt to disrupt Digilancing’s online infrastructure. Any attempt to compromise security, overload the network, or circumvent user restrictions will result in legal action and account suspension."
      ]
    },
    {
      id: "12",
      title: "12. Indemnification",
      content: [
        "You agree to indemnify, defend, and hold harmless Digilancing, its affiliates, directors, and employees from any claims or demands arising out of your use of the Service or violation of these Terms."
      ]
    },
    {
      id: "13",
      title: "13. Termination",
      content: [
        "Digilancing reserves the right to suspend or terminate your access at any time, without notice, if we believe you have violated these Terms. Provisions that survive termination include ownership, disclaimers, limitations of liability, and indemnities."
      ]
    },
    {
      id: "14",
      title: "14. Final Acknowledgment",
      content: [
        "By using our Service, you affirm that you have read, understood, and agreed to abide by these Terms and our Privacy Policy. For any concerns or clarifications, you may contact us at support@Digilancing.com."
      ]
    },
    {
      id: "15",
      title: "15. General Restrictions",
      content: [
        "15.1 You may access and use the Service only for lawful purposes and in accordance with these Terms.",
        "15.2 You agree not to use the Service in any manner that:"
      ],
      points: [
        "15.2.1 Violates any applicable local, national, or international law or regulation;",
        "15.2.2 Exploits, endangers, or harms minors in any way;",
        "15.2.3 Sends or facilitates the transmission of unsolicited advertising or promotional material, including spam, junk mail, or chain letters;",
        "15.2.4 Impersonates Digilancing, its employees, users, or any third party;",
        "15.2.5 Infringes on the legal rights, privacy, or intellectual property of others;",
        "15.2.6 Engages in unlawful, deceptive, fraudulent, or malicious activity;",
        "15.2.7 Harms or disrupts another user’s experience, including interference with their use of the Service;"
      ]
    },
    {
      id: "important_notice_affiliates",
      title: "Important Notice to Affiliates",
      content: [
        "It is strictly prohibited to upload any video or content referencing or featuring the CEO or any member of management without explicit prior written approval from Digilancing.",
        "Violation of this policy may result in:",
        "• Immediate suspension of the affiliate’s account;",
        "• Termination of the affiliate agreement;",
        "• Forfeiture of all accrued commissions or earnings;",
        "• Legal action for reputational harm or damages suffered by the Company.",
        "We will enforce this policy without exception."
      ]
    },
    {
      id: "16",
      title: "16. Violation and Consequences",
      content: [
        "16.1 Failure to comply with Digilancing’s Professional Conduct & Communication Policy will invite disciplinary action as outlined below:",
        "• First Offense: A formal warning will be issued. The affiliate must re-acknowledge the policy.",
        "• Subsequence Violations: May lead to temporary suspension of affiliate privileges.",
        "• Severe Misconduct: Will result in immediate termination of affiliate status without further notice.",
        "• Legal Action: In cases involving harassment, reputational damage, or breach of law, Digilancing reserves the right to initiate legal proceedings, including for defamation or other civil remedies."
      ]
    },
    {
      id: "17",
      title: "17. Additional Limitations on Use",
      points: [
        "17.1.1 Use the Service in a manner that disrupts, overburdens, or degrades platform performance;",
        "17.1.2 Employ automated systems to interact with the Service without prior written authorization;",
        "17.1.3 Interfere with the operation of the Service using scripts, software, or automated routines;",
        "17.1.4 Upload or distribute malicious code, including viruses, worms, or trojans;",
        "17.1.5 Attempt unauthorized access to any portion of the Service or its infrastructure;",
        "17.1.7 Alter, falsify, or manipulate the Company’s rating systems or public image;",
        "17.1.8 Engage in any activity that may impair the integrity or security of the Service."
      ]
    },
    {
      id: "18",
      title: "18. Analytics",
      content: [
        "Digilancing reserves the right to engage third-party service providers to monitor, audit, and analyze user behaviour and platform interactions, for purposes such as performance optimization, fraud detection, and service improvements."
      ]
    },
    {
      id: "19",
      title: "19. Accounts",
      subSections: [
        {
          subtitle: "19.1 Account Registration",
          points: [
            "19.1.1 By creating an account, you affirm that you are at least 14 years of age.",
            "19.1.2 You agree to provide accurate, complete, and up-to-date information.",
            "19.1.3 Accounts based on false, incomplete, or outdated information may be suspended or terminated.",
            "19.1.4 Creating multiple accounts under different identities is strictly prohibited. If identified:",
            "  o Affiliate commissions will be forfeited;",
            "  o The ID will be reassigned to the original referring party;",
            "  o Violations found retroactively will result in reversal of earnings."
          ]
        },
        {
          subtitle: "19.2 Account Responsibilities",
          points: [
            "19.2.1 You are solely responsible for the confidentiality of your login credentials.",
            "19.2.2 You must promptly report any unauthorized access or security breach to support@Digilancing.com.",
            "19.2.3 You may not use a username that is offensive, vulgar, or infringes upon the rights of others.",
            "19.2.4 Digilancing reserves the right to:",
            "  o Refuse or limit access to the Service;",
            "  o Suspend or terminate any account at its discretion;",
            "  o Remove or modify content;",
            "  o Cancel transactions or orders without prior notice."
          ]
        }
      ]
    },
    {
      id: "20",
      title: "20. Intellectual Property",
      subSections: [
        {
          subtitle: "20.1 Ownership",
          points: [
            "The Service, including its content, design, features, text, graphics, interfaces, code, and all other intellectual property elements, is and shall remain the exclusive property of Digilancing Private Limited and/or its licensors.",
            "The Service is protected by applicable copyright, trademark, trade secret, and other intellectual property laws in India and internationally.",
            "Users are prohibited from copying, modifying, distributing, displaying, transmitting, or otherwise exploiting any part of the Service without the prior written consent of Digilancing."
          ]
        },
        {
          subtitle: "20.2 Trademark Usage",
          points: [
            "The name “Digilancing”, its logos, and any associated branding elements are registered or common law trademarks of the Company.",
            "No user may use or reproduce these marks without explicit prior authorization in writing from Digilancing Private Limited."
          ]
        }
      ]
    },
    {
      id: "21",
      title: "21. Copyright Policy",
      subSections: [
        {
          subtitle: "21.1 Respect for IP Rights",
          points: [
            "Digilancing respects the intellectual property rights of all creators, users, and third parties.",
            "It is our policy to investigate and respond promptly to claims of copyright infringement in accordance with applicable law, including the Indian Copyright Act, 1957, and where applicable, international frameworks such as the DMCA."
          ]
        },
        {
          subtitle: "21.2 Filing a Copyright Complaint",
          content: [
            "Copyright holders or their authorized representatives may submit claims of infringement to support@Digilancing.com with sufficient detail for us to investigate and act."
          ]
        },
        {
          subtitle: "21.3 Misrepresentation Consequences",
          content: [
            "Any person who knowingly submits a false or malicious copyright complaint may be held legally liable for damages, including attorney’s fees, under both Indian and applicable international laws."
          ]
        }
      ]
    },
    {
      id: "22",
      title: "22. DMCA Notice and Procedure",
      content: [
        "Where Digilancing content is hosted or accessible via U.S.-based infrastructure or platforms, we honor Digital Millennium Copyright Act (DMCA) takedown procedures."
      ],
      subSections: [
        {
          subtitle: "22.1 Notification Requirements",
          points: [
            "To submit a valid DMCA notice, the copyright owner (or authorized agent) must provide:",
            "• A physical or electronic signature;",
            "• A clear description of the copyrighted work claimed to be infringed;",
            "• The exact URL or location of the allegedly infringing content;",
            "• Full contact details, including email, phone number, and physical address;",
            "• A good faith statement that the use is unauthorized;",
            "• A declaration made under penalty of perjury that the information provided is accurate and the complainant is authorized."
          ]
        },
        {
          subtitle: "22.2 Submission of Notices",
          content: [
            "All notices should be submitted to:",
            "support@Digilancing.com",
            "Subject Line: “Copyright Infringement Notice”"
          ]
        }
      ]
    },
    {
      id: "23",
      title: "23. Error Reporting and Feedback",
      content: [
        "By submitting any Feedback, such as suggestions, bug reports, or recommendations:",
        "• You waive all rights to the Feedback, including any claim to royalties, attribution, or compensation;",
        "• You represent that the Feedback is non-confidential and does not contain any proprietary third-party content;",
        "• You acknowledge that Digilancing may already be working on similar ideas and is not obligated to adopt, implement, or credit your Feedback."
      ],
      subSections: [
        {
          subtitle: "23.1 License for Feedback",
          content: [
            "Where ownership cannot legally be assigned, you grant Digilancing an irrevocable, perpetual, royalty-free, worldwide, and sub-licensable right to use, modify, adapt, publish, distribute, and commercialize the Feedback in any medium."
          ]
        }
      ]
    },
    {
      id: "24",
      title: "24. Limitation of Liability",
      content: [
        "Except where prohibited by applicable law:",
        "• Digilancing Private Limited, including its officers, directors, employees, affiliates, or agents, shall not be liable for:",
        "  o Indirect, incidental, special, punitive, or consequential damages, including but not limited to loss of profits, goodwill, data, or business interruption.",
        "• Total liability, if established, shall be strictly limited to the amount paid by you to Digilancing for use of the Service in the preceding 12-month period.",
        "• Under no circumstances shall Digilancing be liable for punitive or exemplary damages, even if advised of the possibility of such damages.",
        "Jurisdictional Caveat: Some jurisdictions may not allow certain liability exclusions. In such cases, only the non-excludable limitations under applicable law will apply."
      ]
    },
    {
      id: "25",
      title: "25. Content Posting and Usage",
      subSections: [
        {
          subtitle: "25.1 User Responsibilities",
          points: [
            "Users may post, upload, store, share, or otherwise make available content (collectively, “Content”) through the Service, including text, graphics, video, and other media.",
            "By posting Content, you represent and warrant that:",
            "  o You are the owner or lawful licensee of the Content;",
            "  o You have the right and authority to grant the rights described herein;",
            "  o The Content does not infringe upon any third-party rights, including but not limited to copyright, trademark, privacy, publicity, or contractual rights.",
            "You are solely responsible for the legality, accuracy, and appropriateness of all Content you provide.",
            "Digilancing reserves the right to suspend or terminate the accounts of users who violate intellectual property rights."
          ]
        },
        {
          subtitle: "25.2 Rights Granted to the Company",
          points: [
            "By submitting Content to the platform, you grant Digilancing a non-exclusive, irrevocable, worldwide, royalty-free, transferable, and sub-licensable license to use, reproduce, modify, distribute, publicly perform, and display such Content for any lawful purpose.",
            "This license includes the right to share or feature your Content with other users of the Service.",
            "Digilancing may monitor, screen, edit, or remove user-submitted Content to ensure compliance with these Terms, but it is not obligated to do so.",
            "Any proprietary or licensed content made available by the Company shall not be copied, reused, or distributed without prior written consent from Digilancing or its licensors."
          ]
        }
      ]
    },
    {
      id: "26",
      title: "26. Third-Party Links and Disclaimer of Warranties",
      subSections: [
        {
          subtitle: "26.1 Third-Party Links",
          points: [
            "The Service may include links to third-party websites or platforms not owned or operated by Digilancing.",
            "Digilancing assumes no responsibility or liability for the content, privacy practices, or terms of use of any third-party website.",
            "Users who access third-party links do so at their own risk and are encouraged to review the terms and policies of such external sites independently."
          ]
        },
        {
          subtitle: "26.2 Disclaimer of Warranties",
          points: [
            "The Service is provided on an “as is” and “as available” basis, with no warranties, express or implied.",
            "Digilancing disclaims all warranties, including but not limited to:",
            "  o Merchantability;",
            "  o Fitness for a particular purpose;",
            "  o Non-infringement;",
            "  o Continuity, accuracy, or reliability of the Service.",
            "Some jurisdictions do not permit exclusion of certain warranties. If such laws apply to you, some of the above limitations may not apply."
          ]
        }
      ]
    },
    {
      id: "27",
      title: "27. Termination",
      content: [
        "• Digilancing reserves the right to suspend or terminate your account and access to the Service at any time and without prior notice, particularly for violations of these Terms.",
        "• You may terminate your use of the Service by ceasing all use and deactivating your account.",
        "• Upon termination:",
        "  o Rights and obligations that are intended to survive termination (e.g., ownership rights, disclaimer of warranties, limitation of liability, indemnification) shall remain in effect."
      ]
    },
    {
      id: "28",
      title: "28. Beware of Fraudulent Activities",
      content: [
        "To protect users and maintain platform integrity, the following practices are strictly enforced:"
      ],
      points: [
        "28.1 Official Communication: Digilancing communicates exclusively through its official support email support@Digilancing.com. Any messages from other email addresses should be treated as fraudulent.",
        "28.2 Sensitive Information Policy: The Company will never request OTPs, passwords, or personal banking information via email, call, or message.",
        "28.3 Information Submission: Registered contact details (e.g., phone number, email) must only be submitted through the official email ID: support@Digilancing.com.",
        "28.4 Authorized Support Contact: The only official WhatsApp number for payment-related queries is +91-8008109303.",
        "28.5 Official Announcements: Announcements are made only via verified social media accounts visible through your Digilancing dashboard. Avoid unofficial groups or pages.",
        "28.6 Training and Payment Guidelines: Digilancing does not charge for training or promotion after enrollment, unless officially announced. Affiliates are prohibited from accepting course payments or registration fees into personal accounts. All monetary transactions must be conducted through Digilancing’s official payment channels (e.g., affiliate link, UPI, bank transfer).",
        "28.7 Company Liability: The Company shall bear no responsibility for monetary losses due to transactions made through unauthorized accounts, including accounts of Digilancing employees or affiliates."
      ]
    },
    {
      id: "29",
      title: "29. Disclaimer",
      content: [
        "At Digilancing Private Limited, we strive to provide accurate representations of our products and services, including their potential for income generation. However, we make no representations, warranties, or guarantees regarding:",
        "• The achievement of specific income levels;",
        "• The effectiveness of our products or affiliate programs for any individual."
      ],
      subSections: [
        {
          subtitle: "29.1 Individual Outcomes",
          points: [
            "Success varies and depends on a range of factors including but not limited to:",
            "• Individual effort and consistency;",
            "• Experience and market engagement;",
            "• Economic conditions and customer response."
          ]
        },
        {
          subtitle: "29.2 Limitation of Claims",
          points: [
            "• The Company disclaims any liability for income loss, business failure, or lack of results associated with the use of our services.",
            "• Testimonials displayed are exceptional results and should not be construed as guarantees or average performance indicators."
          ]
        },
        {
          subtitle: "29.3 Scope of Services",
          points: [
            "Our offerings are primarily focused on:",
            "• Skill development, personal enhancement, and professional growth;",
            "• Providing tools and training resources to support continuous learning and self-improvement."
          ]
        },
        {
          subtitle: "Closing Statement",
          content: [
            "By using our services, you acknowledge and agree that Digilancing is not liable for any business success or failure directly or indirectly resulting from your participation."
          ]
        }
      ]
    },
    {
      id: "30",
      title: "30. Prohibited Conduct by Affiliates",
      content: [
        "Affiliates are required to maintain professionalism in all interactions within the Digilancing ecosystem."
      ],
      subSections: [
        {
          subtitle: "30.1 Zero Tolerance for Abusive Behaviour",
          points: [
            "Use of offensive, defamatory, threatening, or vulgar language—whether towards fellow affiliates, customers, staff, or management—is strictly prohibited. Violations may result in:",
            "• Immediate account suspension;",
            "• Permanent disqualification from the affiliate program;",
            "• Retention of access to purchased courses only (with no commission rights)."
          ]
        }
      ]
    },
    {
      id: "31",
      title: "31. Multiple Accounts / Double ID Policy",
      content: [
        "Each affiliate may maintain only one account."
      ],
      subSections: [
        {
          subtitle: "31.1 Violations Include:",
          points: [
            "• Creating accounts under false identities or for family/friends but managing them personally;",
            "• Benefiting from more than one affiliate ID directly or indirectly."
          ]
        },
        {
          subtitle: "31.2 Consequences:",
          points: [
            "• All commissions under secondary accounts will be forfeited;",
            "• Earnings will be transferred to the original referrer;",
            "• Suspension or permanent ban from the affiliate program;",
            "• Retroactive investigation and recovery of paid commissions."
          ]
        }
      ]
    },
    {
      id: "32",
      title: "32. Self-Funded Enrolment Prohibition",
      content: [
        "Affiliates are strictly prohibited from enrolling themselves or others using personal funds for the purpose of:",
        "• Artificially boosting performance or commission eligibility;",
        "• Circumventing fair sponsor attribution.",
        "Violators will face permanent disqualification from all affiliate benefits and possible suspension without prior notice."
      ]
    },
    {
      id: "33",
      title: "33. Affiliate Operational Policies",
      subSections: [
        {
          subtitle: "33.1 Package Upgrade Policy",
          points: [
            "• Upgrades must be initiated within 7 calendar days from the date of enrollment.",
            "• Late upgrades are subject to denial."
          ]
        },
        {
          subtitle: "33.2 Sponsor Lock Policy",
          points: [
            "• Once a sponsor is assigned during registration, it cannot be changed.",
            "• Attempts to manipulate this relationship will be penalized."
          ]
        },
        {
          subtitle: "33.3 Anti-Poaching and Harassment",
          points: [
            "• Poaching, attempting to re-enroll affiliates under new sponsors, or influencing them to request refunds is prohibited.",
            "• Harassment of any kind will result in removal from the program, though course access remains."
          ]
        },
        {
          subtitle: "33.4 Ethical Conduct",
          points: [
            "• Affiliates must promote services honestly and ethically.",
            "• Misleading, deceptive, or unethical marketing is forbidden."
          ]
        },
        {
          subtitle: "33.5 Accuracy in Representation",
          points: [
            "• Affiliates must truthfully present marketing plans, benefits, and features.",
            "• False or exaggerated income claims are prohibited."
          ]
        },
        {
          subtitle: "33.6 Respect for the Company",
          points: [
            "• Affiliates must not make negative or disparaging comments about Digilancing, its products, or its personnel."
          ]
        },
        {
          subtitle: "33.7 Authorized Use Only",
          points: [
            "• All promotional content must be sourced from official Company materials.",
            "• Using Company assets for third-party promotion is not allowed."
          ]
        },
        {
          subtitle: "33.8 User Satisfaction",
          points: [
            "• Maintain high standards of customer service and professionalism.",
            "• Ensure affiliates and clients receive adequate support."
          ]
        },
        {
          subtitle: "33.9 Regulatory Compliance",
          points: [
            "• All activities must comply with applicable laws, rules, and company policies."
          ]
        },
        {
          subtitle: "33.10 Fraud and Misconduct",
          points: [
            "• Fraud, misrepresentation, and manipulation will result in immediate termination."
          ]
        },
        {
          subtitle: "33.11 Fair Trade Practices",
          points: [
            "• Avoid deceptive tactics that could mislead or exploit consumers."
          ]
        },
        {
          subtitle: "33.12 Data Protection",
          points: [
            "• Affiliates must implement measures to safeguard consumer data in compliance with applicable privacy laws."
          ]
        },
        {
          subtitle: "33.13 Eligibility for Events",
          points: [
            "• Only KYC-verified affiliates may attend Digilancing-sponsored events or claim performance-based incentives."
          ]
        }
      ]
    },
    {
      id: "34",
      title: "34. General Guidelines for Affiliates",
      points: [
        "34.1 Branding and Representation: Do not use “Digilancing” or similar names in personal domains or social media handles. Do not affiliate Digilancing with obscene, defamatory, or illegal content.",
        "34.2 Transparency: Affiliates must accurately represent their relationship with Digilancing and not suggest employment, partnership, or agency unless expressly authorized."
      ]
    },
    {
      id: "35",
      title: "35. Commission and Earnings",
      subSections: [
        {
          subtitle: "35.1 Disbursal and Compliance",
          points: [
            "• Commissions are paid weekly, subject to adherence to all terms.",
            "• Terminated affiliates forfeit any pending or future commission payouts."
          ]
        },
        {
          subtitle: "35.2 Commission Caps",
          content: ["Earnings are capped based on the selected affiliate package."]
        },
        {
          subtitle: "35.3 Revisions to Structure",
          content: [
            "Digilancing reserves the right to modify commission rates or structures at its sole discretion. Such changes shall apply prospectively and will be communicated."
          ]
        },
        {
          subtitle: "35.4 Affiliate Misconduct",
          points: [
            "Strictly prohibited activities include:",
            "• Offering unauthorized discounts or cashback schemes;",
            "• Falsifying income proofs or dashboard screenshots;",
            "• Promoting other affiliate programs to Digilancing affiliates;",
            "• Misusing personal promo codes."
          ]
        },
        {
          subtitle: "35.5 Non-Poaching Policy",
          content: [
            "Affiliates are prohibited from recruiting or switching existing members under different sponsors. Breaches will result in immediate disqualification."
          ]
        }
      ]
    },
    {
      id: "36",
      title: "36. Fraudulent Lead Representation Policy",
      content: [
        "Any affiliate found pretending to be a new lead—despite already being an existing affiliate—shall be deemed guilty of fraud."
      ],
      subSections: [
        {
          subtitle: "36.1 Penalties:",
          points: [
            "1. Immediate Account Suspension",
            "2. Legal Action, including civil or criminal complaints",
            "3. Permanent Ban from the affiliate platform",
            "Affiliates are strongly advised to act with honesty and integrity at all times."
          ]
        }
      ]
    },
    {
      id: "37",
      title: "37. Enforcement and Consequences",
      points: [
        "Violations of these affiliate policies will result in:",
        "• Temporary or permanent suspension of promotional rights;",
        "• Forfeiture of commissions and disqualification from benefits;",
        "• Continued access only to purchased courses, with no right to promote, earn, or represent the Company further."
      ]
    },
    {
      id: "38",
      title: "38. Governing Law and Jurisdiction",
      content: [
        "This Agreement shall be governed by and construed in accordance with the laws of India, specifically under the provisions of:",
        "• The Indian Contract Act, 1872",
        "• Other applicable national and state legislation",
        "Jurisdiction: In the event of any dispute or claim, the exclusive jurisdiction shall lie with the competent courts of Karnataka, India.",
        "Enforceability: Failure by Digilancing to enforce any provision of these Terms shall not be construed as a waiver of rights.",
        "• If any provision is deemed unenforceable by a court, the remaining provisions shall remain in full force and effect.",
        "• These Terms constitute the entire agreement between you and Digilancing, superseding all prior agreements or understandings."
      ]
    },
    {
      id: "39",
      title: "39. Alterations to Service",
      content: [
        "Digilancing reserves the right, without prior notice, to:",
        "• Modify, withdraw, or amend the Service and any associated materials;",
        "• Restrict access to certain parts or the entire platform—either temporarily or permanently;",
        "• Decline liability for any unavailability of the Service for any reason or duration."
      ]
    },
    {
      id: "40",
      title: "40. Revisions to Terms",
      content: [
        "We reserve the right to revise or amend these Terms at any time.",
        "Your Responsibilities:",
        "• Regularly review the Terms to stay updated on changes;",
        "• Discontinue use if you do not agree with any revised Terms.",
        "Continued Use Constitutes:",
        "• Your acknowledgment and acceptance of such changes;",
        "• Your agreement to be bound by the updated Terms."
      ]
    },
    {
      id: "41",
      title: "41. Contradictions and Severability",
      content: [
        "No Waiver:",
        "• Failure by the Company to enforce any term does not waive that or any other term.",
        "• Waiver of one breach does not imply waiver of others.",
        "",
        "Severability:",
        "• If any provision is deemed invalid, unlawful, or unenforceable by a competent authority:",
        "  o It shall be modified to be valid and enforceable;",
        "  o All other provisions shall remain in effect."
      ]
    },
    {
      id: "42",
      title: "42. Acknowledgment",
      content: [
        "By accessing or using Digilancing’s services, you:",
        "• Confirm you have read and understood these Terms;",
        "• Agree to be legally bound by all provisions herein."
      ]
    },
    {
      id: "43",
      title: "43. Internet Use Policy – Legal Overview and Applicability Purpose",
      content: [
        "This Internet Use Policy outlines acceptable use and legal obligations for users of company internet and IT resources, including employees, consultants, and contractors."
      ],
      subSections: [
        {
          subtitle: "Legal Basis",
          points: [
            "This policy is framed under the following Indian laws:",
            "• Information Technology Act, 2000",
            "• Copyright Act, 1957",
            "• Indian Penal Code, 1860 (New BNS)",
            "• Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011"
          ]
        },
        {
          subtitle: "Acceptable Use",
          points: [
            "Applies to all use of:",
            "• Company-provided internet (on-site or remote)",
            "• Personal devices used for company work",
            "• Any representation involving the Company’s name or services",
            "Users must:",
            "• Act lawfully, ethically, and responsibly;",
            "• Protect confidential and proprietary data;",
            "• Respect intellectual property and comply with all security protocols."
          ]
        },
        {
          subtitle: "Monitoring and Security",
          points: [
            "Digilancing reserves the right to:",
            "• Monitor internet use, browsing history, email activity, file downloads, and usage of company devices;",
            "• Take action to prevent or investigate misuse.",
            "Legal Reference:",
            "• IT Rules 2011 and Indian Telegraph Act, 1885 (Section 5(2));",
            "• Article 21 of the Indian Constitution (Right to Privacy)—ensuring that monitoring is limited, lawful, and transparent."
          ]
        },
        {
          subtitle: "Prohibited Internet Activities",
          points: [
            "The following are strictly prohibited:",
            "1. Accessing or sharing offensive, obscene, or illegal content",
            "  o IT Act, 2000 (Section 66A)",
            "  o IPC Sections 292–293 (New BNS Sections 79-80)",
            "2. Hacking or unauthorized access",
            "  o IT Act, 2000 (Section 66)",
            "3. Copyright violations",
            "  o Copyright Act, 1957",
            "4. Impersonation or misuse of company identity",
            "  o IPC Section 419(New BNS Section 316(2)), IT Act Section 66C",
            "5. Using resources for personal business",
            "  o Companies Act, 2013 (Section 166)"
          ]
        },
        {
          subtitle: "Reporting and Enforcement",
          content: [
            "Employees must report concerns to:",
            "• Their direct reporting manager"
          ]
        },
        {
          subtitle: "Disciplinary Action",
          content: [
            "Violations may result in:",
            "• Warning or suspension",
            "• Termination of employment",
            "• Legal action for contractual or criminal liability"
          ]
        }
      ]
    },
    {
      id: "44",
      title: "44. Referral Code Policy",
      content: [
        "44.1 Code Structure",
        "• Each user is assigned a unique, non-transferable referral code",
        "• Codes are for personal, single-use only",
        "",
        "44.2 Prohibited Conduct",
        "• Using another person’s referral code",
        "• Allowing someone else to use your code",
        "• Attempting to gain benefits from shared or duplicate codes",
        "",
        "44.3 Consequences of Misuse",
        "Offenders shall be subject to:",
        "• Immediate termination of their account",
        "• Loss of referral benefits or commissions",
        "• Legal action under applicable Indian laws including:",
        "  o Bharatiya Nyaya Sanhita, 2023 – Section 318(4): Cheating",
        "  o Information Technology Act, 2000 – Section 66D: Personation by computer resource",
        "  o Any other applicable statutes",
        "",
        "By using Digilancing’s services, you acknowledge and agree to comply with this Referral Code Policy."
      ]
    }
  ];

  return (
    <>
     <div className="min-h-screen  mt-24 bg-gradient-to-br from-[#003B73] to-[#001F3F] py-10 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Header */}
        <header className="text-right sm:mb-8">
          <h1 className="text-lg sm:text-xl md:text-5xl font-bold uppercase mb-2 text-gray-700">
            TERMS & CONDITIONS
          </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-normal uppercase  text-gray-500">Digilancing Private Limited — Effective Date: {effectiveDate}</h2>
        </header>

        {/* Content */}
        <main className="mt-6 space-y-8 text-gray-800 leading-relaxed text-sm md:text-base lg:text-lg">
          {sections.map((section, idx) => (
            <section key={section.id || idx} className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold text-[#003B73] border-l-4 border-[#003B73] pl-3">
                {section.title}
              </h2>

              {/* Plain content paragraphs */}
              {section.content &&
                section.content.map((para, i) => {
                  // small helper: if para begins with "•" or "o" treat as list bullet line
                  const trimmed = para.trim();
                  if (trimmed.startsWith("•") || trimmed.startsWith("o") || trimmed.startsWith("1.") || trimmed.startsWith("•") || trimmed.startsWith("•")) {
                    return <p key={i} className="ml-6">{para}</p>;
                  }
                  return <p key={i}>{para}</p>;
                })}

              {/* points as list */}
              {section.points && (
                <ul className="list-disc ml-6 space-y-2">
                  {section.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
              )}

              {/* subSections */}
              {section.subSections &&
                section.subSections.map((sub, sidx) => (
                  <div key={sidx} className="mt-3 ml-2">
                    <h3 className="text-md font-semibold">{sub.subtitle}</h3>
                    {sub.content &&
                      sub.content.map((p, pi) => <p key={pi}>{p}</p>)}
                    {sub.points && (
                      <ul className="list-disc ml-6 space-y-2">
                        {sub.points.map((pt, pj) => (
                          <li key={pj}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </section>
          ))}

          {/* Footer contact */}
          <section className="pt-4">
            <h3 className="text-md font-semibold text-gray-700">Contact</h3>
            <p>
              For queries related to these Terms & Conditions, contact: <strong>support@Digilancing.com</strong>
            </p>
          </section>
        </main>
      </div>
    </div>
    <Footer/></>
   
  );
};

export default TermsAndConditions;
