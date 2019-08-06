import React from 'react';
import ReactDOM from 'react-dom';

import JsxParser from 'react-jsx-parser';

interface IComponentContext {
    // tslint:disable-next-line no-any
    [key: string]: any;
}

const wrapChildren: (children: string) => JSX.Element = (children: string) => {
    return React.createElement(
        JsxParser,
        {
            jsx: children,
            components: window.components,
            renderInWrapper: false,
        },
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
    ReactDOM.hydrate(
        React.createElement(
            window.components[window.componentSettings.className],
            getContext(window.componentSettings.context),
        ),
        document.getElementById('root'),
    );
});
