import React from "react";
import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ src, alt, onClick, largeImage }) => {
  return (
    <img
      className={s.image}
      src={src}
      alt={alt}
      onClick={() => onClick(largeImage)}
    />
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
