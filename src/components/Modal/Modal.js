import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ largeImage, onClick }) => {
  useEffect(() => {
    const handleKeyDown = (e) => e.code === "Escape" && onClick();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleBackdropClick = (e) => e.currentTarget === e.target && onClick();

  const { overlay, modal } = s;
  return createPortal(
    <div onClick={handleBackdropClick} className={overlay}>
      <div className={modal}>
        <img src={largeImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
