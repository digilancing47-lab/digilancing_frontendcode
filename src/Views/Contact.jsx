import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, Copy, Check } from "lucide-react";
import contact from "../assets/contact.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, type: "spring", stiffness: 110, damping: 18 },
  }),
};

const ACCESS_KEY = "97089d31-5a4c-4e20-8d4f-5e654bf29d64";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState({ email: false, phone: false });

  const emailAddr = "Digilancing47@gmail.com";
  const phoneNum = "+91 80081 09303";

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError("");

    const payload = {
      access_key: ACCESS_KEY,
      // Use the same casing as your reference (Web3Forms accepts arbitrary fields)
      Name: form.name,
      Email: form.email,
      Message: form.message,
      Subject: "Digilancing – Contact Form",
      // helpful extras (optional for Web3Forms)
      from_name: "Digilancing Website",
      replyto: form.email,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result?.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        // auto-hide after a bit
        setTimeout(() => setSent(false), 3500);
      } else {
        setError(result?.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((p) => ({ ...p, [key]: true }));
      setTimeout(() => setCopied((p) => ({ ...p, [key]: false })), 2000);
    } catch {}
  };

  return (
    <div className="relative min-h-screen bg-[#021E3A] text-white flex items-center justify-center px-6 py-24 sm:py-28 cursor-default overflow-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ x: [0, 20, -10, 0], y: [0, 10, -20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ x: [0, -15, 10, 0], y: [0, -10, 15, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl w-full grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <motion.div className="flex gap-4 items-center" variants={fadeUp} custom={0}>
              <img src={contact} alt="Contact" className="w-16 h-16 object-contain" />
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">Get in touch with us</h1>
            </motion.div>
            <motion.p className="mt-5 text-base sm:text-lg text-gray-300 max-w-xl" variants={fadeUp} custom={1}>
              We're here to help! Whether you have a question about our services, need assistance with your account, or want to
              provide feedback, our team is ready to assist you.
            </motion.p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <motion.button
                type="button"
                onClick={() => copyToClipboard(emailAddr, "email")}
                className="group flex items-center justify-between rounded-xl bg:white/5 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-4 text-left backdrop-blur transition text-lg"
                variants={fadeUp}
                custom={2}
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                    <Mail className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-sm text-gray-300">Email</div>
                    <div className="font-semibold">{emailAddr}</div>
                  </div>
                </div>
                {copied.email ? <Check className="h-5 w-5 text-green-300" /> : <Copy className="h-5 w-5 opacity-80" />}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => copyToClipboard(phoneNum, "phone")}
                className="group flex items-center justify-between rounded-xl bg:white/5 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-4 text-left backdrop-blur transition text-lg"
                variants={fadeUp}
                custom={3}
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                    <Phone className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="text-sm text-gray-300">Phone</div>
                    <div className="font-semibold">{phoneNum}</div>
                  </div>
                </div>
                {copied.phone ? <Check className="h-5 w-5 text-green-300" /> : <Copy className="h-5 w-5 opacity-80" />}
              </motion.button>
            </div>

            <motion.p className="mt-3 text-sm sm:text-base text-gray-400" variants={fadeUp} custom={4}>
              Available Monday to Friday, 9 AM – 6 PM GMT
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 110, damping: 18 }}
          className="bg-[#0A2F50]/80 backdrop-blur rounded-2xl border border-white/10 px-4 py-6 sm:p-10"
        >
          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="block text-base mb-2">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Enter your name ..."
                required
                className="w-full px-5 py-4 rounded-lg bg-[#1668B6]/80 text-white placeholder-white/80 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-lg"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="Enter your email ..."
                required
                className="w-full px-5 py-4 rounded-lg bg-[#1668B6]/80 text-white placeholder-white/80 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-lg"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-base mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={onChange}
                placeholder="Message..."
                required
                className="w-full px-5 py-4 rounded-lg bg-[#1668B6]/80 text-white placeholder-white/80 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 text-lg"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-3">
              <div className="min-h-[24px]">
                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="text-base text-green-300"
                    >
                      🎉 Your message has been sent. We’ll get back to you soon. Stay tuned — we will launch soon!
                    </motion.div>
                  )}
                  {error && !sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="text-base text-red-300"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="ml-auto inline-flex items-center gap-3 bg-white text-[#0A2A43] font-medium px-7 py-4 rounded-full text-lg disabled:opacity-70 disabled:cursor-not-allowed shadow/50 hover:shadow active:shadow-md transition"
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <Send className={`h-5 w-5 ${loading ? "animate-pulse" : ""}`} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
