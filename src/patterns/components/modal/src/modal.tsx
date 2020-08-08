import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalInner, IModalInnerProps } from './modal-inner';

export type IModalProps = IModalInnerProps;

export const Modal = (props: IModalProps): JSX.Element => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return (): void => {
            setIsMounted(false);
        };
    }, []);

    return isMounted ? ReactDOM.createPortal(<ModalInner {...props} />, document.body) : <React.Fragment />;
};
