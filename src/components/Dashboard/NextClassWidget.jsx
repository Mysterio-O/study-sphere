import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ClockIcon } from '@heroicons/react/24/solid';

const NextClassWidget = ({ schedules }) => {
    const dayMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };

    const dayColors = {
        Monday: { border: 'border-[#4285F4] dark:border-[#8AB4F8]', text: 'text-[#4285F4] dark:text-[#8AB4F8]', bg: 'bg-[#4285F4]/10 dark:bg-[#8AB4F8]/20' },
        Tuesday: { border: 'border-[#34A853] dark:border-[#6EE7B7]', text: 'text-[#34A853] dark:text-[#6EE7B7]', bg: 'bg-[#34A853]/10 dark:bg-[#6EE7B7]/20' },
        Wednesday: { border: 'border-[#FBBC05] dark:border-[#FBBF24]', text: 'text-[#FBBC05] dark:text-[#FBBF24]', bg: 'bg-[#FBBC05]/10 dark:bg-[#FBBF24]/20' },
        Thursday: { border: 'border-[#EA4335] dark:border-[#FCA5A5]', text: 'text-[#EA4335] dark:text-[#FCA5A5]', bg: 'bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20' },
        Friday: { border: 'border-[#673AB7] dark:border-[#A78BFA]', text: 'text-[#673AB7] dark:text-[#A78BFA]', bg: 'bg-[#673AB7]/10 dark:bg-[#A78BFA]/20' },
        Saturday: { border: 'border-[#F06292] dark:border-[#F472B6]', text: 'text-[#F06292] dark:text-[#F472B6]', bg: 'bg-[#F06292]/10 dark:bg-[#F472B6]/20' },
        Sunday: { border: 'border-[#26A69A] dark:border-[#4DB6AC]', text: 'text-[#26A69A] dark:text-[#4DB6AC]', bg: 'bg-[#26A69A]/10 dark:bg-[#4DB6AC]/20' },
    };

    if (!schedules || schedules.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="p-4 bg-[#F8F9FA] dark:bg-[#2D3748] rounded-lg shadow text-[#5F6368] dark:text-[#D1D5DB] font-roboto text-center max-w-sm mx-auto"
            >
                <p>No classes scheduled.</p>
            </motion.div>
        );
    }

    const now = new Date();

    const upcomingClass = schedules
        .map((cls) => {
            const dayNum = dayMap[cls.day];
            if (dayNum === undefined || !cls.time) return null;

            const [start, end] = cls.time.split('-');
            const [hours, minutes] = start.split(':').map(Number);

            let classDate = new Date(now);
            classDate.setHours(hours, minutes, 0, 0);

            const diff = (dayNum + 7 - classDate.getDay()) % 7;
            classDate.setDate(classDate.getDate() + diff);

            if (classDate <= now) {
                classDate.setDate(classDate.getDate() + 7);
            }

            return { ...cls, timeStart: start, timeEnd: end, classDate };
        })
        .filter(Boolean)
        .sort((a, b) => a.classDate - b.classDate)[0];

    if (!upcomingClass) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="p-4 bg-[#F8F9FA] dark:bg-[#2D3748] rounded-lg shadow text-[#5F6368] dark:text-[#D1D5DB] font-roboto text-center max-w-sm mx-auto"
            >
                <p>No upcoming class found.</p>
            </motion.div>
        );
    }

    // state for countdown
    const [timeLeft, setTimeLeft] = useState(upcomingClass.classDate - new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(upcomingClass.classDate - new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, [upcomingClass.classDate]);

    // convert ms to h:m:s
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    let countdown = '';
    if (hoursLeft > 0) {
        countdown = `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    } else if (minutesLeft > 0) {
        countdown = `${minutesLeft}m ${secondsLeft}s`;
    } else {
        countdown = `${secondsLeft}s`;
    }

    const dayStyles = dayColors[upcomingClass.day] || dayColors.Monday;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`p-4 bg-[#F8F9FA] dark:bg-[#2D3748] rounded-lg shadow border ${dayStyles.border} max-w-sm mx-auto font-roboto`}
        >
            <div className="flex items-center gap-2 mb-3">
                <ClockIcon className={`w-6 h-6 ${dayStyles.text}`} />
                <h2 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Next Class
                </h2>
            </div>
            <div className={`p-3 rounded-md ${dayStyles.bg}`}>
                <p className="text-base text-[#5F6368] dark:text-[#D1D5DB]">
                    <span className="font-medium">{upcomingClass.subjectName}</span> with{' '}
                    <span className="font-medium">{upcomingClass.teacherName}</span>
                </p>
                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB] mt-1">
                    <span className={`font-medium ${dayStyles.text}`}>{upcomingClass.day}</span> at{' '}
                    {upcomingClass.timeStart} – {upcomingClass.timeEnd}
                </p>
                <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                    Starts in <span className={`font-medium ${dayStyles.text}`}>{countdown}</span>
                </p>
            </div>
        </motion.div>
    );
};

export default NextClassWidget;
