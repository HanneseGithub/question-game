import React, { useState } from 'react';

import classNames from 'classnames';

import { Icon } from '../../icon/icon';

export interface ICheckProps {
    label: string;
    id: string;
    name: string;
    value: string;
    defaultChecked?: boolean;
    checked?: boolean;
    disabled?: boolean;
    attributes?: React.InputHTMLAttributes<HTMLInputElement>;
    onChange?: (checked: boolean) => void;
    modifier?: string;
    className?: string;
}

const Check: React.FC<ICheckProps> = (props: ICheckProps) => {
    const className: string = classNames('check', props.modifier, props.className);
    const [checked, setChecked] = useState(props.defaultChecked);

    const handleChange: (event: React.FormEvent<HTMLInputElement>) => void = (event: React.FormEvent<HTMLInputElement>): void => {
        const nextValue: boolean = event.currentTarget.checked;

        if (typeof props.checked === 'undefined') {
            setChecked(nextValue);
        }

        if (props.onChange) {
            props.onChange(nextValue);
        }
    };

    return (
        <div className={className}>
            <input
                {...props.attributes}
                type="checkbox"
                className="check__input"
                id={props.id}
                name={props.name}
                value={props.value}
                disabled={props.disabled}
                // use local state only when component is not controlled from parent
                checked={typeof props.checked !== 'undefined' ? props.checked : checked}
                onChange={handleChange}
            />
            <label htmlFor={props.id} className="check__label">
                <span className="check__indicator">
                    <Icon className="check__icon" name="check" />
                </span>
                <span className="check__text">{props.label}</span>
            </label>
        </div>
    );
};

Check.defaultProps = {
    defaultChecked: false,
};

export default Check;
