import React from 'react';

export interface IAccordionContext {
    value: string[];
    toggle: (id: string) => void;
}

export const AccordionContext: React.Context<IAccordionContext> = React.createContext<IAccordionContext>({
    toggle: () => null,
    value: [],
});
