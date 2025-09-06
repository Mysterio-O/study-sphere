import React from 'react';
import { motion } from 'motion/react';
import { WalletIcon } from '@heroicons/react/24/solid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import WalletOverview from '../../components/Dashboard/WalletOverview';
import AddIncomeForm from '../../components/Dashboard/AddIncomeForm';
import AddExpenseForm from '../../components/Dashboard/AddExpenseForm';
import TransactionHistory from '../../components/Dashboard/TransactionHistory';

const Wallet = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch wallet data
    const { data: wallet = { income: [], expense: [], totalAmount: 0 }, isLoading } = useQuery({
        queryKey: ['wallet', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wallet?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Add income mutation
    const incomeMutation = useMutation({
        mutationFn: (incomeData) =>
            axiosSecure.post(`/wallet/income?email=${user.email}`, incomeData),
        onSuccess: () => {
            queryClient.invalidateQueries(['wallet', user.email]);
        },
    });

    // Add expense mutation
    const expenseMutation = useMutation({
        mutationFn: (expenseData) =>
            axiosSecure.post(`/wallet/expense?email=${user.email}`, expenseData),
        onSuccess: () => {
            queryClient.invalidateQueries(['wallet', user.email]);
        },
    });

    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center h-screen"
            >
                <p className="text-[#5F6368] dark:text-[#D1D5DB] font-roboto text-base">
                    Loading wallet...
                </p>
            </motion.div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="p-6 font-roboto"
        >
            <div className="flex items-center gap-2 mb-6">
                <WalletIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                <h1 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]">
                    My Wallet
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Overview and Forms */}
                <div className="space-y-6">
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                            Wallet Overview
                        </h2>
                        <WalletOverview wallet={wallet} />
                    </div>
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                            Add Income
                        </h2>
                        <AddIncomeForm onAddIncome={incomeMutation.mutate} loading={incomeMutation.isLoading} />
                    </div>
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                            Add Expense
                        </h2>
                        <AddExpenseForm onAddExpense={expenseMutation.mutate} loading={expenseMutation.isLoading} />
                    </div>
                </div>
                {/* Right Column: Transaction History */}
                <div className="md:col-span-2">
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                            Transaction History
                        </h2>
                        <TransactionHistory income={wallet?.income || []} expenses={wallet?.expense || []} />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Wallet;