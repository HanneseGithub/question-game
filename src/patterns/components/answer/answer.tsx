import React from 'react';

import classNames from 'classnames';

export interface IAnswerProps {
    index?: number;
    text: string;
    secretId?: number;
    modifier?: string;
    guess?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
}

const Answer = (props: IAnswerProps): JSX.Element => {
    const { text, index, secretId } = props;
    const className: string = classNames('answer', props.modifier);

    return (
        <div onClick={props.onClick} className={className} data-answer-id={secretId}>
            <div className='answer__number'>{index}</div>
            <div className='answer__text'>{text}</div>
        </div>
    );
};

export default Answer;
