import React from 'react';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/setting-animation.json';
import SettingBody from '../../components/Dashboard/SettingBody';
import { CiSettings } from "react-icons/ci";

const Setting = () => {
    return (
        <div className='transition-colors duration-300'>
            <h3
            className='flex gap-1 text-3xl font-bold items-center text-black dark:text-white'
            ><CiSettings size={30} className='font-bold'/> Settings</h3>
            <div className='flex flex-col-reverse md:flex-row md:justify-between py-10'>
                <div>
                    <SettingBody />
                </div>
                <div>
                    <LottieAnimation animationData={animation} />
                </div>
            </div>
        </div>
    );
};

export default Setting;