import React from 'react';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import StudyPlannerPreview from '../../components/Home/StudyPlannerPreview';

const Home = () => {
    return (
        <div className='min-h-screen place-items-center place-content-center'>
            <Banner />
            <Features />
            <StudyPlannerPreview />
        </div>
    );
};

export default Home;