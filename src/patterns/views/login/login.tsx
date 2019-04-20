import React from 'react';

import TemplateLogin, { ITemplateLoginProps } from '@t-login';
import ViewBase, { IViewBaseProps } from '@v-base';

export interface IViewLoginProps extends IViewBaseProps {
    login: ITemplateLoginProps;
}

const ViewLogin: React.FC<IViewLoginProps> = (props: IViewLoginProps) => {
    const { login, ...viewBaseProps } = props;

    return (
        <ViewBase {...viewBaseProps}>
            <TemplateLogin {...login} />
        </ViewBase>
    );
};

export default ViewLogin;
