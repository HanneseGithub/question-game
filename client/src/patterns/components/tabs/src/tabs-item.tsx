import React, { useContext } from 'react';

import classNames from 'classnames';

import { TabsContext } from './tabs';
import { ITabsNavItem } from './tabs-nav';

export interface ITabsItemProps extends ITabsNavItem {
    children: React.ReactNode;
}

export const TabsItem = (props: ITabsItemProps): JSX.Element => {
    const { value } = useContext(TabsContext);
    const className: string = classNames(
        'tabs__content-item',
        {
            'is-open': value === props.id,
        },
    );

    return (
        <div className={className} id={props.id}>
            <div className="tabs__content-inner">
                {props.children}
            </div>
        </div>
    );
};
