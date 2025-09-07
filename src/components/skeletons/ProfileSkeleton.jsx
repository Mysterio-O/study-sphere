import React from 'react';
import { motion } from 'motion/react';

const ProfileSkeleton = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen bg-[#F8F9FA] dark:bg-[#1F2937] font-roboto"
        >
            {/* Cover Section Skeleton */}
            <div className="relative h-64 md:h-80">
                <div className="relative h-full w-full overflow-hidden bg-gray-300 dark:bg-gray-700 animate-pulse">
                    <div className="absolute bottom-4 right-4">
                        <div className="h-10 w-32 bg-gray-400 dark:bg-gray-600 rounded-md animate-pulse"></div>
                    </div>
                </div>

                {/* Profile Picture Skeleton */}
                <div className="absolute bottom-0 left-4 md:left-8 transform translate-y-1/2">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-[#F8F9FA] dark:border-[#1F2937] animate-pulse"></div>
                </div>
            </div>

            {/* User Details Skeleton */}
            <div className="px-4 md:px-8 pt-20 md:pt-24 pb-6">
                <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="px-4 md:px-8">
                {/* Action Buttons Skeleton */}
                <div className="flex gap-4 mb-6">
                    <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                </div>

                {/* Post Input Skeleton */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 md:p-6 mb-6">
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    <div className="flex justify-end mt-3">
                        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Posts Skeleton */}
            <div className="mt-6 px-4 md:px-8">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6 mb-6 animate-pulse">
                        {/* Post Header Skeleton */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="ml-3">
                                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                    <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        </div>

                        {/* Post Content Skeleton */}
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>

                        {/* Post Image Skeleton */}
                        <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3"></div>

                        {/* Post Actions Skeleton */}
                        <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center items-center gap-3 mt-4 mb-6">
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
        </motion.section>
    );
};

export default ProfileSkeleton;