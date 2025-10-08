import Book from '../assets/Book.svg';

const packagesData = {
  basic: {
    id: "DIGI0001",
    packageName: "Basic Package",
    price: "5,999",
    promoPrice: "3,999",
    description:
      "Gain lifetime access to essential digital skills, certifications, and a supportive community that helps you grow with confidence.",
    buttonText: "Buy Now",
    image:Book,
    courses: [
      {
        title: "Digital Marketing",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Prof. A. Sharma",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Digital%20marketing.avif",
      },
      {
        title: "Sales Marketing",
        hours: "18 hours",
        modules: "5 lessons",
        tutor: "Ms. Ritu Sinha",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/sales.avif",
      },
      {
        title: "Affiliate Marketing",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Sanjay Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/affiliate%20market.avif",
      },
    ],
  },

  standard: {
    id: "DIGI0002",
    packageName: "Standard Package",
    price: "9,999",
    promoPrice: "6,999",
    description:
      "Master content creation, strategy, and freelancing basics with lifetime access and community support.",
    buttonText: "Buy Now",
    image:Book,
    courses: [
      // Basic courses
      {
        title: "Digital Marketing",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Prof. A. Sharma",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Digital%20marketing.avif",
      },
      {
        title: "Sales Marketing",
        hours: "18 hours",
        modules: "5 lessons",
        tutor: "Ms. Ritu Sinha",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/sales.avif",
      },
      {
        title: "Affiliate Marketing",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Sanjay Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/affiliate%20market.avif",
      },
      // Standard new
      {
        title: "Communication Skills",
        hours: "15 hours",
        modules: "5 lessons",
        tutor: "Dr. Neha Raghavan",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/communication.avif",
      },
      {
        title: "Instagram Mastery",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/instagram%20mastery.avif",
      },
      {
        title: "Canva Mastery",
        hours: "12 hours",
        modules: "4 lessons",
        tutor: "Ms. Ananya Mehta",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/canva.avif",
      },
    ],
  },

  advanced: {
    id: "DIGI0003",
    packageName: "Advanced Package",
    price: "16,999",
    promoPrice: "7,000",
    description:
      "Gain lifetime access to in-demand skills like digital marketing, copywriting, Facebook ads, and content creation—plus certification and community support to help you grow, earn, and succeed with confidence.",
    buttonText: "Buy Now",
    image:Book,
    courses: [
      // Standard courses...
       {
        title: "Digital Marketing",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Prof. A. Sharma",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Digital%20marketing.avif",
      },
      {
        title: "Sales Marketing",
        hours: "18 hours",
        modules: "5 lessons",
        tutor: "Ms. Ritu Sinha",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/sales.avif",
      },
      {
        title: "Affiliate Marketing",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Sanjay Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/affiliate%20market.avif",
      },
        {
        title: "Communication Skills",
        hours: "15 hours",
        modules: "5 lessons",
        tutor: "Dr. Neha Raghavan",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/communication.avif",
      },
      {
        title: "Instagram Mastery",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/instagram%20mastery.avif",
      },
      {
        title: "Canva Mastery",
        hours: "12 hours",
        modules: "4 lessons",
        tutor: "Ms. Ananya Mehta",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/canva.avif",
      },
      {
        title: "Email Marketing",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/email%20marketing.avif",
      },
      {
        title: "Facebook Ads",
        hours: "18 hours",
        modules: "6 lessons",
        tutor: "Ms. Kavya Rao",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/facebook.avif",
      },
      {
        title: "Google Ads",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Dr. Vikram Desai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Google.avif",
      },
    ],
  },

  premium: {
    id: "DIGI0004",
    packageName: "Premium Package",
    price: "21,999",
    promoPrice: "11,000",
    description:
      "All-in-one learning bundle to fast-track your freelancing, marketing, and content skills in one place.",
    buttonText: "Buy Now",
    image:Book,
    courses: [
      // Advanced courses...
       {
        title: "Digital Marketing",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Prof. A. Sharma",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Digital%20marketing.avif",
      },
      {
        title: "Sales Marketing",
        hours: "18 hours",
        modules: "5 lessons",
        tutor: "Ms. Ritu Sinha",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/sales.avif",
      },
      {
        title: "Affiliate Marketing",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Sanjay Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/affiliate%20market.avif",
      },
        {
        title: "Communication Skills",
        hours: "15 hours",
        modules: "5 lessons",
        tutor: "Dr. Neha Raghavan",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/communication.avif",
      },
      {
        title: "Instagram Mastery",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/instagram%20mastery.avif",
      },
      {
        title: "Canva Mastery",
        hours: "12 hours",
        modules: "4 lessons",
        tutor: "Ms. Ananya Mehta",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/canva.avif",
      },
      {
        title: "Email Marketing",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/email%20marketing.avif",
      },
      {
        title: "Facebook Ads",
        hours: "18 hours",
        modules: "6 lessons",
        tutor: "Ms. Kavya Rao",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/facebook.avif",
      },
      {
        title: "Google Ads",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Dr. Vikram Desai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Google.avif",
      },
      {
        title: "ChatGPT",
        hours: "24 hours",
        modules: "9 lessons",
        tutor: "Dr. Meera Krishnan",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Chatgpt.avif",
      },
      {
        title: "YouTube Mastery",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Mr. Aditya Jain",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/youtubemastery.avif",
      },
      {
        title: "Attraction Marketing",
        hours: "14 hours",
        modules: "5 lessons",
        tutor: "Ms. Shalini Menon",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/attraction%20marketing.avif",
      },
      {
        title: "Content Creation",
        hours: "28 hours",
        modules: "10 lessons",
        tutor: "Prof. Tanvi Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/contact%20creation.avif",
      },
    ],
  },

  ultimate: {
    id: "DIGI0005",
    packageName: "Ultimate Package",
    price: "29,999",
    promoPrice: "22,999",
    description:
      "All-in-one learning bundle to fast-track your freelancing, marketing, and content skills in one place.",
    buttonText: "Buy Now",
    image:Book,
    courses: [
      // Premium courses...
        {
        title: "Digital Marketing",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Prof. A. Sharma",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Digital%20marketing.avif",
      },
      {
        title: "Sales Marketing",
        hours: "18 hours",
        modules: "5 lessons",
        tutor: "Ms. Ritu Sinha",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/sales.avif",
      },
      {
        title: "Affiliate Marketing",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Sanjay Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/affiliate%20market.avif",
      },
        {
        title: "Communication Skills",
        hours: "15 hours",
        modules: "5 lessons",
        tutor: "Dr. Neha Raghavan",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/communication.avif",
      },
      {
        title: "Instagram Mastery",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/instagram%20mastery.avif",
      },
      {
        title: "Canva Mastery",
        hours: "12 hours",
        modules: "4 lessons",
        tutor: "Ms. Ananya Mehta",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/canva.avif",
      },
      {
        title: "Email Marketing",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/email%20marketing.avif",
      },
      {
        title: "Facebook Ads",
        hours: "18 hours",
        modules: "6 lessons",
        tutor: "Ms. Kavya Rao",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/facebook.avif",
      },
      {
        title: "Google Ads",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Dr. Vikram Desai",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Google.avif",
      },
      {
        title: "ChatGPT",
        hours: "24 hours",
        modules: "9 lessons",
        tutor: "Dr. Meera Krishnan",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Chatgpt.avif",
      },
      {
        title: "YouTube Mastery",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Mr. Aditya Jain",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/youtubemastery.avif",
      },
      {
        title: "Attraction Marketing",
        hours: "14 hours",
        modules: "5 lessons",
        tutor: "Ms. Shalini Menon",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/attraction%20marketing.avif",
      },
      {
        title: "Content Creation",
        hours: "28 hours",
        modules: "10 lessons",
        tutor: "Prof. Tanvi Kulkarni",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/contact%20creation.avif",
      },
      {
        title: "Stock Market",
        hours: "26 hours",
        modules: "8 lessons",
        tutor: "Mr. Arjun Malhotra",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/stock%20market.avif",
      },
      {
        title: "Website Development",
        hours: "30 hours",
        modules: "9 lessons",
        tutor: "Dr. Raghav Menon",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/website%20development.avif",
      },
      {
        title: "Video Editing",
        hours: "18 hours",
        modules: "6 lessons",
        tutor: "Ms. Nisha Kapoor",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/videoediting.avif",
      },
      {
        title: "Cryptocurrency",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Manish Agarwal",
        imageUrl:
          "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/crypto.avif",
      },
    ],
  },
};

export default packagesData;

