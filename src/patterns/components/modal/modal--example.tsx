import React from 'react';

import Button from '@button';
import Modal from '@modal';

export interface IModalExampleState {
    isOpen: boolean;
}

export default class ModalExample extends React.Component<{}, IModalExampleState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    handleModalClose = (): void => {
        this.closeModal();
    }

    handleButtonClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        event.preventDefault();

        this.openModal();
    }

    openModal(): void {
        this.setState({
            isOpen: true,
        });
    }

    closeModal(): void {
        this.setState({
            isOpen: false,
        });
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <Button
                    text="open modal"
                    url="#modal-example"
                    onClick={this.handleButtonClick}
                />
                <Modal
                    id="modal-example"
                    isOpen={this.state.isOpen}
                    onClose={this.handleModalClose}
                >
                    hello world
                </Modal>
            </React.Fragment>
        );
    }
}
