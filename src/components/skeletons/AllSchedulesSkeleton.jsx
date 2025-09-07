import React from 'react';
import { motion } from 'motion/react';

const AllSchedulesSkeleton = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col-reverse md:flex-row justify-between w-full p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto"
        >
            {/* Main Content Area */}
            <div className="w-full">
                {/* Title Skeleton */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>

                {/* Schedule Grid Skeleton */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <motion.div
                            key={day}
                            className="rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] animate-pulse"
                        >
                            {/* Day Header Skeleton */}
                            <div className="px-4 py-3 rounded-t-lg flex items-center gap-2 bg-gray-300 dark:bg-gray-700">
                                <div className="w-5 h-5 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                                <div className="h-6 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div>
                            </div>

                            {/* Schedule Items Skeleton */}
                            <div className="p-4 space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="border border-[#DADCE0] dark:border-[#374151] rounded-lg p-3 bg-gray-200 dark:bg-gray-700"
                                    >
                                        {/* Delete Button Skeleton */}
                                        <div className="absolute top-2 right-2 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full"></div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lottie Animation Placeholder */}
            <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse mb-6 md:mb-0 md:ml-6"></div>
        </motion.section>
    );
};

export default AllSchedulesSkeleton;