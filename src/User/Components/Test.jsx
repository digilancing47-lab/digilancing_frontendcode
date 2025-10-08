import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../apiBase"; // adjust if needed

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const exam = location.state;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [error, setError] = useState("");
  const [certificateInfo, setCertificateInfo] = useState(null); // store certificate details

  const totalDuration = 600;

  useEffect(() => {
    if (!exam?.courseCode) {
      navigate("/");
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/api/admin/mcq/test_questions`, {
          params: {
            courseCode: exam.courseCode,
            limit: 1000,
          },
        });

        const data = response.data;

        if (data?.items?.length > 0) {
          const formatted = data.items.map((q) => ({
            questionId: q.question_id || q.internal_question_id || q.id || "",
            question: q.stem,
            options: q.options
              .sort((a, b) => a.position - b.position)
              .map((opt) => ({
                label: opt.label,
                optionId: opt.option_id || opt.id || "",
              })),
          }));

          setQuestions(formatted);
          setError("");
        } else {
          setError("No questions available for this course.");
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [exam, navigate]);

  useEffect(() => {
    if (quizCompleted || loading) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted, loading]);

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const handleOptionSelect = (index) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: index });
  };

  const handleNext = () => {
    if (selectedOptions[currentQuestion] === undefined) {
      alert("Please select an option before proceeding.");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setQuizCompleted(true);
    setError("");

    try {
      const answers = Object.entries(selectedOptions).map(([qIndex, optIndex]) => {
        const question = questions[qIndex];
        const option = question.options[optIndex];

        return {
          questionId: String(question.questionId),
          optionId: String(option.optionId),
        };
      });

      const payload = {
        userId: exam.userId,
        courseCode: exam.courseCode,
        passMark: 80,
        answers: answers,
      };

      const response = await axios.post(
        `${API_BASE}/api/admin/mcq/submitMcq`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setScore(response.data.score);
        setShowResult(true);

        if (response.data.certificate) {
          setCertificateInfo({
            certificateNo: response.data.certificate.certificate_no,
            issuedAt: response.data.certificate.issued_at,
          });
        }
      } else {
        setError("Submission failed. Please try again.");
      }
    } catch (err) {
      if (err.response?.data?.code === "COOLDOWN_ACTIVE") {
        setError(
          `Cooldown active: ${err.response.data.message}. Retry available at ${err.response.data.retryAvailableAt}`
        );
      } else {
        console.error("Submit error:", err);
        setError("Something went wrong while submitting.");
      }
    }
  };

  const handleViewCertificate = () => {
    if (certificateInfo) {
      navigate("/ViewCertificate", {
        state: {
          certificateNo: certificateInfo.certificateNo,
          issuedAt: certificateInfo.issuedAt,
          fullName: exam.fullName || "User",
          courseName: exam.title || exam.courseCode,
        },
      });
    } else {
      alert("Certificate data not available yet.");
    }
  };

  const q = questions[currentQuestion];

  if (!exam) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 mt-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {exam.title} - Quiz
        </h2>
        <div className="text-lg font-mono bg-gray-100 text-gray-800 px-5 py-2 rounded shadow-inner">
          ⏱ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <p className="text-center text-gray-500">Loading questions...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Question */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">{q?.question}</h3>
            </div>

            <div className="space-y-4">
              {q?.options.map((option, index) => {
                const isSelected = selectedOptions[currentQuestion] === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left px-5 py-3 rounded-lg border transition-all duration-200 focus:outline-none ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-300 text-gray-800"
                    }`}
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end mt-10">
              <button
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow"
                disabled={selectedOptions[currentQuestion] === undefined}
                title={selectedOptions[currentQuestion] === undefined ? "Select an option to continue" : ""}
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          </div>

          {/* Result Modal */}
          {showResult && (
            <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 Test Completed!</h2>
                <p className="text-lg text-gray-700 mb-2">
                  <span className="font-semibold">Questions Answered:</span> {Object.keys(selectedOptions).length} / {questions.length}
                </p>
                <p className="text-lg text-gray-700 mb-2">
                  ⏱ <span className="font-semibold">Time Taken:</span> {formatTime(totalDuration - timeLeft)}
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  <span className="font-semibold">Total Time Allotted:</span> {formatTime(totalDuration)}
                </p>

                <button
                  onClick={handleViewCertificate}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  🎓 View Certificate
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Test;
