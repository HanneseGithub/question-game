import React from 'react';

export interface IMainProps {
    children: React.ReactNode;
}

const Main: React.FC<IMainProps> = (props: IMainProps) => (
    <div className="main">
        {props.children}
    </div>
);

export default Main;
