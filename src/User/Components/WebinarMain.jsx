import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { API_BASE } from "../../apiBase";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const WebinarCalendar = () => {
  const [calendarRef, setCalendarRef] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);



  // Fetch webinars from API
  const fetchWebinars = async (year, month) => {
    try {
      const res = await fetch(`${API_BASE}/api/v_1/Affiliate/webinar/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month: month + 1 }),
      });

      const data = await res.json();
      if (data.success) {
        const formattedEvents = data.data.map((webinar) => {
          const startDate = new Date(webinar.date);
          const startDateTime = `${startDate.toISOString().split("T")[0]}T${webinar.timing_from}`;
          const endDateTime = `${startDate.toISOString().split("T")[0]}T${webinar.timing_to}`;

          return {
            id: webinar.id,
            title: webinar.title,
            start: startDateTime,
            end: endDateTime,
            color: "#8b5cf6",
            extendedProps: {
              trainer: webinar.trainer,
              language: webinar.language,
              image: webinar.image,
            },
          };
        });
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error fetching webinars:", error);
    }
  };

  useEffect(() => {
    fetchWebinars(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth]);

  const handleMonthYearChange = (year, month) => {
    if (calendarRef) {
      const calendarApi = calendarRef.getApi();
      calendarApi.gotoDate(new Date(year, month));
    }
    setSelectedYear(year);
    setSelectedMonth(month);
    setShowMonthPicker(false);
  };

  return (
    <div className="min-h-screen bg-[#002B54] flex flex-col items-center  text-white">
      {/* Header */}
      <div className="w-full  bg-white text-[#12467f] text-center py-6 sm:py-8 rounded-2xl shadow-lg mb-3">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide mt-2">WEBINAR</h1>
      </div>

      {/* Calendar Section */}
      <div className="w-full  bg-white text-black p-4 sm:p-8 rounded-2xl shadow-xl relative">
        <FullCalendar
          ref={(ref) => setCalendarRef(ref)}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "today",
            center: "title",
            right: "",
          }}
          titleFormat={{ year: "numeric", month: "long" }}
          height="auto"
          eventContent={(eventInfo) => (
            <div
  className="rounded-md w-full mx-auto text-xs p-2 sm:text-sm cursor-pointer leading-tight text-black"
  style={{ backgroundColor: getRandomColor() }}
>
              <b>{eventInfo.timeText}</b>
              <p className="font-semibold truncate">{eventInfo.event.title}</p>
              <p className="text-xs">{eventInfo.event.extendedProps.trainer}</p>
            </div>
          )}
          eventClick={(info) => {
            setSelectedEvent(info.event);
            setShowModal(true);
          }}
        />

        {/* Month-Year Button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <button
            onClick={() => setShowMonthPicker(!showMonthPicker)}
            className="bg-[#12467f] text-[#ffffff] px-3 sm:px-4 py-2 rounded-lg shadow font-semibold text-sm sm:text-base cursor-pointer hover:bg-[#12467f] transition-colors"
          >
            Month
          </button>

          {/* Month-Year Picker Dropdown */}
          {showMonthPicker && (
            <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-2xl p-4 w-60 sm:w-80 z-50">
              {/* Year Selector */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setSelectedYear(selectedYear - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ◀
                </button>
                <span className="font-semibold">{selectedYear}</span>
                <button
                  onClick={() => setSelectedYear(selectedYear + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ▶
                </button>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 12 }).map((_, monthIndex) => (
                  <button
                    key={monthIndex}
                    className={`px-3 py-2 rounded text-sm transition-colors ${
                      selectedMonth === monthIndex
                        ? "bg-[#0b3b70] text-white"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleMonthYearChange(selectedYear, monthIndex)}
                  >
                    {new Date(0, monthIndex).toLocaleString("default", {
                      month: "short",
                    })}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center px-2 sm:px-4 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-black-600 hover:text-gray-900 text-xl sm:text-2xl"
            >
              ✖
            </button>

            <div className="mt-5">
              {/* Image */}
              <img
                src={
                  selectedEvent.extendedProps.image
                 
                }
                alt={selectedEvent.title}
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-[#0b3b70]">
                  {selectedEvent.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  <b>Trainer:</b> {selectedEvent.extendedProps.trainer}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  <b>Language:</b> {selectedEvent.extendedProps.language}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  <b>Start:</b> {new Date(selectedEvent.start).toLocaleString()}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-4">
                  <b>End:</b> {new Date(selectedEvent.end).toLocaleString()}
                </p>

                {/* <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-5 sm:px-6 py-2 bg-[#0b3b70] text-white rounded-lg shadow hover:bg-[#12467f]"
                >
                  Close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebinarCalendar;
