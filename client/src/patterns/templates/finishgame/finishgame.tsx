import React from 'react';

import { IFinishProps, Finish } from '../../components/finish';
import { Container } from '../../components/container';

const TemplateFinishGame = (props: IFinishProps): JSX.Element => (
    <Container className='question-wrapper'>
        <Finish {...props} />
    </Container>
);

export default TemplateFinishGame;
