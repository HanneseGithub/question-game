import React from 'react';

export type TAccordionValue = string | null;

export interface IAccordionContext {
    value: TAccordionValue;
    setValue: (value: TAccordionValue) => void;
}

export const AccordionContext: React.Context<IAccordionContext> = React.createContext<IAccordionContext>({
    setValue: () => null,
    value: null,
});
