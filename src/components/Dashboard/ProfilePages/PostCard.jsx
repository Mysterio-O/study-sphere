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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PostCardSkeleton from "../../skeletons/PostCardSkeleton";
import CommentCard from "../../shared/CommentCard";
import { VscVerifiedFilled } from "react-icons/vsc";

const PostCard = ({ post, onEdit, onDelete, editLoading, setEditLoading, profile }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const [isExpanded, setIsExpanded] = useState(false);


    // Toggle text expansion
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };


    // const isSameProfile = user?.email === post.author.email;
    // console.log(isSameProfile);
    const authorEmail = post?.author?.email;
    // console.log(authorEmail);

    const {data: isUserVerified = false,isLoading: verifyLoading}=useQuery({
        queryKey:['isVerified',authorEmail],
        enabled:!!authorEmail,
        queryFn: async () => {
            const res = await axiosSecure.get(`/check-profile-verified`,{
                params:{email:authorEmail}
            });
            return res.data;
        }
    });
    // console.log(isUserVerified);


    const { mutateAsync: handleToggleLike } = useMutation({
        mutationKey: ['like', user?.email],
        enabled: !!user?.email,
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/manage-like?id=${id}&email=${user?.email}`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['like', post._id])
            // console.log(data);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    // get likes
    const { data: likes = [], isLoading } = useQuery({
        queryKey: ['like', post._id],
        enabled: !!post._id,
        queryFn: async () => {
            const res = await axiosSecure.get('/total-likes', {
                params: { id: post._id }
            });
            return res.data;
        },
        onError: (err) => {
            console.error(err.message);
        }
    });

    // get comments 
    const { data: comments = [], isLoading: commentLoading } = useQuery({
        queryKey: ['comments', post._id],
        enabled: !!post?._id,
        queryFn: async () => {
            const res = await axiosSecure.get('/all-comments', {
                params: { id: post?._id }
            });
            return res.data;
        }
    });

    // add comment
    const { mutateAsync: postComment } = useMutation({
        mutationKey: ['comments', post?._id],
        enabled: !!post?._id,
        mutationFn: async (commentData) => {
            const res = await axiosSecure.post(`/add-comment?id=${post?._id}`, commentData);
            return res.data
        },
        onSuccess: () => {
            // console.log("commented");
            queryClient.invalidateQueries(['comments', post?._id])
            setNewComment("");
        },
        onError: (err) => {
            console.log(err);
        }
    });

    // edit comment
    const { mutateAsync: editComment } = useMutation({
        mutationKey: ['comments', post?._id],
        enabled: !!post?._id,
        mutationFn: async (commentData) => {
            // console.log(commentData);
            const res = await axiosSecure.patch(`/edit-comment?postId=${post?._id}`, commentData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', post?._id]);
        },
        onError: (err) => {
            console.error(err);
        }
    });

    // delete comment
    const { mutateAsync: deleteComment } = useMutation({
        mutationKey: ['comments', post?._id],
        enabled: !!post?._id,
        mutationFn: async (commentId) => {
            const res = await axiosSecure.delete(`/delete-comment?postId=${post?._id}&commentId=${commentId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', post?._id]);
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Your comment has been deleted successfully.',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (err) => {
            console.error(err);
        }
    })

    if (isLoading || commentLoading || verifyLoading) return <PostCardSkeleton />

    // console.log(likes);
    // console.log(comments);

    const alreadyLikedByCurrentUser = likes?.includes(user?.email) || false;
    const totalLikes = likes?.length || 0;
    // console.log(alreadyLikedByCurrentUser, totalLikes);

    // Add comment
    const handleAddComment = () => {
        if (!newComment.trim()) return;
        const comment = {
            text: newComment,
            author: user?.displayName,
            authorEmail: user?.email
        };
        if (comment?.text?.length > 0 && user?.displayName && user?.email) {
            postComment(comment)
        }
        // console.log(comment);
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

    // console.log(user);

    const buttonVariants = {
        initial: { opacity: 0, scale: 0.5 },
        inView: { opacity: 1, scale: 1 }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 md:p-6 mb-6 relative">
            {/* Top Row: Author + Menu */}
            <div className="flex justify-between items-start mb-4">
                {/* Author Info */}
                <div className="flex items-center">
                    <div className="relative">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.90 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            src={post?.author?.photoURL}
                            alt={post?.author?.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#DADCE0] dark:border-[#374151]"
                        />

                        {/* compare verification from server here */}
                        {
                            isUserVerified && <span className="text-blue-500 absolute -right-1 -bottom-1"><VscVerifiedFilled size={20} /></span>
                        }

                    </div>
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
                        className={`text-gray-700 dark:text-gray-200 transition-all ${isExpanded ? "" : "line-clamp-5"
                            }`}
                    >
                        {post.text}
                    </p>

                    {post.text.length > 200 && ( // show button if text is long
                        <button
                            onClick={toggleExpansion}
                            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-1 focus:outline-none"
                        >
                            {isExpanded ? "See Less" : "See More"}
                        </button>
                    )}
                </div>
            )}


            {/* Image */}
            {post?.image && (
                <motion.img
                    initial={{ opacity: 0.4 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    src={post.image}
                    alt="post"
                    className="w-full rounded-lg object-cover max-h-96 mb-3"
                />
            )}

            {/* Actions */}
            <div className="flex justify-around border-t border-gray-200 dark:border-gray-700 pt-3">
                <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileInView="inView"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    onClick={() => handleToggleLike(post._id)}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
                >
                    <HandThumbUpIcon
                        className={`w-5 h-5 ${alreadyLikedByCurrentUser ? "text-blue-500" : ""}`}
                    />
                    <span>{totalLikes}</span>
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileInView="inView"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer"
                >
                    <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                    <span>{comments.length}</span>
                </motion.button>

                <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileInView="inView"
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 cursor-pointer">
                    <ShareIcon className="w-5 h-5" />
                    <span>Share</span>
                </motion.button>
            </div>

            {/* Comment Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.75, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md md:max-w-2xl lg:max-w-4xl relative">
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
                            <div className="space-y-3 max-h-60 overflow-y-scroll mb-4">
                                {comments.length > 0 ? (
                                    comments.map((c) => (
                                        <CommentCard
                                            key={c?._id}
                                            comment={c}
                                            onDelete={deleteComment}
                                            onEdit={editComment}
                                        />
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
                                    className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none dark:text-white"
                                />
                                <button
                                    onClick={handleAddComment}
                                    className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <EditPostModal post={post} onClose={setIsEditModalOpen} onSave={handleSaveEdit} editLoading={editLoading} setEditLoading={setEditLoading} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default PostCard;
