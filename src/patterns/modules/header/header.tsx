import React from 'react';

import Container from '@container';
import Languages, { ILanguagesProps } from '@languages';
import Navigation, { INavigationProps } from '@navigation';

if (process.env.webpack) {
    require('./header.scss');
}

export interface IHeaderProps {
    navigation: INavigationProps;
    languages: ILanguagesProps;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    return (
        <header className="header">
            <Container>
                <div className="header__inner">
                    <Navigation {...props.navigation} />
                    <Languages {...props.languages} />
                </div>
            </Container>
        </header>
    );
};

export default Header;
