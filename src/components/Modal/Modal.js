import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => e.code === "Escape" && this.props.onClick();

  handleBackdropClick = (e) =>
    e.currentTarget === e.target && this.props.onClick();

  render() {
    const { overlay, modal } = s;
    const { largeImage } = this.props;
    return createPortal(
      <div onClick={this.handleBackdropClick} className={overlay}>
        <div className={modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
