import React, { useRef, useState } from "react";
import { UserCircleIcon, CameraIcon } from "@heroicons/react/24/solid";
import useAuth from "../../../hooks/useAuth";

const ProfilePicture = () => {
    const { setUserProfile,user } = useAuth();
    const profileUrl = user?.photoURL;
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleProfilePictureUpdate = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        console.log(file);
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("image", file);

            console.log('uploading');
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            console.log("converting to json");
            const data = await res.json();

            if (data.success) {
                const imageUrl = data.data.url;
                console.log("Uploaded image URL:", imageUrl);

                console.log('uploading into firebase')
                setUserProfile({ photoURL: imageUrl })
                    .then(() => {
                        console.log("user photo updated");
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.error("error updating user photo", err);
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            console.error("Error uploading profile picture:", err);
        }
    };

    return (
        <div className="relative w-32 h-32">
            {/* Profile Image */}
            {profileUrl ? (
                <img
                    src={profileUrl}
                    alt="Profile"
                    className={`w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition duration-300 ${loading ? "blur-sm" : ""
                        }`}
                />
            ) : (
                <div
                    className={`w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gray-200 ${loading ? "blur-sm" : ""
                        }`}
                >
                    <UserCircleIcon className="w-20 h-20 text-gray-500" />
                </div>
            )}

            {/* Loading Spinner Overlay */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="loading loading-infinity loading-lg text-gray-700"></span>
                </div>
            )}

            {/* Hidden File Input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleProfilePictureUpdate}
            />

            {/* Upload Button */}
            <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-white/90 p-1 rounded-full shadow hover:bg-white"
                disabled={loading}
            >
                <CameraIcon className="w-4 h-4 text-gray-600" />
            </button>
        </div>
    );
};

export default ProfilePicture;
