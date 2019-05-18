import React, { useContext } from 'react';

import classNames from 'classnames';

import { ITabsContext, ITabsItemProps, TabsContext } from './tabs';

export interface ITabsNavItemProps {
    id: string;
    label: string;
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

export const TabsNav: React.FC = () => {
    const context: ITabsContext = useContext(TabsContext);

    return (
        <div className="tabs__nav">
            <ul className="tabs__nav-list">
                {context.items.slice().reverse().map((item: ITabsItemProps) => {
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
