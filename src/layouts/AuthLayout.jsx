import React from 'react';
import { Outlet } from 'react-router';
import { motion } from 'motion/react';
import LottieAnimation from '../shared/LottieAnimation';
import animationJSON from '../assets/animation/STUDENT.json';

const AuthLayout = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col-reverse md:flex-row bg-[#FFFFFF] dark:bg-[#0F172A] bg-gradient-to-br from-[#E8F0FE] to-[#F8F9FA] dark:from-[#1E3A8A] dark:to-[#1F2937] min-h-screen items-center justify-between roboto shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
        >
            <div className="flex-1 min-h-screen flex justify-center items-start md:items-center p-4">
                <Outlet />
            </div>
            <motion.div
                initial={{ opacity: 0,  }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="flex-1"
            >
                <LottieAnimation animationData={animationJSON}/>
            </motion.div>
        </motion.div>
    );
};

export default AuthLayout;