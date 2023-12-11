import React from 'react';
import { CloseButton, ModalContent, ModalWrapper } from './Modal.styled.js';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    const { url } = this.props;
    return (
      <ModalWrapper onClick={this.handleBackdropClick}>
        <ModalContent>
          <img
            src={url}
            alt="preview img"
            onError={e => {
              console.error('Image failed to load', e);
            }}
          />
          <CloseButton onClick={this.closeModal}>×</CloseButton>
        </ModalContent>
      </ModalWrapper>
    );
  }
}
