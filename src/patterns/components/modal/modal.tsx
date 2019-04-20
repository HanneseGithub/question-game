import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';

import Helpers from '@helpers';
import Icon from '@icon';

if (process.env.webpack) {
    require('./modal.scss');
}

export interface IModalProps {
    id: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    modifier?: string;
    className?: string;
}

export const ModalInner: React.FC<IModalProps> = (props: IModalProps) => {
    const element: React.MutableRefObject<null | HTMLDivElement> = useRef(null);

    const handleBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget && props.onClose) {
            props.onClose(event);
        }
    };

    const handleKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // Invoke this.props.onClose when user hits ESC key.
        if (event.keyCode === 27 && props.onClose) {
            props.onClose(event);
        }
    };

    const handleCloseClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (props.onClose) {
            props.onClose(event);
        }
    };

    const renderModal: () => JSX.Element = (): JSX.Element => {
        const className: string = classNames(
            'modal',
            props.modifier,
            props.className,
        );

        return (
            <div className={className}>
                <button className="modal__close" onClick={handleCloseClick}>
                    <Icon name="close" />
                </button>
                {props.children}
            </div>
        );
    };

    const renderContainer: () => JSX.Element = (): JSX.Element => {
        const className: string = classNames(
            'modal-container',
            {
                'is-open': props.isOpen,
            },
        );

        return (
            <div
                className={className}
                id={props.id}
                onKeyUp={handleKeyUp}
                tabIndex={-1}
                ref={element}
            >
                <div className="modal-container__inner" onClick={handleBackdropClick}>
                    {renderModal()}
                </div>
            </div>
        );
    };

    useLayoutEffect(() => {
        if (props.isOpen) {
            Helpers.disableScroll();

            if (element.current) {
                element.current.focus();
            }
        } else {
            Helpers.enableScroll();
        }

        return () => {
            if (props.isOpen) {
                Helpers.enableScroll();
            }
        };
    }, [props.isOpen]);

    return renderContainer();
};

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    return isMounted ? ReactDOM.createPortal(<ModalInner {...props} />, document.body) : <React.Fragment />;
};

Modal.defaultProps = {
    isOpen: false,
};

export default Modal;
