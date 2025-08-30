import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { motion } from 'motion/react';
import SubjectCard from './shared/SubjectCard';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/subjects.json';
import Swal from 'sweetalert2';

const MySubjects = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

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

    const { mutateAsync: handleSubjectChange, isLoading: deleteLoading } = useMutation({
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
        }
    })

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-[#5F6368] dark:text-[#D1D5DB] font-roboto">Loading...</p>
            </div>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-center items-center w-full p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto"
        >
            <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto md:p-6'>
                <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6">
                    My Subjects
                </h2>
                {subjectsData.subjects.length === 0 ? (
                    <p className="text-[#5F6368] dark:text-[#D1D5DB] text-center">
                        No subjects added yet.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-3 w-full">
                        {subjectsData.subjects.map((subject, idx) => (
                            <SubjectCard key={subject._id || idx} subject={subject} handleSubjectChange={handleSubjectChange}/>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <LottieAnimation animationData={animation} />
            </div>
        </motion.section>
    );
};

export default MySubjects;