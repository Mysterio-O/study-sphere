import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { AnimatePresence, motion } from 'motion/react';
import SubjectCard from './shared/SubjectCard';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/subjects.json';
import Swal from 'sweetalert2';
import FormModal from '../../components/molecules/FormModal';
import ScheduleModal from '../../components/molecules/ScheduleModal';
import Button from '../../components/atoms/Button';
import { Link } from 'react-router';
import MySubjectsSkeleton from '../../components/skeletons/MySubjectsSkeleton';

const MySubjects = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [modalInView, setModalInView] = useState(false);
    const [scheduleInView, setScheduleInView] = useState(false);
    const [subject, setSubject] = useState(null);

    const { data: subjectsData = { subjects: [], total: 0 }, isLoading, refetch } = useQuery({
        queryKey: ['my-subjects', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-subjects', {
                params: { email: user?.email },
            });
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { mutateAsync: handleSubjectChange } = useMutation({
        mutationKey: ['my-subjects', user?.email],
        mutationFn: async (data) => {
            const res = await axiosSecure.delete(`/delete-subject?email=${user?.email}`, { data })
            return res.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('my-subjects');
            if (data?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    text: `Subject deleted successfully!`,
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal-container dark', // Add 'dark' class for dark mode
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-success-button'
                    }
                });
            }
        },
        onError: (error) => {
            console.error('error deleting subject', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete subject. Please try again.',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-container', // Targets .swal2-popup.swal-container
                    title: 'swal-title', // Targets .swal2-popup .swal-title
                    htmlContainer: 'swal-text', // Targets .swal2-popup .swal-text
                    confirmButton: 'swal-confirm-button' // Targets .swal2-popup .swal-confirm-button
                }
            });
        },
        enabled: !!user?.email
    });

    // console.log(subjectsData);

    const { mutateAsync: handleUpdateSubject } = useMutation({
        mutationKey: ['my-subjects', user?.email],
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/update-subject?email=${user?.email}`, { data });
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('my-subjects');
            if (data?.modifiedCount > 0) {
                setModalInView(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: `Subject updated successfully!`,
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal-container dark', // dark mode styling
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-success-button'
                    }
                });
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes',
                    text: 'No updates were made to the subject.',
                    confirmButtonText: 'OK',
                    customClass: {
                        popup: 'swal-container dark',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            }
        },
        onError: (error) => {
            console.error("error updating subject", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update subject. Please try again.',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-container',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });

        },
        enabled: !!user?.email
    });

    const { mutateAsync: handleAddSchedule } = useMutation({
        mutationKey: ['my-schedule', user?.email],
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/add-schedule?email=${user?.email}`, { data });
            return res.data;
        },
        enabled: !!user?.email,
        onSuccess: (data) => {
            // console.log(data);
            Swal.fire({
                icon: 'success',
                title: 'Added',
                text: 'Schedule added successfully',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (error) => {
            // console.log("error adding schedule", error);
            Swal.fire({
                title: 'Failed',
                text: error.message,
                icon: 'error',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    })

    // getting data from the child component
    const showModal = (subjectDetails) => {
        if (subjectDetails) {
            setModalInView(true);
            setSubject(subjectDetails);
        }
    }
    // console.log(modalInView);

    const scheduleModal = (subjectDetails) => {
        // console.log(subjectDetails);
        if (subjectDetails) {
            setScheduleInView(true);
            setSubject(subjectDetails)
        }
    }

    if (isLoading) return <MySubjectsSkeleton />

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-center items-center w-full p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto"
        >
            <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto md:p-6'>
                <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6">
                    My Subjects
                </h2>
                {subjectsData.subjects.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full px-4 text-center">

                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-semibold text-[#202124] dark:text-[#F9FAFB] mb-2">
                            No subjects added yet
                        </h2>

                        {/* Subtitle */}
                        <p className="text-[#5F6368] dark:text-[#D1D5DB] max-w-md mb-6">
                            Start by adding your first subject to manage schedules and stay organized!
                        </p>

                        {/* Call to action (button placeholder) */}
                        <Link to="/dashboard/add-subjects">
                            <Button
                                variant='primary'
                                type="button"
                                text="+ Add Subject"
                            />
                        </Link>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-3 w-full">
                        {subjectsData.subjects.map((subject, idx) => (
                            <SubjectCard key={subject._id || idx} subject={subject} showModal={showModal} handleSubjectChange={handleSubjectChange} scheduleModal={scheduleModal} />
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <LottieAnimation animationData={animation} />
            </div>

            <AnimatePresence>
                {modalInView && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Background overlay with blur */}
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setModalInView(false)}
                        />

                        {/* Modal content */}
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: -50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.75, opacity: 0, y: -50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative bg-white rounded-2xl shadow-xl max-w-4xl max-h-[calc(100vh-200px)] w-full p-6">
                            <FormModal subject={subject} setModalInView={setModalInView} handleUpdateSubject={handleUpdateSubject} />

                            {/* Close button */}
                            <button
                                onClick={() => setModalInView(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {scheduleInView && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Background overlay with blur */}
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setScheduleInView(false)}
                        />

                        {/* Modal content */}
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: -50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.75, opacity: 0, y: -50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative bg-white rounded-2xl shadow-xl max-w-4xl max-h-[calc(100vh-200px)] w-full p-6">
                            <ScheduleModal subject={subject} setScheduleInView={setScheduleInView} handleAddSchedule={handleAddSchedule} />

                            {/* Close button */}
                            <button
                                onClick={() => setScheduleInView(false)}
                                className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>



        </motion.section>
    );
};

export default MySubjects;