import React from 'react';

import classNames from 'classnames';

import { TextField, ITextFieldProps } from '../textfield';

const TextArea: React.FC<ITextFieldProps> = (props: ITextFieldProps) => {
    const className: string = classNames('textarea', props.className);
    const inputClassName: string = classNames('textarea__input', props.inputClassName);

    return (
        <TextField
            {...props}
            className={className}
            inputClassName={inputClassName}
            element="textarea"
        />
    );
};

export default TextArea;
