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
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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


// mport React, { useRef, useEffect } from 'react';
// import s from './Modal.module.css';
// import PropTypes from 'prop-types';

// export const Modal = ({ modaiImg, toggleModal }) => {
//   const overlay = useRef();

//   useEffect(() => {
//     overlay.current.focus();
//   }, []);

//   return (
//     <div
//       ref={overlay}
//       tabIndex={-1}
//       onKeyDown={event => {
//         if (event.code !== 'Escape') {
//           return;
//         }
//         toggleModal();
//       }}
//       className={s.backdrop}
//       onClick={e => {
//         if (e.target.nodeName !== 'DIV') {
//           return;
//         }
//         toggleModal(e);
//       }}
//     >
//       <div className={s.Modal}>
//         <img src={modaiImg} alt="" />
//       </div>
//     </div>
//   );
// };

// Modal.propTypes = {
//   modaiImg: PropTypes.string,
//   toggleModal: PropTypes.func,
// };
