import React from 'react';
import QuizOverviewCard from './shared/QuizOverviewCard';

const QuizOverView = ({ difficulties }) => {
    const { easy = { solved: 0, correct: 0 }, medium = { solved: 0, correct: 0 }, hard = { solved: 0, correct: 0 } } = difficulties || {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center place-content-center w-full">
            <QuizOverviewCard
                solved={easy.solved}
                correct={easy.correct}
                type="easy"
            />
            <QuizOverviewCard
                solved={medium.solved}
                correct={medium.correct}
                type="medium"
            />
            <QuizOverviewCard
                solved={hard.solved}
                correct={hard.correct}
                type="hard"
            />
        </div>
    );
};

export default QuizOverView;