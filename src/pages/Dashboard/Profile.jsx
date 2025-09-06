import React from "react";
import useAuth from "../../hooks/useAuth";
import Cover from "../../components/Dashboard/ProfilePages/Cover";
import ProfilePicture from "../../components/Dashboard/ProfilePages/ProfilePicture";
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = new QueryClient();

    // get cover url
    const { data: coverUrl = "",refetch } = useQuery({
        queryKey: ['cover-photo', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/cover-photo`, {
                params: { email: user?.email }
            });
            return res.data;
        }
    });
    console.log(coverUrl);


    const { mutateAsync: onCoverUpdate } = useMutation({
        mutationKey: ['cover-photo', user?.email],
        mutationFn: async (coverUrl) => {
            const res = await axiosSecure.patch(`/upload-cover?email=${user?.email}`, { coverUrl });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries('cover-photo');
            refetch();
        }
    })

    return (
        <section className="w-full h-full">
            {/* Cover Section */}
            <div className="relative">
                <Cover coverUrl={coverUrl} onCoverUpdate={onCoverUpdate} />

                {/* Profile Picture overlaps cover */}
                <div className="absolute -bottom-16 left-8">
                    <ProfilePicture />
                </div>
            </div>

            {/* Extra spacing to push content below the profile pic */}
            <div className="h-20"></div>

            {/* User details / other profile sections */}
            <div className="px-8">
                <h2 className="text-2xl font-semibold">{user?.displayName || "User"}</h2>
                <p className="text-gray-600">{user?.email}</p>
            </div>
        </section>
    );
};

export default Profile;
