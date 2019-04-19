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

export default class Button extends React.Component<IButtonProps, {}> {
    render(): JSX.Element {
        const ButtonTag: 'a' | 'button' = this.props.url ? 'a' : 'button';
        const className: string = classNames('button', this.props.modifier, this.props.className);

        return (
            <ButtonTag
                className={className}
                onClick={this.props.onClick}
                type={this.props.url ? undefined : this.props.type}
                href={this.props.url}
            >
                {this.props.text}
            </ButtonTag>
        );
    }
}
