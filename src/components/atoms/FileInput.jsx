import React, { useState } from "react";

const FileInput = ({ name, type, onChange }) => {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        }
        onChange && onChange(e); // keep parent handler working
    };

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor="photo"
                className="block text-[#5F6368] dark:text-[#D1D5DB] text-sm font-medium"
            >
                Upload Photo
            </label>

            <label
                htmlFor="photo"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#DADCE0] dark:border-[#374151] rounded-lg cursor-pointer bg-[#F8F9FA] dark:bg-[#1F2937] hover:border-[#4285F4] transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-[#5F6368] dark:text-[#D1D5DB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a1 1 0 001 1h14a1 1 0 001-1v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9"
                    />
                </svg>
                <span className="mt-2 text-sm text-[#5F6368] dark:text-[#D1D5DB]">
                    {fileName ? "File Selected" : "Click to upload or drag & drop"}
                </span>
                <span className="text-xs text-[#9CA3AF] dark:text-[#9CA3AF]">
                    {fileName ? fileName : "PNG, JPG, JPEG"}
                </span>
            </label>

            <input
                id="photo"
                type={type}
                name={name}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileInput;
