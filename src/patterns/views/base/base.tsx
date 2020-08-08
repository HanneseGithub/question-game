import React from 'react';

import { Footer } from '../../modules/footer';
import { Header, IHeaderProps } from '../../modules/header';
import { Main } from '../../components/main';

export interface IViewBaseProps {
    children: React.ReactNode;
    header?: IHeaderProps;
}

const renderHeader: (header: IHeaderProps) => JSX.Element = (header: IHeaderProps): JSX.Element => (
    <Header {...header} />
);

const ViewBase = (props: IViewBaseProps): JSX.Element => (
    <React.Fragment>
        {props.header && renderHeader(props.header)}
        <Main>
            {props.children}
        </Main>
        <Footer />
    </React.Fragment>
);

export default ViewBase;
