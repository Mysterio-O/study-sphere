import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import Button from '../atoms/Button';

const TransactionHistory = ({ income, expenses }) => {
    const [showCount, setShowCount] = useState(5);
    const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'income', 'expense'

    // Combine income + expenses
    const allTransactions = [
        ...income.map((item) => ({ ...item, type: 'income' })),
        ...expenses.map((item) => ({ ...item, type: 'expense' })),
    ];

    // Filter + Sort logic
    let filteredTransactions = allTransactions;

    if (sortBy === 'income') {
        filteredTransactions = allTransactions.filter((t) => t.type === 'income');
    } else if (sortBy === 'expense') {
        filteredTransactions = allTransactions.filter((t) => t.type === 'expense');
    }

    if (sortBy === 'date-desc') {
        filteredTransactions = [...allTransactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'date-asc') {
        filteredTransactions = [...allTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    const visibleTransactions = filteredTransactions.slice(0, showCount);
    const hasMore = showCount < filteredTransactions.length;

    const dayColors = {
        Monday: { text: 'text-[#4285F4] dark:text-[#8AB4F8]', bg: 'bg-[#4285F4]/10 dark:bg-[#8AB4F8]/20' },
        Tuesday: { text: 'text-[#34A853] dark:text-[#6EE7B7]', bg: 'bg-[#34A853]/10 dark:bg-[#6EE7B7]/20' },
        Wednesday: { text: 'text-[#FBBC05] dark:text-[#FBBF24]', bg: 'bg-[#FBBC05]/10 dark:bg-[#FBBF24]/20' },
        Thursday: { text: 'text-[#EA4335] dark:text-[#FCA5A5]', bg: 'bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20' },
        Friday: { text: 'text-[#673AB7] dark:text-[#A78BFA]', bg: 'bg-[#673AB7]/10 dark:bg-[#A78BFA]/20' },
        Saturday: { text: 'text-[#F06292] dark:text-[#F472B6]', bg: 'bg-[#F06292]/10 dark:bg-[#F472B6]/20' },
        Sunday: { text: 'text-[#26A69A] dark:text-[#4DB6AC]', bg: 'bg-[#26A69A]/10 dark:bg-[#4DB6AC]/20' },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#F8F9FA] dark:bg-[#2D3748] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] font-roboto"
        >
            <div className="flex items-center justify-between p-4">
                <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Transaction History
                </h3>
                <div className="flex gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="p-2 border border-[#DADCE0] dark:border-[#374151] rounded-md bg-[#F8F9FA] dark:bg-[#2D3748] text-[#202124] dark:text-[#F9FAFB] focus:ring-[#4285F4]"
                        aria-label="Sort transactions"
                    >
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="income">Only Income</option>
                        <option value="expense">Only Expense</option>
                    </select>
                </div>
            </div>
            {filteredTransactions.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-center text-[#5F6368] dark:text-[#D1D5DB]"
                    role="alert"
                    aria-describedby="no-transactions"
                >
                    <p id="no-transactions">No transactions yet. Add income or expenses above!</p>
                </motion.div>
            ) : (
                <ul className="space-y-2 p-4">
                    {visibleTransactions.map((transaction, idx) => {
                        const date = new Date(transaction.date);
                        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                        const dayStyles = dayColors[day] || dayColors.Monday;

                        return (
                            <motion.li
                                key={`${transaction.type}-${idx}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className={`p-3 rounded-md ${dayStyles.bg}`}
                            >
                                <div className="flex items-center gap-2">
                                    {transaction.type === 'income' ? (
                                        <ArrowUpIcon className={`w-5 h-5 ${dayStyles.text}`} />
                                    ) : (
                                        <ArrowDownIcon className={`w-5 h-5 ${dayStyles.text}`} />
                                    )}
                                    <div>
                                        <p className="text-sm text-[#202124] dark:text-[#F9FAFB]">
                                            {transaction.type === 'income'
                                                ? `+ $${transaction.amount.toFixed(2)} from ${transaction.source}`
                                                : `- $${transaction.amount.toFixed(2)} for ${transaction.category}`}
                                        </p>
                                        <p className="text-xs text-[#5F6368] dark:text-[#D1D5DB]">
                                            {transaction.date} ({day})
                                        </p>
                                    </div>
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>
            )}
            {filteredTransactions.length > 5 && (
                <div className="p-4 text-center">
                    <Button
                        type="button"
                        text={hasMore ? 'Show More' : 'Show Less'}
                        variant="sec_light"
                        onClick={() => setShowCount(hasMore ? showCount + 5 : 5)}
                        className="px-4 py-2"
                        aria-label={hasMore ? 'Show more transactions' : 'Show fewer transactions'}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default TransactionHistory;
