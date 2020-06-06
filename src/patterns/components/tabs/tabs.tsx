import React, { useContext, useState } from 'react';

import classNames from 'classnames';

import { TabsNav } from './tabs-nav';

if (process.env.webpack) {
    require('./tabs.scss');
}

export type TTabsValue = string;

export interface ITabsProps {
    children: React.ReactNode;
    items: ITabsNavItem[];
    defaultValue?: TTabsValue;
    value?: TTabsValue;
    onChange?: (value: TTabsValue) => void;
    className?: string;
}

export interface ITabsItemProps extends ITabsNavItem {
    children: React.ReactNode;
}

export interface ITabsNavItem {
    id: string;
    label: string;
}

export interface ITabsContext {
    value: TTabsValue;
    setValue: (value: TTabsValue) => void;
}

export const TabsContext: React.Context<ITabsContext> = React.createContext<ITabsContext>({
    setValue: () => null,
    value: '',
});

export const TabsItem: React.FC<ITabsItemProps> = (props: ITabsItemProps) => {
    const context: ITabsContext = useContext(TabsContext);
    const className: string = classNames(
        'tabs__content-item',
        {
            'is-open': context.value === props.id,
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

const Tabs: React.FC<ITabsProps> = (props: ITabsProps) => {
    const className: string = classNames('tabs', props.className);
    const [value, setValue] = useState(props.defaultValue || '');

    return (
        <div className={className}>
            <TabsContext.Provider
                value={{
                    setValue: (nextValue: TTabsValue): void => {
                        setValue(nextValue);

                        if (props.onChange) {
                            props.onChange(nextValue);
                        }
                    },
                    value: typeof props.value !== 'undefined' ? props.value : value,
                }}
            >
                <TabsNav items={props.items} />
                <div className="tabs__content">
                    {props.children}
                </div>
            </TabsContext.Provider>
        </div>
    );
};

export default Tabs;
