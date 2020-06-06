if (process.env.webpack) {
    require('./accordion.scss');
}

export {
    Accordion,
    IAccordionProps,
} from './src/accordion';
export {
    AccordionItem,
    IAccordionItemProps,
} from './src/accordion-item';
export {
    AccordionContext,
    IAccordionContext,
    TAccordionValue,
} from './src/accordion-context';
