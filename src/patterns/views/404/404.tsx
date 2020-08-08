import React from 'react';

import { Template404, ITemplate404Props } from '../../templates/404';
import { ViewBase, IViewBaseProps } from '../base';

export interface IView404Props extends IViewBaseProps {
    template: ITemplate404Props;
}

const View404 = (props: IView404Props): JSX.Element => {
    const { template, ...viewBaseProps } = props;

    return (
        <ViewBase {...viewBaseProps}>
            <Template404 {...template} />
        </ViewBase>
    );
};

export default View404;
