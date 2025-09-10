import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-16 transition-colors duration-300 pt-40 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex items-center gap-3 mb-8">
                    <ShieldCheckIcon className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                </div>

                <div className="space-y-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We collect information you provide directly to us, such as your name, email,
                            and any learning activity data within the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. How We Use Information</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Your data helps us improve user experience, generate learning analytics, and
                            provide personalized study tools.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We implement strict security measures to protect your data and prevent unauthorized access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Some services may be powered by third-party providers. We ensure they comply with privacy regulations.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
