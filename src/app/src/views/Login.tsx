import React from 'react';

import { RouteComponentProps } from '@reach/router';

const Login = (props: RouteComponentProps): JSX.Element => (
    <div>
        <h1>LOGIN</h1>
        <div>{props.path}</div>
    </div>
);

export default Login;
