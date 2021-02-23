// This file should only be imported by front-end code that will be processed by Webpack.
// If it's executed during SSR, it will fail because require.context() is not found.

interface IIconObject {
    // Actual object contains more fields, but we only use this one
    symbol: string;
}

interface IIconMap {
    [filename: string]: IIconObject;
}

const req: __WebpackModuleApi.RequireContext = require.context('./import/svg', false, /^\.\/.*\.svg$/);

const icons: IIconMap = req.keys().reduce((glyphs: IIconMap, key: string) => {
    const match: RegExpMatchArray | null = key.match(new RegExp(/[^/]+(?=\.svg$)/));
    const filename: string | null = match && match[0];

    return {
        ...glyphs,
        ['' + filename]: req<IIconObject>(key),
    };
}, {});

export const getIconPath = (name: string): string => {
    const iconObject: IIconObject = icons[name];

    if (!iconObject) {
        throw new Error('Invalid icon name: ' + name);
    }

    return iconObject.symbol;
};
