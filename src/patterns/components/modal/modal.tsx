import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';

import { disableScroll, enableScroll } from '../helpers';
import { Icon } from '../icon/icon';

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
    const { isOpen, modifier, className, children, id } = props;

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
        const classes: string = classNames(
            'modal',
            modifier,
            className,
        );

        return (
            <div className={classes}>
                <button className="modal__close" onClick={handleCloseClick}>
                    <Icon name="close" />
                </button>
                {children}
            </div>
        );
    };

    const renderContainer = (): JSX.Element => {
        const classes: string = classNames(
            'modal-container',
            {
                'is-open': isOpen,
            },
        );

        return (
            <div
                className={classes}
                id={id}
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
            disableScroll();

            if (element.current) {
                element.current.focus();
            }
        } else {
            enableScroll();
        }

        return (): void => {
            if (props.isOpen) {
                enableScroll();
            }
        };
    }, [props.isOpen]);

    return renderContainer();
};

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return (): void => {
            setIsMounted(false);
        };
    }, []);

    return isMounted ? ReactDOM.createPortal(<ModalInner {...props} />, document.body) : <React.Fragment />;
};

Modal.defaultProps = {
    isOpen: false,
};

export default Modal;
