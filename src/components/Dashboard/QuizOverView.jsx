import React from 'react';
import QuizOverviewCard from '../../pages/Dashboard/shared/QuizOverviewCard';

const QuizOverView = ({ myQuizProgression, onCardClick  }) => {
    const difficulties = myQuizProgression?.byDifficulty
    const { totalCorrectAnswers, totalQuestionSolved } = myQuizProgression;
    const { easy = { solved: 0, correct: 0 }, medium = { solved: 0, correct: 0 }, hard = { solved: 0, correct: 0 } } = difficulties || {};

    console.log(myQuizProgression);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center place-content-center w-full">
            <QuizOverviewCard
                solved={easy.solved}
                correct={easy.correct}
                type="easy"
                text="easy"
                onClick={()=> onCardClick('easy')}
            />
            <QuizOverviewCard
                solved={medium.solved}
                correct={medium.correct}
                type="medium"
                text="medium"
                onClick={()=> onCardClick('medium')}
            />
            <QuizOverviewCard
                solved={hard.solved}
                correct={hard.correct}
                type="hard"
                text="hard"
                onClick={()=> onCardClick('hard')}
            />
            <QuizOverviewCard
                solved={totalQuestionSolved}
                correct={totalCorrectAnswers}
                type="total"
                text="Total Overview"
                onClick={()=> onCardClick('total')}
            />
        </div>
    );
};

export default QuizOverView;