import React from 'react';

export interface IIconContext {
    getPath: (name: string) => string;
}

export const IconContext: React.Context<IIconContext> = React.createContext<IIconContext>({
    getPath: (name: string) => '#' + name,
});


export interface IIconProviderProps extends IIconContext {
    children: React.ReactNode;
}

const IconProvider = (props: IIconProviderProps): JSX.Element => {
    const { getPath } = props;
    const contextValue: IIconContext = {
        getPath,
    };

    return (
        <IconContext.Provider value={contextValue}>
            {props.children}
        </IconContext.Provider>
    );
};

export default IconProvider;
