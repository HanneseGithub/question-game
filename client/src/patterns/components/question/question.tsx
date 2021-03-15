import React from 'react';

import { Answer, IAnswerProps } from '../../components/answer';

export interface IQuestionProps {
    questionNumber?: number;
    text: string;
    answers: IAnswerProps[];
    lastQuestion: boolean;
    gagag: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
}

const Question = (props: IQuestionProps): JSX.Element => {
    const { answers, text, questionNumber } = props;

    const answerComponents = answers.map((answer: IAnswerProps, index: number) => {
        let modifier;

        if (index === 0) {
            modifier = 'answer--first';
        }

        return (
            <Answer
                key={answer.text}
                {...answer}
                index={index + 1}
                modifier={modifier}
                onClick={props.onClick}
            />
        );
    });

    return (
        <div className='question'>
            <div className='question__title'>
                {`Küsimus ${questionNumber}`.toUpperCase()}
            </div>
            <div className='question__text'>
                {text}
            </div>
            <div className='question__answers'>
                {answerComponents}
            </div>
        </div>
    );
};

export default Question;
