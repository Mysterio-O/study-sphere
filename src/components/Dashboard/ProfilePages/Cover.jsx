import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

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
            formData.append("image", file);

            // Upload to imgbb
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();

            if (data.success) {
                const imageUrl = data.data.url;
                console.log("Cover uploaded URL:", imageUrl);

                Swal.fire({
                    icon: "success",
                    title: "Cover Updated",
                    text: "Your cover photo has been uploaded successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Call parent handler to save in your server
                if (onCoverUpdate) {
                    onCoverUpdate(imageUrl);
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Upload Failed",
                    text: "Could not upload cover image. Try again.",
                });
            }

            setLoading(false);
        } catch (err) {
            console.error("Error uploading cover:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while uploading.",
            });
            setLoading(false);
        }

        // Reset file input (so same file can be reselected)
        e.target.value = null;
    };

    return (
        <section
            className="h-52 w-full bg-gray-200 relative"
            style={{
                backgroundImage: coverUrl ? `url(${coverUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {!coverUrl && (
                <div className="h-full w-full flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500 italic">No cover photo</span>
                </div>
            )}

            {/* Loading overlay */}
            {loading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="loading loading-infinity loading-lg text-white"></span>
                </div>
            )}

            {/* Upload button overlay */}
            <div className="absolute bottom-2 right-2">
                <input
                    type="file"
                    name="cover"
                    ref={coverInputRef}
                    onChange={handleCoverUpdate}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => coverInputRef.current.click()}
                    className="bg-white/80 hover:bg-white px-3 py-1 text-sm rounded shadow"
                    disabled={loading}
                >
                    Upload Cover
                </button>
            </div>
        </section>
    );
};

export default Cover;
