import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import section40 from "../assets/section40.svg";
import section41 from "../assets/section41.svg";
import section42 from "../assets/section42.svg";
import section43 from "../assets/section43.svg";

const steps = [
  {
    id: 1,
    title: "L1 – Take the First Leap – Enroll Today",
    content1:
      "Choose the course that aligns with your goals and enroll in just a few clicks",
    content2:
      "Instantly access your personalized dashboard where you can track progress.",
    image: section40,
  },
  {
    id: 2,
    title: "L2 – Learn Anytime with Video Lessons",
    content1:
      "Learn through structured video lessons created by industry experts.",
    content2:
      "Replay lessons anytime to strengthen your understanding and mastery.",
    image: section41,
  },
  {
    id: 3,
    title: "L3 – Celebrate Achievement with Certification",
    content1:
      "Earn certificates that validate your new skills and achievements.",
    content2:
      "Use certifications to boost your resume, portfolio, and career credibility.",
    image: section42,
  },
  {
    id: 4,
    title: "L4 – Launch Your Career and Unlock Opportunities",
    content1:
      "Apply your skills to real-world opportunities and freelance projects.",
    content2:
      "Unlock access to career resources, mentorship, and exclusive opportunities.",
    image: section43,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const listItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 16 } },
};

const panelVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 18 } },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -24 : 24, transition: { duration: 0.2 } }),
};

