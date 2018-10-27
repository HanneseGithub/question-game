import * as classNames from 'classnames';
import * as React from 'react';

if (process.env.webpack) {
    require('./button.scss');
}

export interface IButtonProps {
    url?: string;
    modifier?: string;
    className?: string;
    type?: string;
    text?: string;
}

export default class Button extends React.Component<IButtonProps, {}> {
    onClick() {
        console.log('tere');
    }

    render() {
        const ButtonTag = this.props.url ? 'a' : 'button';
        const className = classNames('button', this.props.modifier, this.props.className);

        return (
            <ButtonTag
                className={className}
                onClick={this.onClick}
                type={this.props.url ? null : this.props.type}
                href={this.props.url}
            >
                {this.props.text}
            </ButtonTag>
        );
    }
}
