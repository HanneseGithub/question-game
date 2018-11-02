import React from 'react';

import {Router} from '@reach/router';

import Login from './views/Login';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Login path="/" />
            </Router>
        );
    }
}
