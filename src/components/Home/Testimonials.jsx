import React from 'react';
import { motion } from 'motion/react';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Alice Johnson',
    avatar: 'https://i.ibb.co/QFV9m49z/download.jpg',
    review: 'This platform helped me organize my studies and improve my grades significantly!',
    rating: 5,
  },
  {
    name: 'Mark Wilson',
    avatar: 'https://i.ibb.co/YFmTfm6k/images.jpg',
    review: 'I love the study planner feature. It keeps me on track every week!',
    rating: 4,
  },
  {
    name: 'Sofia Lee',
    avatar: 'https://i.ibb.co/xtJzSGQF/download.jpg',
    review: 'The charts and insights really make me understand my learning progress.',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 px-6 md:px-20 lg:px-32 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
          What Students Say
        </h2>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="bg-[#FFFFFF] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] flex flex-col items-center text-center"
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-[#4285F4] dark:border-[#8AB4F8]"
            />
            <p className="text-[#5F6368] dark:text-[#D1D5DB] mb-4 text-sm">
              {t.review}
            </p>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <StarIcon key={i} className="w-5 h-5 text-[#FBBC05] dark:text-[#FBBF24]" />
              ))}
            </div>
            <p className="font-semibold text-[#202124] dark:text-[#F9FAFB] text-sm">
              {t.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;