import React from 'react';

import Container from '@container';
import Languages, { ILanguagesProps } from '@languages';
import Logo, { ILogoProps } from '@logo';
import Navigation, { INavigationProps } from '@navigation';

if (process.env.webpack) {
    require('./header.scss');
}

export interface IHeaderProps {
    logo: ILogoProps;
    navigation: INavigationProps;
    languages: ILanguagesProps;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    return (
        <header className="header">
            <Container>
                <div className="header__inner">
                    <Logo {...props.logo} className="header__logo" />
                    <div className="header__main">
                        <Navigation {...props.navigation} />
                        <Languages {...props.languages} />
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
