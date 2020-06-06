import React from 'react';

import Container from '@container';

export interface ITemplate404Props {
    title: string;
}

const Template404: React.FC<ITemplate404Props> = (props: ITemplate404Props) => (
    <Container>
        <h1>{props.title}</h1>
    </Container>
);

export default Template404;
