import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ChartBarIcon } from '@heroicons/react/24/solid';
import {
    ResponsiveContainer,
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
} from 'recharts';
import Button from '../atoms/Button';

const COLORS = [
    '#4285F4', // Monday
    '#34A853', // Tuesday
    '#FBBC05', // Wednesday
    '#EA4335', // Thursday
    '#673AB7', // Friday
    '#F06292', // Saturday
    '#26A69A', // Sunday
    '#8AB4F8',
    '#6EE7B7',
    '#FBBF24',
    '#FCA5A5',
];

const EmptyState = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full rounded-lg p-6 bg-[#F8F9FA] dark:bg-[#2D3748] text-center border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] font-roboto"
        role="alert"
        aria-describedby="empty-state-message"
    >
        <p id="empty-state-message" className="text-base text-[#5F6368] dark:text-[#D1D5DB]">
            {children}
        </p>
    </motion.div>
);

const SubjectDistributionChart = ({ schedules = [], height = 280 }) => {
    // Defensive: accept either array or object with schedules array
    const arr = Array.isArray(schedules) ? schedules : schedules?.schedules ?? [];

    // Build aggregated counts per subject (case-insensitive trimmed)
    const data = useMemo(() => {
        const map = new Map();
        arr.forEach((s) => {
            const raw = (s && (s.subjectName ?? s.subject)) || 'Unknown';
            const name = String(raw).trim();
            if (!name) return;
            const key = name; // Keep original case for display
            map.set(key, (map.get(key) || 0) + 1);
        });

        const arrData = Array.from(map.entries()).map(([subject, count]) => ({ subject, count }));

        // Sort descending by count
        arrData.sort((a, b) => b.count - a.count);
        return arrData;
    }, [arr]);

    const [chartType, setChartType] = useState('bar'); // 'bar' | 'pie'

    if (!arr.length) {
        return <EmptyState>No schedule data available to render chart.</EmptyState>;
    }

    if (!data.length) {
        return <EmptyState>No subjects found in your schedules.</EmptyState>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full bg-[#FFFFFF] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] font-roboto"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <ChartBarIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                    <div>
                        <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB]">
                            Subject Distribution
                        </h3>
                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                            Classes per subject (count)
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        text="Bar"
                        variant={chartType === 'bar' ? 'primary' : 'sec_light'}
                        onClick={() => setChartType('bar')}
                        className="px-4 py-1 text-sm"
                        aria-pressed={chartType === 'bar'}
                    />
                    <Button
                        type="button"
                        text="Pie"
                        variant={chartType === 'pie' ? 'primary' : 'sec_light'}
                        onClick={() => setChartType('pie')}
                        className="px-4 py-1 text-sm"
                        aria-pressed={chartType === 'pie'}
                    />
                </div>
            </div>

            <div style={{ width: '100%', height }}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                        <BarChart
                            data={data}
                            margin={{ top: 8, right: 16, left: 0, bottom: 16 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal
                                vertical={false}
                                stroke="#DADCE0"
                                strokeOpacity={0.5}
                            />
                            <XAxis
                                dataKey="subject"
                                tick={{ fontSize: 12, fill: '#5F6368' }}
                                height={60}
                                interval={0}
                                angle={-30}
                                textAnchor="end"
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12, fill: '#5F6368' }}
                            />
                            <Tooltip
                                formatter={(value) => [value, 'Classes']}
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
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="count"
                                nameKey="subject"
                                cx="50%"
                                cy="50%"
                                outerRadius={Math.min(120, height / 2 - 10)}
                                label={({ subject, count }) => `${subject} (${count})`}
                                labelLine
                                labelStyle={{ fontSize: 12, fill: '#5F6368' }}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => [value, 'Classes']}
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

            <div className="mt-4 text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                Showing {data.length} subjects. Total classes: {arr.length}
            </div>
        </motion.div>
    );
};

export default SubjectDistributionChart;