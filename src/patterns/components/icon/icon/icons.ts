interface IIconMap {
    [filename: string]: __WebpackModuleApi.RequireContext;
}

export default ((): IIconMap => {
    const req: __WebpackModuleApi.RequireContext = require.context('./import/svg', false, /^\.\/.*\.svg$/);

    return req.keys().reduce((glyphs: IIconMap, key: string) => {
        const match: RegExpMatchArray | null = key.match(new RegExp(/[^/]+(?=\.svg$)/));
        const filename: string | null = match && match[0];

        return {
            ...glyphs,
            ['' + filename]: req(key),
        };
    }, {});
})();
