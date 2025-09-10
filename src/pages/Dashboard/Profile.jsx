import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Cover from '../../components/Dashboard/ProfilePages/Cover';
import ProfilePicture from '../../components/Dashboard/ProfilePages/ProfilePicture';
import PostInput from '../../components/Dashboard/ProfilePages/PostInput';
import Swal from 'sweetalert2';
import Button from '../../components/atoms/Button';
import PostCard from '../../components/Dashboard/ProfilePages/PostCard';
import ProfileSkeleton from '../../components/skeletons/ProfileSkeleton';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showPostInput, setShowPostInput] = useState(false);
    const [editLoading, setEditLoading] = useState(false)
    const profile = true;
    console.log(user);

    const [page, setPage] = useState(1);
    const limit = 10;

    // Get cover url
    const { data: coverUrl = "", refetch, loading: coverLoading } = useQuery({
        queryKey: ['cover-photo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/cover-photo`, {
                params: { email: user?.email },
            });
            return res.data;
        },
    });

    //   update cover
    const { mutateAsync: onCoverUpdate } = useMutation({
        mutationKey: ['cover-photo', user?.email],
        mutationFn: async (coverUrl) => {
            const res = await axiosSecure.patch(`/upload-cover?email=${user?.email}`, { coverUrl });
            return res.data;
        },
        onSuccess: () => {
            refetch();
        },
    });

    // add new post
    const { mutateAsync: onPostSubmit } = useMutation({
        mutationKey: ['my-posts', user?.email],
        enabled: !!user?.email,
        mutationFn: async (postData) => {
            const res = await axiosSecure.post(`/create-post?email=${user?.email}`, { postData });
            return res.data;
        },
        onSuccess: () => {
            refreshPosts();
            Swal.fire({
                icon: 'success',
                title: 'Posted!',
                text: 'Your post has been created successfully.',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    // get my posts
    const { data, isLoading: postLoading, refetch: refreshPosts } = useQuery({
        queryKey: ['my-posts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-posts', {
                params: { email: user?.email, page, limit }
            });
            return res.data;
        }
    });

    // delete post
    const { mutateAsync: handleDeletePost } = useMutation({
        mutationKey: ['my-posts', user?.email],
        enabled: !!user?.email,
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/delete-post?id=${id}&email=${user?.email}`);
            return res.data
        },
        onSuccess: () => {
            refreshPosts();
            Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text: 'Your post has been deleted successfully.',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    // edit post
    const { mutateAsync: handleEditPost } = useMutation({
        mutationKey: ['my-posts', user?.email],
        enabled: !!user?.email,
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/update-post?email=${user?.email}`, { data });
            console.log(res);
            return res.data;
        },
        onSuccess: () => {
            setEditLoading(false)
            refreshPosts();
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Your post has been updated successfully.',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        },
        onError: (err) => {
            setEditLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    });

    const posts = data?.posts || [];
    const totalPages = data?.totalPages || 1;
    console.log(posts);

    if (coverLoading || postLoading) return <ProfileSkeleton />

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen bg-[#F8F9FA] dark:bg-[#1F2937] font-roboto"
        >
            {/* Cover Section */}
            <div className="relative h-64 md:h-80">
                <Cover coverUrl={coverUrl} onCoverUpdate={onCoverUpdate} />

                {/* Profile Picture overlaps cover */}
                <div className="absolute bottom-0 left-4 md:left-8 transform translate-y-1/2">
                    <ProfilePicture />
                </div>
            </div>

            {/* User Details */}
            <div className="px-4 md:px-8 pt-20 md:pt-24 pb-6">
                <div className='flex items-center gap-2'>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#202124] dark:text-[#F9FAFB]">
                        {user?.displayName || 'User'}
                    </h2>
                    <span className={`${user?.emailVerified ? 'text-blue-500' : 'text-[#F9AB00]'} text-base font-bold`}>({user?.emailVerified ? 'Verified': 'Not Verified'})</span>
                </div>
                <p className="text-base text-[#5F6368] dark:text-[#D1D5DB] mt-1">
                    {user?.email}
                </p>
            </div>
            <div className="px-4 md:px-8">
                {/* Action Buttons */}
                <div className="flex gap-4 mb-6">
                    <Button
                        variant="primary"
                        type="button"
                        text="Home"
                        onClick={() => setShowPostInput(false)}
                    />
                    <Button
                        variant="outline"
                        type="button"
                        text="Post"
                        onClick={() => setShowPostInput(true)}
                    />
                </div>

                {/* Conditional Post Input */}
                {showPostInput && (
                    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 md:p-6">
                        <PostInput onPostSubmit={onPostSubmit} />
                    </div>
                )}
            </div>

            {/* Posts */}
            <div className="mt-6">
                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-24 h-24 text-[#FBBC04] dark:text-[#F4D03F] mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12h6m-3-3v6m6 6H6a2 2 0 01-2-2V6a2 2 0 012-2h7"
                            />
                        </svg>
                        <h3 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-2">
                            No Posts Yet
                        </h3>
                        <p className="text-[#5F6368] dark:text-[#D1D5DB] mb-4">
                            It looks like you haven't created any posts yet. Share your thoughts or updates with the community!
                        </p>
                        <Button
                            variant="secondary"
                            text="Create Your First Post"
                            onClick={() => setShowPostInput(true)}
                        />
                    </div>
                ) : (
                    posts.map(post => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onEdit={handleEditPost}
                            onDelete={handleDeletePost}
                            editLoading={editLoading}
                            setEditLoading={setEditLoading}
                            profile={profile}
                        />
                    ))
                )}

            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-4">
                    <button
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

        </motion.section>
    );
};

export default Profile;