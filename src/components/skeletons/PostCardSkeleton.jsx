import React from 'react';
import { motion } from 'motion/react';

const PostCardSkeleton = ({ count = 5 }) => {
    return (
        <div className="py-28">
            <div className="px-10 flex flex-col gap-6">
                {Array.from({ length: count }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6 relative overflow-hidden"
                    >
                        {/* Shimmer effect overlay */}
                        <div className="shimmer-overlay absolute inset-0 transform -translate-x-full animate-shimmer">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent"></div>
                        </div>

                        {/* Top Row: Author + Menu Skeleton */}
                        <div className="flex justify-between items-start mb-4">
                            {/* Author Info Skeleton */}
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                                <div className="ml-3 space-y-2">
                                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                                    <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                                </div>
                            </div>

                            {/* 3 Dots Menu Skeleton */}
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                        </div>

                        {/* Text Content Skeleton - Variable lengths for more realism */}
                        <div className="mb-3 space-y-2">
                            <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            <div className="h-4 w-3/6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                        </div>

                        {/* Image Skeleton - Only shown for some posts for variety */}
                        {index % 3 !== 0 && (
                            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-3 animate-pulse"></div>
                        )}

                        {/* Actions Skeleton */}
                        <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-3">
                            <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center items-center gap-3 mt-4">
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
            </div>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
        </div>
    );
};

export default PostCardSkeleton;