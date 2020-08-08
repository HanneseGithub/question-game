import React from 'react';

export interface IMainProps {
    children: React.ReactNode;
}

const Main = (props: IMainProps): JSX.Element => (
    <div className="main">
        {props.children}
    </div>
);

export default Main;
