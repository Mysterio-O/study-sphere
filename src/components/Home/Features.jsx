import React from 'react';
import { motion } from 'motion/react';
import { CalendarIcon, QuestionMarkCircleIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';

const features = [
  {
    id: 1,
    title: 'Smart Scheduling',
    description: 'Organize your classes and teacher details effortlessly, never miss a session.',
    icon: <CalendarIcon className="w-12 h-12 text-[#4285F4] dark:text-[#8AB4F8]" />,
    gradient: 'bg-gradient-to-br from-[#E8F0FE] to-[#F8F9FA] dark:from-[#1E3A8A] dark:to-[#1F2937]',
    textColorLight: 'text-[#202124]',
    textColorDark: 'text-[#F9FAFB]',
  },
  {
    id: 2,
    title: 'Random Questions Generator',
    description: 'Practice dynamically generated questions based on topics and difficulty level.',
    icon: <QuestionMarkCircleIcon className="w-12 h-12 text-[#34A853] dark:text-[#6EE7B7]" />,
    gradient: 'bg-gradient-to-br from-[#E6F4EA] to-[#F8F9FA] dark:from-[#064E3B] dark:to-[#1F2937]',
    textColorLight: 'text-[#202124]',
    textColorDark: 'text-[#F9FAFB]',
  },
  {
    id: 3,
    title: 'Wallet & Community',
    description: 'Track income and expenses, interact with other students, and stay motivated.',
    icon: <UserGroupIcon className="w-12 h-12 text-[#FBBC05] dark:text-[#FBBF24]" />,
    gradient: 'bg-gradient-to-br from-[#FEF7E0] to-[#F8F9FA] dark:from-[#78350F] dark:to-[#1F2937]',
    textColorLight: 'text-[#202124]',
    textColorDark: 'text-[#F9FAFB]',
  },
  {
    id: 4,
    title: 'Study Planner',
    description: 'Break down huge tasks into smaller parts and complete them step by step.',
    icon: <ClipboardDocumentListIcon className="w-12 h-12 text-[#EA4335] dark:text-[#FCA5A5]" />,
    gradient: 'bg-gradient-to-br from-[#FCE8E6] to-[#F8F9FA] dark:from-[#7F1D1D] dark:to-[#1F2937]',
    textColorLight: 'text-[#202124]',
    textColorDark: 'text-[#F9FAFB]',
  },
];

const Features = () => {
  return (
    <section className="py-20 px-6 md:px-20 lg:px-32 bg-[#F8F9FA] dark:bg-[#1F2937] font-roboto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
          Key Features
        </h2>
        <p className="text-base md:text-lg text-[#5F6368] dark:text-[#D1D5DB]">
          StudySphere combines innovative tools to make your learning journey productive, fun, and organized.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            whileHover={{ scale: 1.02 }}
            className={`rounded-lg p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] ${feature.gradient} transition-all duration-300`}
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${feature.textColorLight} dark:${feature.textColorDark}`}>
              {feature.title}
            </h3>
            <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;