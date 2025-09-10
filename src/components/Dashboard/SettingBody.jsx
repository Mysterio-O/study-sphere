import React, { useEffect, useState, useCallback } from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router';
import { AiTwotoneProfile } from "react-icons/ai";
import { MdManageAccounts } from "react-icons/md";
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SettingBody = () => {
    const navigate = useNavigate();

    const { deleteUserFirebase,  verifyEmail, userLogOut, user, setLoading, changePassword } = useAuth();
    const axiosSecure = useAxiosSecure()
    // console.log(user);
    const providerType = user?.providerData[0]?.providerId
    // console.log(providerType);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [hasUpdatedDatabase, setHasUpdatedDatabase] = useState(false);

    const { data: isUserVerified = false, isLoading: verifyLoading } = useQuery({
        queryKey: ['isVerified', user?.email],
        enabled: !!user.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/check-profile-verified`, {
                params: { email: user.email }
            });
            return res.data;
        }
    });
    console.log(isUserVerified);

    const { mutateAsync: verifyEmailOnDatabase } = useMutation({
        mutationKey: ['verify-email', user?.email],
        mutationFn: async () => {
            const res = await axiosSecure.patch(`/verify-email?email=${user?.email}&isVerified=${isEmailVerified}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Verified',
                text: 'Your email verified successfully',
                customClass: {
                    popup: 'swal-container',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    // Create a stable callback using useCallback
    const handleEmailVerification = useCallback(async () => {
        if (user?.emailVerified && !hasUpdatedDatabase) {
            setIsEmailVerified(true);
            setHasUpdatedDatabase(true);
            if (!isUserVerified) {
                verifyEmailOnDatabase();
            }
        }
    }, [user, hasUpdatedDatabase, verifyEmailOnDatabase, isUserVerified]);

    // Use the stable callback in useEffect
    useEffect(() => {
        handleEmailVerification();
    }, [handleEmailVerification]);

    const handleVerifyEmail = () => {
        verifyEmail()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Message sent.',
                    text: 'Verification message sent. Check your email (spam box also)',
                    customClass: {
                        popup: 'swal-container',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Message Failed',
                    text: err.message,
                    icon: 'error',
                    customClass: {
                        popup: 'swal-container',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            })
    };

    const { mutateAsync: deleteFromDatabase } = useMutation({
        mutationKey: ['delete-user', user?.email],
        enabled: !!user?.email,
        mutationFn: async () => {
            const res = await axiosSecure.delete(`/delete-user?email=${user?.email}`);
            return res.data;
        },
        onSuccess: () => {
            userLogOut()
                .then(() => {
                    console.log('signed out');
                })
                .catch(err => {
                    console.error('error logging out', err);
                });
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Account deleted successfully',
                customClass: {
                    popup: 'swal-container',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (err) => {
            Swal.fire({
                title: 'Delete Failed',
                text: err.message,
                icon: 'error',
                customClass: {
                    popup: 'swal-container',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete your account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Delete',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'swal-container',
                title: 'swal-title',
                htmlContainer: 'swal-text',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button'
            }
        }).then(result => {
            if (result.isConfirmed) {
                deleteUserFirebase()
                    .then(() => {
                        deleteFromDatabase();
                    })
                    .catch(err => { // Changed from .then to .catch for error handling
                        Swal.fire({
                            title: 'Delete Failed',
                            text: "Credential is too old. logout and login again. then try again",
                            icon: 'error',
                            customClass: {
                                popup: 'swal-container',
                                title: 'swal-title',
                                htmlContainer: 'swal-text',
                                confirmButton: 'swal-confirm-button'
                            }
                        });
                        setLoading(false)
                    })
            }
        })
    };

    const handleResetPassword = () => {
        changePassword(user?.email)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Email sent',
                    text: 'Reset email sent to you mail. Check inbox and spam box',
                    customClass: {
                        popup: 'swal-container', // Target .swal2-popup
                        title: 'swal-title',
                        htmlContainer: 'swal-text', // Target .swal2-html-container
                        confirmButton: 'swal-confirm-button'
                    }
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Process Failed',
                    text: err.message,
                    icon: 'error',
                    customClass: {
                        popup: 'swal-container', // Target .swal2-popup
                        title: 'swal-title',
                        htmlContainer: 'swal-text', // Target .swal2-html-container
                        confirmButton: 'swal-confirm-button'
                    }
                });
            })
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Profile Setting */}
            <div className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
                <h4 className="text-xl font-semibold dark:text-white flex items-center gap-2 mb-4">
                    <AiTwotoneProfile size={26} className="text-primary-500 dark:text-primary-400" />
                    Profile Settings
                </h4>
                <Button
                    variant="primary"
                    text="Update Profile"
                    onClick={() => navigate('/dashboard/update-profile')}
                />
            </div>

            {/* Account Setting */}
            <div className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-800 transition-colors duration-300">
                <h4 className="text-xl font-semibold dark:text-white flex items-center gap-2 mb-4">
                    <MdManageAccounts size={26} className="text-primary-500 dark:text-primary-400" />
                    Account Settings
                </h4>
                <div className="flex flex-col gap-3">
                    <Button
                        variant="secondary"
                        text={isUserVerified?.isVerified ? 'Already Verified' : "Verify Email"}
                        onClick={handleVerifyEmail}
                        disabled={isUserVerified?.isVerified}
                    />
                    {
                        providerType === 'password' && <Button
                            variant="outline"
                            text="Reset Password"
                            onClick={handleResetPassword}
                        />
                    }
                    <Button
                        variant="error"
                        text="Delete Account"
                        onClick={handleDeleteAccount}
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingBody;