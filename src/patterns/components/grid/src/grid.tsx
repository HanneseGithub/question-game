import React from 'react';

import classNames from 'classnames';

export interface IGridProps {
    children: React.ReactNode;
    reverse?: string[];
    justify?: string[];
    align?: string[];
    equalHeight?: boolean;
    gutter?: 'none';
    className?: string;
}

export const Grid = (props: IGridProps): JSX.Element => {
    const className: string = classNames(
        'grid',
        {
            'grid--equalheight': !!props.equalHeight,
            [`grid--gutter-${props.gutter}`]: !!props.gutter,
        },
        props.reverse && props.reverse.map((reverse: string) => 'grid--reverse-' + reverse),
        props.justify && props.justify.map((justify: string) => 'grid--' + justify),
        props.align && props.align.map((align: string) => 'grid--' + align),
        props.className,
    );

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};
