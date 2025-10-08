import React from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const TimeSpendingChart = () => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [4, 6, 7, 9, 4, 8, 6],
                backgroundColor: '#B892FF',
                borderRadius: 10, 
                barThickness: 15,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide legend
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context) => `${context.parsed.y} hrs`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: {
                        family: 'Inter, sans-serif',
                        size: 10,
                        weight: 500,
                    },
                    color: '#555',
                },
            },
            y: {
                display: false, // Hide y-axis
                grid: { display: false },
                ticks: { display: false },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-4xl cursor-default border border-[#949191] w-full  mx-auto mt-5">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h2 className="text-base font-semibold text-black">Focus Time</h2>
                    <p className="text-xs text-gray-500">When People Like You Learn</p>
                </div>
                {/* <div className="bg-purple-100 cursor-pointer text-purple-700 text-xs px-2 py-[2px] rounded-md flex items-center gap-1 font-small">
                    📅
                </div> */}
            </div>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TimeSpendingChart;
