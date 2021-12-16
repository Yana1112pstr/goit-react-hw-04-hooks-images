import React from "react";
import s from "./Button.module.css";
import PropTypes from "prop-types";

const Button = ({ onClick }) => {
  const { button } = s;
  return (
    <button className={button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
