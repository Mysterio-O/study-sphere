import React from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const Button = ({ variant = 'primary', type = 'button', text, onClick, className = '' ,disabled = false,loading = false}) => {
    const animationVariants = {
        initial: { scale: 0.85, opacity: 0 },
        view: { scale: 1, opacity: 1 },
        hover: { scale: 1.05, y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' },
        tap: { scale: 0.95, y: 0 },
    };

    const variantClass = {
        primary: 'bg-[#4285F4] dark:bg-[#8AB4F8] text-[#FFFFFF] dark:text-[#F9FAFB] hover:bg-[#3367D6] dark:hover:bg-[#3367D6] border-transparent',
        secondary: 'bg-[#34A853] dark:bg-[#6EE7B7] text-[#FFFFFF] dark:text-[#F9FAFB] hover:bg-[#0F9D58] dark:hover:bg-[#0F9D58] border-[#34A853] dark:border-[#6EE7B7]',
        sec_light: 'bg-[#E6F4EA] dark:bg-[#064E3B] text-[#202124] dark:text-[#E6F4EA] hover:bg-[#D1E8D6] dark:hover:bg-[#065F46] border-transparent',
        outline: 'bg-transparent border border-[#4285F4] dark:border-[#8AB4F8] text-[#4285F4] dark:text-[#8AB4F8] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A]',
        error: 'bg-[#EA4335] dark:bg-[#FCA5A5] text-[#FFFFFF] dark:text-[#F9FAFB] hover:bg-[#C5221F] dark:hover:bg-[#C5221F] border-transparent',
    }[variant] || 'bg-[#4285F4] dark:bg-[#8AB4F8] text-[#FFFFFF] dark:text-[#F9FAFB] hover:bg-[#3367D6] border-transparent';

    return (
        <motion.button
            variants={animationVariants}
            initial="initial"
            animate="view"
            whileHover="hover"
            whileTap="tap"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        px-4 py-2 rounded-lg font-roboto font-medium text-base
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-opacity-50
        ${variantClass}
        ${className}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}
        >
            {
                loading ? <span className="loading loading-spinner text-warning"></span>
                : text
            }
        </motion.button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'sec_light', 'outline', 'error']),
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool
};

export default Button;