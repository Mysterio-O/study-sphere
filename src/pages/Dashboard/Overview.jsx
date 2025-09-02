import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ChartBarIcon,ClockIcon } from '@heroicons/react/24/solid';
import QuizOverView from '../../components/Dashboard/QuizOverView';
import QuizDetailsModal from '../../components/Dashboard/QuizDetailsModal';
import ScheduleCard from '../../components/Dashboard/ScheduleCard';
import SubjectDistributionChart from '../../components/Dashboard/SubjectDistributionChart';
import NextClassWidget from '../../components/Dashboard/NextClassWidget';

const Overview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuizType, setSelectedQuizType] = useState(null);
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);

    const { data: myQuizProgression = { byDifficulty: { easy: { solved: 0, correct: 0 }, medium: { solved: 0, correct: 0 }, hard: { solved: 0, correct: 0 } }, quizzes: [] }, isLoading } = useQuery({
        queryKey: ['my-quiz-progress', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-quiz-progression', {
                params: { email: user?.email },
            });
            return res.data;
        },
    });

    const { data: schedules = [] } = useQuery({
        queryKey: ['schedules', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-schedules', {
                params: { email: user?.email },
            });
            return res.data;
        },
    });

    const handleCardCLick = (type) => {
        let filtered = [];
        if (type === 'total') {
            filtered = myQuizProgression.quizzes || [];
        } else {
            filtered = (myQuizProgression?.quizzes || []).filter((quiz) => quiz?.difficulty === type);
        }
        setFilteredQuizzes(filtered);
        setSelectedQuizType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuizType(null);
        setFilteredQuizzes([]);
    };

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center h-screen"
            >
                <p className="text-[#5F6368] dark:text-[#D1D5DB] font-roboto text-base">
                    Loading...
                </p>
            </motion.div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full max-w-7xl mx-auto p-6 font-roboto"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: ScheduleCard and QuizOverView */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                            <ChartBarIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                            Your Schedule Overview
                        </h2>
                        <ScheduleCard schedules={schedules} />
                    </div>
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                            <ChartBarIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                            Your Quiz History
                        </h2>
                        <QuizOverView myQuizProgression={myQuizProgression} onCardClick={handleCardCLick} />
                    </div>
                </div>
                {/* Right Column: NextClassWidget and SubjectDistributionChart */}
                <div className="space-y-6">
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                            <ClockIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                            Upcoming Class
                        </h2>
                        <NextClassWidget schedules={schedules} />
                    </div>
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                            <ChartBarIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                            Subject Distribution
                        </h2>
                        <SubjectDistributionChart schedules={schedules} />
                    </div>
                </div>
            </div>
            <QuizDetailsModal
                isOpen={isModalOpen}
                onClose={closeModal}
                quizzes={filteredQuizzes}
                title={`${selectedQuizType ? selectedQuizType.charAt(0).toUpperCase() + selectedQuizType.slice(1) : ''} Quiz Details`}
            />
        </motion.section>
    );
};

export default Overview;