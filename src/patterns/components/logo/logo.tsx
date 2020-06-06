import React from 'react';

import classNames from 'classnames';

export interface ILogoProps {
    url: string;
    image: string;
    title: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

const Logo: React.FC<ILogoProps> = (props: ILogoProps) => {
    const className: string = classNames('logo', props.className);

    return (
        <div className={className}>
            <a
                href={props.url}
                onClick={props.onClick}
                className="logo__link"
            >
                <img src={props.image} alt={props.title} className="logo__img" />
            </a>
        </div>
    );
};

export default Logo;