const Section4 = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const currentStep = steps.find((s) => s.id === activeStep);

  // MOBILE carousel refs/flags
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);

  const setStep = (nextId) => {
    setDirection(nextId > activeStep ? 1 : -1);
    setActiveStep(nextId);
  };

  // Sync active step based on scroll position (mobile)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      const w = el.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / w);
      const bounded = Math.min(Math.max(idx, 0), steps.length - 1);
      const nextId = steps[bounded].id;
      if (nextId !== activeStep) setStep(nextId);
    };

    const onResize = () => onScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep]);

  // Autoplay (mobile). Pauses briefly after user interaction.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const goNext = () => {
      if (pausedRef.current) return;
      const w = el.clientWidth || 1;
      const idx = Math.round(el.scrollLeft / w);
      const next = (idx + 1) % steps.length;
      el.scrollTo({ left: next * w, behavior: "smooth" });
    };

    autoplayRef.current = setInterval(goNext, 3000);

    const pauseTemporarily = () => {
      pausedRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, 4000); // resume 4s after last interaction
    };

    el.addEventListener("pointerdown", pauseTemporarily, { passive: true });
    el.addEventListener("touchstart", pauseTemporarily, { passive: true });
    el.addEventListener("wheel", pauseTemporarily, { passive: true });

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      el.removeEventListener("pointerdown", pauseTemporarily);
      el.removeEventListener("touchstart", pauseTemporarily);
      el.removeEventListener("wheel", pauseTemporarily);
    };
  }, []);

  const scrollToIndex = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    el.scrollTo({ left: i * w, behavior: "smooth" });
  };

  return (
    <motion.section
      className="text-white font-outfit max-w-screen-xl mx-auto h-auto py-16 px-6 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.span
          className="bg-[#5E4BDA] text-white text-sm font-medium px-4 py-1 rounded-full inline-block"
          variants={fadeUp}
        >
          How it works
        </motion.span>
        <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4" variants={fadeUp}>
          Your Roadmap to Mastering Skills
        </motion.h2>
        <motion.p className="mt-4 text-[#C0C6D0] text-base sm:text-lg font-light" variants={fadeUp}>
          Turn learning into earning. Master the skills that matter, transform your future, and step confidently toward growth and financial independence.
        </motion.p>
      </div>

      {/* Desktop/Tablet (md+) – clickable list + animated panel */}
      <div className="mt-12 bg-[#112B4C] lg:h-[500px] rounded-3xl md:p-6 max-w-screen-xl mx-auto hidden md:flex items-center lg:items-stretch">
        {/* Left list */}
        <div className="relative space-y-4 pt-5 lg:gap-5 p-2 pb-3 flex flex-col w-full lg:max-w-[300px]">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <motion.button
                type="button"
                key={step.id}
                onClick={() => setStep(step.id)}
                variants={listItem}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 py-8 md:py-5 lg:py-3 rounded-tl-xl rounded-bl-xl flex-1 text-left text-xl lg:text-lg font-medium cursor-pointer transition
                  ${isActive ? "text-white" : "text-white/80 hover:text-white"}`}
              >
                {/* Animated left accent for active item */}
                <motion.span
                  layout
                  className={`absolute left-0 top-0 h-full rounded-tl-xl rounded-bl-xl ${isActive ? "bg-[#0181f9a6]" : "bg-transparent"}`}
                  style={{ width: isActive ? 6 : 0 }}
                  transition={{ type: "spring", stiffness: 250, damping: 24 }}
                />
                <span className="relative z-[1]">{step.title}</span>
                {/* Soft gradient overlay for active */}
                {isActive && (
                  <motion.span
                    layoutId="activeGradient"
                    className="absolute inset-0 rounded-tl-xl rounded-bl-xl bg-gradient-to-r from-[#0181f9a6] via-[#0181f970] to-[#ffffff00] border-b border-l border-t border-[#127adcb7]"
                    transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right content area with slide/fade between steps */}
        <div className="bg-white rounded-3xl p-2 md:p-6 flex flex-row gap-4 items-center w-full max-w-[750px] mx-auto overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="contents w-full"
            >
              {activeStep % 2 !== 0 ? (
                <>
                  <div className="flex-1 space-y-4 h-full flex flex-col max-w-[800px]">
                    <div className="bg-[#0B2342] flex-1 text-white p-4 rounded-3xl py-10 text-2xl">
                      {currentStep.content1}
                    </div>
                    <div className="bg-gradient-to-r flex-1 from-[#3384EC] to-[#108FBD] py-10 text-white p-4 rounded-3xl text-2xl">
                      {currentStep.content2}
                    </div>
                  </div>
                  <div className="flex-1 w-full h-full">
                    <motion.img
                      src={currentStep.image}
                      alt={currentStep.title}
                      className="rounded-3xl w-full h-full object-cover"
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 w-full h-full">
                    <motion.img
                      src={currentStep.image}
                      alt={currentStep.title}
                      className="rounded-3xl w-full h-full object-cover"
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    />
                  </div>
                  <div className="flex-1 space-y-4 h-full flex flex-col max-w-[800px]">
                    <div className="bg-[#0B2342] flex-1 text-white p-4 rounded-3xl py-10 text-2xl">
                      {currentStep.content1}
                    </div>
                    <div className="bg-gradient-to-r flex-1 from-[#3384EC] to-[#108FBD] text-white p-4 rounded-3xl py-10 text-2xl">
                      {currentStep.content2}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile (< md) – swipeable card carousel with dots + autoplay + entrance anim */}
      <div className="mt-12 md:hidden">
        <div
          ref={trackRef}
          className="
            relative w-full overflow-x-auto snap-x snap-mandatory
            scroll-smooth
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex">
            {steps.map((s) => (
              <div
                key={s.id}
                className="snap-center shrink-0 w-full px-1"
                style={{ scrollSnapStop: "always" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white rounded-3xl p-4 flex flex-col gap-4"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="rounded-2xl w-full h-56 object-cover"
                  />
                  <div className="text-[#0B2342] text-xl font-semibold">
                    {s.title}
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#0B2342] text-white p-4 rounded-2xl text-base">
                      {s.content1}
                    </div>
                    <div className="bg-gradient-to-r from-[#3384EC] to-[#108FBD] text-white p-4 rounded-2xl text-base">
                      {s.content2}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {steps.map((s, i) => (
            <motion.button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="h-2 rounded-full"
              animate={{ width: activeStep === s.id ? 24 : 8, backgroundColor: activeStep === s.id ? "#ffffff" : "rgba(255,255,255,0.5)" }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Section4;
