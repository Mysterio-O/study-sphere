import React from 'react';
import { motion } from 'motion/react';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
            {/* Animated Dots */}
            <div className="flex space-x-3">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-5 h-5 bg-[#4285F4] dark:bg-[#8AB4F8] rounded-full"
                        animate={{
                            y: ["0%", "-50%", "0%"],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 0.1,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Loader;
