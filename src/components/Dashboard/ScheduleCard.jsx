import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChartBarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router';
import WeeklyScheduleGrid from './WeeklyScheduleGrid';
import ListModal from './ListModal';
import Button from '../atoms/Button';

const StatCard = ({ label, value, hint, accent = 'blue', onClick }) => {
    const accentStyles = {
        blue: {
            bg: 'bg-[#E8F0FE]/20 dark:bg-[#1E3A8A]/20',
            text: 'text-[#4285F4] dark:text-[#8AB4F8]',
        },
        green: {
            bg: 'bg-[#ECFDF3]/20 dark:bg-[#6EE7B7]/20',
            text: 'text-[#34A853] dark:text-[#6EE7B7]',
        },
        amber: {
            bg: 'bg-[#FFF8E1]/20 dark:bg-[#FBBF24]/20',
            text: 'text-[#FBBC05] dark:text-[#FBBF24]',
        },
    }[accent];

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg p-4 bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] font-roboto transition-all duration-200 cursor-pointer"
            role="group"
            aria-label={label}
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">{label}</p>
                    <p className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]">{value}</p>
                    {hint && <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">{hint}</p>}
                </div>
                <div className={`p-3 rounded-full ${accentStyles.bg} ${accentStyles.text}`}>
                    <ChartBarIcon className="w-6 h-6" />
                </div>
            </div>
        </motion.div>
    );
};

const ScheduleCard = ({ schedules }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalItems, setModalItems] = useState([]);

    // Defensive: accept either array or object with schedules array
    const arr = Array.isArray(schedules) ? schedules : schedules?.schedules ?? [];

    // Totals
    const totalSchedules = arr.length;

    // Unique subjects and teachers (case-insensitive, trimmed)
    const subjectSet = new Set();
    const teacherSet = new Set();

    arr.forEach((s) => {
        if (s?.subjectName) subjectSet.add(s.subjectName.trim().toLowerCase());
        if (s?.teacherName) teacherSet.add(s.teacherName.trim().toLowerCase());
    });

    const uniqueSubjects = subjectSet.size;
    const uniqueTeachers = teacherSet.size;

    const openModal = (title, items) => {
        setModalTitle(title.charAt(0).toUpperCase() + title.slice(1));
        setModalItems(items.map(item => item.charAt(0).toUpperCase() + item.slice(1)));
        setIsModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full mb-6 font-roboto"
        >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link to="/dashboard/my-schedules">
                    <StatCard
                        label="Total Schedules"
                        value={totalSchedules}
                        hint="All scheduled classes"
                        accent="blue"
                    />
                </Link>
                <StatCard
                    label="Subjects"
                    value={uniqueSubjects}
                    hint="Different subjects in your schedule"
                    accent="green"
                    onClick={() => openModal('Subjects', [...subjectSet])}
                />
                <StatCard
                    label="Teachers"
                    value={uniqueTeachers}
                    hint="Different teachers you have"
                    accent="amber"
                    onClick={() => openModal('Teachers', [...teacherSet])}
                />
            </div>
            <WeeklyScheduleGrid schedules={arr} />
            <ListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
                items={modalItems}
            />
        </motion.div>
    );
};

export default ScheduleCard;