import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { auth } from '../../firebase/firebase.init';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const GoogleButton = ({ register }) => {

    const { googleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleClick = () => {
        setLoading(true);
        googleLogin()
            .then(async (result) => {
                console.log("user signed in with google", result);
                navigate('/');
                Swal.fire({
                    title: 'Google Login Successful',
                    text: 'You have successfully signed in with Google!',
                    icon: 'success',
                    customClass: {
                        container: 'swal-container',
                        title: 'swal-title',
                        content: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });

                if (register) {
                    const user = auth.currentUser;
                    if (user !== null) {
                        const username = user?.displayName;
                        const email = user?.email;
                        const photo = user?.photoURL;

                        const userInfo = {
                            username, email, photoURL: photo
                        };
                        const res = await axiosPublic.post('/create-user', userInfo);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: 'Account Created',
                                text: `Welcome, ${username}! Your account has been successfully created.`,
                                icon: 'success',
                                customClass: {
                                    container: 'swal-container',
                                    title: 'swal-title',
                                    content: 'swal-text',
                                    confirmButton: 'swal-confirm-button'
                                }
                            });
                            setLoading(false);
                            navigate('/');
                        } else {
                            Swal.fire({
                                title: 'Account Creation Failed',
                                text: 'Failed to create your account. Please try again.',
                                icon: 'error',
                                customClass: {
                                    container: 'swal-container',
                                    title: 'swal-title',
                                    content: 'swal-text',
                                    confirmButton: 'swal-confirm-button'
                                }
                            });
                            setLoading(false)
                        }

                    }
                }


                setLoading(false);
            })
            .catch((err) => {
                console.log("error signing with google", err);
                Swal.fire({
                    title: 'Google Login Failed',
                    text: 'An error occurred during Google sign-in. Please try again.',
                    icon: 'error',
                    customClass: {
                        container: 'swal-container',
                        title: 'swal-title',
                        content: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
                setLoading(false)
            })
    }

    return (
        <button
            disabled={loading}
            onClick={handleClick}
            className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            {
                loading ? <span className="loading loading-spinner text-warning"></span>
                    : 'Login with Google'
            }
        </button>
    );
};

export default GoogleButton;