import React from 'react';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/setting-animation.json';
import SettingBody from '../../components/Dashboard/SettingBody';
import { CiSettings } from "react-icons/ci";
import { motion } from 'motion/react';

const Setting = () => {
    return (
        <div className="transition-colors duration-300 px-6 md:px-12 py-10">
            {/* Header */}
            <h3 className="flex gap-2 text-3xl font-bold items-center text-black dark:text-white transition-colors duration-300">
                <CiSettings size={32} className="font-bold text-primary-500 dark:text-primary-400" />
                Settings
            </h3>

            {/* Content Section */}
            <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center py-10 gap-10">
                {/* Left - Setting Options */}
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="w-full md:w-1/2"
                >
                    <SettingBody />
                </motion.div>

                {/* Right - Animation */}
                <motion.div
                    initial={{ scale: 0.7, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex justify-center md:justify-end w-full md:w-1/2"
                >
                    <LottieAnimation animationData={animation} className="max-w-sm" />
                </motion.div>
            </div>
        </div>
    );
};

export default Setting;
