import React, { useState, useEffect } from 'react';
import { TemplateQuestionGame } from '../../../patterns/templates/questiongame';
import { TemplateFinishGame } from '../../../patterns/templates/finishgame';
import { IQuestionProps } from '../../../patterns/components/question';
import { IAnswerProps } from '../../../patterns/components/answer';

interface IAnswerDetails {
    guess: boolean,
    text: string,
}

const QuestionGame = (): JSX.Element => {
    const [ question, setQuestion ] = useState<any>(() => []);
    const [ questionNumber, setQuestionNumber ] = useState<number>(() => 1);
    const [ answeredQuestions, setAnsweredQuestions ] = useState<IAnswerProps[]>(() => []);
    const [ score, setScore ] = useState<number>(() => 0);
    const [ finished, setFinished ] = useState<boolean>(() => false);

    console.log(answeredQuestions);

    // Fetch initial data first time the component loads
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/')
            .then((response) => response.json())
            .then((json) => setQuestion((prevQuestion: []) => ({ ...prevQuestion, ...json })));
    }, []);
    console.log(question);

    const handleOnClick = (e: React.SyntheticEvent): void => {
        const { lastQuestion, question: { correctAnswer } } = question;
        const currentAnswerId = e.currentTarget.getAttribute('data-answer-id');
        const currentAnswerText = e.currentTarget.querySelector('.answer__text')?.innerHTML;

        const answerDetails: IAnswerDetails = {
            guess: false,
            text: '',
        };

        if (currentAnswerText) {
            answerDetails.text = currentAnswerText;
        }

        if (currentAnswerId === correctAnswer) {
            answerDetails.guess = true;
            setScore((prevScore) => prevScore + 1);
        } else {
            answerDetails.guess = false;
        }

        setAnsweredQuestions((prevAnsweredQuestions) => {
            return [...prevAnsweredQuestions, answerDetails];
        });

        // When there are questions remaining, send a POST fetch.
        if (!lastQuestion) {
            fetch(`http://127.0.0.1:8000/api/${currentAnswerId}`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                method: 'POST',
            })
                .then((response) => response.json())
                .then((json) => {
                    setQuestion((prevQuestion: IQuestionProps) => ({ ...prevQuestion, ...json }));
                    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
                });
        } else {
            setFinished(true);
        }
    };

    if (Object.keys(question).length === 0 || !question) {
        return <div>Still loading...</div>;
    } else {
        const { question: { correctAnswer, ...questionData } } = question;

        if (finished) {
            return (
                <TemplateFinishGame answers={...answeredQuestions} score={score}/>
            );
        } else {
            return (
                <TemplateQuestionGame {...questionData} onClick={handleOnClick} questionNumber={questionNumber}/>
            );
        }
    }
};

export default QuestionGame;
