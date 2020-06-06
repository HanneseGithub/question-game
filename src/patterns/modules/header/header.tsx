import React from 'react';

import { Container } from '../../components/container';
import { Languages, ILanguagesProps } from '../../components/languages';
import { Logo, ILogoProps } from '../../components/logo';
import { Navigation, INavigationProps } from '../../components/navigation';

if (process.env.webpack) {
    require('./header.scss');
}

export interface IHeaderProps {
    logo: ILogoProps;
    navigation: INavigationProps;
    languages: ILanguagesProps;
}

const Header: React.FC<IHeaderProps> = (props: IHeaderProps) => (
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

export default Header;
