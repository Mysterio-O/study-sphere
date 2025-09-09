import React from 'react';
import { motion } from 'motion/react';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import Button from '../../components/atoms/Button';
import { Link } from 'react-router';

const StudyPlannerPreview = () => {
  // Mock data for preview
  const mockPlans = [
    {
      _id: '1',
      subject: 'Mathematics',
      topic: 'Calculus',
      priority: 'high',
      deadline: '2025-09-15',
      timeSlots: [{ day: 'Monday', start: '10:00', end: '11:30' }],
      completed: false,
    },
    {
      _id: '2',
      subject: 'Physics',
      topic: 'Mechanics',
      priority: 'medium',
      deadline: '2025-09-18',
      timeSlots: [{ day: 'Wednesday', start: '14:00', end: '15:30' }],
      completed: true,
    },
    {
      _id: '3',
      subject: 'History',
      topic: 'World War II',
      priority: 'low',
      deadline: '2025-09-20',
      timeSlots: [{ day: 'Friday', start: '09:00', end: '10:00' }],
      completed: false,
    },
  ];

  const priorityStyles = {
    low: { bg: 'bg-[#34A853]/10 dark:bg-[#6EE7B7]/20', text: 'text-[#34A853] dark:text-[#6EE7B7]' },
    medium: { bg: 'bg-[#FBBC05]/10 dark:bg-[#FBBF24]/20', text: 'text-[#FBBC05] dark:text-[#FBBF24]' },
    high: { bg: 'bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20', text: 'text-[#EA4335] dark:text-[#FCA5A5]' },
  };

  return (
    <section className="py-12 w-full px-6 md:px-20 lg:px-32 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <BookOpenIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
        <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]">
          Study Planner Preview
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => {
          const style = priorityStyles[plan.priority] || priorityStyles.medium;
          return (
            <motion.div
              key={plan._id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] border border-[#DADCE0] dark:border-[#374151] ${style.bg} transition-all duration-200`}
            >
              <h3 className="font-semibold text-[#202124] dark:text-[#F9FAFB] mb-2">
                {plan.subject} - {plan.topic}
              </h3>
              <p className={`text-sm ${style.text}`}>
                Priority: {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
              </p>
              {plan.timeSlots?.length > 0 && (
                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB] mt-1">
                  {plan.timeSlots[0].day}: {plan.timeSlots[0].start} - {plan.timeSlots[0].end}
                </p>
              )}
              <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB] mt-1">
                Deadline: {plan.deadline}
              </p>
              <p className="text-sm mt-2 text-[#5F6368] dark:text-[#D1D5DB]">
                Status:
                <span
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${plan.completed
                    ? 'bg-[#34A853]/20 text-[#34A853] dark:bg-[#6EE7B7]/20 dark:text-[#6EE7B7]'
                    : 'bg-[#FBBC05]/20 text-[#FBBC05] dark:bg-[#FBBF24]/20 dark:text-[#FBBF24]'
                    } ml-1`}
                >
                  {plan.completed ? 'Completed' : 'Pending'}
                </span>
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mt-8"
      >
        <Link to="/dashboard/study-planner">
          <Button
            variant="primary"
            text="Explore Full Planner"
            className="px-6 py-2"
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default StudyPlannerPreview;