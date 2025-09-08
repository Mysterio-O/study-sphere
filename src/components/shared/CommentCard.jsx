import React, { useState } from "react";
import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "motion/react";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import { FaClockRotateLeft } from "react-icons/fa6";

const CommentCard = ({ comment, onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);

    // delete with swal confirm
    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "Comment will be deleted permanently!",
            confirmButtonText: "Delete it",
            showCancelButton: true,
            cancelButtonText: "No, Back",
            customClass: {
                popup: "swal-container",
                title: "swal-title",
                htmlContainer: "swal-text",
                confirmButton: "swal-confirm-button",
                cancelButton: "swal-cancel-button",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setMenuOpen(false);
                onDelete(id);
            }
        });
    };

    const handleSaveEdit = (id) => {
        if (editedText.trim().length === 0) return;
        console.log({ editedText, id });
        onEdit({ editedText, id })
        setIsEditing(false);
    };

    const textVariants = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: "easeInOut" },
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-black dark:text-white relative">
            {/* Author + Menu */}
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <motion.p
                        variants={textVariants}
                        initial="initial"
                        animate="animate"
                        transition="transition"
                        className="text-sm font-semibold"
                    >
                        {comment.author}
                    </motion.p>

                    {/* Normal Text OR Edit Mode */}
                    {!isEditing ? (
                        <motion.p
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            transition="transition"
                            className="text-sm mt-1"
                        >
                            {comment.text}
                        </motion.p>
                    ) : (
                        <div className="flex items-center gap-2 mt-1">
                            <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="flex-1 border rounded px-2 py-1 text-sm dark:bg-gray-600 dark:text-white"
                            />
                            <button
                                onClick={() => handleSaveEdit(comment?._id)}
                                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditedText(comment.text);
                                }}
                                className="px-3 py-1 bg-gray-400 text-white rounded text-sm hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    <p className="text-xs text-gray-500 flex gap-1 items-center">
                        <FaClockRotateLeft size={10}/> {formatDistanceToNow(new Date(comment?.commentedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>

                {/* 3 Dots Menu */}
                {!isEditing && (
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.75, rotate: 120 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                duration: 0.3,
                                damping: 30,
                                stiffness: 50,
                                delay: 0.4,
                            }}
                        >
                            <motion.button
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none cursor-pointer"
                            >
                                <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </motion.button>
                        </motion.div>

                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-20"
                                >
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setIsEditing(true);
                                        }}
                                        className="flex items-center px-3 py-2 w-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <PencilSquareIcon className="w-4 h-4 mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="flex items-center px-3 py-2 w-full text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <TrashIcon className="w-4 h-4 mr-2" />
                                        Delete
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentCard;
