import React from 'react';

import Template404, { ITemplate404Props } from '@t-404';
import ViewBase, { IViewBaseProps } from '@v-base';

export interface IViewLoginProps extends IViewBaseProps {
    template: ITemplate404Props;
}

const View404: React.FC<IViewLoginProps> = (props: IViewLoginProps) => {
    const { template, ...viewBaseProps } = props;

    return (
        <ViewBase {...viewBaseProps}>
            <Template404 {...template} />
        </ViewBase>
    );
};

export default View404;
