import React from 'react';

import classNames from 'classnames';

export interface IContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container = (props: IContainerProps): JSX.Element => {
    const className: string = classNames('container', props.className);

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default Container;
