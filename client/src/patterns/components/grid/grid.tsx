import React from 'react';

import { Grid, IGridProps } from './src/grid';
import { GridColumn, IGridColumnProps } from './src/grid-column';

interface IGridExampleProps extends IGridProps {
    columns: IGridColumnProps[];
}

const GridExample = (props: IGridExampleProps): JSX.Element => {
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
