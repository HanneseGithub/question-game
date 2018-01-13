import * as React from 'react';

declare let app: {
    publicPath: string;
};

export interface IPreviewEnv {
    _reactClass: string;
}

export interface IPreviewTarget {
    label: string;
    context: any;
}

export interface IPreviewConfig {
    jsAssets: string[];
}

export interface IPreviewProps {
    _env: IPreviewEnv;
    _target: IPreviewTarget;
    _config: IPreviewConfig;
    yield: string;
}

export default class Preview extends React.Component<IPreviewProps, {}> {
    getScripts() {
        return this.props._config.jsAssets.map((item, key) => {
            return (
                <script src={app.publicPath + 'inc/' + item} key={key} />
            );
        });
    }

    getHydrateScript() {
        const contents = 'ReactDOM.hydrate( React.createElement(gotoAndPlay.' + this.props._env._reactClass + ', ' + JSON.stringify(this.props._target.context) + '), document.getElementById("root") );';

        return (
            <script dangerouslySetInnerHTML={{ __html: contents }} />
        );
    }

    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <title>{this.props._target.label} | Preview Layout</title>
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{ __html: this.props.yield }} />
                    {this.getScripts()}
                    {this.getHydrateScript()}
                </body>
            </html>
        );
    }
}
