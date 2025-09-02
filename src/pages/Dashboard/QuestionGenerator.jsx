import React, { useState } from 'react';
import { motion } from 'motion/react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/question-generator.json';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import QuizUI from '../../components/Dashboard/QuizUI';

const QuestionGenerator = () => {
    // State to manage form inputs: question type, difficulty, topic, and number of questions
    const [formData, setFormData] = useState({
        questionType: '',
        difficulty: '',
        topic: '',
        questionNumbers: '',
    });

    const navigate = useNavigate();


    // State to store generated questions from the API
    const [generatedQuestions, setGeneratedQuestions] = useState([]);


    // State to toggle between form and quiz UI
    const [showQuiz, setShowQuiz] = useState(false);

    // State to manage loading status during question generation
    const [loading, setLoading] = useState(false);

    // Custom hook to access authenticated user data
    const { user } = useAuth();

    // Custom hook to provide secure Axios instance for API requests with accessToken
    const axiosSecure = useAxiosSecure();

    // Mutation to generate questions via API
    const { mutateAsync: handleGenerateQuestion } = useMutation({
        // Unique key for the mutation, tied to user email
        mutationKey: ['question-generation', user?.email],
        // Enable mutation only if user email exists
        enabled: !!user?.email,
        // Function to send question generation request to the server
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/question-generator?email=${user?.email}`, { data });
            return res.data;
        },
        // On successful response, parse questions and update state
        onSuccess: (data) => {
            const questions = parseAIResponse(data.raw, data.questionType);
            setGeneratedQuestions(questions);
            setLoading(false);
            setShowQuiz(true);
        },
        // Log errors and reset loading state on failure
        onError: (error) => {
            console.error('Error generating questions', error);
            setLoading(false);
        }
    });

    // Mutation to verify short-answer responses via AI
    const { mutateAsync: verifyAnswer } = useMutation({
        // Unique key for answer verification mutation
        mutationKey: ['verify-answer', user?.email],
        // Enable mutation only if user email exists
        enabled: !!user?.email,
        // Function to send answer verification request to the server
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/verify-answers?email=${user?.email}`, { data });
            return res.data;
        },
    });

    // Mutation to save quiz progress to the server
    const { mutateAsync: saveProgress } = useMutation({
        // Unique key for saving quiz progress
        mutationKey: ['save-quiz-progress', user?.email],
        // Enable mutation only if user email exists
        enabled: !!user?.email,
        // Function to send quiz progress data to the server
        mutationFn: async (payload) => {
            const res = await axiosSecure.post(
                `/save-quiz-progress`,
                payload,
                { params: { email: user?.email } }
            );
            return res.data;
        },
        onSuccess: () => {
            // showing success with sweet alert2
            Swal.fire({
                icon: 'success',
                title: 'Progress Saved',
                text: 'Welcome back!',
                confirmButtonText: "Visit Overview",
                showCancelButton: true,
                cancelButtonText: 'Stay Here',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            }).then((result)=> {
                if(result.isConfirmed){
                    // navigating to overview
                    navigate('/dashboard')
                }
            })
        },
        onError: (error) => {
            console.error('error updating quiz progress', error);
            // showing error with sweet alert2
            Swal.fire({
                title: 'Update Failed',
                text: 'Failed to update quiz progress for' + ' ' + error?.message || 'Failed to update quiz progress',
                icon: 'error',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    // Handler for form input changes, updating formData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handler for form submission to generate questions
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        handleGenerateQuestion(formData);
    };

    // Handler for quiz submission, processes answers based on question type
    const handleQuizSubmit = async (userAnswers, setLoadingState) => {
        try {
            if (formData.questionType === 'short-answer') {
                // Prepare data for AI verification of short answers
                const verificationData = generatedQuestions.map((q, i) => ({
                    question: q.question,
                    userAnswer: userAnswers[i] || '',
                }));

                // Verify answers via API
                const { results } = await verifyAnswer(verificationData);

                // Map AI verification results to include scoring and UI data
                const scored = results.map((q, i) => ({
                    ...q,
                    question: generatedQuestions[i]?.question || q.question,
                    options: generatedQuestions[i]?.options,
                    userAnswer: userAnswers[i] || '',
                    correctAnswer: q.correctAnswer || q.answer || '',
                    isCorrect: !!q.isCorrect,
                }));

                // Update UI with scored results
                setGeneratedQuestions(scored);
                setShowQuiz(true);

                // Prepare payload for saving progress
                const payload = {
                    quizType: formData.questionType,
                    topic: formData.topic,
                    difficulty: formData.difficulty,
                    questions: scored.map(q => ({
                        question: q.question,
                        options: q.options,
                        userAnswer: q.userAnswer || '',
                        correctAnswer: q.correctAnswer || q.answer || '',
                        isCorrect: !!q.isCorrect,
                    })),
                };

                // Save quiz progress to the server
                try {
                    await saveProgress(payload);
                } catch (e) {
                    console.error('Save progress failed:', e);
                }

                setLoadingState(false);
                
            } else if (formData.questionType === 'quiz' || formData.questionType === 'true-false') {
                // Local scoring for MCQ and true/false questions
                const results = generatedQuestions.map((q, i) => {
                    const userAnswer = (userAnswers[i]?.toString() || '').trim();
                    let correctAnswerText = q.correctAnswer || q.answer;

                    // Convert MCQ answer (e.g., 'A') to option text if applicable
                    if (q.options && /^[A-D]$/i.test(correctAnswerText)) {
                        const index = correctAnswerText.toUpperCase().charCodeAt(0) - 65;
                        correctAnswerText = q.options[index];
                    }

                    return {
                        ...q,
                        userAnswer,
                        correctAnswer: correctAnswerText,
                        isCorrect: userAnswer?.toLowerCase() === correctAnswerText?.toLowerCase(),
                    };
                });

                // Update UI with scored results
                setGeneratedQuestions(results);
                setShowQuiz(true);

                // Prepare payload for saving progress
                const payload = {
                    quizType: formData.questionType,
                    topic: formData.topic,
                    difficulty: formData.difficulty,
                    questions: results.map(q => ({
                        question: q.question,
                        options: q.options,
                        userAnswer: q.userAnswer || '',
                        correctAnswer: q.correctAnswer || q.answer || '',
                        isCorrect: !!q.isCorrect,
                    })),
                };

                // Save quiz progress to the server
                try {
                    await saveProgress(payload);
                } catch (e) {
                    console.error('Save progress failed:', e);
                }

                setLoadingState(false);
            }
        } catch (error) {
            console.error('Error verifying answers:', error);
            setLoadingState(false);
        }
    };

    // Render the question generator form or quiz UI based on state
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row items-center justify-center min-h-screen px-4 gap-6"
        >
            {/* Lottie animation for visual appeal */}
            <div className="w-full max-w-md">
                <LottieAnimation
                    animationData={animation}
                    className="w-full h-64 md:h-80"
                />
            </div>
            {!showQuiz ? (
                // Form for generating questions
                <div className="w-full max-w-lg bg-[#FFFFFF] dark:bg-[#1F2937] p-6 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto">
                    <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6 text-center">
                        Question Generator
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Question Type Selection */}
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

                        {/* Difficulty Level Selection */}
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

                        {/* Number of Questions Input */}
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

                        {/* Topic Input */}
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

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                text="Generate Questions"
                                variant="primary"
                                className="w-full"
                                aria-label="Generate questions"
                                loading={loading}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            ) : (
                // Render Quiz UI when questions are generated
                <div className="w-full max-w-2xl">
                    <QuizUI
                        questions={generatedQuestions}
                        questionType={formData.questionType}
                        onSubmit={handleQuizSubmit}
                        onGenerateAnother={() => {
                            // Reset state to allow generating a new quiz
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

// Utility function to parse raw AI response into structured question data
function parseAIResponse(rawText, type) {
    // Split raw text into lines and filter out empty ones
    const lines = rawText.split('\n').filter(Boolean);
    const questions = [];

    // Parse true/false questions
    if (type === 'true-false') {
        lines.forEach((line, idx) => {
            if (line.startsWith('Question:')) {
                const question = line.replace('Question:', '').trim();
                const answer = lines[idx + 1]?.replace('Answer:', '').trim();
                questions.push({ question, answer });
            }
        });
    }
    // Parse multiple-choice questions
    else if (type === 'quiz') {
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
    }
    // Parse short-answer questions
    else if (type === 'short-answer') {
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