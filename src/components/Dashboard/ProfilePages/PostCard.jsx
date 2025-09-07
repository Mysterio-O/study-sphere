import React, { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
    HandThumbUpIcon,
    ChatBubbleOvalLeftIcon,
    ShareIcon,
    XMarkIcon,
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../../../hooks/useAuth";
import EditPostModal from "./EditPostModal";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from 'motion/react';

const PostCard = ({ post, onEdit, onDelete, editLoading, setEditLoading, profile }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post?.likes || 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [comments, setComments] = useState(post?.comments || []);
    const [newComment, setNewComment] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();

    const [isExpanded, setIsExpanded] = useState(false);
    const [needsExpansion, setNeedsExpansion] = useState(false);
    const textRef = useRef(null);

    // Check if text needs expansion
    useEffect(() => {
        if (textRef.current) {
            // Check if text exceeds 5 lines
            const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
            const maxHeight = lineHeight * 5; // 5 lines
            setNeedsExpansion(textRef.current.scrollHeight > maxHeight);
        }
    }, [post?.text]);

    // Toggle text expansion
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };


    // const isSameProfile = user?.email === post.author.email;
    // console.log(isSameProfile);

    // Toggle like
    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    };

    // Add comment
    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const comment = {
            id: Date.now(),
            text: newComment,
            author: user?.displayName,
        };
        setComments([comment, ...comments]);
        setNewComment("");
    };

    // Save edits
    const handleSaveEdit = (data) => {
        if (data) onEdit(data);
        // console.log(data);
        setIsEditModalOpen(false);
    };

    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Post will be deleted permanently!',
            confirmButtonText: 'Delete it',
            showCancelButton: true,
            cancelButtonText: 'No, Back',
            customClass: {
                popup: 'swal-container', // Target .swal2-popup
                title: 'swal-title',
                htmlContainer: 'swal-text', // Target .swal2-html-container
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button'
            }
        }).then(result => {
            if (result.isConfirmed) {
                setMenuOpen(false);
                onDelete(id);
            }
        })

    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6 mb-6 relative">
            {/* Top Row: Author + Menu */}
            <div className="flex justify-between items-start mb-4">
                {/* Author Info */}
                <div className="flex items-center">
                    <img
                        src={post?.author?.photoURL}
                        alt={post?.author?.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#DADCE0] dark:border-[#374151]"
                    />
                    <div className="ml-3">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {post?.author?.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(post?.createdAt), {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                </div>

                {/* 3 Dots Menu */}
                {
                    profile && <div className="relative">
                        <motion.button
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-full hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A] text-[#5F6368] dark:text-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                        >
                            <EllipsisHorizontalIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </motion.button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden z-20">
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setIsEditModalOpen(true); // open edit modal
                                    }}
                                    className="flex items-center px-4 py-2 w-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <PencilSquareIcon className="w-4 h-4 mr-2" />
                                    Edit Post
                                </button>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="flex items-center px-4 py-2 w-full text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <TrashIcon className="w-4 h-4 mr-2" />
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                }
            </div>

            {/* Text */}
            {post?.text && (
                <div className="mb-3">
                    <p
                        ref={textRef}
                        className={`text-gray-700 dark:text-gray-200 ${!isExpanded && needsExpansion ? 'line-clamp-5' : ''
                            }`}
                    >
                        {post.text}
                    </p>
                    {needsExpansion && (
                        <button
                            onClick={toggleExpansion}
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-1 focus:outline-none"
                        >
                            {isExpanded ? 'See Less' : 'See More'}
                        </button>
                    )}
                </div>
            )}

            {/* Image */}
            {post?.image && (
                <img
                    src={post.image}
                    alt="post"
                    className="w-full rounded-lg object-cover max-h-96 mb-3"
                />
            )}

            {/* Actions */}
            <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-3">
                <button
                    onClick={handleLike}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                    <HandThumbUpIcon
                        className={`w-5 h-5 ${isLiked ? "text-blue-500" : ""}`}
                    />
                    <span>{likeCount}</span>
                </button>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
                >
                    <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                    <span>{comments.length}</span>
                </button>

                <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                    <ShareIcon className="w-5 h-5" />
                    <span>Share</span>
                </button>
            </div>

            {/* Comment Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md relative">
                        {/* Close */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Comments
                        </h2>

                        {/* Comment List */}
                        <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                            {comments.length > 0 ? (
                                comments.map((c) => (
                                    <div
                                        key={c.id}
                                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
                                    >
                                        <p className="text-sm font-semibold">{c.author}</p>
                                        <p className="text-sm">{c.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No comments yet.</p>
                            )}
                        </div>

                        {/* Add Comment */}
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
                            />
                            <button
                                onClick={handleAddComment}
                                className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <EditPostModal post={post} onClose={setIsEditModalOpen} onSave={handleSaveEdit} editLoading={editLoading} setEditLoading={setEditLoading} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default PostCard;
