import React from 'react';

import { Button, IButtonProps } from '../../components/button';
import { Container } from '../../components/container';

export interface ITemplateLoginProps {
    button: IButtonProps;
}

const TemplateLogin: React.FC<ITemplateLoginProps> = (props: ITemplateLoginProps) => (
    <Container>
        <Button {...props.button} />
    </Container>
);

export default TemplateLogin;
