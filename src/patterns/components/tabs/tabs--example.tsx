import React from 'react';

import Tabs, { TabsItem } from '@tabs';

const TabsExample: React.FC = () => {
    return (
        <Tabs defaultValue="tabs-item-1">
            <TabsItem
                id="tabs-item-1"
                label="Tab 1"
            >
                tabs item 1
            </TabsItem>
            <TabsItem
                id="tabs-item-2"
                label="Tab 2"
            >
                tabs item 2
            </TabsItem>
            <TabsItem
                id="tabs-item-3"
                label="Tab 3"
            >
                tabs item 3
            </TabsItem>
        </Tabs>
    );
};

export default TabsExample;
