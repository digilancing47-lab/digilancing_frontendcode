import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMessageCircle, FiSend } from "react-icons/fi";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const card = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 16 } },
};

const Section8 = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Subject: "",
    Message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const payload = {
      access_key: "97089d31-5a4c-4e20-8d4f-5e654bf29d64", // Web3Forms access key
      ...formData,
      Subject: formData.Subject || "Contact Form",
      from_name: "Website Contact",     // optional extras
      replyto: formData.Email,          // optional
    };

    try {
      setLoading(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result?.success) {
        setSubmitted(true);
        setFormData({ Name: "", Email: "", Phone: "", Subject: "", Message: "" });
      } else {
        setErrorMsg(result?.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="bg-[#F4FAFF] w-full font-outfit"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 px-6 lg:px-16 py-16 lg:py-32">
        {/* Left Side - Founders Desk */}
        <motion.div className="flex-1 h-full" variants={fadeUp}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            From the Founders' Desk 🚀
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Uncover the Purpose, Passion, and Vision that Drives DIGILANCING Forward
          </p>

          <motion.blockquote
            className="text-gray-800 italic font-semibold text-base sm:text-lg border-l-4 border-[#3384EC] pl-4 mb-6"
            variants={fadeUp}
          >
            “DIGILANCING is more than a learning platform — it’s a movement to
            equip every learner with future-ready skills that open doors to
            opportunities.”
          </motion.blockquote>

          <p className="text-gray-900 text-base sm:text-lg mb-4">— The Founders, Edulancing</p>

          <div className="flex gap-3 mt-2">
            {[
              "https://randomuser.me/api/portraits/men/31.jpg",
              "https://randomuser.me/api/portraits/men/32.jpg",
              "https://randomuser.me/api/portraits/men/33.jpg",
            ].map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt={`Founder ${i + 1}`}
                className={`w-14 h-14 rounded-full object-cover border-2 border-white ${i !== 0 ? "-ml-2" : ""}`}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div className="flex-1 w-full" variants={card}>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D3E9FF]" />
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#bcd9ff 1px, transparent 1px)", backgroundSize: "14px 14px" }}
            />
            <div className="relative p-6 sm:p-10 backdrop-blur-[2px]">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1e429f] bg-white/70 border border-[#A7C8F7] px-3 py-1 rounded-full">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#3384EC]" />
                      Contact us
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold mt-3">We’d love to hear from you</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Classic fields, modern interactions. We typically reply within 24 hours.
                    </p>
                  </div>

                  {/* Inline error message (no toasts) */}
                  {errorMsg && (
                    <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3384EC]"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3384EC]"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            placeholder="Enter your Phone"
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3384EC]"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                        <div className="relative">
                          <FiMessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            name="Subject"
                            value={formData.Subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3384EC]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                      <textarea
                        rows={5}
                        name="Message"
                        value={formData.Message}
                        onChange={handleChange}
                        placeholder="Tell us a bit more..."
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#3384EC]"
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#3384EC] to-[#2C71A1] text-white py-3 mt-2 rounded-xl text-lg shadow-md disabled:opacity-60"
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? "Sending..." : (
                        <span className="inline-flex items-center gap-2">
                          Send Message <FiSend />
                        </span>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12" aria-live="polite">
                  <h3 className="text-2xl font-semibold text-[#3384EC]">
                    🎉 Your form has been submitted!
                  </h3>
                  <p className="text-gray-700 mt-4">
                    We’ll get back to you soon. Stay tuned 🚀 – we will launch soon!
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section8;
