import React from 'react';

if (process.env.webpack) {
    require('./typography.scss');
}

const Typography: React.FC = () => {
    return (
        <i>This component is not actually a React component.</i>
    );
};

export default Typography;
