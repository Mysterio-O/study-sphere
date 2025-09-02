import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';
import Button from '../atoms/Button';

const COLORS = ['#4285F4', '#34A853', '#EA4335', '#FBBC05', '#8AB4F8', '#6EE7B7', '#FBBF24', '#FCA5A5'];

const StudyCharts = ({ plans }) => {
    const [priorityChartType, setPriorityChartType] = useState('bar'); // 'bar' | 'pie'

    // Count plans by priority
    const priorityData = ['low', 'medium', 'high'].map((level) => ({
        name: level.charAt(0).toUpperCase() + level.slice(1),
        count: plans.filter((p) => p.priority === level).length,
    }));

    // Count completed vs pending
    const completionData = [
        { name: 'Completed', value: plans.filter((p) => p.completed).length },
        { name: 'Pending', value: plans.filter((p) => !p.completed).length },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-6"
        >
            {/* Priority Chart */}
            <div className="bg-[#FFFFFF] dark:bg-[#2D3748] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB]">
                        Plans by Priority
                    </h3>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            text="Bar"
                            variant={priorityChartType === 'bar' ? 'primary' : 'sec_light'}
                            onClick={() => setPriorityChartType('bar')}
                            className="px-3 py-1 text-sm"
                            aria-pressed={priorityChartType === 'bar'}
                        />
                        <Button
                            type="button"
                            text="Pie"
                            variant={priorityChartType === 'pie' ? 'primary' : 'sec_light'}
                            onClick={() => setPriorityChartType('pie')}
                            className="px-3 py-1 text-sm"
                            aria-pressed={priorityChartType === 'pie'}
                        />
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                    {priorityChartType === 'bar' ? (
                        <BarChart data={priorityData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal
                                vertical={false}
                                stroke="#DADCE0"
                                strokeOpacity={0.5}
                            />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#5F6368' }} />
                            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#5F6368' }} />
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
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} isAnimationActive>
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={priorityData}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={({ name, count }) => `${name} (${count})`}
                                labelLine
                                labelStyle={{ fontSize: 12, fill: '#5F6368' }}
                            >
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #DADCE0',
                                    borderRadius: '4px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                                itemStyle={{ color: '#202124' }}
                            />
                            <Legend
                                layout="vertical"
                                verticalAlign="middle"
                                align="right"
                                wrapperStyle={{ fontSize: 12, color: '#5F6368' }}
                            />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </div>
            {/* Completion Chart */}
            <div className="bg-[#FFFFFF] dark:bg-[#2D3748] rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] p-4">
                <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                    Completed vs Pending
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={completionData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, value }) => `${name} (${value})`}
                            labelLine
                            labelStyle={{ fontSize: 12, fill: '#5F6368' }}
                        >
                            {completionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #DADCE0',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                            itemStyle={{ color: '#202124' }}
                        />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{ fontSize: 12, color: '#5F6368' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default StudyCharts;