import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Button from '../atoms/Button';

const ListModal = ({ isOpen, onClose, title, items }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="list-modal-title"
                >
                    <motion.div
                        className="bg-[#F8F9FA] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] p-6 w-full max-w-md max-h-[80vh] overflow-y-auto font-roboto"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <h2
                            id="list-modal-title"
                            className="text-xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-4"
                        >
                            {title || 'List'}
                        </h2>
                        {items.length === 0 ? (
                            <p className="text-base text-[#5F6368] dark:text-[#D1D5DB] text-center">
                                No items found.
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {items.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-3 rounded-md bg-[#FFFFFF] dark:bg-[#2D3748] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] transition-all duration-200"
                                        aria-label={`Item ${item}`}
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-6 flex justify-end">
                            <Button
                                type="button"
                                variant="primary"
                                text="Close"
                                onClick={onClose}
                                className="w-full max-w-xs"
                                aria-label="Close list modal"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ListModal;