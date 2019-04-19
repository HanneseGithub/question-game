import React from 'react';

import classNames from 'classnames';

let icons: any = null; // tslint:disable-line no-any

if (process.env.webpack) {
    require('./icon.scss');
    const req: __WebpackModuleApi.RequireContext = require.context('./import/svg/', false, /^\.\/.*\.svg$/);
    icons = (req.keys()).reduce((glyphs: {}, key: string) => {
        const match: RegExpMatchArray | null = key.match(new RegExp(/[^/]+(?=\.svg$)/));
        const filename: string | null = match && match[0];

        return {
            ...glyphs,
            ['' + filename]: req(key),
        };
    }, {});
}

export interface IIconProps {
    name: string;
    modifier?: string;
    className?: string;
}

const Icon: React.FC<IIconProps> = (props: IIconProps) => {
    const className: string = classNames('icon', props.modifier, props.className);

    const getHref: () => string | undefined = (): string | undefined => {
        if (icons && icons[props.name]) {
            return icons[props.name].symbol;
        }

        if (!process.env.webpack) {
            // this is only for fractal ssr
            return app.publicFolder + 'inc/svg/icons.svg#' + props.name;
        }
    };

    return (
        <svg className={className}>
            <use xlinkHref={getHref()} />
        </svg>
    );
};

export default Icon;
