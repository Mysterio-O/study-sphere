import React from 'react';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import QuizOverView from './QuizOverView';
import { ChartBarIcon } from '@heroicons/react/24/solid';

const Overview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myQuizProgression = { byDifficulty: { easy: { solved: 0, correct: 0 }, medium: { solved: 0, correct: 0 }, hard: { solved: 0, correct: 0 } } }, isLoading } = useQuery({
        queryKey: ['my-quiz-progress', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-quiz-progression', {
                params: { email: user?.email },
            });
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-[#5F6368] dark:text-[#D1D5DB] font-roboto text-base">
                    Loading...
                </p>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto"
        >
            <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                Your Quiz History
            </h2>
            <QuizOverView difficulties={myQuizProgression.byDifficulty} />
        </motion.section>
    );
};

export default Overview;