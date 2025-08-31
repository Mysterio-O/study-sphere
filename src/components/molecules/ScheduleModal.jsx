import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const ScheduleModal = ({ subject, setScheduleInView, handleAddSchedule }) => {
    const [formData, setFormData] = useState({
        selectedDays: [],
        startTime: '',
        endTime: '',
    });

    useEffect(() => {
        // Reset when modal opens with a new subject
        setFormData({
            selectedDays: [],
            startTime: '',
            endTime: '',
        });
    }, [subject]);

    const handleDayToggle = (day) => {
        setFormData(prev => {
            const { selectedDays } = prev;
            if (selectedDays.includes(day)) {
                return { ...prev, selectedDays: selectedDays.filter(d => d !== day) };
            } else {
                return { ...prev, selectedDays: [...selectedDays, day] };
            }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.selectedDays.length === 0) {
            alert('Please select at least one day.');
            return;
        }
        if (!formData.startTime || !formData.endTime) {
            alert('Please select start and end times.');
            return;
        }

        // Create schedule object for selected days
        const scheduleData = formData.selectedDays.map(day => ({
            day,
            subjectName: subject.subjectName,
            teacherName: subject.teacherName,
            time: `${formData.startTime}-${formData.endTime}`
        }));

        console.log(scheduleData);
        handleAddSchedule(scheduleData);
        setScheduleInView(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white dark:bg-[#111827] rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto"
        >
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Schedule: {subject.subjectName}
                </h2>
                <p className="text-sm text-[#5F6368] dark:text-[#9CA3AF] mt-1">
                    Select days and time for this subject
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Days selection */}
                <div>
                    <label className="block mb-1 text-sm font-medium text-[#202124] dark:text-[#E5E7EB]">
                        Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map(day => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => handleDayToggle(day)}
                                className={`px-3 py-1 rounded-full border 
                                    ${formData.selectedDays.includes(day)
                                        ? 'bg-[#4285F4] dark:bg-[#8AB4F8] text-white'
                                        : 'bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border-[#DADCE0] dark:border-[#374151]'} 
                                    transition-all duration-200`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time selection */}
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-[#202124] dark:text-[#E5E7EB]">Start Time</label>
                        <Input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-[#202124] dark:text-[#E5E7EB]">End Time</label>
                        <Input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        variant="outline"
                        type="button"
                        text="Cancel"
                        onClick={() => setScheduleInView(false)}
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        text="Add Schedule"
                    />
                </div>
            </form>
        </motion.div>
    );
};

export default ScheduleModal;
