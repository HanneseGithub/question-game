import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('./button.scss');
}

export interface IButtonProps {
    text: string;
    url?: string;
    modifier?: string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
    const ButtonTag: 'a' | 'button' = props.url ? 'a' : 'button';
    const className: string = classNames('button', props.modifier, props.className);

    return (
        <ButtonTag
            className={className}
            onClick={props.onClick}
            type={props.url ? undefined : props.type}
            href={props.url}
        >
            {props.text}
        </ButtonTag>
    );
};

Button.defaultProps = {
    type: 'button',
};

export default Button;
