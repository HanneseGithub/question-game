import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { IconProvider } from '../../patterns';
import { getIconPath } from '../../patterns/components/icon/icon/icons';
import Login from './views/Login';

const publicPath = process.env.publicPath || '/';

const App = (): JSX.Element => (
    <IconProvider getPath={getIconPath}>
        <BrowserRouter basename={publicPath}>
            <Switch>
                <Route path="/"><Login /></Route>
            </Switch>
        </BrowserRouter>
    </IconProvider>
);

export default App;
