import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import animation403 from "../../assets/animation/forbidden403.json"
import LottieAnimation from "../../shared/LottieAnimation";

const Error403 = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <div className="w-64 h-64 mx-auto">
          <LottieAnimation animationData={animation403} />
        </div>
        <h1 className="text-5xl font-bold mt-4">403</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Forbidden! You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 rounded-xl font-medium bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md hover:shadow-lg transition"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error403;
