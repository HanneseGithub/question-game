import React from 'react';

import classNames from 'classnames';

export interface IGridColumnProps {
    children: React.ReactNode;
    width?: string[];
    offset?: string[];
    align?: string[];
    order?: string[];
    className?: string;
}

export const GridColumn = (props: IGridColumnProps): JSX.Element => {
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
