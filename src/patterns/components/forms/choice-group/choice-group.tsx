import React from 'react';

import classNames from 'classnames';

import Check, { ICheckProps } from '@check';
import Radio, { IRadioProps } from '@radio';

if (process.env.webpack) {
    require('./choice-group.scss');
}

export type TChoiceGroupValue = string | string[];

export interface IChoiceGroupProps {
    type: 'radio' | 'check';
    choices: Array<IRadioProps | ICheckProps>;
    label: string;
    value?: TChoiceGroupValue;
    onChange?: (value: TChoiceGroupValue) => void;
    error?: string;
    description?: string;
    invalid?: boolean;
    modifier?: string;
    className?: string;
}

export interface IChoiceGroupState {
    value: TChoiceGroupValue;
    prevValue: TChoiceGroupValue;
}

export default class ChoiceGroup extends React.Component<IChoiceGroupProps, IChoiceGroupState> {
    constructor(props: IChoiceGroupProps) {
        super(props);

        this.state = {
            value: this.getInitialValue(props.value),
            prevValue: this.getInitialValue(props.value),
        };
    }

    getInitialValue(value?: TChoiceGroupValue): TChoiceGroupValue {
        if (value) {
            return value;
        } else if (this.props.type === 'check') {
            return [];
        } else {
            return '';
        }
    }

    isChoiceChecked(value: string): boolean {
        if (this.props.type === 'check') {
            return this.state.value.indexOf(value) !== -1;
        } else {
            return value === this.state.value;
        }
    }

    handleChoiceChange = (value: string, checked: boolean): void => {
        this.setState((prevState: IChoiceGroupState) => {
            if (Array.isArray(prevState.value)) {
                let newValue: string[] = prevState.value;

                if (checked) {
                    newValue.push(value);
                } else {
                    newValue = newValue.filter((item: string) => item !== value);
                }

                return {
                    value: newValue,
                };
            } else {
                return {
                    value,
                };
            }
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }

    renderChoices(): JSX.Element[] {
        const ChoiceType: typeof Check | typeof Radio = this.props.type === 'check' ? Check : Radio;

        return this.props.choices.map((item: IRadioProps | ICheckProps) => {
            return (
                <ChoiceType
                    {...item}
                    key={item.id}
                    checked={this.isChoiceChecked(item.value)}
                    onChange={this.handleChoiceChange.bind(null, item.value)}
                    className="choice-group__item"
                />
            );
        });
    }

    renderError(): JSX.Element {
        return (
            <div className="choice-group__error">
                {this.props.error}
            </div>
        );
    }

    renderDescription(): JSX.Element {
        return (
            <div className="choice-group__description">
                {this.props.description}
            </div>
        );
    }

    render(): JSX.Element {
        const className: string = classNames(
            'choice-group',
            {
                'is-invalid': this.props.invalid,
            },
            this.props.modifier,
            this.props.className,
        );

        return (
            <fieldset className={className}>
                <legend className="choice-group__label">{this.props.label}</legend>
                <div className="choice-group__inner">
                    {this.renderChoices()}
                </div>
                {this.props.error && this.renderError()}
                {this.props.description && this.renderDescription()}
            </fieldset>
        );
    }

    static getDerivedStateFromProps(props: IChoiceGroupProps, state: IChoiceGroupState): IChoiceGroupState | null {
        if (typeof props.value !== 'undefined' && props.value !== state.prevValue) {
            return {
                value: props.value,
                prevValue: props.value,
            };
        }

        return null;
    }
}
