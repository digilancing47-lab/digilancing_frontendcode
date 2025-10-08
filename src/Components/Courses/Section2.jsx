import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchUserCourses, fetchCourseDetail } from "../../redux/slices/coursesSlice";
import { useNavigate } from "react-router-dom";
import instructorIcon from "../../assets/instructor.svg";
import timing_icon from "../../assets/timing_icon.svg";
import Class_icon from "../../assets/Class_icon.svg";
import upgradeIcon from "../../assets/upgrade.svg";
import ReactDOM from "react-dom";

const Loader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md bg-black/30">
    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const makeVariants = (prefersReduced) => {
  const base = prefersReduced ? { opacity: 1, y: 0 } : undefined;

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          when: "beforeChildren",
          staggerChildren: 0.06,
          delayChildren: 0.03,
        },
      },
      ...(base && { hidden: base, visible: base }),
    },
    fadeUp: {
      hidden: { opacity: 0, y: 14 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: "easeOut" },
      },
      ...(base && { hidden: base, visible: base }),
    },
  };
};

const Section2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const { container, fadeUp } = makeVariants(prefersReduced);
  const { items: courses, loading, page, hasMore } = useSelector((state) => state.courses);

  const [filterLoading, setFilterLoading] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(null);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(sessionStorage.getItem("user"));
  const guide_code = user?.guide_code;

  useEffect(() => {
    if (guide_code) {
      dispatch(fetchUserCourses({ guide_code, page: 1, limit: 8 }));
    } else {
      dispatch(fetchCourses({ page: 1, limit: 8 }));
    }
  }, [dispatch, guide_code]);

  const handleFilterChange = async (key) => {
    setFilter(key);
    setFilterLoading(true);

    try {
      if (key === "my" && guide_code) {
        await dispatch(fetchUserCourses({ guide_code, page: 1, limit: 1000 })).unwrap();
      } else if (key === "all") {
        if (guide_code) {
          await dispatch(fetchUserCourses({ guide_code, page: 1, limit: 8 })).unwrap();
        } else {
          await dispatch(fetchCourses({ page: 1, limit: 8 })).unwrap();
        }
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setFilterLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    if (filter === "my") return course.lock === false;
    return true;
  });

  const handleWatchClick = async (course) => {
    if (course.lock) return;
    setLoadingCourse(course.course_code);
    try {
      const res = await dispatch(fetchCourseDetail(course.course_code)).unwrap();
      if (!res) {
        alert("Course details not available right now.");
        return;
      }
      navigate("/DetailedCourse", { state: { courseData: res } });
    } catch (err) {
      console.error("Error fetching course detail:", err);
      alert("Failed to load course details. Please try again later.");
    } finally {
      setLoadingCourse(null);
    }
  };

  const handleLoadMore = () => {
    if (guide_code) {
      dispatch(fetchUserCourses({ guide_code, page: page + 1, limit: 8 }));
    } else {
      dispatch(fetchCourses({ page: page + 1, limit: 8 }));
    }
  };

  const categories = guide_code
    ? [
        { label: "All Courses", key: "all" },
        { label: "My Courses", key: "my" },
      ]
    : [{ label: "All Courses", key: "all" }];

  return (
    <div className="mt-8 px-4 font-outfit">
      {/* Filter Buttons */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-4"
        variants={container}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-6 py-3 w-full max-w-[300px] rounded-xl cursor-pointer text-xs sm:text-base transition duration-300 ease-in-out
              ${
                filter === cat.key
                  ? "bg-[#0162D9] text-white"
                  : "bg-[#f0f0f0] text-[#4f5b6e] hover:bg-[#6c63ff] hover:text-white"
              }
            `}
            onClick={() => handleFilterChange(cat.key)}
          >
            {cat.label}
          </motion.button>
        ))}
      </motion.div>

      {filterLoading &&
        ReactDOM.createPortal(
          <Loader />,
          document.body
        )}


      {!filterLoading && (
        <motion.div
          className="grid max-w-screen-xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={`${course.course_code}-${index}`}
              className="w-full flex flex-col border border-gray-300 rounded-2xl overflow-hidden bg-white shadow-lg relative"
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div className="relative">
                {course.lock && (
                  <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2">
                    <img
                      src={upgradeIcon}
                      className="w-16 h-16"
                      alt="Upgrade to unlock"
                    />
                  </div>
                )}
                <div
                  className={`relative w-full p-1.5 h-48 ${
                    course.lock ? "blur-[4px]" : ""
                  }`}
                >
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="object-cover w-full rounded-2xl h-full"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-grow bg-white p-4">
                <h3 className="font-semibold text-[12px] md:text-[16px] line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex-grow" />
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center px-2 py-1 mt-3 rounded-full border border-[#D7D7D7] w-fit gap-2">
                    <img src={timing_icon} className="w-5" alt="duration" />
                    <p className="text-[12px] font-medium text-gray-500">
                      {course.duration || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center px-2 py-1 mt-3 rounded-full border border-[#D7D7D7] w-fit gap-2">
                    <img src={Class_icon} className="w-5" alt="lessons" />
                    <p className="text-[12px] font-medium text-gray-500">
                      {course.playlist_count || 0} Lessons
                    </p>
                  </div>
                </div>
                
                  <div className="flex-grow" />
                <div className="flex items-center py-3 space-x-2">
                  <img
                    src={course.instructor_profile_url || instructorIcon}
                    alt={course.instructor_name || "Instructor"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm text-[#A8A8A8]">Instructor</p>
                    <p className="text-[18px] text-[#000]">
                      {course.instructor_name || "TBA"}
                    </p>
                  </div>
                </div>

                <div className="flex-grow" />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl text-sm sm:text-base
                  ${
                    course.lock
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#0162D9] cursor-pointer text-white"
                  }`}
                  onClick={() => handleWatchClick(course)}
                  disabled={loadingCourse === course.course_code || course.lock}
                >
                  {course.lock
                    ? "Upgrade to Watch"
                    : loadingCourse === course.course_code
                    ? "Loading..."
                    : "Watch"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {hasMore && filter === "all" && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-3 cursor-pointer border border-[#0162D9] text-[#0162D9] hover:bg-[#0162D9] hover:text-white rounded-xl"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Section2;
