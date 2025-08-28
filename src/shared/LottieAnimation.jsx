import Lottie from 'lottie-react';
import React from 'react';
import animationJSON from '../assets/animation/STUDENT.json';

const LottieAnimation = () => {
    return (
        <Lottie animationData={animationJSON} loop={true}/>
    );
};

export default LottieAnimation;