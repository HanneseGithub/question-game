import React, { useState } from 'react';

import Button from '@button';
import Modal from '@modal';

export interface IModalExampleState {
    isOpen: boolean;
}

const ModalExample: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal: () => void = (): void => {
        setIsOpen(true);
    };

    const closeModal: () => void = (): void => {
        setIsOpen(false);
    };

    const handleModalClose: () => void = (): void => {
        closeModal();
    };

    const handleButtonClick: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        event.preventDefault();

        openModal();
    };

    return (
        <React.Fragment>
            <Button
                text="open modal"
                url="#modal-example"
                onClick={handleButtonClick}
            />
            <Modal
                id="modal-example"
                isOpen={isOpen}
                onClose={handleModalClose}
            >
                hello world
            </Modal>
        </React.Fragment>
    );
};

export default ModalExample;