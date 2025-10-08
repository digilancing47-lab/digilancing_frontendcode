import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewCertificate = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const certificateRef = useRef();

    if (!state) {
        navigate("/");
        return null;
    }

    const { courseName, fullName } = state;

    const handleDownloadPDF = async () => {
        const input = certificateRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff", // force white background
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fullName}-${courseName}-certificate.pdf`);
    };

    return (
        <div
            style={{ backgroundColor: "#E5E7EB" }}
            className="min-h-screen w-screen flex items-center justify-center font-serif overflow-hidden p-2 sm:p-4"
        >
            
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    handleDownloadPDF();
                }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 font-medium underline text-xs sm:text-sm print:hidden mt-15"
                style={{ color: "#2563EB" }} 
            >
                Download PDF
            </a>

            {/* Certificate Container */}
            <div className="w-full sm:w-[85vw] md:w-[80vw] h-auto md:h-[85vh] flex items-center justify-center mt-15">
                <div
                    ref={certificateRef}
                    className="w-full h-full aspect-[1.41] rounded-lg shadow-2xl
                     px-2 sm:px-6 md:px-10
                     py-2 sm:py-6 md:py-8
                     text-center relative overflow-hidden"
                    style={{
                        backgroundColor: "#ffffff", 
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "6px solid #D4AF37", 
                    }}
                >
                    {/* Logo */}
                    <div
                        className="absolute top-2 sm:top-4 w-full text-center font-bold"
                        style={{
                            color: "#1E3A8A",
                            fontSize: "clamp(10px, 2vw, 24px)",
                        }}
                    >
                        DIGILANCING
                    </div>


                    {/* Title */}
                    <h1
                        className="text-[14px] sm:text-2xl md:text-5xl font-bold mb-2 mt-6 sm:mt-12 uppercase leading-snug"
                        style={{ color: "#1F2937" }} 
                    >
                        Certificate of Completion
                    </h1>
                    <p
                        className="text-[10px] sm:text-base italic mb-2 sm:mb-6"
                        style={{ color: "#4B5563" }} 
                    >
                        This certificate is proudly presented to
                    </p>

                    {/* Name */}
                    <h2
                        className="text-[12px] sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 leading-snug"
                        style={{ color: "#1E40AF" }} 
                    >
                        {fullName}
                    </h2>

                    <p
                        className="text-[10px] sm:text-sm md:text-md mb-1"
                        style={{ color: "#374151" }}
                    >
                        for successfully completing the course
                    </p>
                    <h3
                        className="text-[11px] sm:text-lg md:text-2xl font-semibold mb-2 sm:mb-4 leading-snug"
                        style={{ color: "#047857" }} 
                    >
                        “{courseName}”
                    </h3>

                    {/* Award Date */}
                    <p
                        className="text-[9px] sm:text-sm mb-4 sm:mb-8"
                        style={{ color: "#4B5563" }} 
                    >
                        Awarded on{" "}
                        {new Date().toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>

                    {/* Signatures */}
                    <div className="absolute bottom-2 sm:bottom-6 left-0 w-full px-2 sm:px-10 flex justify-between items-end">
                        {/* Instructor */}
                        <div className="text-left">
                            <div
                                className="w-12 sm:w-20 md:w-24 mb-1"
                                style={{ borderTop: "1px solid #9CA3AF" }} 
                            ></div>
                            <p
                                className="text-[8px] sm:text-xs md:text-sm"
                                style={{ color: "#6B7280" }} 
                            >
                                Instructor
                            </p>
                        </div>

                        {/* Director */}
                        <div className="text-right">
                            <div
                                className="w-12 sm:w-20 md:w-24 mb-1 ml-auto"
                                style={{ borderTop: "1px solid #9CA3AF" }} 
                            ></div>
                            <p
                                className="text-[8px] sm:text-xs md:text-sm"
                                style={{ color: "#6B7280" }} 
                            >
                                Director, DigiLancing
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCertificate;
