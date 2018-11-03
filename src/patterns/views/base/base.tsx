import React from 'react';

import Header, { IHeaderProps } from '@m-header';
import Main from '@main';

export interface IViewBaseProps {
    header: IHeaderProps;
}

export default class ViewBase extends React.Component<IViewBaseProps> {
    render(): JSX.Element {
        return (
            <React.Fragment>
                <Header {...this.props.header} />
                <Main>
                    {this.props.children}
                </Main>
            </React.Fragment>
        );
    }
}
