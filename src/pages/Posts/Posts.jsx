import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PostCard from '../../components/Dashboard/ProfilePages/PostCard';
import PostCardSkeleton from '../../components/skeletons/PostCardSkeleton';
const Posts = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [page, setPage] = useState(1);
    const limit = 20;

    const { data: postData = {}, isLoading } = useQuery({
        queryKey: ['posts', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-posts', {
                params: { page: page, limit: limit }
            });
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <PostCardSkeleton />


    // console.log(postData);
    const { posts = [], totalPages = 1 } = postData;

    if (posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600 dark:text-gray-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-gray-400 dark:text-gray-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9M4.5 6.75h15a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 18V9a2.25 2.25 0 012.25-2.25z"
                    />
                </svg>
                <h2 className="text-lg font-medium">No posts yet</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    When new posts are added, they’ll appear here.
                </p>
            </div>
        )
    }

    return (
        <div className='py-28'>
            <div className='px-10 flex flex-col gap-6'>
                {
                    posts.map(post => <PostCard key={post._id} post={post} />)
                }
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
        </div>
    );
};

export default Posts;