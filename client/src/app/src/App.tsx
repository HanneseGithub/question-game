import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { IconProvider } from '../../patterns';
import { getIconPath } from '../../patterns/components/icon/icon/icons';
import QuestionGame from './views/QuestionGame';

const publicPath = process.env.publicPath || '/';

const App = (): JSX.Element => (
    <IconProvider getPath={getIconPath}>
        <BrowserRouter basename={publicPath}>
            <Switch>
                <Route path="/"><QuestionGame /></Route>
            </Switch>
        </BrowserRouter>
    </IconProvider>
);

export default App;
