import React from 'react';
import ReactDOM from 'react-dom';

import JsxParser from 'react-jsx-parser';

interface IComponentContext {
    [key: string]: React.ReactNode;
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

const getContext: (context: IComponentContext) => IComponentContext = (context: IComponentContext) => {
    if (window.componentSettings.parseJsxFrom && window.componentSettings.parseJsxFrom.length) {
        const newContext: IComponentContext = {};

        for (const item of window.componentSettings.parseJsxFrom) {
            const contextString: React.ReactNode = context[item];

            if (typeof contextString !== 'undefined' && typeof contextString === 'string') {
                newContext[item] = wrapChildren(contextString);
            }
        }

        return {
            ...context,
            ...newContext,
        };
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
