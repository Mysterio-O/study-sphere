import React from 'react';
import Button from '../components/atoms/Button';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const LogoutButton = () => {
    const { userLogOut } = useAuth();

    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to log out of your account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'swal-container', // Target .swal2-popup
                title: 'swal-title',
                htmlContainer: 'swal-text', // Target .swal2-html-container
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button'
            }
        }).then((result) => {
            if (result.isConfirmed) {

                userLogOut()
                    .then(() => {
                        console.log('user signed out successfully');
                        Swal.fire({
                            title: 'Logged Out',
                            text: 'You have been successfully logged out.',
                            icon: 'success',
                            customClass: {
                                popup: 'swal-container', // Target .swal2-popup
                                title: 'swal-title',
                                htmlContainer: 'swal-text', // Target .swal2-html-container
                                confirmButton: 'swal-confirm-button'
                            }
                        });
                    })
                    .catch((err) => {
                        console.error("error logging out user", err);
                        Swal.fire({
                            title: 'Logout Failed',
                            text: 'An error occurred while logging out. Please try again.',
                            icon: 'error',
                            customClass: {
                                popup: 'swal-container', // Target .swal2-popup
                                title: 'swal-title',
                                htmlContainer: 'swal-text', // Target .swal2-html-container
                                confirmButton: 'swal-confirm-button'
                            }
                        });
                    })
            }
        });
    };

    return (
        <Button variant='error' text="Log Out" onClick={handleLogOut} />
    );
};

export default LogoutButton;