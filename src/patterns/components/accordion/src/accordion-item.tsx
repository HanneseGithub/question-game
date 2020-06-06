import React, { useContext } from 'react';

import classNames from 'classnames';

import { AccordionContext } from './accordion-context';

export interface IAccordionItemProps {
    id: string;
    label: string;
    children: React.ReactNode;
}

export const AccordionItem: React.FC<IAccordionItemProps> = (props: IAccordionItemProps) => {
    const { value, setValue } = useContext(AccordionContext);
    const className: string = classNames(
        'accordion__item',
        {
            'is-open': value === props.id,
        },
    );

    const handleOnClick: (event: React.MouseEvent<HTMLAnchorElement>) => void = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        setValue(props.id);
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
