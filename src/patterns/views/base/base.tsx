import React from 'react';

import Footer from '@m-footer';
import Header, { IHeaderProps } from '@m-header';
import Main from '@main';

export interface IViewBaseProps {
    children: React.ReactNode;
    header?: IHeaderProps;
}

const renderHeader: (header: IHeaderProps) => JSX.Element = (header: IHeaderProps): JSX.Element => (
    <Header {...header} />
);

const ViewBase: React.FC<IViewBaseProps> = (props: IViewBaseProps) => (
    <React.Fragment>
        {props.header && renderHeader(props.header)}
        <Main>
            {props.children}
        </Main>
        <Footer />
    </React.Fragment>
);

export default ViewBase;
