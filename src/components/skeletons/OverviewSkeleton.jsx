import React from 'react';
import { motion } from 'motion/react';

const OverviewSkeleton = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full p-6 roboto"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: ScheduleCard and QuizOverView */}
                <div className="md:col-span-2 space-y-6">
                    {/* Schedule Overview Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>

                        {/* Stat Cards Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="h-[122px] rounded-lg p-4 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            ))}
                        </div>

                        {/* Weekly Schedule Grid Skeleton */}
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Quiz History Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>

                        {/* Quiz Overview Cards Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            ))}
                        </div>

                        {/* Quiz Progression Charts Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Wallet Overview Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>

                        {/* Wallet Summary Cards Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            ))}
                        </div>

                        {/* Wallet Charts Skeleton */}
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-6"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Right Column: NextClassWidget and SubjectDistributionChart */}
                <div className="space-y-6">
                    {/* Upcoming Class Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>

                        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Subject Distribution Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        </div>

                        <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default OverviewSkeleton;