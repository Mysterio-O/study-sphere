import React from 'react';
import { motion } from 'motion/react';
import { 
    HiOutlineCalendar, 
    HiOutlineQuestionMarkCircle, 
    HiOutlineUserGroup, 
    HiOutlineClipboardList 
} from 'react-icons/hi';

const features = [
    {
        id: 1,
        title: "Smart Scheduling",
        description: "Organize your classes and teacher details effortlessly, never miss a session.",
        icon: <HiOutlineCalendar className="w-12 h-12 text-white" />,
        gradient: "from-primary to-primary-dark",
        textColorLight: "text-[#202124]",
        textColorDark: "text-[#F9FAFB]"
    },
    {
        id: 2,
        title: "Random Questions Generator",
        description: "Practice dynamically generated questions based on topics and difficulty level.",
        icon: <HiOutlineQuestionMarkCircle className="w-12 h-12 text-white" />,
        gradient: "from-secondary to-secondary-dark",
        textColorLight: "text-[#202124]",
        textColorDark: "text-[#F9FAFB]"
    },
    {
        id: 3,
        title: "Wallet & Community",
        description: "Track income and expenses, interact with other students, and stay motivated.",
        icon: <HiOutlineUserGroup className="w-12 h-12 text-white" />,
        gradient: "from-accent to-accent-dark",
        textColorLight: "text-[#202124]",
        textColorDark: "text-[#F9FAFB]"
    },
    {
        id: 4,
        title: "Study Planner",
        description: "Break down huge tasks into smaller parts and complete them step by step.",
        icon: <HiOutlineClipboardList className="w-12 h-12 dark:text-white" />,
        gradient: "from-secondary-light to-secondary-dark",
        textColorLight: "text-[#202124]",
        textColorDark: "text-[#F9FAFB]"
    },
];

const Features = () => {
    return (
        <section className="py-20 px-6 md:px-20 lg:px-32 bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-3xl mx-auto mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-primary to-secondary 
                    dark:from-primary-dark dark:to-secondary-dark">
                    Key Features
                </h2>
                <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
                    StudySphere combines innovative tools to make your learning journey productive, fun, and organized.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {features.map(feature => (
                    <motion.div
                        key={feature.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center text-center transition-all duration-300"
                    >
                        <div className={`p-4 rounded-full bg-gradient-to-br ${feature.gradient} mb-4 flex items-center justify-center`}>
                            {feature.icon}
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${feature.textColorLight} dark:${feature.textColorDark}`}>
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;
