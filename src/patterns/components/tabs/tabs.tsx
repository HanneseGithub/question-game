import React, { useContext, useState } from 'react';

import classNames from 'classnames';

import { TabsNav } from './tabs-nav';

if (process.env.webpack) {
    require('./tabs.scss');
}

export type TTabsValue = string;

export interface ITabsProps {
    children: React.ReactNode;
    defaultValue?: TTabsValue;
    value?: TTabsValue;
    onChange?: (value: TTabsValue) => void;
    className?: string;
}

export interface ITabsItemProps {
    id: string;
    label: string;
    children: React.ReactNode;
}

export interface ITabsContext {
    value: TTabsValue;
    setValue: (value: TTabsValue) => void;
    items: ITabsItemProps[];
    addItem: (item: ITabsItemProps) => void;
}

export const TabsContext: React.Context<ITabsContext> = React.createContext<ITabsContext>({
    value: '',
    setValue: () => null,
    items: [],
    addItem: () => null,
});

export const TabsItem: React.FC<ITabsItemProps> = (props: ITabsItemProps) => {
    const context: ITabsContext = useContext(TabsContext);
    const className: string = classNames(
        'tabs__content-item',
         {
             'is-open': context.value === props.id,
         },
    );

    context.addItem(props);

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
    const [items, setItems] = useState<ITabsItemProps[]>([]);

    return (
        <div className={className}>
            <TabsContext.Provider
                value={{
                    value: typeof props.value !== 'undefined' ? props.value : value,
                    setValue: (nextValue: TTabsValue) => {
                        setValue(nextValue);

                        if (props.onChange) {
                            props.onChange(nextValue);
                        }
                    },
                    items,
                    addItem: (item: ITabsItemProps) => {
                        if (!items.includes(item)) {
                            setItems([...items, item]);
                        }
                    },
                }}
            >
                <TabsNav />
                <div className="tabs__content">
                    {props.children}
                </div>
            </TabsContext.Provider>
        </div>
    );
};

export default Tabs;
