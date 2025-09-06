import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import Button from '../atoms/Button';

const COLORS = ['#34A853', '#EA4335']; // green = correct, red = incorrect

const QuizProgressionCharts = ({ myQuizProgression }) => {
    const [chartType, setChartType] = useState('bar'); // 'bar' | 'stacked'

    if (!myQuizProgression) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[#5F6368] dark:text-[#D1D5DB] py-8 font-roboto"
                role="alert"
                aria-describedby="no-data"
            >
                <p id="no-data">No quiz data available.</p>
            </motion.div>
        );
    }

    // Prepare difficulty-wise data
    const difficultyData = [
        {
            name: 'Easy',
            solved: myQuizProgression?.byDifficulty?.easy?.solved || 0,
            correct: myQuizProgression?.byDifficulty?.easy?.correct || 0,
        },
        {
            name: 'Medium',
            solved: myQuizProgression?.byDifficulty?.medium?.solved || 0,
            correct: myQuizProgression?.byDifficulty?.medium?.correct || 0,
        },
        {
            name: 'Hard',
            solved: myQuizProgression?.byDifficulty?.hard?.solved || 0,
            correct: myQuizProgression?.byDifficulty?.hard?.correct || 0,
        },
    ];

    // Prepare overall pie chart data
    const totalSolved = myQuizProgression?.totalQuestionSolved || 0;
    const totalCorrect = myQuizProgression?.totalCorrectAnswers || 0;
    const totalIncorrect = totalSolved - totalCorrect;

    const pieData = [
        { name: 'Correct', value: totalCorrect },
        { name: 'Incorrect', value: totalIncorrect },
    ];

    // Custom tooltip for pie chart with percentage
    const renderPieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const total = totalSolved || 1; // Avoid division by zero
            const percentage = ((data.value / total) * 100).toFixed(1);
            return (
                <div className="bg-[#FFFFFF] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] rounded-md p-2 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    <p className="text-[#202124] dark:text-[#F9FAFB]">{`${data.name}: ${data.value} (${percentage}%)`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-roboto"
        >
            {/* Bar Chart: Performance by Difficulty */}
            <div className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] flex items-center gap-2">
                        <ChartBarIcon className="w-5 h-5 text-[#4285F4] dark:text-[#8AB4F8]" />
                        Performance by Difficulty
                    </h3>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            text="Bar"
                            variant={chartType === 'bar' ? 'primary' : 'sec_light'}
                            onClick={() => setChartType('bar')}
                            className="px-3 py-1 text-sm"
                            aria-pressed={chartType === 'bar'}
                        />
                        <Button
                            type="button"
                            text="Stacked"
                            variant={chartType === 'stacked' ? 'primary' : 'sec_light'}
                            onClick={() => setChartType('stacked')}
                            className="px-3 py-1 text-sm"
                            aria-pressed={chartType === 'stacked'}
                        />
                    </div>
                </div>
                {difficultyData.every((data) => data.solved === 0 && data.correct === 0) ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-[#5F6368] dark:text-[#D1D5DB] py-8"
                        role="alert"
                        aria-describedby="no-difficulty-data"
                    >
                        <p id="no-difficulty-data">No quiz performance data available.</p>
                    </motion.div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={difficultyData}
                            margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal
                                vertical={false}
                                stroke="#DADCE0"
                                strokeOpacity={0.5}
                            />
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 12, fill: '#5F6368' }}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: '#5F6368' }}
                                allowDecimals={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #DADCE0',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                                itemStyle={{ color: '#202124' }}
                            />
                            <Legend wrapperStyle={{ fontSize: 12, color: '#5F6368' }} />
                            <Bar
                                dataKey="solved"
                                fill="#4285F4"
                                name="Solved"
                                radius={chartType === 'bar' ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                                stackId={chartType === 'stacked' ? 'a' : null}
                            />
                            <Bar
                                dataKey="correct"
                                fill="#34A853"
                                name="Correct"
                                radius={chartType === 'bar' ? [6, 6, 0, 0] : [6, 6, 0, 0]}
                                stackId={chartType === 'stacked' ? 'a' : null}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Pie Chart: Overall Accuracy */}
            <div className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-[#4285F4] dark:text-[#8AB4F8]" />
                    Overall Accuracy
                </h3>
                {pieData.every((entry) => entry.value === 0) ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-[#5F6368] dark:text-[#D1D5DB] py-8"
                        role="alert"
                        aria-describedby="no-accuracy-data"
                    >
                        <p id="no-accuracy-data">No accuracy data available.</p>
                    </motion.div>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label={({ name, value }) => `${name}: ${value}`}
                                labelLine
                                labelStyle={{ fontSize: 12, fill: '#5F6368' }}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={renderPieTooltip} />
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                wrapperStyle={{ fontSize: 12, color: '#5F6368' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </motion.div>
    );
};

export default QuizProgressionCharts;