import React from 'react';
import { motion } from 'motion/react';

const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

const WeeklyScheduleGrid = ({ schedules = [] }) => {
    // Defensive: accept either array or object with schedules array
    const arr = Array.isArray(schedules) ? schedules : schedules?.schedules ?? [];

    // Count classes per day
    const counts = daysOfWeek.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
    }, {});

    arr.forEach((s) => {
        if (s?.day && counts.hasOwnProperty(s.day)) {
            counts[s.day] += 1;
        }
    });

    const dayColors = {
        Monday: { bg: 'bg-[#4285F4]/10 dark:bg-[#8AB4F8]/20', text: 'text-[#4285F4] dark:text-[#8AB4F8]' },
        Tuesday: { bg: 'bg-[#34A853]/10 dark:bg-[#6EE7B7]/20', text: 'text-[#34A853] dark:text-[#6EE7B7]' },
        Wednesday: { bg: 'bg-[#FBBC05]/10 dark:bg-[#FBBF24]/20', text: 'text-[#FBBC05] dark:text-[#FBBF24]' },
        Thursday: { bg: 'bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20', text: 'text-[#EA4335] dark:text-[#FCA5A5]' },
        Friday: { bg: 'bg-[#673AB7]/10 dark:bg-[#A78BFA]/20', text: 'text-[#673AB7] dark:text-[#A78BFA]' },
        Saturday: { bg: 'bg-[#F06292]/10 dark:bg-[#F472B6]/20', text: 'text-[#F06292] dark:text-[#F472B6]' },
        Sunday: { bg: 'bg-[#26A69A]/10 dark:bg-[#4DB6AC]/20', text: 'text-[#26A69A] dark:text-[#4DB6AC]' },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mt-6"
        >
            <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 font-roboto">
                Weekly Schedule Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {daysOfWeek.map((day) => (
                    <motion.div
                        key={day}
                        whileHover={{ scale: 1.02 }}
                        className={`flex flex-col items-center justify-center rounded-lg p-3 bg-[#FFFFFF] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] ${dayColors[day].bg} shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] transition-all duration-200`}
                        aria-label={`${day} schedule: ${counts[day]} classes`}
                    >
                        <span className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                            {day.slice(0, 3)}
                        </span>
                        <span className={`mt-1 text-lg font-bold ${dayColors[day].text}`}>
                            {counts[day]}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default WeeklyScheduleGrid;