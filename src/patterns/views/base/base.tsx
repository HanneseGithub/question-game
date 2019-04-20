import React from 'react';

import Header, { IHeaderProps } from '@m-header';
import Main from '@main';

export interface IViewBaseProps {
    children: React.ReactNode;
    header?: IHeaderProps;
}

const renderHeader: (header: IHeaderProps) => JSX.Element = (header: IHeaderProps): JSX.Element => {
    return (
        <Header {...header} />
    );
};

const ViewBase: React.FC<IViewBaseProps> = (props: IViewBaseProps) => {
    return (
        <React.Fragment>
            {props.header && renderHeader(props.header)}
            <Main>
                {props.children}
            </Main>
        </React.Fragment>
    );
};

export default ViewBase;
