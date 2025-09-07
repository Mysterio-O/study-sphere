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

    if(isLoading) return <PostCardSkeleton />


    console.log(postData);
    const { posts = [], totalPages = 1 } = postData;

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