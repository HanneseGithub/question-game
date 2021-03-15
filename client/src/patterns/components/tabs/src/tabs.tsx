import React, { useState } from 'react';

import classNames from 'classnames';

import { ITabsNavItem, TabsNav } from './tabs-nav';

export type TTabsValue = string;

export interface ITabsProps {
    children: React.ReactNode;
    items: ITabsNavItem[];
    defaultValue?: TTabsValue;
    value?: TTabsValue;
    onChange?: (value: TTabsValue) => void;
    className?: string;
}

export interface ITabsContext {
    value: TTabsValue;
    setValue: (value: TTabsValue) => void;
}

export const TabsContext: React.Context<ITabsContext> = React.createContext<ITabsContext>({
    setValue: () => null,
    value: '',
});

export const Tabs = (props: ITabsProps): JSX.Element => {
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
