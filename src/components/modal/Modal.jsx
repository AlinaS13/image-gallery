import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalPage, Overlay, Img } from './Modal.styled';

export const Modal = ({ largeImg, onModalClose }) => {
  const closeModalBackdrop = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };
  const handlePressKey = event => {
    if (event.code === 'Escape') {
      onModalClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlePressKey);
    window.removeEventListener('keydown', handlePressKey);
  });

  return (
    <Overlay onClick={closeModalBackdrop}>
      <ModalPage>
        <Img src={largeImg} alt="" />
      </ModalPage>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
