import React from 'react';

export interface IIconContext {
    getPath: (name: string) => string;
}

export const IconContext: React.Context<IIconContext> = React.createContext<IIconContext>({
    getPath: (name: string) => '#' + name,
});
