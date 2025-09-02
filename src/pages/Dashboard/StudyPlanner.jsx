import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpenIcon } from '@heroicons/react/24/solid';
import useAuth from '../../hooks/useAuth';
import useStudyPlans from '../../hooks/useStudyPlans';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import StudyCharts from '../../components/Dashboard/StudyCharts';
import Swal from 'sweetalert2';

const StudyPlanner = () => {
    const { user } = useAuth();
    const email = user?.email;
    const { plans, isLoading, addPlan, deletePlan, updatePlan } = useStudyPlans(email);

    // Local state for form and errors
    const [form, setForm] = useState({
        subject: '',
        topic: '',
        priority: 'medium',
        deadline: '',
        day: '',
        start: '',
        end: '',
    });
    const [errors, setErrors] = useState({});

    // Handle form change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        if (!form.subject.trim()) newErrors.subject = 'Subject is required';
        if (!form.topic.trim()) newErrors.topic = 'Topic is required';
        if (!form.deadline) newErrors.deadline = 'Deadline is required';
        return newErrors;
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newPlan = {
            subject: form.subject,
            topic: form.topic,
            priority: form.priority,
            deadline: form.deadline,
            timeSlots: [{ day: form.day, start: form.start, end: form.end }],
        };

        addPlan.mutate(newPlan, {
            onSuccess: () => {
                setForm({
                    subject: '',
                    topic: '',
                    priority: 'medium',
                    deadline: '',
                    day: '',
                    start: '',
                    end: '',
                });
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Study plan added successfully!',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'swal-container', // Target .swal2-popup
                        title: 'swal-title',
                        htmlContainer: 'swal-text'
                    }
                });
            },
            onError: () => {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Failed to add study plan.',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        popup: 'swal-container', // Target .swal2-popup
                        title: 'swal-title',
                        htmlContainer: 'swal-text'
                    }
                });
            },
        });
    };

    // Reset form
    const handleReset = () => {
        setForm({
            subject: '',
            topic: '',
            priority: 'medium',
            deadline: '',
            day: '',
            start: '',
            end: '',
        });
        setErrors({});
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to log out of your account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete it',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'swal-container', // Target .swal2-popup
                title: 'swal-title',
                htmlContainer: 'swal-text', // Target .swal2-html-container
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button'
            }
        }).then(result => {
            if (result.isConfirmed) {
                deletePlan.mutate(id)
            }
        })

    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className=" p-6 font-roboto"
        >
            <div className="flex items-center gap-2 mb-6">
                <BookOpenIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                <h1 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Study Planner
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column: Form and Charts */}
                <div className="space-y-6">
                    <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                        <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                            Add Study Plan
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="subject"
                                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                    >
                                        Subject
                                    </label>
                                    <Input
                                        name="subject"
                                        type="text"
                                        placeholder="Enter subject name"
                                        value={form.subject}
                                        onChange={handleChange}
                                        className={errors.subject ? 'border-[#EA4335]' : ''}
                                        aria-invalid={!!errors.subject}
                                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                                    />
                                    {errors.subject && (
                                        <p id="subject-error" className="text-sm text-[#EA4335] dark:text-[#FCA5A5]">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="topic"
                                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                    >
                                        Topic
                                    </label>
                                    <Input
                                        name="topic"
                                        type="text"
                                        placeholder="Enter topic"
                                        value={form.topic}
                                        onChange={handleChange}
                                        className={errors.topic ? 'border-[#EA4335]' : ''}
                                        aria-invalid={!!errors.topic}
                                        aria-describedby={errors.topic ? 'topic-error' : undefined}
                                    />
                                    {errors.topic && (
                                        <p id="topic-error" className="text-sm text-[#EA4335] dark:text-[#FCA5A5]">
                                            {errors.topic}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="priority"
                                    className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                >
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-[#DADCE0] dark:border-[#374151] rounded-md bg-[#F8F9FA] dark:bg-[#2D3748] text-[#202124] dark:text-[#F9FAFB] focus:ring-[#4285F4]"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label
                                    htmlFor="deadline"
                                    className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                >
                                    Deadline
                                </label>
                                <Input
                                    name="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={handleChange}
                                    className={errors.deadline ? 'border-[#EA4335]' : ''}
                                    aria-invalid={!!errors.deadline}
                                    aria-describedby={errors.deadline ? 'deadline-error' : undefined}
                                />
                                {errors.deadline && (
                                    <p id="deadline-error" className="text-sm text-[#EA4335] dark:text-[#FCA5A5]">
                                        {errors.deadline}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="day"
                                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                    >
                                        Day
                                    </label>
                                    <Input
                                        name="day"
                                        type="text"
                                        placeholder="e.g., Monday"
                                        value={form.day}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="start"
                                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                    >
                                        Start Time
                                    </label>
                                    <Input
                                        name="start"
                                        type="time"
                                        value={form.start}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label
                                        htmlFor="end"
                                        className="text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]"
                                    >
                                        End Time
                                    </label>
                                    <Input
                                        name="end"
                                        type="time"
                                        value={form.end}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    text="Add Study Plan"
                                    variant="primary"
                                    loading={addPlan.isLoading}
                                    className="flex-1"
                                    aria-label="Add study plan"
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
                    </div>
                    {plans.length > 0 && (
                        <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                            <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                                Study Plan Insights
                            </h2>
                            <StudyCharts plans={plans} />
                        </div>
                    )}
                </div>
                {/* Right Column: Plan List */}
                <div className="bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6">
                    <h2 className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4">
                        Your Study Plans
                    </h2>
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-[#5F6368] dark:text-[#D1D5DB] text-base"
                            role="status"
                            aria-live="polite"
                        >
                            Loading...
                        </motion.div>
                    ) : plans.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center text-[#5F6368] dark:text-[#D1D5DB] text-base"
                            role="alert"
                            aria-describedby="no-plans-message"
                        >
                            <p id="no-plans-message">No study plans yet. Add one above!</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {plans.map((plan) => {
                                const priorityStyles = {
                                    low: { bg: 'bg-[#34A853]/10 dark:bg-[#6EE7B7]/20', text: 'text-[#34A853] dark:text-[#6EE7B7]' },
                                    medium: { bg: 'bg-[#FBBC05]/10 dark:bg-[#FBBF24]/20', text: 'text-[#FBBC05] dark:text-[#FBBF24]' },
                                    high: { bg: 'bg-[#EA4335]/10 dark:bg-[#FCA5A5]/20', text: 'text-[#EA4335] dark:text-[#FCA5A5]' },
                                }[plan.priority] || priorityStyles.medium;

                                return (
                                    <motion.div
                                        key={plan._id}
                                        whileHover={{ scale: 1.02 }}
                                        className={`p-4 border border-[#DADCE0] dark:border-[#374151] rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] ${priorityStyles.bg}`}
                                        aria-labelledby={`plan-${plan._id}-title`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3
                                                    id={`plan-${plan._id}-title`}
                                                    className="font-semibold text-[#202124] dark:text-[#F9FAFB]"
                                                >
                                                    {plan.subject} - {plan.topic}
                                                </h3>
                                                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                                    Priority:{' '}
                                                    <span className={`font-medium ${priorityStyles.text}`}>
                                                        {plan.priority.charAt(0).toUpperCase() + plan.priority.slice(1)}
                                                    </span>{' '}
                                                    | Deadline: {plan.deadline?.slice(0, 10) || 'N/A'}
                                                </p>
                                                {plan.timeSlots?.length > 0 && (
                                                    <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                                        {plan.timeSlots[0].day}: {plan.timeSlots[0].start} -{' '}
                                                        {plan.timeSlots[0].end}
                                                    </p>
                                                )}
                                                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB] mt-1">
                                                    Status:{' '}
                                                    <span
                                                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${plan.completed
                                                            ? 'bg-[#34A853]/20 text-[#34A853] dark:bg-[#6EE7B7]/20 dark:text-[#6EE7B7]'
                                                            : 'bg-[#FBBC05]/20 text-[#FBBC05] dark:bg-[#FBBF24]/20 dark:text-[#FBBF24]'
                                                            }`}
                                                    >
                                                        {plan.completed ? 'Completed' : 'Pending'}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    text={plan.completed ? 'Completed' : 'Mark Done'}
                                                    disabled={plan.completed}
                                                    variant="sec_light"
                                                    onClick={() =>
                                                        updatePlan.mutate({ id: plan._id, update: { completed: true } })
                                                    }
                                                    className="px-3 py-1 text-sm"
                                                    aria-label={plan.completed ? 'Completed' : 'Mark study plan as done'}
                                                />
                                                <Button
                                                    text="🗑 Delete"
                                                    variant="error"
                                                    onClick={() => handleDelete(plan?._id)}
                                                    className="px-3 py-1 text-sm"
                                                    aria-label="Delete study plan"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    );
};

export default StudyPlanner;