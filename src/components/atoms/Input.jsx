// Input.jsx
import React from 'react';
import { motion } from 'motion/react';

const Input = ({ name, type, placeholder, classNames, value, onChange}) => {
  return (
    <motion.input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(66, 133, 244, 0.3)' }}
      transition={{ duration: 0.2 }}
      required
      className={`
        w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937]
        text-[#202124] dark:text-[#F9FAFB] placeholder-[#5F6368] dark:placeholder-[#D1D5DB]
        border border-[#DADCE0] dark:border-[#374151]
        focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent
        roboto text-base
        transition-all duration-200
        ${classNames ? classNames : ''}
      `}
      aria-label={placeholder}
    />
  );
};

export default Input;
