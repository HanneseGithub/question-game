import React from 'react';

export interface IPreviewEnv {
    reactClass: string;
    publicPath: string;
}

export interface IPreviewTargetMeta {
    previewDisplay?: React.StyleHTMLAttributes<HTMLBodyElement>;
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
        const contents: string = 'ReactDOM.hydrate( React.createElement(global.' + this.props._env.reactClass + ', ' + JSON.stringify(this.props._target.context) + '), document.getElementById("root") );';

        return (
            <script dangerouslySetInnerHTML={{ __html: contents }} />
        );
    }

    render(): JSX.Element {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <title>{this.props._target.label} | Preview Layout</title>
                    {this.getStyles()}
                </head>
                <body style={this.props._target.meta && this.props._target.meta.previewDisplay}>
                    <div id="page">
                        <div id="root" dangerouslySetInnerHTML={{ __html: this.props.yield }} />
                    </div>
                    {this.getScripts()}
                    {this.getHydrateScript()}
                </body>
            </html>
        );
    }
}
