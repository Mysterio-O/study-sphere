import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'motion/react';

const EditPostModal = ({ post, onClose, onSave, editLoading, setEditLoading }) => {
    const [newText, setNewText] = useState(post?.text || "");
    const [newImage, setNewImage] = useState(post?.image || "");
    const [preview, setPreview] = useState(post?.image || "");

    // Handle file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file); // keep actual file
            setPreview(URL.createObjectURL(file)); // preview with blob URL
        }
    };
    console.log(newImage);
    // Save
    const handleSubmit = async () => {
        // console.log('new text', newText);
        setEditLoading(true);
        const formData = new FormData();
        let newImageUrl = ''
        if (newImage) {
            formData.append('image', newImage)
        }

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`,
            {
                method: 'POST',
                body: formData,
            }
        );
        const data = await res.json();

        if (data.success) {
            newImageUrl = data.data.url;
            console.log('success->', newImageUrl);
        }

        const updatedData = {
            id: post._id,
            newText,
            newImageUrl
        };
        onSave(updatedData);
    };

    return (
        <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white/40 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
            {
                !editLoading ? <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-md relative">
                    {/* Close button */}
                    <button
                        onClick={() => onClose(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                    >
                        ✕
                    </button>

                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                        Edit Post
                    </h2>

                    {/* Text input */}
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        rows={4}
                        className="w-full border rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none"
                        placeholder="What's on your mind?"
                    />

                    {/* Image preview */}
                    {preview && (
                        <div className="mb-4">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}

                    {/* File input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-4"
                    />

                    {/* Actions */}
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => onClose(false)}
                            className="px-4 py-2 text-sm bg-gray-300 dark:bg-gray-600 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
                    : <span className="loading loading-bars loading-xl"></span>
            }
        </motion.div>
    );
};

export default EditPostModal;
