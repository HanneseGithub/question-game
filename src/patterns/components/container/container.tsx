import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./container.scss');
}

export interface IContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<IContainerProps> = (props: IContainerProps) => {
    const className: string = classNames('container', props.className);

    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default Container;
