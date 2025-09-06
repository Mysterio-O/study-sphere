import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { UserCircleIcon, CameraIcon } from '@heroicons/react/24/solid';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const ProfilePicture = () => {
  const { setUserProfile, user } = useAuth();
  const profileUrl = user?.photoURL;
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleProfilePictureUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();

      if (data.success) {
        const imageUrl = data.data.url;

        await setUserProfile({ photoURL: imageUrl });
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile picture has been updated!',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Could not upload profile picture. Try again.',
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error updating profile picture:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while updating.',
      });
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-32 h-32 md:w-40 md:h-40"
      aria-label="Profile picture"
    >
      {/* Profile Image */}
      {profileUrl ? (
        <img
          src={profileUrl}
          alt="Profile"
          className={`w-full h-full rounded-full border-4 border-[#F8F9FA] dark:border-[#1F2937] shadow-lg object-cover transition duration-300 ${loading ? 'blur-sm' : ''}`}
        />
      ) : (
        <div
          className={`w-full h-full rounded-full border-4 border-[#F8F9FA] dark:border-[#1F2937] shadow-lg flex items-center justify-center bg-[#F8F9FA] dark:bg-[#2D3748] ${loading ? 'blur-sm' : ''}`}
        >
          <UserCircleIcon className="w-20 h-20 md:w-24 md:h-24 text-[#5F6368] dark:text-[#D1D5DB]" />
        </div>
      )}

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50 rounded-full">
          <div className="loading loading-infinity loading-md text-[#4285F4] dark:text-[#8AB4F8]"></div>
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
      <motion.button
        onClick={() => fileInputRef.current.click()}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-0 right-0 bg-[#F8F9FA] dark:bg-[#1F2937] p-2 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_4px_rgba(255,255,255,0.1)] hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A]"
        disabled={loading}
        aria-label="Update profile picture"
      >
        <CameraIcon className="w-5 h-5 text-[#4285F4] dark:text-[#8AB4F8]" />
      </motion.button>
    </motion.div>
  );
};

export default ProfilePicture;