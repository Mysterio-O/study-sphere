import React from 'react';
import { motion } from 'motion/react';

const MySubjectsSkeleton = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-center items-center w-full p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto"
        >
            <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto md:p-6'>
                {/* Title Skeleton */}
                <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-6"></div>

                {/* Empty State or Subject Cards Skeleton */}
                <div className="w-full">
                    {/* Empty State Skeleton */}
                    <div className="flex flex-col items-center justify-center w-full px-4 text-center mb-6">
                        <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                        <div className="h-4 w-80 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
                        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Subject Cards Skeleton */}
                    <ul className="flex flex-col gap-3 w-full">
                        {[1, 2, 3].map((item) => (
                            <li
                                key={item}
                                className="p-4 rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] animate-pulse"
                            >
                                <div className="flex justify-between gap-4 items-center">
                                    <div className="flex-1">
                                        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                                        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="flex flex-wrap-reverse gap-2">
                                        <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Lottie Animation Placeholder */}
            <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mt-6 md:mt-0 md:ml-6"></div>

            {/* Modal Skeletons (for edit and schedule modals) */}
            <div className="fixed inset-0 z-50 flex items-center justify-center hidden">
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full p-6 h-96 animate-pulse">
                    <div className="h-6 w-6 bg-gray-300 rounded-full absolute top-4 right-4"></div>
                    <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-10 w-full bg-gray-300 rounded"></div>
                        <div className="h-10 w-full bg-gray-300 rounded"></div>
                        <div className="h-10 w-full bg-gray-300 rounded"></div>
                        <div className="h-10 w-32 bg-gray-300 rounded mt-4"></div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default MySubjectsSkeleton;