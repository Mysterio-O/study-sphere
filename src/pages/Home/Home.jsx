import React from 'react';
import Banner from '../../components/Home/Banner';
import Features from '../../components/Home/Features';
import StudyPlannerPreview from '../../components/Home/StudyPlannerPreview';
import Testimonials from '../../components/Home/Testimonials';
import Statistics from '../../components/Home/Statistics';

const Home = () => {
    return (
        <div className='min-h-screen place-items-center place-content-center'>
            <Banner />
            <Features />
            <StudyPlannerPreview />
            <Statistics />
            <Testimonials />
        </div>
    );
};

export default Home;