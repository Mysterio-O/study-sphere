import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { CalendarIcon, ClockIcon, UserIcon, BookOpenIcon, TrashIcon } from '@heroicons/react/24/solid';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/schedule.json';
import Button from '../../components/atoms/Button';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllSchedules = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const dayColors = {
        Monday: { light: '#4285F4', dark: '#8AB4F8' },
        Tuesday: { light: '#34A853', dark: '#6EE7B7' },
        Wednesday: { light: '#FBBC05', dark: '#FBBF24' },
        Thursday: { light: '#EA4335', dark: '#FCA5A5' },
        Friday: { light: '#673AB7', dark: '#A78BFA' },
        Saturday: { light: '#F06292', dark: '#F472B6' },
        Sunday: { light: '#26A69A', dark: '#4DB6AC' },
    };

    const { data: schedules = [], isLoading, refetch } = useQuery({
        queryKey: ['my-schedules', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-schedules', {
                params: { email: user?.email },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { mutateAsync: handleRemoveSchedule } = useMutation({
        mutationKey: ['my-schedules', user?.email],
        mutationFn: async (data) => {
            const res = await axiosSecure.delete(`/delete-schedule?email=${user?.email}`, { data });
            return res.data
        },
        enabled: !!user.email,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries('my-schedules');
            Swal.fire({
                title: 'Removed!',
                text: 'The subject has been removed successfully.',
                icon: 'success',
                customClass: {
                    popup: 'swal-container',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (error) => {
            console.log("error removing schedule", error);
            Swal.fire({
                title: 'Deletion Failed',
                text: 'Failed to delete the subject. Please try again.',
                icon: 'error',
                customClass: {
                    popup: 'swal-container',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    })

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-[#5F6368] dark:text-[#D1D5DB] font-roboto text-base">
                    Loading...
                </p>
            </div>
        );
    }

    if (!schedules || schedules.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
                {/* Lottie Animation */}
                <div className="w-64 h-64 mb-6">
                    <LottieAnimation animationData={animation} />
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-semibold text-[#202124] dark:text-[#F9FAFB] mb-2">
                    No schedules found
                </h2>

                {/* Subtitle */}
                <p className="text-[#5F6368] dark:text-[#D1D5DB] max-w-md mb-6">
                    Looks like you haven’t added any schedules yet.
                    Start by creating a schedule to keep track of your daily routine!
                </p>

                {/* Call to action (button placeholder) */}
                <Link to="/dashboard/my-subjects">
                    <Button
                        variant='primary'
                        type="button"
                        text="+ Add Schedule"
                    />
                </Link>
            </div>
        );
    }


    const groupedSchedules = schedules.reduce((acc, schedule) => {
        if (!acc[schedule.day]) acc[schedule.day] = [];
        acc[schedule.day].push(schedule);
        return acc;
    }, {});

    const handleDelete = async (subject) => {
        console.log("Deleting subject:", subject);

        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to remove this subject from your schedule?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it',
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
                handleRemoveSchedule(subject);
            }
        })


    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col-reverse md:flex-row justify-between w-full p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto"
        >
            <div className='w-full'>
                <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6 flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                    All Schedules
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
                    {Object.keys(groupedSchedules).map((day) => (
                        <motion.div
                            key={day}
                            whileHover={{ scale: 1.02 }}
                            className="rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
                        >
                            <div
                                className="px-4 py-3 rounded-t-lg flex items-center gap-2"
                                style={{
                                    backgroundColor: dayColors[day]?.light || '#4285F4',
                                    color: '#FFFFFF',
                                }}
                            >
                                <CalendarIcon className="w-5 h-5" />
                                <h3 className="text-lg font-semibold">{day}</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {groupedSchedules[day].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="relative border border-[#DADCE0] dark:border-[#374151] rounded-lg p-3 bg-[#FFFFFF] dark:bg-[#1F2937] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] transition-all duration-200"
                                    >
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>

                                        <div className="flex items-center gap-2 mb-1">
                                            <BookOpenIcon className="w-4 h-4 text-[#4285F4] dark:text-[#8AB4F8]" />
                                            <span className="font-medium text-[#202124] dark:text-[#F9FAFB]">
                                                {item.subjectName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <UserIcon className="w-4 h-4 text-[#4285F4] dark:text-[#8AB4F8]" />
                                            <span className="text-[#5F6368] dark:text-[#D1D5DB]">
                                                {item.teacherName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="w-4 h-4 text-[#4285F4] dark:text-[#8AB4F8]" />
                                            <span className="text-[#5F6368] dark:text-[#D1D5DB]">
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div>
                <LottieAnimation animationData={animation} />
            </div>
        </motion.section>
    );
};

export default AllSchedules;
