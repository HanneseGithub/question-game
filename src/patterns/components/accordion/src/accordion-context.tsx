import React from 'react';

export type TAccordionSingleValue = string | null;
export type TAccordionMultipleValue = string[] | null;

export interface IAccordionContext {
    value: string[];
    toggle: (id: string) => void;
}

export const AccordionContext: React.Context<IAccordionContext> = React.createContext<IAccordionContext>({
    toggle: () => null,
    value: [],
});
