import React from "react";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

const CookiesPolicy = () => {
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
                    <h1 className="text-3xl font-bold">Cookies Policy</h1>
                </div>

                <div className="space-y-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. What Are Cookies?</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Cookies are small files stored on your device to enhance your browsing experience.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. How We Use Cookies</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We use cookies for analytics, performance tracking, and to remember your preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. Managing Cookies</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            You can manage or disable cookies via your browser settings, but some features may not work properly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Third-Party Cookies</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Third-party services may place cookies for analytics and ads. We do not control these cookies.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default CookiesPolicy;
