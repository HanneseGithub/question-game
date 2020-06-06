import React from 'react';

if (process.env.webpack) {
    require('./main.scss');
}

export interface IMainProps {
    children: React.ReactNode;
}

const Main: React.FC<IMainProps> = (props: IMainProps) => (
    <div className="main">
        {props.children}
    </div>
);

export default Main;
