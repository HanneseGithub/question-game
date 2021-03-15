import React from 'react';

import { Container } from '../../components/container';

export interface ITemplate404Props {
    title: string;
}

const Template404 = (props: ITemplate404Props): JSX.Element => (
    <Container>
        <h1>{props.title}</h1>
    </Container>
);

export default Template404;
