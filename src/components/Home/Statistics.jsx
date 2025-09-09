import React from 'react';
import { motion } from 'motion/react';
import { StarIcon } from '@heroicons/react/24/solid';

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
    <section className="py-12 w-full px-6 md:px-20 lg:px-32 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
          Our Achievements
        </h2>
      </motion.div>

      {/* Animated Counters */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="bg-[#FFFFFF] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] text-center"
          >
            <motion.p
              className="text-4xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="p-4 bg-[#F8F9FA] dark:bg-[#2D3748] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
          >
            <p className="font-semibold text-[#202124] dark:text-[#F9FAFB] mb-2">{a.label}</p>
            <div className="w-full h-3 bg-[#DADCE0] dark:bg-[#374151] rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                initial={{ width: '0%' }}
                animate={{ width: `${a.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ backgroundColor: a.color }}
              />
            </div>
            <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB] text-right mt-1">{a.progress}%</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;