import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '../apiBase';
import Book from '../assets/Book.svg';

const usePackageData = (packageId) => {
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPackageDescription = (id) => {
    const descriptions = {
      "DIGI0001": "Gain lifetime access to essential digital skills, certifications, and a supportive community that helps you grow with confidence.",
      "DIGI0002": "Master content creation, strategy, and freelancing basics with lifetime access and community support.",
      "DIGI0003": "Gain lifetime access to in-demand skills like digital marketing, copywriting, Facebook ads, and content creation—plus certification and community support to help you grow, earn, and succeed with confidence.",
      "DIGI0004": "All-in-one learning bundle to fast-track your freelancing, marketing, and content skills in one place.",
      "DIGI0005": "All-in-one learning bundle to fast-track your freelancing, marketing, and content skills in one place."
    };
    return descriptions[id] || "";
  };

  const getCoursesByPackage = (id) => {
    const baseCourses = [
      {
        title: "Digital Marketing",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Prof. A. Sharma",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Digital%20marketing.avif",
      },
      {
        title: "Sales Marketing",
        hours: "18 hours",
        modules: "5 lessons",
        tutor: "Ms. Ritu Sinha",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/sales.avif",
      },
      {
        title: "Affiliate Marketing",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Sanjay Kulkarni",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/affiliate%20market.avif",
      },
    ];

    const standardCourses = [
      ...baseCourses,
      {
        title: "Communication Skills",
        hours: "15 hours",
        modules: "5 lessons",
        tutor: "Dr. Neha Raghavan",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/communication.avif",
      },
      {
        title: "Instagram Mastery",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/instagram%20mastery.avif",
      },
      {
        title: "Canva Mastery",
        hours: "12 hours",
        modules: "4 lessons",
        tutor: "Ms. Ananya Mehta",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/canva.avif",
      },
    ];

    const advancedCourses = [
      ...standardCourses,
      {
        title: "Email Marketing",
        hours: "25 hours",
        modules: "8 lessons",
        tutor: "Mr. Rohan Pillai",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/email%20marketing.avif",
      },
      {
        title: "Facebook Ads",
        hours: "18 hours",
        modules: "6 lessons",
        tutor: "Ms. Kavya Rao",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/facebook.avif",
      },
      {
        title: "Google Ads",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Dr. Vikram Desai",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Google.avif",
      },
    ];

    const premiumCourses = [
      ...advancedCourses,
      {
        title: "ChatGPT",
        hours: "24 hours",
        modules: "9 lessons",
        tutor: "Dr. Meera Krishnan",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/Chatgpt.avif",
      },
      {
        title: "YouTube Mastery",
        hours: "20 hours",
        modules: "6 lessons",
        tutor: "Mr. Aditya Jain",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/youtubemastery.avif",
      },
      {
        title: "Attraction Marketing",
        hours: "14 hours",
        modules: "5 lessons",
        tutor: "Ms. Shalini Menon",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/attraction%20marketing.avif",
      },
      {
        title: "Content Creation",
        hours: "28 hours",
        modules: "10 lessons",
        tutor: "Prof. Tanvi Kulkarni",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/contact%20creation.avif",
      },
    ];

    const ultimateCourses = [
      ...premiumCourses,
      {
        title: "Stock Market",
        hours: "26 hours",
        modules: "8 lessons",
        tutor: "Mr. Arjun Malhotra",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/stock%20market.avif",
      },
      {
        title: "Website Development",
        hours: "30 hours",
        modules: "9 lessons",
        tutor: "Dr. Raghav Menon",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/website%20development.avif",
      },
      {
        title: "Video Editing",
        hours: "18 hours",
        modules: "6 lessons",
        tutor: "Ms. Nisha Kapoor",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/videoediting.avif",
      },
      {
        title: "Cryptocurrency",
        hours: "22 hours",
        modules: "7 lessons",
        tutor: "Mr. Manish Agarwal",
        imageUrl: "https://storage.googleapis.com/digilancing_storage/courses_thumbnail/crypto.avif",
      },
    ];

    const courseMap = {
      "DIGI0001": baseCourses,
      "DIGI0002": standardCourses,
      "DIGI0003": advancedCourses,
      "DIGI0004": premiumCourses,
      "DIGI0005": ultimateCourses
    };

    return courseMap[id] || baseCourses;
  };

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        let sessionData = sessionStorage.getItem('packageData');
        
        if (!sessionData) {
          const response = await axios.get(`${API_BASE}/api/v_1/packageplan/packages`);
          if (response.data.success) {
            sessionStorage.setItem('packageData', JSON.stringify(response.data.data));
            sessionData = JSON.stringify(response.data.data);
          }
        }

        if (sessionData) {
          const packages = JSON.parse(sessionData);
          const currentPackage = packages.find(pkg => pkg.package_id === packageId);
          
          if (currentPackage) {
            setPackageData({
              id: currentPackage.package_id,
              packageName: currentPackage.name,
              price: currentPackage.mrp_amount,
              promoPrice: currentPackage.referral_amount,
              description: getPackageDescription(currentPackage.package_id),
              buttonText: "Buy Now",
              image: Book,
              courses: getCoursesByPackage(currentPackage.package_id)
            });
          }
        } else {
          // Fallback data if API fails
          const fallbackPrices = {
            "DIGI0001": { price: "3999", promoPrice: "2500" },
            "DIGI0002": { price: "6999", promoPrice: "4000" },
            "DIGI0003": { price: "11999", promoPrice: "7000" },
            "DIGI0004": { price: "16999", promoPrice: "11000" },
            "DIGI0005": { price: "22999", promoPrice: "15000" }
          };
          
          const packageNames = {
            "DIGI0001": "Basic Package",
            "DIGI0002": "Standard Package",
            "DIGI0003": "Advanced Package",
            "DIGI0004": "Premium Package",
            "DIGI0005": "Ultimate Package"
          };
          
          setPackageData({
            id: packageId,
            packageName: packageNames[packageId],
            price: fallbackPrices[packageId]?.price || "0",
            promoPrice: fallbackPrices[packageId]?.promoPrice || "0",
            description: getPackageDescription(packageId),
            buttonText: "Buy Now",
            image: Book,
            courses: getCoursesByPackage(packageId)
          });
        }
      } catch (error) {
        console.error('Error fetching package data:', error);
        // Fallback data on error
        const fallbackPrices = {
          "DIGI0001": { price: "3999", promoPrice: "2500" },
          "DIGI0002": { price: "6999", promoPrice: "4000" },
          "DIGI0003": { price: "11999", promoPrice: "7000" },
          "DIGI0004": { price: "16999", promoPrice: "11000" },
          "DIGI0005": { price: "22999", promoPrice: "15000" }
        };
        
        const packageNames = {
          "DIGI0001": "Basic Package",
          "DIGI0002": "Standard Package",
          "DIGI0003": "Advanced Package",
          "DIGI0004": "Premium Package",
          "DIGI0005": "Ultimate Package"
        };
        
        setPackageData({
          id: packageId,
          packageName: packageNames[packageId],
          price: fallbackPrices[packageId]?.price || "0",
          promoPrice: fallbackPrices[packageId]?.promoPrice || "0",
          description: getPackageDescription(packageId),
          buttonText: "Buy Now",
          image: Book,
          courses: getCoursesByPackage(packageId)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [packageId]);

  return { packageData, loading };
};

export default usePackageData;