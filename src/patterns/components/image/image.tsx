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

export default class Image extends React.Component<IImageProps> {
    renderImg(): JSX.Element {
        return (
            <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-srcset={this.props.srcset} data-sizes="auto" alt={this.props.alt} className="image__img lazyload" />
        );
    }

    renderSources(): JSX.Element[] | null {
        if (!this.props.sources) {
            return null;
        }

        return this.props.sources.map((source: IImageSource, index: number) => {
            return (
                <source
                    key={index}
                    data-srcset={source.srcset}
                    media={source.media}
                />
            );
        });
    }

    renderPicture(): JSX.Element {
        return (
            <picture className="image__picture">
                {this.renderSources()}
                {this.renderImg()}
            </picture>
        );
    }

    render(): JSX.Element {
        const className = classNames('image', this.props.modifier, this.props.className);

        return (
            <div className={className}>
                {this.props.sources ? this.renderPicture() : this.renderImg()}
            </div>
        );
    }
}
