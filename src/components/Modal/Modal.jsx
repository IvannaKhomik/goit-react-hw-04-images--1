import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onClickModal = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { url, tag } = this.props;
    return createPortal(
      <Overlay onClick={this.onClickModal}>
        <ModalContent>
          <ModalImg src={url} alt={tag} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
