import React from 'react';

import Container from '@container';
import Navigation, { INavigationProps } from '@navigation';

if (process.env.webpack) {
    require('./header.scss');
}

export interface IHeaderProps {
    navigation: INavigationProps;
}

export default class Header extends React.Component<IHeaderProps> {
    render(): JSX.Element {
        return (
            <header className="header">
                <Container>
                    <div className="header__inner">
                        <Navigation {...this.props.navigation} />
                    </div>
                </Container>
            </header>
        );
    }
}
