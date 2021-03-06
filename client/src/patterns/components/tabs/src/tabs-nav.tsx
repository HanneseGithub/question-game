import React, { useContext } from 'react';

import classNames from 'classnames';

import { TabsContext } from './tabs';

export interface ITabsNavProps {
    items: ITabsNavItem[];
}

export interface ITabsNavItem {
    id: string;
    label: string;
}

export interface ITabsNavItemProps extends ITabsNavItem {
    url: string;
    current?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TabsNavItem = (props: ITabsNavItemProps): JSX.Element => {
    const className: string = classNames(
        'tabs__nav-item',
        {
            'is-current': props.current,
        },
    );

    return (
        <li className={className}>
            <a
                href={props.url}
                onClick={props.onClick}
                className="tabs__nav-link"
            >
                {props.label}
            </a>
        </li>
    );
};

export const TabsNav = (props: ITabsNavProps): JSX.Element => {
    const { value, setValue } = useContext(TabsContext);

    return (
        <div className="tabs__nav">
            <ul className="tabs__nav-list">
                {props.items.map((item: ITabsNavItem) => {
                    const handleClick: (event: React.MouseEvent<HTMLAnchorElement>) => void = (event: React.MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();

                        setValue(item.id);
                    };

                    return (
                        <TabsNavItem
                            key={item.id}
                            id={item.id}
                            url={'#' + item.id}
                            label={item.label}
                            current={value === item.id}
                            onClick={handleClick}
                        />
                    );
                })}
            </ul>
        </div>
    );
};
