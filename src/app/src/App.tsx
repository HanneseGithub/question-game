import React from 'react';

import { Router } from '@reach/router';

import Login from './views/Login';

const App: React.FC = () => {
    return (
        <Router>
            <Login path="/" />
        </Router>
    );
};

export default App;
