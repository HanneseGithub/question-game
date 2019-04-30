import React, { useContext, useState } from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./accordion.scss');
}

export type TAccordionValue = string | null;

export interface IAccordionProps {
    children: React.ReactNode;
    defaultValue?: TAccordionValue;
    value?: TAccordionValue;
    onChange?: (value: TAccordionValue) => void;
    className?: string;
}

export interface IAccordionItemProps {
    id: string;
    label: string;
    children: React.ReactNode;
}

export interface IAccordionState {
    value: TAccordionValue;
    setValue: (value: TAccordionValue) => void;
}

const AccordionContext: React.Context<IAccordionState> = React.createContext<IAccordionState>({
    value: null,
    setValue: () => null,
});

export const AccordionItem: React.FC<IAccordionItemProps> = (props: IAccordionItemProps) => {
    const context: IAccordionState = useContext(AccordionContext);
    const className: string = classNames(
        'accordion__item',
         {
             'is-open': context.value === props.id,
         },
    );

    const handleOnClick: (event: React.MouseEvent<HTMLAnchorElement>) => void = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        context.setValue(props.id);
    };

    return (
        <div className={className} id={props.id}>
            <a
                href={'#' + props.id}
                className="accordion__header"
                onClick={handleOnClick}
            >
                <div className="accordion__title">{props.label}</div>
            </a>
            <div className="accordion__content">
                <div className="accordion__inner">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

const Accordion: React.FC<IAccordionProps> = (props: IAccordionProps) => {
    const className: string = classNames('accordion', props.className);
    const [value, setValue] = useState(props.defaultValue || null);

    return (
        <div className={className}>
            <AccordionContext.Provider
                value={{
                    value: typeof props.value !== 'undefined' ? props.value : value,
                    setValue: (nextValue: TAccordionValue) => {
                        setValue(nextValue);

                        if (props.onChange) {
                            props.onChange(nextValue);
                        }
                    },
                }}
            >
                {props.children}
            </AccordionContext.Provider>
        </div>
    );
};

export default Accordion;
