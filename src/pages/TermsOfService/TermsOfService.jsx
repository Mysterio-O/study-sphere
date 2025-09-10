import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-16 transition-colors duration-300 pt-40 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex items-center gap-3 mb-8">
                    <DocumentTextIcon className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                    <h1 className="text-3xl font-bold">Terms of Service</h1>
                </div>

                <div className="space-y-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-300">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            By using this platform, you agree to comply with all the terms outlined here.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">2. User Responsibilities</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            Users must provide accurate information and use the platform for intended educational purposes only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">3. Platform Usage</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            You may not use the platform for harmful or illegal activities. Misuse may lead to account termination.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">4. Modifications</h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            We reserve the right to modify these terms at any time. Users will be notified of major changes.
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
