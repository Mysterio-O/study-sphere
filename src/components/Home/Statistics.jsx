import React from 'react';
import { motion } from 'motion/react';

const stats = [
    { label: 'Students Improving', value: 1200, color: '#4285F4' },
    { label: 'Tasks Completed', value: 5000, color: '#34A853' },
    { label: 'Subjects Covered', value: 25, color: '#FBBC05' },
];

const achievements = [
    { label: 'Mathematics', progress: 80, color: '#4285F4' },
    { label: 'Physics', progress: 65, color: '#34A853' },
    { label: 'History', progress: 50, color: '#FBBC05' },
];

const Statistics = () => {
    return (
        <section className="py-12 px-6 md:px-20 lg:px-32 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg w-full">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-primary to-secondary 
                    dark:from-primary-dark dark:to-secondary-dark text-center mb-10">
                Our Achievements
            </h2>

            {/* Animated Counters */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {stats.map((s, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)] text-center"
                    >
                        <motion.p
                            className="text-4xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-2"
                            animate={{ count: [0, s.value] }}
                        >
                            {s.value}+
                        </motion.p>
                        <p className="text-[#5F6368] dark:text-[#D1D5DB]">{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
                {achievements.map((a, i) => (
                    <div key={i}>
                        <p className="text-[#202124] dark:text-[#F9FAFB] font-semibold mb-2">{a.label}</p>
                        <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                                className="h-4 rounded-full"
                                style={{ width: `${a.progress}%`, backgroundColor: a.color }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Statistics;
