import React from 'react';

import { TemplateLogin, ITemplateLoginProps } from '../../templates/login';
import { ViewBase, IViewBaseProps } from '../base';

export interface IViewLoginProps extends IViewBaseProps {
    login: ITemplateLoginProps;
}

const ViewLogin = (props: IViewLoginProps): JSX.Element => {
    const { login, ...viewBaseProps } = props;

    return (
        <ViewBase {...viewBaseProps}>
            <TemplateLogin {...login} />
        </ViewBase>
    );
};

export default ViewLogin;
