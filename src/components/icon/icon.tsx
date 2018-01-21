import * as classNames from 'classnames';
import * as React from 'react';

require('es6-object-assign/auto');

import {IPreviewEnv} from '@preview';

let icons: any = null;

if (process.env.webpack) {
    require('./icon.scss');
    const req = require.context('./import/svg/', false, /^\.\/.*\.svg$/);
    icons = (req.keys()).reduce((glyphs, key) => {
        const filename = key.match(new RegExp(/[^/]+(?=\.svg$)/))[0];

        return Object.assign({}, glyphs, {
            [filename]: req(key),
        });
    }, {});
}

export interface IIconProps {
    _env: IPreviewEnv;
    className?: string;
    modifier?: string;
    name: string;
}

export default class Icon extends React.Component<IIconProps, {}> {
    getHref(): string {
        if (icons && icons[this.props.name]) {
            return icons[this.props.name].symbol;
        }

        return this.props._env.publicPath + 'inc/svg/icons.svg#' + this.props.name;
    }

    render(): JSX.Element {
        const className = classNames('icon', this.props.modifier, this.props.className);

        return (
            <svg className={className}>
                <use xlinkHref={this.getHref()} />
            </svg>
        );
    }
}
