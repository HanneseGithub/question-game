import React from 'react';

import { Router } from '@reach/router';

import Login from './views/Login';

export default class App extends React.Component {
    render(): JSX.Element {
        return (
            <Router>
                <Login path="/" />
            </Router>
        );
    }
}
