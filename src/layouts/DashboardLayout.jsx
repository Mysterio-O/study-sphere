import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import DashboardNavigation from '../components/Dashboard/DashboardNavigation';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    // console.log(isSidebarOpen);

    return (
        <div className="bg-[#FFFFFF] dark:bg-[#0F172A] transition-colors duration-300 min-h-screen flex font-roboto">
            {/* Sidebar */}
            <AnimatePresence>
                {(isSidebarOpen || isLargeScreen) && (
                    <motion.aside
                        key="sidebar"
                        initial={{ x: isSidebarOpen ? "-100%" : 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}

                        className="fixed top-0 left-0 w-full sm:w-3/4 md:w-1/2 lg:w-1/4 h-full 
                 bg-[#F8F9FA] dark:bg-[#1F2937] shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                 dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] z-50 
                 lg:static lg:shadow-none lg:block"
                    >
                        <div className="flex justify-end items-center p-4 lg:hidden">
                            <button
                                onClick={toggleSidebar}
                                className="p-2 text-[#4285F4] dark:text-[#8AB4F8] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-opacity-50"
                                aria-label="Close Sidebar"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <DashboardNavigation setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
                    </motion.aside>
                )}
            </AnimatePresence>


            {/* Main Content */}
            <div className="flex-1 w-full lg:w-3/4">
                {/* Toggle Button for Mobile/Tablet */}
                <div className="lg:hidden p-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-[#4285F4] dark:text-[#8AB4F8] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-opacity-50"
                        aria-label={isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
                        aria-expanded={isSidebarOpen}
                        aria-controls="sidebar"
                    >
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 bg-[#FFFFFF] dark:bg-[#0F172A] bg-gradient-to-br from-[#E8F0FE] to-[#F8F9FA] dark:from-[#1E3A8A] dark:to-[#1F2937] min-h-screen roboto shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
                    <Outlet />
                </div>
            </div>

            {/* Overlay for Mobile Sidebar */}
            {isSidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-[#202124] lg:hidden z-40"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default DashboardLayout;