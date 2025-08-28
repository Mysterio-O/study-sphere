import React from 'react';
import { motion } from 'motion/react';

const Button = ({ variant, type, text, onclick, }) => {


    const buttonVariants = {
        primary: 'bg-[#4285F4] dark:bg-[#8AB4F8] hover:text-white dark:hover:text-black',
        secondary: 'bg-[#34A853] dark:bg-[#6EE7B7] hover:text-white dark:hover:text-black',
        sec_light: 'bg-[#E6F4EA] dark:bg-[#064E3B] hover:text-[#34A853] dark:hover:text-[#E6F4EA]',
        outline: "bg-[#F8F9FA] dark:bg-[#1F2937] border-0 outline-2 outline-[#4285F4] dark:outline-[#8AB4F8] hover:text-[#4285F4]",
        error: 'bg-[#EA4335] dark:bg-[#FCA5A5] hover:bg-[#C5221F] dark:hover:bg-[#DC2626]'
    }


    const animationVariants = {
        initial: { scale: 0.85, opacity: 0 },
        view: { scale: 1, opacity: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
        timing: { duration: 0.3, ease: "easeInOut" }
    }


    return (
        <motion.button
            variants={animationVariants}
            initial='initial'
            animate='view'
            whileHover='hover'
            whileTap='tap'
            transition='timing'
            type={type && type}
            onClick={onclick && onclick}
            className={`btn rounded-lg text-black dark:text-white ${variant === 'primary' ? buttonVariants.primary
                : variant === 'secondary' ? buttonVariants.secondary
                    : variant === 'outline' ? buttonVariants.outline
                        : variant === 'sec-light' ? buttonVariants.sec_light
                            : variant === 'error' ? buttonVariants.error
                                : ''
                } transition-colors duration-300`}
        >
            {text}
        </motion.button>
    );
};

export default Button;