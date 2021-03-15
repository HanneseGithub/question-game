import React from 'react';

import { Container } from '../../components/container';
import Preview from '../preview/preview';

export default class PreviewContainer extends Preview {
    render(): JSX.Element {
        return (
            <Preview {...this.props}>
                <Container>
                    {this.renderRoot()}
                </Container>
            </Preview>
        );
    }
}
