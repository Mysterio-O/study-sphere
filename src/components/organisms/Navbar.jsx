import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/logo.webp';
import useAuth from '../../hooks/useAuth';
import ThemeSwitch from '../../shared/ThemeSwitch';
import Button from '../atoms/Button';
import Swal from 'sweetalert2';
import LogoutButton from '../../shared/LogoutButton';

// Navigation links for Navbar
const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Budget', path: '/budget' },
    { name: 'Posts', path: 'posts' },
];

// Animation variants for navbar
const navVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 },
    },
};

// Animation for nav items
const navItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    hover: { scale: 1.1, color: '#3367D6', transition: { duration: 0.2 } }, // primary-dark
};

// Mobile menu animation
const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, scaleY: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        scaleY: 1,
        transition: { duration: 0.4, ease: 'easeInOut' },
    },
    exit: {
        opacity: 0,
        height: 0,
        scaleY: 0,
        transition: { duration: 0.3, ease: 'easeInOut' },
    },
};

// Hamburger icon component
const HamburgerIcon = ({ isOpen, toggleMenu }) => (
    <button
        onClick={toggleMenu}
        className="md:hidden focus:outline-none focus:ring-2 focus:ring-[#4285F4] rounded"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
        <motion.div
            animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
        >
            <svg
                className="w-7 h-7 stroke-[#202124] dark:stroke-[#F9FAFB]"
                fill="none"
                strokeWidth="2.5"
            >
                <path d={isOpen ? 'M6 6L18 18M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
        </motion.div>
    </button>
);

function Navbar() {
    const { user, userLogOut } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
        <motion.nav
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="bg-[#FFFFFF] dark:bg-[#121212] bg-gradient-to-r from-[#E8F0FE] to-[#F8F9FA] dark:from-[#1E3A8A] dark:to-[#1F2937] shadow-[0_4px_12px_-1px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_-1px_rgba(255,255,255,0.1)] fixed top-0 left-0 w-full z-50"
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <motion.img
                                src={logo}
                                alt="StudySphere Logo"
                                className="h-12 w-auto"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            />
                            <motion.span
                                style={{ color: '#4285F4' }} // primary
                                className="ml-3 text-2xl font-bold font-sans dark:text-[#8AB4F8]"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                            >
                                StudySphere
                            </motion.span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <motion.span
                                key={link.name}
                                variants={navItemVariants}
                                whileHover="hover"
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-[#5F6368] dark:text-[#D1D5DB] text-lg font-medium transition-colors ${isActive ? 'border-b-2 border-[#4285F4] dark:border-[#8AB4F8] text-[#4285F4] dark:text-[#8AB4F8]' : ''
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </motion.span>
                        ))}
                        <ThemeSwitch />
                        {user ? (
                            <LogoutButton />
                        ) : (
                            <Link to="/auth/signin">
                                <Button
                                    variant="primary"
                                    text='SignIn'
                                />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeSwitch />
                        <HamburgerIcon isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="md:hidden bg-[#F8F9FA] dark:bg-[#1F2937] px-4 pt-3 pb-4 border-t border-[#DADCE0] dark:border-[#374151]"
                        >
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block py-3 text-[#5F6368] dark:text-[#D1D5DB] text-lg font-medium hover:text-[#3367D6] dark:hover:text-[#6B7280] ${isActive ? 'text-[#4285F4] dark:text-[#8AB4F8] font-semibold' : ''
                                        }`
                                    }
                                    onClick={toggleMobileMenu}
                                    as={motion(NavLink)}
                                    variants={navItemVariants}
                                    whileHover="hover"
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            {user ? (
                                <Button
                                    variant="error"
                                    text="Logout"
                                    onClick={() => {
                                        handleLogOut();
                                        toggleMobileMenu();
                                    }}
                                    className="w-full text-left mt-2"
                                >

                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    size="md"
                                    className="w-full text-left mt-2"
                                >
                                    <Link to="/auth" onClick={toggleMobileMenu}>
                                        Login
                                    </Link>
                                </Button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}

export default Navbar;