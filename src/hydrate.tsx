import React from 'react';
import ReactDOM from 'react-dom';

import JsxParser from 'react-jsx-parser';

import IconProvider from './patterns/components/icon/icon-provider/icon-provider';
import icons from './patterns/components/icon/icon/icons';

interface IComponentContext {
    // tslint:disable-next-line no-any
    [key: string]: any;
}

interface IIconObject {
    symbol: string;
}

const wrapChildren: (children: string) => JSX.Element = (children: string) => {
    return (
        <JsxParser
            jsx={children}
            components={window.components}
            renderInWrapper={false}
        />
    );
};

const wrapString: (str: React.ReactNode) => React.ReactNode = (str: React.ReactNode): React.ReactNode => {
    if (typeof str !== 'undefined' && typeof str === 'string') {
        return wrapChildren(str);
    }

    return str;
};

const getContext: (context: IComponentContext) => IComponentContext = (context: IComponentContext) => {
    if (window.componentSettings.parseJsxFrom && window.componentSettings.parseJsxFrom.length) {
        const newContext: IComponentContext = {
            ...context,
        };

        for (const item of window.componentSettings.parseJsxFrom) {
            const arr: string[] = item.split('.');

            arr.reduce((o: IComponentContext, i: string, index: number) => {
                if (index === arr.length - 1) {
                    o[i] = wrapString(o[i]);
                }

                return o[i];
            }, newContext);
        }

        return newContext;
    }

    return context;
};

window.setTimeout(() => {
    const Component: string = window.components[window.componentSettings.className];
    const props: IComponentContext = getContext(window.componentSettings.context);
    const getIconPath: (name: string) => string = (name: string) => {
        const iconObject: IIconObject = icons[name] as unknown as IIconObject;

        if (iconObject) {
            return iconObject.symbol;
        }

        return icons + '#' + name;
    };

    ReactDOM.hydrate(
        (
            <IconProvider getPath={getIconPath}>
                <Component {...props} />
            </IconProvider>
        ),
        document.getElementById('root'),
    );
});
