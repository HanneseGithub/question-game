import React from 'react';

import { Grid, GridColumn, IGridColumnProps, IGridProps } from '../index';

interface IGridExampleProps extends IGridProps {
    columns: IGridColumnProps[];
}

const GridExample: React.FC<IGridExampleProps> = (props: IGridExampleProps) => {
    const { columns, ...rest } = props;

    return (
        <Grid {...rest}>
            {columns.map((column: IGridColumnProps, index: number) => (
                <GridColumn
                    key={index}
                    {...column}
                >
                    <div className="sg-box">{column.children}</div>
                </GridColumn>
            ))}
        </Grid>
    );
};

export default GridExample;
