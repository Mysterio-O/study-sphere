import React from 'react';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/setting-animation.json';

const Setting = () => {
    return (
        <div>
            <div>setting</div>
            <div>
                <LottieAnimation animationData={animation}/>
            </div>
        </div>
    );
};

export default Setting;