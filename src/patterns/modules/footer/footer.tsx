import React from 'react';

import { Container } from '../../components/container';

if (process.env.webpack) {
    require('./footer.scss');
}

const Footer: React.FC = () => (
    <footer className="footer">
        <Container>
                footer
        </Container>
    </footer>
);

export default Footer;
