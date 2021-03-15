import React from 'react';

import classNames from 'classnames';

export interface IButtonProps {
    text: string;
    url?: string;
    modifier?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Button = (props: IButtonProps): JSX.Element => {
    const {
        type = 'button',
    } = props;
    const ButtonTag: 'a' | 'button' = props.url ? 'a' : 'button';
    const className: string = classNames('button', props.modifier, props.className);

    return (
        <ButtonTag
            className={className}
            onClick={props.onClick}
            type={props.url ? undefined : type}
            href={props.url}
        >
            {props.text}
        </ButtonTag>
    );
};

export default Button;
