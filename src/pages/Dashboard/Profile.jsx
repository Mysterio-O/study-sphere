import React from 'react';
import { motion } from 'motion/react';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Cover from '../../components/Dashboard/ProfilePages/Cover';
import ProfilePicture from '../../components/Dashboard/ProfilePages/ProfilePicture';
import PostInput from '../../components/Dashboard/ProfilePages/PostInput';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = new QueryClient();

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
            queryClient.invalidateQueries('my-posts')
            Swal.fire({
                icon: 'success',
                title: 'Posted!',
                text: 'Your post has been created successfully.',
            });
        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message,
            });
        }
    });

    // get my posts
    const { data: posts = [], isLoading: postLoading } = useQuery({
        queryKey: ['my-posts', user?.eamil],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/my-posts', {
                params: { email: user?.email }
            });
            return res.data;
        }
    });
    console.log(posts);


    if (coverLoading || postLoading) {
        return 'loading...'
    }

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
                <h2 className="text-2xl md:text-3xl font-bold text-[#202124] dark:text-[#F9FAFB]">
                    {user?.displayName || 'User'}
                </h2>
                <p className="text-base text-[#5F6368] dark:text-[#D1D5DB] mt-1">
                    {user?.email}
                </p>
            </div>

            {/* Post Input */}
            <div className="px-4 md:px-8">
                <PostInput onPostSubmit={onPostSubmit} />
            </div>
        </motion.section>
    );
};

export default Profile;