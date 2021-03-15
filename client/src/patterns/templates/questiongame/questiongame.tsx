import React from 'react';

import { IQuestionProps, Question } from '../../components/question';
import { Container } from '../../components/container';

const TemplateQuestionGame = (props: IQuestionProps): JSX.Element => (
    <Container className='question-wrapper'>
        <Question {...props} />
    </Container>
);

export default TemplateQuestionGame;
