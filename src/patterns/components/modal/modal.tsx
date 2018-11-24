import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';

import Helpers from '@helpers';
import Icon from '@icon';

if (process.env.webpack) {
    require('./modal.scss');
}

export interface IModalProps {
    id: string;
    isOpen?: boolean;
    onClose?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    modifier?: string;
    className?: string;
}

export interface IModalState {
    isMounted: boolean;
}

export default class Modal extends React.Component<IModalProps, IModalState> {
    static defaultProps: Partial<IModalProps> = {
        isOpen: false,
    };

    modal: HTMLDivElement | null = null;

    constructor(props: IModalProps) {
        super(props);

        this.state = {
            isMounted: false,
        };
    }

    componentDidMount(): void {
        this.setState({
            isMounted: true,
        }, () => {
            if (this.props.isOpen) {
                this.disableScroll();
                this.focusElement();
            }
        });
    }

    componentDidUpdate(prevProps: IModalProps): void {
        if (this.props.isOpen && !prevProps.isOpen) {
            this.disableScroll();
            this.focusElement();
        } else if (!this.props.isOpen && prevProps.isOpen) {
            this.enableScroll();
        }
    }

    componentWillUnmount(): void {
        if (this.props.isOpen) {
            this.enableScroll();
        }
    }

    focusElement(): void {
        if (this.modal) {
            this.modal.focus();
        }
    }

    disableScroll(): void {
        Helpers.disableScroll();
    }

    enableScroll(): void {
        Helpers.enableScroll();
    }

    handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        if (this.props.onClose) {
            this.props.onClose(event);
        }
    }

    handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // Invoke this.props.onClose when user hits ESC key.
        if (event.keyCode === 27 && this.props.onClose) {
            this.props.onClose(event);
        }
    }

    handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (event.target === event.currentTarget && this.props.onClose) {
            this.props.onClose(event);
        }
    }

    renderContainer(): JSX.Element {
        const className: string = classNames(
            'modal-container',
            {
                'is-open': this.props.isOpen,
            },
        );

        return (
            <div
                className={className}
                id={this.props.id}
                onKeyUp={this.handleKeyUp}
                tabIndex={-1}
                ref={(element: HTMLDivElement) => this.modal = element}
            >
                <div className="modal-container__inner" onClick={this.handleBackdropClick}>
                    {this.renderModal()}
                </div>
            </div>
        );
    }

    renderModal(): JSX.Element {
        const className: string = classNames(
            'modal',
            this.props.modifier,
            this.props.className,
        );

        return (
            <div className={className}>
                <button className="modal__close" onClick={this.handleCloseClick}>
                    <Icon name="close" />
                </button>
                {this.props.children}
            </div>
        );
    }

    render(): JSX.Element | React.ReactPortal {
        return this.state.isMounted ? ReactDOM.createPortal(this.renderContainer(), document.body) : this.renderModal();
    }
}
