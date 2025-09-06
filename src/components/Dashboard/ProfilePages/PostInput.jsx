import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import Button from "../../atoms/Button";

const PostInput = ({ onPostSubmit }) => {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !preview) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Post',
        text: 'Write something or upload an image.',
      });
      return;
    }

    try {
      setLoading(true);

      let imageUrl = null;
      if (fileInputRef.current.files[0]) {
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`,
          { method: 'POST', body: formData }
        );
        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
        }
      }

      const postData = {
        author: {
          name: user?.displayName || 'Anonymous',
          email: user?.email,
          photoURL: user?.photoURL,
        },
        text,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };
      console.log(postData);

      if (onPostSubmit) {
         onPostSubmit(postData);
      }
      setText('');
      setPreview(null);
      fileInputRef.current.value = null;
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-[#F8F9FA] dark:bg-[#2D3748] p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)] space-y-4 font-roboto"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full border border-[#DADCE0] dark:border-[#374151] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4285F4] resize-none text-[#202124] dark:text-[#F9FAFB] dark:bg-[#1F2937] dark:placeholder-[#D1D5DB] transition-all duration-200"
        rows="3"
        disabled={loading}
        aria-label="Post content"
      />

      {/* Image Preview */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-40 h-40"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full rounded-lg border border-[#DADCE0] dark:border-[#374151] object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              fileInputRef.current.value = null;
            }}
            className="absolute top-2 right-2 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-full p-1 shadow hover:bg-[#E8F0FE] dark:hover:bg-[#1E3A8A]"
            aria-label="Remove preview"
          >
            <XMarkIcon className="w-4 h-4 text-[#202124] dark:text-[#F9FAFB]" />
          </button>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 text-sm text-[#4285F4] dark:text-[#8AB4F8] hover:text-[#3367D6] dark:hover:text-[#6B7280]"
          aria-label="Add photo"
        >
          <PhotoIcon className="w-5 h-5" />
          Add Photo
        </button>

        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <Button
          type="submit"
          text={loading ? 'Posting...' : 'Post'}
          variant="primary"
          disabled={loading}
          className="px-6 py-2"
          aria-label="Submit post"
        />
      </div>
    </motion.form>
  );
};

export default PostInput;