import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./grid.scss');
}

export interface IGridProps {
    children: React.ReactNode;
    reverse?: string[];
    justify?: string[];
    align?: string[];
    equalHeight?: boolean;
    gutter?: 'none';
    className?: string;
}

export interface IGridColumnProps {
    children: React.ReactNode;
    width?: string[];
    offset?: string[];
    align?: string[];
    order?: string[];
    className?: string;
}

export const GridColumn: React.FC<IGridColumnProps> = (props: IGridColumnProps) => {
    const className: string = classNames(
        'grid__col',
        props.width && props.width.map((width: string) => 'grid__col--' + width),
        props.offset && props.offset.map((offset: string) => 'grid__col--offset-' + offset),
        props.align && props.align.map((align: string) => 'grid__col--' + align),
        props.order && props.order.map((order: string) => 'grid__col--' + order),
        props.className,
    );

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

const Grid: React.FC<IGridProps> = (props: IGridProps) => {
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

export default Grid;
