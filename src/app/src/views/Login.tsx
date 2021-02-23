import React from 'react';

import { RouteComponentProps } from '@reach/router';

import { Icon } from '../../../patterns';

const Login = (props: RouteComponentProps): JSX.Element => (
    <div>
        <h1>LOGIN <Icon name="check" /></h1>
        <div>{props.path}</div>
    </div>
);

export default Login;
