import React from 'react';

import { useLocation } from 'react-router-dom';

import { Icon } from '../../../patterns';

const Login = (): JSX.Element => {
    const { pathname } = useLocation();

    return (
        <div>
            <h1>LOGIN <Icon name="check" /></h1>
            <div>{pathname}</div>
        </div>
    );
};

export default Login;
