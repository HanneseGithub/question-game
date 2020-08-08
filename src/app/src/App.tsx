import React from 'react';

import { Router } from '@reach/router';

import Login from './views/Login';

const App = (): JSX.Element => (
    <Router>
        <Login path="/" />
    </Router>
);

export default App;
