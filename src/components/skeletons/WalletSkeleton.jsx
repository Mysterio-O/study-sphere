import React from 'react';
import { motion } from 'motion/react';

const WalletSkeleton = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-6 font-roboto"
        >
            {/* Header Skeleton */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                <div className="h-7 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Overview and Forms */}
                <div className="space-y-6">
                    {/* Wallet Overview Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="h-7 w-40 bg-gray-300 dark:bg-gray-600 rounded-md mb-4 animate-pulse"></div>
                        <div className="bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                            <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md mb-3 animate-pulse"></div>
                            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md mb-2 animate-pulse mx-auto"></div>
                            <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse mx-auto"></div>
                        </div>
                    </div>

                    {/* Add Income Form Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="h-7 w-32 bg-gray-300 dark:bg-gray-600 rounded-md mb-4 animate-pulse"></div>
                        <div className="bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                                <div className="h-6 w-28 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="space-y-2">
                                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                    <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                </div>
                            ))}
                            <div className="flex gap-4 mt-4">
                                <div className="h-10 flex-1 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                <div className="h-10 flex-1 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Add Expense Form Skeleton */}
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="h-7 w-36 bg-gray-300 dark:bg-gray-600 rounded-md mb-4 animate-pulse"></div>
                        <div className="bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                                <div className="h-6 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="space-y-2">
                                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                    <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                </div>
                            ))}
                            <div className="flex gap-4 mt-4">
                                <div className="h-10 flex-1 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                <div className="h-10 flex-1 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Transaction History Skeleton */}
                <div className="md:col-span-2">
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <div className="h-7 w-48 bg-gray-300 dark:bg-gray-600 rounded-md mb-4 animate-pulse"></div>
                        <div className="bg-[#F8F9FA] dark:bg-[#2D3748] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                            <div className="flex items-center justify-between p-4">
                                <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                                <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>
                            </div>

                            <div className="p-4 space-y-3">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="flex items-center p-3 rounded-md bg-gray-200 dark:bg-gray-700 animate-pulse">
                                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></div>
                                        <div className="flex-1">
                                            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md mb-2"></div>
                                            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 text-center">
                                <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse inline-block"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default WalletSkeleton;