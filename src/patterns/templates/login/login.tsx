import React from 'react';

import { Button, IButtonProps } from '../../components/button';
import { Container } from '../../components/container';

export interface ITemplateLoginProps {
    button: IButtonProps;
}

const TemplateLogin = (props: ITemplateLoginProps): JSX.Element => (
    <Container>
        <Button {...props.button} />
    </Container>
);

export default TemplateLogin;
