import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    BookOpenIcon,
    EnvelopeIcon,
    PhoneIcon,
    GlobeAltIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router';
import logo from '../../assets/logo.webp';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Footer = () => {
    const [email, setEmail] = useState('');

    const axiosPublic = useAxiosPublic();

    const { mutateAsync: subscribe, isPending } = useMutation({
        mutationKey: ['subscribe'],
        mutationFn: async (email) => {
            const res = await axiosPublic.post(`/subscribe?email=${email}`);
            return res.data
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Subscribed',
                text: 'You subscribed successfully',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        setEmail('');
        },
        onError: (err) => {
            Swal.fire({
                title: 'Subscribe Failed',
                text: err.message,
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

    const palette = {
        primary: '#4285F4', // Google Blue
        primaryLight: '#E8F0FE',
        primaryDark: '#3367D6',
        secondary: '#34A853',
        accent: '#FBBC04',
        error: '#EA4335',
        surface: '#F8F9FA',
        backgroundDark: '#121212',
        surfaceDark: '#1F2937',
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        // console.log('subscribe:', email);
        subscribe(email);
    };

    const year = new Date().getFullYear();

    return (
        <footer
            aria-label="Site footer"
            className="border-t border-[#DADCE0] dark:border-[#374151] bg-white dark:bg-[#121212] text-[#202124] dark:text-[#F9FAFB]"
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <motion.img
                                src={logo}
                                alt="StudySphere Logo"
                                className="h-12 w-auto"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <div>
                                <h3 className="text-xl font-semibold">StudySphere</h3>
                                <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">Make study simple — schedule, practice, track.</p>
                            </div>
                        </div>

                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                            StudySphere combines smart scheduling, dynamic question generation, a wallet for tracking, and a community to keep you motivated.
                        </p>

                        <div className="flex gap-2 flex-wrap items-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-[#E8F0FE] dark:bg-[#1E3A8A] text-[#202124] dark:text-[#F9FAFB] font-medium">Mathematics</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#E6F4EA] dark:bg-[#064E3B] text-[#202124] dark:text-[#F9FAFB] font-medium">Science</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#FCE8E6] dark:bg-[#7F1D1D] text-[#202124] dark:text-[#F9FAFB] font-medium">Arts</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#FEF7E0] dark:bg-[#78350F] text-[#202124] dark:text-[#F9FAFB] font-medium">History</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        <div>
                            <h4 className="text-sm font-semibold mb-3">Product</h4>
                            <ul className="space-y-2 text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                <li className="flex items-center gap-2">
                                    <ChevronRightIcon className="h-4 w-4 text-[#DADCE0] dark:text-[#374151]" />
                                    <Link to="/dashboard/my-wallet" className="hover:text-[#4285F4] dark:hover:text-[#8AB4F8]">Wallet</Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRightIcon className="h-4 w-4 text-[#DADCE0] dark:text-[#374151]" />
                                    <Link to="/dashboard/study-planner" className="hover:text-[#4285F4] dark:hover:text-[#8AB4F8]">Study Planner</Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRightIcon className="h-4 w-4 text-[#DADCE0] dark:text-[#374151]" />
                                    <Link to="/dashboard/qa-generator" className="hover:text-[#34A853] dark:hover:text-[#6EE7B7]">Random Questions</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-3">Resources</h4>
                            <ul className="space-y-2 text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                <li className="flex items-center gap-2">
                                    <ChevronRightIcon className="h-4 w-4 text-[#DADCE0] dark:text-[#374151]" />
                                    <Link to="/posts" className="hover:text-[#FBBC04] dark:hover:text-[#F4D03F]">Posts</Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRightIcon className="h-4 w-4 text-[#DADCE0] dark:text-[#374151]" />
                                    <Link to="/contact-us" className="hover:text-[#EA4335] dark:hover:text-[#FCA5A5]">Contact Us</Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRightIcon className="h-4 w-4 text-[#DADCE0] dark:text-[#374151]" />
                                    <Link to="/about-us" className="hover:text-[#34A853] dark:hover:text-[#6EE7B7]">About Us</Link>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h4 className="text-sm font-semibold">Stay updated</h4>
                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">Get product updates, study tips and free questions in your inbox.</p>

                        <form onSubmit={handleSubscribe} className="flex gap-2">
                            <label htmlFor="footer-email" className="sr-only">Email address</label>
                            <input
                                id="footer-email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="flex-1 px-3 py-2 rounded-md border border-[#DADCE0] dark:border-[#374151] bg-white dark:bg-[#0b1220] text-sm text-[#202124] dark:text-[#F9FAFB] focus:outline-none focus:ring-2"
                                style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)' }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                type="submit"
                                disabled={isPending}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium ${isPending ? 'animate-pulse' : ''}`}
                                style={{ backgroundColor: palette.primary }}
                            >
                                Subscribe
                            </motion.button>
                        </form>

                        <div className="pt-2 border-t border-[#F1F3F4] dark:border-[#2b3340]">
                            <h5 className="text-sm font-semibold mt-2">Contact</h5>
                            <ul className="mt-2 space-y-2 text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                                <li className="flex items-center gap-2">
                                    <EnvelopeIcon className="h-5 w-5 text-[#DADCE0] dark:text-[#374151]" />
                                    <a href="mailto:hello@studysphere.app" className="hover:text-[#4285F4]">hello@studysphere.app</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <PhoneIcon className="h-5 w-5 text-[#DADCE0] dark:text-[#374151]" />
                                    <a href="tel:+880123456789" className="hover:text-[#34A853]">+880 1234 56789</a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <GlobeAltIcon className="h-5 w-5 text-[#DADCE0] dark:text-[#374151]" />
                                    <a href="/" className="hover:text-[#FBBC04]">studysphere.app</a>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F1F3F4] dark:border-[#2b3340] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">© {year} StudySphere — All rights reserved.</p>

                    <div className="flex items-center gap-4">
                        <Link to="/privacy-policy" className="text-sm text-[#5F6368] dark:text-[#D1D5DB] hover:text-[#4285F4]">Privacy</Link>
                        <Link to="/terms" className="text-sm text-[#5F6368] dark:text-[#D1D5DB] hover:text-[#FBBC04]">Terms</Link>
                        <Link to="/cookies" className="text-sm text-[#5F6368] dark:text-[#D1D5DB] hover:text-[#EA4335]">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;