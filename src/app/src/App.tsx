import React from 'react';

import { Router } from '@reach/router';

import { IconProvider } from '../../patterns';
import { getIconPath } from '../../patterns/components/icon/icon/icons';
import Login from './views/Login';

const publicPath = process.env.publicPath || '/';

const App = (): JSX.Element => (
    <IconProvider getPath={getIconPath}>
        <Router basepath={publicPath}>
            <Login path="/" />
        </Router>
    </IconProvider>
);

export default App;
