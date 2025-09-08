import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "motion/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import scheduleImage from "../../assets/banner/Smart-Scheduling.png";
import randomQuestionsImage from "../../assets/banner/Random-Questions.png";
import walletImage from "../../assets/banner/Wallet-Community.png";
import Button from "../atoms/Button";
import { Link } from "react-router";

const slides = [
    {
        id: 1,
        title: "Smart Scheduling",
        description: "Plan your study sessions with schedules.",
        image: scheduleImage,
        buttonText: "View Schedule",
        buttonVariant: "primary",
        to: '/dashboard/my-schedules'
    },
    {
        id: 2,
        title: "Q&A Generator",
        description: "Test yourself with random practice questions AI Generated questions anytime.",
        image: randomQuestionsImage,
        buttonText: "Practice Now",
        buttonVariant: "secondary",
        to: "/dashboard/qa-generator"
    },
    {
        id: 3,
        title: "Wallet Overview",
        description: "Keep track on your pocket-money.",
        image: walletImage,
        buttonText: "Join Community",
        buttonVariant: "outline",
        to: '/dashboard/my-wallet'
    },
];

const Banner = () => {
    return (
        <div className="relative w-full py-20 md:py-10">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                loop
                className="w-full h-[80vh]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center h-[80vh] px-6 md:px-24 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 gap-12 md:gap-20">
                            {/* Left Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex justify-center"
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="max-h-[60vh] w-auto object-contain rounded-md"
                                />
                            </motion.div>

                            {/* Right Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex flex-col gap-6 md:gap-8 text-center md:text-left max-w-xl"
                            >
                                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] to-[#34A853] dark:from-[#8AB4F8] dark:to-[#6EE7B7]">
                                    {slide.title}
                                </h2>
                                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                                    {slide.description}
                                </p>
                                <Link to={slide.to}>
                                    <Button
                                        variant={slide.buttonVariant}
                                        text={slide.buttonText}
                                        onClick={() => console.log(`${slide.buttonText} clicked`)}
                                    />
                                </Link>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;