import React from 'react';

import classNames from 'classnames';

if (process.env.webpack) {
    require('lazysizes');
    require('picturefill');

    require('./image.scss');
}

export interface IImageSource {
    srcset: string;
    media: string;
}

export interface IImageProps {
    srcset: string;
    alt?: string;
    sources?: IImageSource[];
    modifier?: string;
    className?: string;
}

const Image: React.FC<IImageProps> = (props: IImageProps) => {
    const { alt, srcset } = props;
    const className: string = classNames('image', props.modifier, props.className);

    const renderImg: () => JSX.Element = () => (
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset={srcset} data-sizes="auto" alt={alt} className="image__img lazyload" />
    );

    const renderSources: () => JSX.Element[] | null = () => {
        if (!props.sources) {
            return null;
        }

        return props.sources.map((source: IImageSource, index: number) => (
            <source
                key={index}
                srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                data-srcset={source.srcset}
                media={source.media}
            />
        ));
    };

    const renderPicture: () => JSX.Element = () => (
        <picture className="image__picture">
            {renderSources()}
            {renderImg()}
        </picture>
    );

    return (
        <div className={className}>
            {props.sources ? renderPicture() : renderImg()}
        </div>
    );
};

export default Image;
