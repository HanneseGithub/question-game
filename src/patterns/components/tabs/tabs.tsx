import React from 'react';

import { Tabs } from './src/tabs';
import { TabsItem } from './src/tabs-item';
import { ITabsNavItem } from './src/tabs-nav';

const TabsExample: React.FC = () => {
    const items: ITabsNavItem[] = [
        {
            id: 'tabs-item-1',
            label: 'Tab 1',
        },
        {
            id: 'tabs-item-2',
            label: 'Tab 2',
        },
        {
            id: 'tabs-item-3',
            label: 'Tab 3',
        },
    ];

    return (
        <Tabs defaultValue={items[0].id} items={items}>
            <TabsItem
                {...items[0]}
            >
                tabs item 1
            </TabsItem>
            <TabsItem
                {...items[1]}
            >
                tabs item 2
            </TabsItem>
            <TabsItem
                {...items[2]}
            >
                tabs item 3
            </TabsItem>
        </Tabs>
    );
};

export default TabsExample;
