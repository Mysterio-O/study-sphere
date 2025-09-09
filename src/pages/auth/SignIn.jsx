import React, { useState } from 'react';
import { motion } from 'motion/react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import GoogleButton from '../../components/shared/GoogleButton';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SignIn = () => {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const location = useLocation();
    // console.log(location);
    const from = location?.state;

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const { email, password } = formData;
        if (email && password) {
            loginUser(email, password)
                .then(result => {
                    console.log('user logged in', result);
                    setLoading(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged In Successfully',
                        text: 'Welcome back!',
                        customClass: {
                            popup: 'swal-container', // Target .swal2-popup
                            title: 'swal-title',
                            htmlContainer: 'swal-text', // Target .swal2-html-container
                            confirmButton: 'swal-confirm-button'
                        }
                    });
                    navigate(from ? from : '/');
                })
                .catch(err => {
                    console.error("error logging in", err);
                    setLoading(false)
                    Swal.fire({
                        title: 'Login Failed',
                        text: 'Invalid email or password. Please try again.',
                        icon: 'error',
                        customClass: {
                            popup: 'swal-container', // Target .swal2-popup
                            title: 'swal-title',
                            htmlContainer: 'swal-text', // Target .swal2-html-container
                            confirmButton: 'swal-confirm-button'
                        }
                    });
                })
        } else {
            setLoading(false);
            Swal.fire({
                title: 'Missing Fields',
                text: 'Please enter both email and password to log in.',
                icon: 'warning',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    };

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col justify-center items-center w-full max-w-md p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto"
        >
            <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6">
                Sign In to StudySphere
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" isRequired={true}/>
                <div className='relative'>
                    <Input type={!showPassword ? 'password' : 'text'} name="password" value={formData.password} onChange={handleChange} placeholder="********" isRequired={true}/>
                    <span onClick={()=> setShowPassword(!showPassword)} className='absolute  right-3 top-3'>
                        {
                            !showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                        }
                    </span>
                </div>
                <Button variant="primary" type="submit" text="Sign In" disabled={loading} loading={loading} />
            </form>

            {/* Divider */}
            <div className="relative my-6 w-full">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#DADCE0] dark:border-[#374151]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#FFFFFF] dark:bg-[#1F2937] text-[#5F6368] dark:text-[#D1D5DB]">
                        OR Sign In With
                    </span>
                </div>
            </div>

            {/* Google Sign In */}
            <GoogleButton register={false} />

            {/* Extra navigation options */}
            <div className="mt-6 flex flex-col items-center gap-3 w-full">
                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                    Don’t have an account?{' '}
                    <Link
                        to="/auth/signup"
                        state={from}
                        className="text-[#4285F4] dark:text-[#8AB4F8] hover:underline font-medium"
                    >
                        Sign Up
                    </Link>
                </p>

                <Button
                    variant="secondary"
                    type="button"
                    text="Back to Home"
                    onClick={handleNavigate}
                />
            </div>
        </motion.section>
    );
};

export default SignIn;
