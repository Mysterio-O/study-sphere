import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { WalletIcon, ArrowUpIcon, ArrowDownIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '../atoms/Button';

const COLORS = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#673AB7', '#F06292', '#26A69A', '#8AB4F8', '#6EE7B7', '#FBBF24', '#FCA5A5'];

const WalletCharts = ({ wallet }) => {
    const { income = [], expense = [] } = wallet;
    const [monthlyChartType, setMonthlyChartType] = useState('line'); // 'line' | 'bar'

    // Monthly Income vs Expenses
    const monthlyData = useMemo(() => {
        const months = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, income: 0, expense: 0 }));
        income.forEach((item) => {
            const date = new Date(item.date);
            months[date.getMonth()].income += item.amount;
        });
        expense.forEach((item) => {
            const date = new Date(item.date);
            months[date.getMonth()].expense += item.amount;
        });
        return months;
    }, [income, expense]);

    // Expense by Category
    const expenseByCategory = useMemo(() => {
        const catMap = {};
        expense.forEach((item) => {
            if (!catMap[item.category]) catMap[item.category] = 0;
            catMap[item.category] += item.amount;
        });
        return Object.entries(catMap).map(([name, value]) => ({ name, value }));
    }, [expense]);

    // Income by Source
    const incomeBySource = useMemo(() => {
        const srcMap = {};
        income.forEach((item) => {
            if (!srcMap[item.source]) srcMap[item.source] = 0;
            srcMap[item.source] += item.amount;
        });
        return Object.entries(srcMap).map(([name, value]) => ({ name, value }));
    }, [income]);

    const totalIncome = income.reduce((acc, item) => acc + item.amount, 0);
    const totalExpense = expense.reduce((acc, item) => acc + item.amount, 0);
    let currentBalance = 0;
    let balanceWarning = ''
    if (totalIncome > totalExpense) {
        currentBalance = totalIncome - totalExpense;
    } else {
        const dueAmount = totalIncome - totalExpense;
        // console.log(dueAmount);
        balanceWarning = dueAmount;
    }

    // console.log('You are on a loan of' + '' + totalIncome - totalExpense);


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-6 font-roboto"
        >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] flex items-center gap-3"
                >
                    <ArrowUpIcon className="w-6 h-6 text-[#34A853] dark:text-[#6EE7B7]" />
                    <div>
                        <h3 className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">Total Income</h3>
                        <p className="text-xl font-bold text-[#34A853] dark:text-[#6EE7B7]">${totalIncome.toFixed(2)}</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] flex items-center gap-3"
                >
                    <ArrowDownIcon className="w-6 h-6 text-[#EA4335] dark:text-[#FCA5A5]" />
                    <div>
                        <h3 className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">Total Expenses</h3>
                        <p className="text-xl font-bold text-[#EA4335] dark:text-[#FCA5A5]">${totalExpense.toFixed(2)}</p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] flex items-center gap-3"
                >
                    <ArrowRightIcon className={`w-6 h-6 ${currentBalance ? 'text-[#4285F4] dark:text-[#8AB4F8]' : 'text-[#F9AB00] dark:text-[#D97706]'}`} />
                    <div>
                        <h3 className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">{currentBalance ? 'Balance Left' : 'Due Balance'}</h3>
                        <p className={`text-xl font-bold ${currentBalance ? 'text-[#4285F4] dark:text-[#8AB4F8]' : 'text-[#F9AB00] dark:text-[#D97706]'}`}>${currentBalance ? currentBalance.toFixed(2) : balanceWarning}</p>
                    </div>
                </motion.div>
            </div>

            {/* Monthly Income vs Expenses */}
            <div className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] flex items-center gap-2">
                        <WalletIcon className="w-5 h-5 text-[#4285F4] dark:text-[#8AB4F8]" />
                        Monthly Income vs Expenses
                    </h3>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            text="Line"
                            variant={monthlyChartType === 'line' ? 'primary' : 'sec_light'}
                            onClick={() => setMonthlyChartType('line')}
                            className="px-3 py-1 text-sm"
                            aria-pressed={monthlyChartType === 'line'}
                        />
                        <Button
                            type="button"
                            text="Bar"
                            variant={monthlyChartType === 'bar' ? 'primary' : 'sec_light'}
                            onClick={() => setMonthlyChartType('bar')}
                            className="px-3 py-1 text-sm"
                            aria-pressed={monthlyChartType === 'bar'}
                        />
                    </div>
                </div>
                {monthlyData.every((data) => data.income === 0 && data.expense === 0) ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-[#5F6368] dark:text-[#D1D5DB] py-8"
                        role="alert"
                        aria-describedby="no-monthly-data"
                    >
                        <p id="no-monthly-data">No income or expense data available.</p>
                    </motion.div>
                ) : (
                    <ResponsiveContainer width="100%" height={250}>
                        {monthlyChartType === 'line' ? (
                            <LineChart data={monthlyData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal
                                    vertical={false}
                                    stroke="#DADCE0"
                                    strokeOpacity={0.5}
                                />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(m) => `M${m}`}
                                    tick={{ fontSize: 12, fill: '#5F6368' }}
                                />
                                <YAxis tick={{ fontSize: 12, fill: '#5F6368' }} />
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
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#34A853"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#EA4335"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        ) : (
                            <BarChart data={monthlyData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    horizontal
                                    vertical={false}
                                    stroke="#DADCE0"
                                    strokeOpacity={0.5}
                                />
                                <XAxis
                                    dataKey="month"
                                    tickFormatter={(m) => `M${m}`}
                                    tick={{ fontSize: 12, fill: '#5F6368' }}
                                />
                                <YAxis tick={{ fontSize: 12, fill: '#5F6368' }} />
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
                                <Bar dataKey="income" fill="#34A853" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="expense" fill="#EA4335" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                )}
            </div>

            {/* Expense by Category and Income by Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expense by Category */}
                <div className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                    <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                        <ArrowDownIcon className="w-5 h-5 text-[#EA4335] dark:text-[#FCA5A5]" />
                        Expenses by Category
                    </h3>
                    {expenseByCategory.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-[#5F6368] dark:text-[#D1D5DB] py-8"
                            role="alert"
                            aria-describedby="no-expense-data"
                        >
                            <p id="no-expense-data">No expense data available.</p>
                        </motion.div>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={expenseByCategory}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, value }) => `${name} ($${value.toFixed(2)})`}
                                    labelLine
                                    labelStyle={{ fontSize: 12, fill: '#5F6368' }}
                                >
                                    {expenseByCategory.map((entry, index) => (
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
                    )}
                </div>

                {/* Income by Source */}
                <div className="bg-[#FFFFFF] dark:bg-[#2D3748] p-4 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
                    <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB] mb-4 flex items-center gap-2">
                        <ArrowUpIcon className="w-5 h-5 text-[#34A853] dark:text-[#6EE7B7]" />
                        Income by Source
                    </h3>
                    {incomeBySource.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-[#5F6368] dark:text-[#D1D5DB] py-8"
                            role="alert"
                            aria-describedby="no-income-data"
                        >
                            <p id="no-income-data">No income data available.</p>
                        </motion.div>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={incomeBySource}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ name, value }) => `${name} ($${value.toFixed(2)})`}
                                    labelLine
                                    labelStyle={{ fontSize: 12, fill: '#5F6368' }}
                                >
                                    {incomeBySource.map((entry, index) => (
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
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default WalletCharts;