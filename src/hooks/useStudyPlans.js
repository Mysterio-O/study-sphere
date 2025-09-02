// hooks/useStudyPlans.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";

const useStudyPlans = (email) => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Get all study plans
    const { data: plans = [], isLoading } = useQuery({
        queryKey: ["studyPlans", email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/study-plans?email=${email}`);
            return res.data;
        },
        enabled: !!email, // only fetch if email exists
    });

    // Add new plan
    const addPlan = useMutation({
        mutationFn: async (newPlan) => {
            const res = await axiosSecure.post(`/study-plans?email=${email}`, newPlan);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["studyPlans", email]);
            Swal.fire({
                title: 'Plan Added!',
                text: 'You have successfully added plan.',
                icon: 'success',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'Plan Failed',
                text: error?.message || 'An error occurred while adding plan. Please try again.',
                icon: 'error',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    // Update plan
    const updatePlan = useMutation({
        mutationFn: async ({ id, update }) => {
            const res = await axiosSecure.put(`/study-plans/${id}?email=${email}`, update);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["studyPlans", email]);
            Swal.fire({
                title: 'Updated',
                text: 'You have successfully completed the plan.',
                icon: 'success',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'Update Failed',
                text: error?.message || 'An error occurred while updating plan. Please try again.',
                icon: 'error',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    // Delete plan
    const deletePlan = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/study-plans/${id}?email=${email}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["studyPlans", email]);
            Swal.fire({
                title: 'Deleted!',
                text: 'You have successfully deleted plan.',
                icon: 'success',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (error) => {
            Swal.fire({
                title: 'Delete Failed',
                text: error?.message || 'An error occurred while deleting plan. Please try again.',
                icon: 'error',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    return { plans, isLoading, addPlan, updatePlan, deletePlan };
};

export default useStudyPlans;
