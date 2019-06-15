import React from 'react';

export interface IPreviewEnv {
    reactClass: string;
    publicPath: string;
}

export interface IPreviewTargetMeta {
    previewDisplay?: React.StyleHTMLAttributes<HTMLBodyElement>;
    parseJsxFrom?: string[];
    language?: string;
}

export interface IPreviewTarget {
    label: string;
    context: any; // tslint:disable-line no-any
    meta?: IPreviewTargetMeta;
}

export interface IPreviewConfig {
    jsAssets: string[];
    cssAssets: string[];
}

export interface IPreviewProps {
    _env: IPreviewEnv;
    _target: IPreviewTarget;
    _config: IPreviewConfig;
    yield: string;
    language: string;
}

export default class Preview extends React.Component<IPreviewProps, {}> {
    getStyles(): JSX.Element[] | null {
        if (!this.props._config.cssAssets) {
            return null;
        }

        return this.props._config.cssAssets.map((item: string, index: number) => {
            return (
                <link media="all" rel="stylesheet" href={this.props._env.publicPath + 'inc/' + item} key={index} />
            );
        });
    }

    getScripts(): JSX.Element[] | null {
        if (!this.props._config.jsAssets) {
            return null;
        }

        return this.props._config.jsAssets.map((item: string, index: number) => {
            return (
                <script src={this.props._env.publicPath + 'inc/' + item} key={index} />
            );
        });
    }

    getHydrateScript(): JSX.Element {
        const componentSettings: object = {
            className: this.props._env.reactClass,
            context: this.props._target.context,
            parseJsxFrom: this.props._target.meta && this.props._target.meta.parseJsxFrom ? this.props._target.meta.parseJsxFrom : undefined,
        };

        const contents: string = 'window.componentSettings = ' + JSON.stringify(componentSettings) + ';';

        return (
            <script dangerouslySetInnerHTML={{ __html: contents }} />
        );
    }

    renderRoot(): JSX.Element {
        return (
            <div id="root" dangerouslySetInnerHTML={{ __html: this.props.yield }} />
        );
    }

    render(): JSX.Element {
        return (
            <html lang={this.props._target && this.props._target.meta && this.props._target.meta.language ? this.props._target.meta.language : this.props.language}>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <title>{this.props._target.label} | Preview Layout</title>
                    {this.getStyles()}
                </head>
                <body style={this.props._target.meta && this.props._target.meta.previewDisplay}>
                    <div id="page">
                        {this.props.children ? this.props.children : this.renderRoot()}
                    </div>
                    {this.getHydrateScript()}
                    {this.getScripts()}
                </body>
            </html>
        );
    }
}
