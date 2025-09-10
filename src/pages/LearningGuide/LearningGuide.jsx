import React, { useState } from "react";
import { motion } from "motion/react";
import {
    MdDashboard,
    MdPerson,
    MdLibraryBooks,
    MdSchedule,
    MdQuestionAnswer,
    MdAccountBalanceWallet,
    MdSettings,
} from "react-icons/md";
import { FaBookOpen, FaTasks } from "react-icons/fa";

const sections = [
    {
        title: "Overview",
        icon: <MdDashboard size={22} />,
        description: (
            <>
                <p>
                    In the <strong>Overview</strong> page, you’ll get a quick summary of your
                    academic activities:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Total schedules, teachers, and subjects in cards</li>
                    <li>Weekly schedule overview in cards</li>
                    <li>Next class card (teacher, subject, time left)</li>
                    <li>Subject distribution chart</li>
                    <li>Quiz history with answers + charts</li>
                    <li>Wallet info with income/expenses and spending charts</li>
                </ul>
            </>
        ),
    },
    {
        title: "Profile",
        icon: <MdPerson size={22} />,
        description: (
            <>
                <p>Manage your personal profile easily:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Change profile picture and cover photo</li>
                    <li>Upload new posts</li>
                    <li>Edit or delete posts you created</li>
                </ul>
            </>
        ),
    },
    {
        title: "Add Subjects",
        icon: <FaBookOpen size={22} />,
        description: (
            <>
                <p>
                    Add new subjects with teacher name and phone number. This helps in
                    keeping your subjects organized for scheduling.
                </p>
            </>
        ),
    },
    {
        title: "My Subjects",
        icon: <MdLibraryBooks size={22} />,
        description: (
            <>
                <p>Keep track of all your subjects here:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>View, edit, or delete subjects</li>
                    <li>Set schedules for specific subjects</li>
                    <li>Directly call the teacher with the call icon</li>
                </ul>
            </>
        ),
    },
    {
        title: "All Schedules",
        icon: <MdSchedule size={22} />,
        description: (
            <>
                <p>
                    View all your assigned schedules in detail (subject, teacher, time).
                    You can also delete specific schedules from here.
                </p>
            </>
        ),
    },
    {
        title: "Q&A Generator",
        icon: <MdQuestionAnswer size={22} />,
        description: (
            <>
                <p>Boost your learning with AI-powered Q&A:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                        Generate random questions by type (MCQ, true/false, short answer)
                    </li>
                    <li>Choose difficulty level, topic, and number of questions</li>
                    <li>Submit answers and get them verified by AI instantly</li>
                </ul>
            </>
        ),
    },
    {
        title: "Study Planner",
        icon: <FaTasks size={22} />,
        description: (
            <>
                <p>Stay on top of your syllabus with planning tools:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Break long syllabus into short, manageable parts</li>
                    <li>Set goals and priorities</li>
                    <li>View your study plans with charts and cards</li>
                </ul>
            </>
        ),
    },
    {
        title: "My Wallet",
        icon: <MdAccountBalanceWallet size={22} />,
        description: (
            <>
                <p>Manage your finances with ease:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Add money to your wallet</li>
                    <li>Add expenses to track spending</li>
                    <li>See all transactions in a detailed list</li>
                </ul>
            </>
        ),
    },
    {
        title: "Settings",
        icon: <MdSettings size={22} />,
        description: (
            <>
                <p>Control your account and profile settings:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Update profile information</li>
                    <li>Verify email</li>
                    <li>Reset password</li>
                    <li>Delete account</li>
                </ul>
            </>
        ),
    },
];

const LearningGuide = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleSection = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="p-6 pt-40 pb-20 rounded-2xl shadow-md bg-white dark:bg-gray-900 transition-colors duration-300">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6"
            >
                📘 Learning Guide
            </motion.h2>
            <div className="space-y-4">
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                    >
                        <button
                            onClick={() => toggleSection(index)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 text-left"
                        >
                            <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-medium">
                                {section.icon} {section.title}
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                                {activeIndex === index ? "−" : "+"}
                            </span>
                        </button>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="p-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
                            >
                                {section.description}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LearningGuide;
