import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact form submitted:', formData);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto p-6 bg-[#F8F9FA] dark:bg-[#1F2937] rounded-lg shadow-md my-20"
        >
            <h2 className="text-2xl font-semibold text-[#202124] dark:text-[#F9FAFB] mb-6">Contact Us</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <MapPinIcon className="h-6 w-6 text-[#4285F4] dark:text-[#8AB4F8]" />
                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">123 StudySphere St, Dhaka, Bangladesh</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <PhoneIcon className="h-6 w-6 text-[#34A853] dark:text-[#6EE7B7]" />
                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">+880 1234 56789</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <EnvelopeIcon className="h-6 w-6 text-[#FBBC04] dark:text-[#F4D03F]" />
                        <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">hello@studysphere.app</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-3 py-2 border border-[#DADCE0] dark:border-[#374151] rounded-md bg-white dark:bg-[#121212] text-[#202124] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full px-3 py-2 border border-[#DADCE0] dark:border-[#374151] rounded-md bg-white dark:bg-[#121212] text-[#202124] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#34A853]"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        required
                        className="w-full px-3 py-2 border border-[#DADCE0] dark:border-[#374151] rounded-md bg-white dark:bg-[#121212] text-[#202124] dark:text-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-[#FBBC04] h-32 resize-none"
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        type="submit"
                        className="px-4 py-2 bg-[#4285F4] dark:bg-[#8AB4F8] text-white rounded-md font-medium"
                    >
                        Send Message
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default ContactUs;