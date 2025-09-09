import React from 'react';
import { Link, useLocation } from 'react-router';
import { ChartBarIcon, PlusCircleIcon, UserCircleIcon, BookOpenIcon, CalendarIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ClipboardDocumentCheckIcon, WalletIcon } from '@heroicons/react/24/solid';
import UserPhoto from '../../shared/UserPhoto';
import DashboardTitle from './DashboardTitle';
import ThemeSwitch from '../../shared/ThemeSwitch';
import Button from '../atoms/Button';
import LogoutButton from '../../shared/LogoutButton';
import { motion } from 'motion/react';


const DashboardNavigation = ({ setIsSidebarOpen, isSidebarOpen }) => {
    const location = useLocation();

    const links = [
        {
            name: 'Overview',
            Icon: ChartBarIcon,
            to: '/dashboard',
        },
        {
            name: 'Profile',
            Icon: UserCircleIcon,
            to: '/dashboard/profile',
        },
        {
            name: 'Add Subjects',
            Icon: PlusCircleIcon,
            to: '/dashboard/add-subjects',
        },
        {
            name: 'My Subjects',
            Icon: BookOpenIcon,
            to: '/dashboard/my-subjects',
        },
        {
            name: 'All Schedules',
            Icon: CalendarIcon,
            to: '/dashboard/my-schedules',
        },
        {
            name: "Q&A Generator",
            Icon: QuestionMarkCircleIcon,
            to: '/dashboard/qa-generator'
        },
        {
            name: 'Study Planner',
            Icon: ClipboardDocumentCheckIcon,
            to: "/dashboard/study-planner"
        },
        {
            name: 'My Wallet',
            Icon: WalletIcon,
            to: "/dashboard/my-wallet"
        },
        {
            name: 'Setting',
            Icon: Cog6ToothIcon,
            to: '/dashboard/setting',
        },
    ];

    const handleSidebarToggle = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    }

    return (
        <div className="min-h-screen relative w-full bg-[#FFFFFF] dark:bg-[#121212] bg-gradient-to-b from-[#E8F0FE] to-[#F8F9FA] dark:from-[#1E3A8A] dark:to-[#1F2937] shadow-[0_4px_12px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_-1px_rgba(255,255,255,0.1)] roboto ">
            {/* Header */}
            <header className="flex items-center justify-between py-6 px-4">
                <div className="flex flex-col items-center justify-center">
                    <UserPhoto />
                    <DashboardTitle />
                </div>
                <ThemeSwitch />
            </header>

            {/* Navigation Links */}
            <main className="px-2 py-4 overflow-y-auto">
                <nav>
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.05 },
                            },
                        }}
                        className="flex flex-col gap-2">
                        {links.map((link, idx) => (
                            <motion.li
                                variants={{
                                    hidden: { x: -20, opacity: 0 },
                                    visible: { x: 0, opacity: 1 },
                                }}
                                onClick={handleSidebarToggle}
                                key={idx}>
                                <Link
                                    to={link.to}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[#202124] dark:text-[#F9FAFB] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] hover:text-[#4285F4] dark:hover:text-[#8AB4F8] transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-opacity-50 ${location.pathname === link.to
                                        ? 'bg-[#4285F4] dark:bg-[#8AB4F8] text-white'
                                        : ''
                                        }`}
                                    aria-current={location.pathname === link.to ? 'page' : undefined}
                                >
                                    <link.Icon className="w-6 h-6" />
                                    <span className="text-base font-medium">{link.name}</span>
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </nav>
            </main>

            {/* footer part */}
            <footer className='absolute lg:bottom-0 py-3 px-5 lg:px-2 flex justify-between w-full'>
                <Link to="/">
                    <Button variant='secondary' text="Back to Home" />
                </Link>
                <LogoutButton />
            </footer>

        </div>
    );
};

export default DashboardNavigation;