import React from 'react';

import { Answer, IAnswerProps } from '../../components/answer';

export interface IFinishProps {
    score: number;
    answers: IAnswerProps[];
    onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
}

const Finish = (props: IFinishProps): JSX.Element => {
    const { answers, score } = props;
    const finishModifier: string = 'answer--small';

    const finalResult = answers.map((answer: IAnswerProps, index: number) => {
        let guessModifier: string = '';

        if (answer.guess) {
            guessModifier = 'answer--correct';
        } else {
            guessModifier = 'answer--incorrect';
        }

        return (
            <Answer
                key={answer.text}
                {...answer}
                index={index + 1}
                modifier={`${finishModifier} ${guessModifier}`}
                onClick={props.onClick}
            />
        );
    });

    return (
        <div className='question question--finished'>
            <div className='question__title'>
                {'Tulemus'.toUpperCase()}
            </div>
            <div className='question__text'>
                {`Te vastasite õigesti ${score}/${answers.length}-st küsimusest!`}
            </div>
            <div className='question__answers'>
                {finalResult}
            </div>
        </div>
    );
};

export default Finish;
