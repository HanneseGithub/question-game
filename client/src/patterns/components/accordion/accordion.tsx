import React from 'react';

import { Accordion, IAccordionProps } from './src/accordion';
import { AccordionItem } from './src/accordion-item';

const AccordionExample = (props: IAccordionProps): JSX.Element => (
    <Accordion {...props}>
        <AccordionItem
            id="accordion-item-1"
            label="Accordion item 1"
        >
                accordion item 1
        </AccordionItem>
        <AccordionItem
            id="accordion-item-2"
            label="Accordion item 2"
        >
                accordion item 2
        </AccordionItem>
        <AccordionItem
            id="accordion-item-3"
            label="Accordion item 3"
        >
                accordion item 3
        </AccordionItem>
    </Accordion>
);

export default AccordionExample;
