import React from "react";
import { motion } from "motion/react";
import { HiOutlineCalendar, HiOutlineQuestionMarkCircle, HiOutlineUserGroup, HiOutlineClipboardList } from "react-icons/hi";

const features = [
    {
        id: 1,
        title: "Smart Scheduling",
        description: "Organize your classes and teacher details effortlessly, never miss a session.",
        icon: <HiOutlineCalendar className="w-12 h-12 text-white" />,
        bgColor: "bg-[#4285F4] dark:bg-[#8AB4F8]",
        gradient: "from-[#4285F4] to-[#3367D6] dark:from-[#8AB4F8] dark:to-[#6B7280]",
    },
    {
        id: 2,
        title: "Random Questions Generator",
        description: "Practice dynamically generated questions based on topics and difficulty level.",
        icon: <HiOutlineQuestionMarkCircle className="w-12 h-12 text-white" />,
        bgColor: "bg-[#34A853] dark:bg-[#6EE7B7]",
        gradient: "from-[#34A853] to-[#0F9D58] dark:from-[#6EE7B7] dark:to-[#059669]",
    },
    {
        id: 3,
        title: "Wallet & Community",
        description: "Track income and expenses, interact with other students, and stay motivated.",
        icon: <HiOutlineUserGroup className="w-12 h-12 text-white" />,
        bgColor: "bg-[#FBBC04] dark:bg-[#F4D03F]",
        gradient: "from-[#FBBC04] to-[#F9AB00] dark:from-[#F4D03F] dark:to-[#D97706]",
    },
    {
        id: 4,
        title: "Study Planner",
        description: "Break down huge tasks into smaller parts and complete them step by step.",
        icon: <HiOutlineClipboardList className="w-12 h-12 text-white" />,
        bgColor: "bg-[#E6F4EA] dark:bg-[#064E3B]",
        gradient: "from-[#E6F4EA] to-[#0F9D58] dark:from-[#064E3B] dark:to-[#059669]",
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen place-items-center place-content-center px-6 py-28 md:px-20 lg:px-32 bg-[#FFFFFF] dark:bg-[#121212]">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto mb-12"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#34A853] dark:from-[#8AB4F8] dark:to-[#6EE7B7]">
                    About StudySphere
                </h2>
                <p className="mt-4 text-[#202124] dark:text-[#F9FAFB] text-lg md:text-xl">
                    StudySphere is your all-in-one student companion. Plan, practice, track, and grow efficiently with our powerful features designed to make learning fun, structured, and engaging.
                </p>
            </motion.div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
                        style={{ backgroundColor: 'var(--surface)' }}
                    >
                        <div className={`p-4 rounded-full bg-gradient-to-br ${feature.gradient} mb-4 flex items-center justify-center`}>{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-[#202124] dark:text-[#F9FAFB] mb-2">{feature.title}</h3>
                        <p className="text-[#5F6368] dark:text-[#D1D5DB]">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;