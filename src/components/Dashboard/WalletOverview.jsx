import React from 'react';
import { motion } from 'motion/react';
import { WalletIcon } from '@heroicons/react/24/solid';

const WalletOverview = ({ wallet }) => {
    const totalIncome = wallet?.income?.reduce((acc, i) => acc + i.amount, 0) || 0;
    const totalExpenses = wallet?.expense?.reduce((acc, e) => acc + e.amount, 0) || 0;
    const balance = wallet?.totalAmount || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] text-center font-roboto"
            aria-labelledby="wallet-overview-title"
        >
            <div className="flex items-center justify-center gap-2 mb-4">
                <WalletIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                <h2 id="wallet-overview-title" className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Wallet Overview
                </h2>
            </div>
            <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-semibold text-[#4285F4] dark:text-[#8AB4F8]"
            >
                Balance: ${balance.toFixed(2)}
            </motion.p>
            <p className="text-base text-[#34A853] dark:text-[#6EE7B7] mt-2">
                Total Income: ${totalIncome.toFixed(2)}
            </p>
            <p className="text-base text-[#EA4335] dark:text-[#FCA5A5] mt-1">
                Total Expenses: ${totalExpenses.toFixed(2)}
            </p>
        </motion.div>
    );
};

export default WalletOverview;