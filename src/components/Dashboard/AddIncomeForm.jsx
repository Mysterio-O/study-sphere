import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';

const AddIncomeForm = ({ onAddIncome, loading }) => {
    const [form, setForm] = useState({ amount: '', source: '', date: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Valid amount is required';
        if (!form.source.trim()) newErrors.source = 'Source is required';
        if (!form.date) newErrors.date = 'Date is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const incomeData = {
            amount: parseFloat(form.amount),
            source: form.source,
            date: form.date,
        };

        onAddIncome(incomeData, {
            onSuccess: () => {
                setForm({ amount: '', source: '', date: '' });
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Income added successfully!',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#F8F9FA',
                    color: '#202124',
                });
            },
            onError: () => {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to add income.',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#F8F9FA',
                    color: '#202124',
                });
            },
        });
    };

    const handleReset = () => {
        setForm({ amount: '', source: '', date: '' });
        setErrors({});
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] font-roboto"
        >
            <div className="flex items-center gap-2 mb-4">
                <PlusIcon className="w-5 h-5 text-[#34A853] dark:text-[#6EE7B7]" />
                <h3 className="text-lg font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Add Income
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="amount"
                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                    >
                        Amount
                    </label>
                    <Input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={form.amount}
                        onChange={handleChange}
                        className={errors.amount ? 'border-[#EA4335]' : ''}
                        aria-invalid={!!errors.amount}
                        aria-describedby={errors.amount ? 'amount-error' : undefined}
                    />
                    {errors.amount && (
                        <p id="amount-error" className="text-sm text-[#EA4335] dark:text-[#FCA5A5]">
                            {errors.amount}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="source"
                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                    >
                        Source
                    </label>
                    <Input
                        type="text"
                        name="source"
                        placeholder="e.g., Job, Scholarship"
                        value={form.source}
                        onChange={handleChange}
                        className={errors.source ? 'border-[#EA4335]' : ''}
                        aria-invalid={!!errors.source}
                        aria-describedby={errors.source ? 'source-error' : undefined}
                    />
                    {errors.source && (
                        <p id="source-error" className="text-sm text-[#EA4335] dark:text-[#FCA5A5]">
                            {errors.source}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="date"
                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                    >
                        Date
                    </label>
                    <Input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className={errors.date ? 'border-[#EA4335]' : ''}
                        aria-invalid={!!errors.date}
                        aria-describedby={errors.date ? 'date-error' : undefined}
                    />
                    {errors.date && (
                        <p id="date-error" className="text-sm text-[#EA4335] dark:text-[#FCA5A5]">
                            {errors.date}
                        </p>
                    )}
                </div>
                <div className="flex gap-4">
                    <Button
                        type="submit"
                        text="Add Income"
                        variant="success"
                        loading={loading}
                        className="flex-1"
                        aria-label="Add income"
                    />
                    <Button
                        type="button"
                        text="Clear"
                        variant="sec_light"
                        onClick={handleReset}
                        className="flex-1"
                        aria-label="Clear form"
                    />
                </div>
            </form>
        </motion.div>
    );
};

export default AddIncomeForm;