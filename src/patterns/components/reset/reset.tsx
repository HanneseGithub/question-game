import React from 'react';

if (process.env.webpack) {
    require('./reset.scss');
}

const Reset: React.FC = () => (
    <i>This component is not actually a React component.</i>
);

export default Reset;
