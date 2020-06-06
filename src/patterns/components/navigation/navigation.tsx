import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./navigation.scss');
}

export interface INavigationItemProps {
    url: string;
    label: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    current?: boolean;
}

export interface INavigationProps {
    items: INavigationItemProps[];
    className?: string;
}

export const NavigationItem: React.FC<INavigationItemProps> = (props: INavigationItemProps) => {
    const className: string = classNames(
        'navigation__item',
        {
            'is-current': props.current,
        },
    );

    return (
        <li className={className}>
            <a href={props.url} className="navigation__link">{props.label}</a>
        </li>
    );
};

const Navigation: React.FC<INavigationProps> = (props: INavigationProps) => {
    const className: string = classNames('navigation', props.className);

    const renderItems: () => JSX.Element[] = (): JSX.Element[] => props.items.map((item: INavigationItemProps, index: number) => (
        <NavigationItem
            key={index}
            {...item}
        />
    ));

    return (
        <nav className={className}>
            <ul className="navigation__list">
                {renderItems()}
            </ul>
        </nav>
    );
};

export default Navigation;
