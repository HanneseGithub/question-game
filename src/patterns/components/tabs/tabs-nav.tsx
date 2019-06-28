import React, { useContext } from 'react';

import classNames from 'classnames';

import { ITabsContext, ITabsNavItem, TabsContext } from './tabs';

export interface ITabsNavProps {
    items: ITabsNavItem[];
}

export interface ITabsNavItemProps extends ITabsNavItem {
    url: string;
    current?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TabsNavItem: React.FC<ITabsNavItemProps> = (props: ITabsNavItemProps) => {
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

export const TabsNav: React.FC<ITabsNavProps> = (props: ITabsNavProps) => {
    const context: ITabsContext = useContext(TabsContext);

    return (
        <div className="tabs__nav">
            <ul className="tabs__nav-list">
                {props.items.map((item: ITabsNavItem) => {
                    const handleClick: (event: React.MouseEvent<HTMLAnchorElement>) => void = (event: React.MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();

                        context.setValue(item.id);
                    };

                    return (
                        <TabsNavItem
                            key={item.id}
                            id={item.id}
                            url={'#' + item.id}
                            label={item.label}
                            current={context.value === item.id}
                            onClick={handleClick}
                        />
                    );
                })}
            </ul>
        </div>
    );
};
