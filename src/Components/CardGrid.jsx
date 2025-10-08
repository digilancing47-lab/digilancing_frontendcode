import React from "react";
import Card from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const cardVariant = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

const slideVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const CardGrid = ({ onCardClick, selectedCard }) => {
  const packages = useSelector((state) => state.register.packages);

  return (
    <>
      {/* Desktop Grid */}
      <div className="mt-10 hidden sm:grid px-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:px-8 lg:px-5">
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="will-change-transform cursor-pointer relative"
            onClick={() => onCardClick(pkg)}
            animate={{
              scale: selectedCard?.id === pkg.id ? 1.05 : 1,
              boxShadow:
                selectedCard?.id === pkg.id
                  ? "0 0 20px rgba(0, 198, 255, 0.6)"
                  : "0 0 10px rgba(0,0,0,0.1)",
              border:
                selectedCard?.id === pkg.id
                  ? "2px solid #00C6FF"
                  : "2px solid transparent",
            }}
            transition={{ duration: 0.3 }}
          >
            <Card {...pkg} />
            {selectedCard?.id === pkg.id && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full z-10">
                Selected
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden mt-10 px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
            renderBullet: (index, className) =>
              `<span class="${className} custom-dot"></span>`,
          }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
        >
          {packages.map((pkg, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.6 }}
                variants={slideVariant}
                onClick={() => onCardClick(pkg)}
                className="relative"
              >
                <Card {...pkg} />
                {selectedCard?.id === pkg.id && (
                  <span className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full z-10">
                    Selected
                  </span>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-swiper-pagination mt-4 flex justify-center"></div>
      </div>
    </>
  );
};

export default CardGrid;
