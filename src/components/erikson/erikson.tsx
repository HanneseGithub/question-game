import * as React from 'react';

export default class Erikson extends React.Component<{}, {}> {
    onClick() {
        console.log('tere');
    }
    render() {
        return (
            <button onClick={this.onClick}>hello world 7</button>
        );
    }
}
