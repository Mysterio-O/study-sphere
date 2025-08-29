import Lottie from 'lottie-react';
import React from 'react';


const LottieAnimation = ({animationData}) => {
    return (
        <Lottie animationData={animationData} loop={true}/>
    );
};

export default LottieAnimation;