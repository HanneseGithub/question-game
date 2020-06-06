import React from 'react';

import Button, { IButtonProps } from '@button';
import Container from '@container';

export interface ITemplateLoginProps {
    button: IButtonProps;
}

const TemplateLogin: React.FC<ITemplateLoginProps> = (props: ITemplateLoginProps) => (
    <Container>
        <Button {...props.button} />
    </Container>
);

export default TemplateLogin;
