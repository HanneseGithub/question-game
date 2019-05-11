import React from 'react';

import Container from '@container';
import Preview from '@preview';

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
