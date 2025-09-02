import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import Button from '../atoms/Button';

const QuizDetailsModal = ({ isOpen, onClose, quizzes = [], title = '' }) => {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getType = title.split(' ')[0].toLowerCase();
    // console.log(getType);

    const titleColor = `${getType === 'easy' ? 'bg-[#34A853] dark:bg-[#6EE7B7]'
        : getType === 'medium' ? 'bg-[#FBBC05] dark:bg-[#FBBF24]'
        : getType === 'hard' ? 'bg-[#EA4335] dark:bg-[#FCA5A5]'
        : getType === 'total' ? 'bg-[#4285F4] dark:bg-[#8AB4F8]'
        : ''
    }`

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="quiz-details-title"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/50 dark:bg-black/60"
            />

            {/* Modal Panel */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#F8F9FA] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto p-6"
            >
                <div className={`flex sticky top-0 z-20 ${titleColor} px-4 py-2 rounded-xl items-center justify-between mb-6`}>
                    <div className="flex flex-col">
                        <h2
                            id="quiz-details-title"
                            className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]"
                        >
                            {title || 'Quiz Details'}
                        </h2>
                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                            {quizzes.length} {quizzes.length === 1 ? 'submission' : 'submissions'}
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="sec_light"
                        text="Close"
                        onClick={onClose}
                        aria-label="Close quiz details modal"
                        className="px-4 py-2"
                    />
                </div>

                {quizzes.length === 0 && (
                    <p className="text-base text-[#5F6368] dark:text-[#D1D5DB] text-center">
                        No quizzes found for this selection.
                    </p>
                )}

                <div className="space-y-6">
                    {quizzes.map((quiz, qi) => {
                        const submittedAt = quiz.submittedAt
                            ? new Date(quiz.submittedAt).toLocaleString()
                            : '—';
                        return (
                            <motion.div
                                key={qi}
                                whileHover={{ scale: 1.02 }}
                                className="p-4 rounded-lg bg-[#FFFFFF] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] transition-all duration-200"
                                aria-labelledby={`quiz-${qi}-title`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                                            Topic
                                        </p>
                                        <p
                                            id={`quiz-${qi}-title`}
                                            className="text-base font-medium text-[#202124] dark:text-[#F9FAFB]"
                                        >
                                            {quiz.topic || '—'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                                            Type
                                        </p>
                                        <p className="text-base font-medium text-[#202124] dark:text-[#F9FAFB]">
                                            {quiz.quizType || '—'}
                                        </p>
                                        <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                                            {submittedAt}
                                        </p>
                                    </div>
                                </div>

                                {/* Questions List */}
                                <div className="space-y-4">
                                    {(quiz.questions || []).map((q, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="p-4 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] border border-[#E6E6E6] dark:border-[#374151] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] transition-all duration-200"
                                            aria-describedby={`question-${qi}-${idx}-feedback`}
                                        >
                                            <p className="font-medium text-[#202124] dark:text-[#F9FAFB] mb-2">
                                                {idx + 1}. {q.question}
                                            </p>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                                    <strong>Your Answer:</strong> {q.userAnswer ?? 'No answer'}
                                                </p>
                                                {q.correctAnswer !== undefined && q.correctAnswer !== null && (
                                                    <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                                        <strong>Correct Answer:</strong> {q.correctAnswer}
                                                    </p>
                                                )}
                                                <div className="mt-2">
                                                    {q.isCorrect ? (
                                                        <span
                                                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#34A853]/10 dark:bg-[#6EE7B7]/20 text-[#34A853] dark:text-[#6EE7B7]"
                                                            id={`question-${qi}-${idx}-feedback`}
                                                        >
                                                            Correct
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20 text-[#EA4335] dark:text-[#FCA5A5]"
                                                            id={`question-${qi}-${idx}-feedback`}
                                                        >
                                                            Incorrect
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-6 flex justify-end">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onClose}
                        text="Close"
                        aria-label="Close quiz details modal"
                        className="px-6 py-2"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default QuizDetailsModal;