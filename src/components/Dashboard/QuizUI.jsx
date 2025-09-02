import React, { useState } from 'react';
import { motion } from 'motion/react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const QuizUI = ({ questions, questionType, onSubmit, onGenerateAnother }) => {
    // State to store user answers, indexed by question number
    const [answers, setAnswers] = useState({});

    // State to track whether the quiz has been submitted or not
    const [submitted, setSubmitted] = useState(false);

    // State to manage loading status during answer submission
    const [loadingState, setLoadingState] = useState(false);

    // Handler for answer changes, updating answers state
    const handleChange = (index, value) => {
        setAnswers((prev) => ({ ...prev, [index]: value }));
    };

    // Handler for quiz submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingState(true);
        setSubmitted(true);
        onSubmit(answers, setLoadingState);
    };
    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            className="space-y-6 w-full roboto"
        >
            <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6 text-center">
                Quiz
            </h2>
            {/* Render each question dynamically */}
            {questions.map((q, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                >
                    {/* Display question text */}
                    <p className="font-medium text-[#202124] dark:text-[#F9FAFB] mb-2">
                        {q.question}
                    </p>

                    {/* Render input based on question type or results if submitted */}
                    {!submitted ? (
                        questionType === 'true-false' ? (
                            // True/False question input
                            <select
                                value={answers[i] || ''}
                                onChange={(e) => handleChange(i, e.target.value)}
                                className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] roboto text-base transition-all duration-200"
                                aria-label={`Answer for question ${i + 1}`}
                            >
                                <option value="">Select</option>
                                <option value="True">True</option>
                                <option value="False">False</option>
                            </select>
                        ) : questionType === 'quiz' ? (
                            // Multiple-choice question input
                            <div className="space-y-2">
                                {q.options?.map((opt, j) => (
                                    <label key={j} className="flex items-center gap-2 text-[#202124] dark:text-[#F9FAFB]">
                                        <input
                                            type="radio"
                                            name={`q-${i}`}
                                            value={opt}
                                            checked={answers[i] === opt}
                                            onChange={() => handleChange(i, opt)}
                                            className="text-[#4285F4] focus:ring-[#4285F4] dark:text-[#8AB4F8] dark:focus:ring-[#8AB4F8]"
                                            aria-label={`Option ${opt} for question ${i + 1}`}
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        ) : (
                            // Short-answer question input
                            <Input
                                type="text"
                                value={answers[i] || ''}
                                placeholder="Type your answer"
                                onChange={(e) => handleChange(i, e.target.value)}
                                aria-label={`Answer for question ${i + 1}`}
                            />
                        )
                    ) : (
                        // Display results after submission
                        <div
                            className={`p-3 rounded-md ${q.isCorrect ? 'bg-[#34A853]/10 dark:bg-[#6EE7B7]/20' : 'bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20'}`}
                            aria-describedby={`feedback-${i}`}
                        >
                            <p className="text-[#202124] dark:text-[#F9FAFB]">
                                <strong>Your answer:</strong> {q.userAnswer || 'No answer'}
                            </p>
                            {!q.isCorrect && q.correctAnswer && (
                                <p className="text-[#202124] dark:text-[#F9FAFB]">
                                    <strong>Correct answer:</strong> {q.correctAnswer}
                                </p>
                            )}
                        </div>
                    )}
                </motion.div>
            ))}

            {/* Render submit or generate another button based on submission state */}
            <div className="flex justify-center">
                {!submitted ? (
                    <Button
                        type="submit"
                        text="Submit Answers"
                        variant="primary"
                        className="w-full max-w-xs"
                        aria-label="Submit quiz answers"
                        loading={loadingState}
                        disabled={loadingState}
                    />
                ) : (
                    <Button
                        type="button"
                        text="Generate Another"
                        variant="sec_light"
                        className="w-full max-w-xs"
                        onClick={onGenerateAnother}
                        aria-label="Generate another quiz"
                    />
                )}
            </div>

            {/* Display score summary after submission */}
            {submitted && questions.some((q) => q.isCorrect !== undefined) && (
                <p className="mt-4 text-center font-bold text-[#202124] dark:text-[#F9FAFB]">
                    You got {questions.filter((r) => r.isCorrect).length} out of {questions.length} correct!
                </p>
            )}
        </motion.form>
    );
};

export default QuizUI;