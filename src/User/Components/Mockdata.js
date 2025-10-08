// src/Components/Mockdata.js
import img1 from "../Assets/profile.png";
import img2 from "../Assets/Profile-dash.png";
import img3 from "../Assets/Sponsor.png";
const randomImages = [
 img1,img2,img3
];

export const mockUser = {
  id: "USR" + Math.floor(Math.random() * 9999),
  name: ["Aarav Mehta", "Priya Singh", "Rohan Das", "Isha Patel", "Vikram Nair"][
    Math.floor(Math.random() * 5)
  ],
  role: ["Affiliate", "Marketer", "Investor", "Partner"][
    Math.floor(Math.random() * 4)
  ],
  profileImage: randomImages[Math.floor(Math.random() * randomImages.length)],
};

export const earningsData = [
  { title: "Today's Earnings", value: `₹ ${Math.floor(Math.random() * 10000)} /-` },
  { title: "Last 7 Days", value: `₹ ${Math.floor(Math.random() * 50000)} /-` },
  { title: "Last 30 Days", value: `₹ ${Math.floor(Math.random() * 150000)} /-` },
  { title: "All Time", value: `₹ ${Math.floor(Math.random() * 1000000)} /-` },
];

export const graphData = Array.from({ length: 6 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i],
  height: Math.floor(Math.random() * 160) + 40,
  value: `₹ ${Math.floor(Math.random() * 50000)}`, // ✅ earning value
}));


export const referrals = Array.from({ length: 4 }, (_, i) => ({
  name: ["Ravi Kumar", "Ananya Sharma", "Karan Verma", "Sneha Reddy"][i],
  pkg: ["Starter Pack", "Pro Pack", "Elite Pack", "Basic Pack"][i],
  earned: `₹ ${Math.floor(Math.random() * 10000)} /-`,
}));

export const leaderboard = Array.from({ length: 5 }, (_, i) => ({
  name: ["Neha Gupta", "Arjun Rao", "Kriti Malhotra", "Sanjay Yadav", "Divya Kapoor"][i],
  image: randomImages[Math.floor(Math.random() * randomImages.length)],
  amount: `₹ ${Math.floor(Math.random() * 100000)} /-`,
}));

export const packages = [
  { name: "Starter", desc: "Basic plan users", percent: 25, color: "bg-blue-500" },
  { name: "Pro", desc: "Intermediate users", percent: 40, color: "bg-green-500" },
  { name: "Elite", desc: "Advanced users", percent: 20, color: "bg-purple-500" },
  { name: "VIP", desc: "Premium users", percent: 15, color: "bg-pink-500" },
];
