import React from 'react';
import '../css/Modal.css';

const Modal = ({ message, score, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='modal-text'>{message}</h2>
        <p className='modal-text'>Final Score: {score}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;