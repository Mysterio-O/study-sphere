import React, { useState } from 'react';
import { motion } from 'motion/react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import QuizUI from './QuizUI';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/question-generator.json';

const QuestionGenerator = () => {
    const [formData, setFormData] = useState({
        questionType: '',
        difficulty: '',
        topic: '',
        questionNumbers: '',
    });
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    const [showQuiz, setShowQuiz] = useState(false);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Generate questions
    const { mutateAsync: handleGenerateQuestion } = useMutation({
        mutationKey: ['question-generation', user?.email],
        enabled: !!user?.email,
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/question-generator?email=${user?.email}`, { data });
            return res.data;
        },
        onSuccess: (data) => {
            const questions = parseAIResponse(data.raw, data.questionType);
            setGeneratedQuestions(questions);
            setShowQuiz(true);
        },
        onError: (error) => console.error('Error generating questions', error),
    });

    // Verify short-answer via AI
    const { mutateAsync: verifyAnswer } = useMutation({
        mutationKey: ['verify-answer', user?.email],
        enabled: !!user?.email,
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/verify-answers?email=${user?.email}`, { data });
            return res.data;
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleGenerateQuestion(formData);
    };

    const handleQuizSubmit = async (userAnswers) => {
        try {
            if (formData.questionType === 'short-answer') {
                const verificationData = generatedQuestions.map((q, i) => ({
                    question: q.question,
                    userAnswer: userAnswers[i] || '',
                }));

                const { results } = await verifyAnswer(verificationData);

                // Map AI results to questions
                const updatedQuestions = results.map((q, i) => ({
                    ...q,
                    userAnswer: userAnswers[i] || '',
                    isCorrect: q.isCorrect,
                    correctAnswer: q.correctAnswer || q.answer, // fallback if AI missed correctAnswer
                }));

                setGeneratedQuestions(updatedQuestions);
            } else if (formData.questionType === 'quiz' || formData.questionType === 'true-false') {
                const results = generatedQuestions.map((q, i) => {
                    const userAnswer = userAnswers[i]?.toString().trim();

                    let correctAnswerText = q.correctAnswer || q.answer; // for quiz, q.answer is letter e.g., 'A'
                    if (q.options && /^[A-D]$/i.test(correctAnswerText)) {
                        // Convert letter to actual option text
                        const index = correctAnswerText.toUpperCase().charCodeAt(0) - 65; // 'A' -> 0
                        correctAnswerText = q.options[index];
                    }

                    return {
                        ...q,
                        userAnswer,
                        correctAnswer: correctAnswerText,
                        isCorrect: userAnswer?.toLowerCase() === correctAnswerText?.toLowerCase(),
                    };
                });

                setGeneratedQuestions(results);
            }

            setShowQuiz(true);
        } catch (error) {
            console.error('Error verifying answers:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 gap-6"
        >
            <div className="w-full max-w-md">
                <LottieAnimation
                    animationData={animation}
                    className="w-full h-64 md:h-80"
                />
            </div>
            {!showQuiz ? (
                <div className="w-full max-w-lg bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto">
                    <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6 text-center">
                        Question Generator
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                                Question Type
                            </label>
                            <select
                                name="questionType"
                                value={formData.questionType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] roboto text-base transition-all duration-200"
                                aria-label="Select question type"
                            >
                                <option value="">Select a type</option>
                                <option value="quiz">Quiz / MCQs</option>
                                <option value="short-answer">Short Answers</option>
                                <option value="true-false">True / False</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                                Difficulty Level
                            </label>
                            <select
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] roboto text-base transition-all duration-200"
                                aria-label="Select difficulty level"
                            >
                                <option value="">Select difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                                Number of Questions
                            </label>
                            <Input
                                type="number"
                                name="questionNumbers"
                                value={formData.questionNumbers}
                                onChange={handleChange}
                                placeholder="Enter number of questions"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
                                Topic / Subject
                            </label>
                            <Input
                                type="text"
                                name="topic"
                                value={formData.topic}
                                onChange={handleChange}
                                placeholder="Enter a topic"
                            />
                        </div>

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                text="Generate Questions"
                                variant="primary"
                                className="w-full"
                                aria-label="Generate questions"
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="w-full max-w-2xl">
                    <QuizUI
                        questions={generatedQuestions}
                        questionType={formData.questionType}
                        onSubmit={handleQuizSubmit}
                        onGenerateAnother={() => {
                            setGeneratedQuestions([]);
                            setShowQuiz(false);
                            setFormData({
                                questionType: '',
                                difficulty: '',
                                topic: '',
                                questionNumbers: '',
                            });
                        }}
                    />
                </div>
            )}
        </motion.div>
    );
};

// Parse AI response (unchanged)
function parseAIResponse(rawText, type) {
    const lines = rawText.split('\n').filter(Boolean);
    const questions = [];

    if (type === 'true-false') {
        lines.forEach((line, idx) => {
            if (line.startsWith('Question:')) {
                const question = line.replace('Question:', '').trim();
                const answer = lines[idx + 1]?.replace('Answer:', '').trim();
                questions.push({ question, answer });
            }
        });
    } else if (type === 'quiz') {
        let i = 0;
        while (i < lines.length) {
            if (lines[i].startsWith('Question:')) {
                const question = lines[i].replace('Question:', '').trim();
                const optionsLine = lines[i + 1]?.replace('Options:', '').trim();
                const answerLine = lines[i + 2]?.replace('Answer:', '').trim();
                const options = optionsLine.split(/A\)|B\)|C\)|D\)/).filter(Boolean).map((o) => o.trim());
                questions.push({ question, options, answer: answerLine });
                i += 3;
            } else i++;
        }
    } else if (type === 'short-answer') {
        lines.forEach((line, idx) => {
            if (line.startsWith('Question:')) {
                const question = line.replace('Question:', '').trim();
                const answer = lines[idx + 1]?.replace('Answer:', '').trim();
                questions.push({ question, answer });
            }
        });
    }

    return questions;
}

export default QuestionGenerator;