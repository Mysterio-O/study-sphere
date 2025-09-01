import React from 'react';
import { motion } from 'motion/react';

const QuizOverviewCard = ({ solved = 0, correct = 0, type = 'easy' }) => {
    const customColorClass = {
        easy: 'border-[#34A853] dark:border-[#6EE7B7] bg-[#34A853]/10 dark:bg-[#6EE7B7]/20',
        medium: 'border-[#FBBC05] dark:border-[#FBBF24] bg-[#FBBC05]/10 dark:bg-[#FBBF24]/20',
        hard: 'border-[#EA4335] dark:border-[#FCA5A5] bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20',
    };

    const customTextColor = {
        easy: 'text-[#34A853] dark:text-[#6EE7B7]',
        medium: 'text-[#FBBC05] dark:text-[#FBBF24]',
        hard: 'text-[#EA4335] dark:text-[#FCA5A5]',
    };

    const progressPercentage = (solvedCounts, correctCounts) => {
        if (solvedCounts === 0) return 0;
        return ((correctCounts / solvedCounts) * 100).toFixed(2);
    };

    const percentageColor = () => {
        const percentage = progressPercentage(solved, correct);
        if (percentage > 85) {
            return 'text-[#34A853] dark:text-[#6EE7B7]';
        } else if (percentage > 70 && percentage < 85) {
            return 'text-[#4285F4] dark:text-[#8AB4F8]';
        } else if (percentage > 50 && percentage < 70) {
            return 'text-[#FBBC05] dark:text-[#FBBF24]';
        } else {
            return 'text-[#EA4335] dark:text-[#FCA5A5]';
        }
    };

    const percentage = progressPercentage(solved, correct);

    const progressbarColor = `${percentage > 85 ? 'bg-[#34A853] dark:bg-[#6EE7B7]'
        : percentage > 70 && percentage < 85 ? 'bg-[#4285F4] dark:bg-[#8AB4F8]'
        : percentage > 50 && percentage < 70 ? 'bg-[#FBBC05] dark:bg-[#FBBF24]'
        : 'bg-[#EA4335] dark:bg-[#FCA5A5]'
    }`

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`w-full max-w-sm p-6 rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border ${customColorClass[type]} shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] font-roboto transition-all duration-200`}
            aria-label={`${type} quiz progress card`}
        >
            <h3 className={`text-xl font-bold ${customTextColor[type]} text-center mb-4`}>
                {type.toUpperCase()}
            </h3>
            <div className="space-y-4">
                <div>
                    <p className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                        Solved: <span className={customTextColor[type]}>{solved}</span>
                    </p>
                    <p className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                        Correct: <span className={customTextColor[type]}>{correct}</span>
                    </p>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <p className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                            Progress
                        </p>
                        <p className={`text-sm font-bold ${percentageColor()}`}>
                            {percentage}%
                        </p>
                    </div>
                    <div className="w-full bg-[#DADCE0] dark:bg-[#374151] rounded-full h-2.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`h-2.5 rounded-full ${progressbarColor}  ${customTextColor[type]}`}
                            // style={{ width: `${percentage}%` }}
                            aria-describedby="progress-description"
                        ></motion.div>
                    </div>
                    <p id="progress-description" className="sr-only">
                        {type} quiz progress: {percentage}% correct out of {solved} solved
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default QuizOverviewCard;