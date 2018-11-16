import React from 'react';

if (process.env.webpack) {
    require('./typography.scss');
}

export default class Typography extends React.Component {
    render(): string {
        return 'This component is not actually a React component.';
    }
}
