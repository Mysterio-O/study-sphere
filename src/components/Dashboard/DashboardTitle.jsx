import React from 'react';
import useAuth from '../../hooks/useAuth';
import DecryptedText from '../../shared/DecryptedText';

const DashboardTitle = () => {
    const { user } = useAuth();
    let title
    if (user) {
        title = `Welcome ${user?.displayName}`
    }
    return (
        <h1 className='text-2xl text-center font-bold text-[#202124] dark:text-[#F9FAFB]'>
            {
                user && <DecryptedText
                    text={title}
                    speed={100}
                    maxIterations={20}
                    characters='ABCD1234!@#$%&*'
                    className='revealed'
                    parentClassName='all-letters'
                    encryptedClassName='encrypted'
                    animateOn="view"
                    revealDirection="center"
                />
            }
        </h1>
    );
};

export default DashboardTitle;