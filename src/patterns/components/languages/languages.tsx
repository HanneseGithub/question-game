import React from 'react';

import classNames from 'classnames';

export interface ILanguagesItemProps {
    url: string;
    label: string;
    current?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface ILanguagesProps {
    items: ILanguagesItemProps[];
    modifier?: string;
    className?: string;
}

export const LanguagesItem: React.FC<ILanguagesItemProps> = (props: ILanguagesItemProps) => {
    const className: string = classNames(
        'languages__item',
        {
            'is-current': props.current,
        },
    );

    return (
        <li className={className}>
            <a
                href={props.url}
                className="languages__link"
                onClick={props.onClick}
            >
                {props.label}
            </a>
        </li>
    );
};

const Languages: React.FC<ILanguagesProps> = (props: ILanguagesProps) => {
    const className: string = classNames(
        'languages',
        props.modifier,
        props.className,
    );

    const renderItems: () => JSX.Element[] = (): JSX.Element[] => props.items.map((item: ILanguagesItemProps, index: number) => (
        <LanguagesItem
            key={index}
            {...item}
        />
    ));

    return (
        <nav className={className}>
            <ul className="languages__list">
                {renderItems()}
            </ul>
        </nav>
    );
};

export default Languages;
