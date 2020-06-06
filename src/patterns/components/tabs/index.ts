if (process.env.webpack) {
    require('./tabs.scss');
}

export {
    Tabs,
    ITabsProps,
    TTabsValue,
    ITabsContext,
    TabsContext,
} from './src/tabs';
export {
    TabsItem,
    ITabsItemProps,
} from './src/tabs-item';
