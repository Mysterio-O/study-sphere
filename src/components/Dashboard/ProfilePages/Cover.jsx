import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import Button from "../../atoms/Button";
const Cover = ({ coverUrl, onCoverUpdate }) => {
  const coverInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleCoverUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      // Prepare form data for imgbb
      const formData = new FormData();
      formData.append('image', file);

      // Upload to imgbb
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

        Swal.fire({
          icon: 'success',
          title: 'Cover Updated',
          text: 'Your cover photo has been uploaded successfully!',
          timer: 2000,
          showConfirmButton: false,
        });

        // Call parent handler to save in your server
        if (onCoverUpdate) {
          onCoverUpdate(imageUrl);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Could not upload cover image. Try again.',
        });
      }

      setLoading(false);
    } catch (err) {
      console.error('Error uploading cover:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while uploading.',
      });
      setLoading(false);
    }

    // Reset file input (so same file can be reselected)
    e.target.value = null;
  };

  return (
    <section
      className="relative h-full w-full overflow-hidden bg-[#F8F9FA] dark:bg-[#2D3748]"
      style={{
        backgroundImage: coverUrl ? `url(${coverUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!coverUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F8F9FA]/80 dark:bg-[#2D3748]/80">
          <span className="text-[#5F6368] dark:text-[#D1D5DB] italic text-base font-roboto">
            No cover photo
          </span>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50"
        >
          <div className="loading loading-infinity loading-lg text-[#4285F4] dark:text-[#8AB4F8]"></div>
        </motion.div>
      )}

      {/* Upload button overlay */}
      <div className="absolute bottom-4 right-4">
        <input
          type="file"
          name="cover"
          ref={coverInputRef}
          onChange={handleCoverUpdate}
          accept="image/*"
          className="hidden"
        />
        <Button
          variant="sec_light"
          type="button"
          text={coverUrl ? 'Change Cover' : 'Upload Cover'}
          onClick={() => coverInputRef.current.click()}
          disabled={loading}
          className="px-4 py-2 text-sm"
          aria-label={coverUrl ? 'Change cover photo' : 'Upload cover photo'}
        />
      </div>
    </section>
  );
};

export default Cover;