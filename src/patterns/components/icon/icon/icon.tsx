import React from 'react';

import classNames from 'classnames';

import { IconContext } from '../icon-provider/icon-context';

export interface IIconProps {
    name: string;
    modifier?: string;
    className?: string;
}

const Icon = (props: IIconProps): JSX.Element => {
    const { getPath } = React.useContext(IconContext);
    const className: string = classNames('icon', props.modifier, props.className);

    return (
        <svg className={className} focusable="false">
            <use xlinkHref={getPath(props.name)} />
        </svg>
    );
};

export default Icon;
