import React from 'react';
import ReactDOM from 'react-dom';

import JsxParser from 'react-jsx-parser';

import IconProvider from './patterns/components/icon/icon-provider/icon-provider';
import { getIconPath } from './patterns/components/icon/icon/icons';

const wrapChildren: (children: string) => JSX.Element = (children: string) => (
    <JsxParser
        jsx={children}
        components={window.components}
        renderInWrapper={false}
    />
);

const wrapString: (str: React.ReactNode) => React.ReactNode = (str: React.ReactNode): React.ReactNode => {
    if (typeof str !== 'undefined' && typeof str === 'string') {
        return wrapChildren(str);
    }

    return str;
};

const getContext: (context: IContext) => IContext = (context: IContext) => {
    if (window.componentSettings.parseJsxFrom && window.componentSettings.parseJsxFrom.length) {
        const newContext: IContext = {
            ...context,
        };

        for (const item of window.componentSettings.parseJsxFrom) {
            const arr: string[] = item.split('.');

            arr.reduce((o: IContext, i: string, index: number): IContext => {
                if (index === arr.length - 1) {
                    o[i] = wrapString(o[i]);
                }

                return o[i] as IContext;
            }, newContext);
        }

        return newContext;
    }

    return context;
};

window.setTimeout(() => {
    const Component: string = window.components[window.componentSettings.className];
    const props: IContext = getContext(window.componentSettings.context);

    const element: JSX.Element = (
        <IconProvider getPath={getIconPath}>
            <Component {...props} />
        </IconProvider>
    );

    const container: HTMLElement | null = document.getElementById('root');
    const renderer: ReactDOM.Renderer = window.ssr ? ReactDOM.hydrate : ReactDOM.render;

    renderer(element, container);
});
